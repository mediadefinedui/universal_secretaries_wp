<?php
/**
 * Microsoft Graph API Client for Outlook Calendar & Teams Meetings
 *
 * @package Universal_Consultation_Booking
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

class UCB_Microsoft_Graph {

    const TOKEN_TRANSIENT = 'ucb_ms_graph_token';

    /**
     * Get settings for Microsoft Graph
     */
    public static function get_settings() {
        return array(
            'tenant_id'        => trim( get_option( 'ucb_ms_tenant_id', '' ) ),
            'client_id'        => trim( get_option( 'ucb_ms_client_id', '' ) ),
            'client_secret'    => trim( get_option( 'ucb_ms_client_secret', '' ) ),
            'consultant_email' => trim( get_option( 'ucb_consultant_email', 'snisal@corporate.mediadefined.com' ) ),
            'consultant_name'  => trim( get_option( 'ucb_consultant_name', 'Senior Tax & Corporate Advisor' ) ),
            'timezone'         => trim( get_option( 'ucb_timezone', 'Sri Lanka Standard Time' ) ),
        );
    }

    /**
     * Check if Microsoft Graph credentials are fully configured
     */
    public static function is_configured() {
        $cfg = self::get_settings();
        return ! empty( $cfg['tenant_id'] ) && ! empty( $cfg['client_id'] ) && ! empty( $cfg['client_secret'] ) && ! empty( $cfg['consultant_email'] );
    }

    /**
     * Obtain OAuth 2.0 Access Token using Client Credentials Flow
     *
     * @param bool $force_refresh
     * @return string|WP_Error
     */
    public static function get_access_token( $force_refresh = false ) {
        if ( ! $force_refresh ) {
            $cached = get_transient( self::TOKEN_TRANSIENT );
            if ( ! empty( $cached ) ) {
                return $cached;
            }
        }

        $cfg = self::get_settings();
        if ( ! self::is_configured() ) {
            return new WP_Error( 'not_configured', __( 'Microsoft Graph API credentials are not fully configured in settings.', 'universal-consultation-booking' ) );
        }

        $token_url = sprintf( 'https://login.microsoftonline.com/%s/oauth2/v2.0/token', rawurlencode( $cfg['tenant_id'] ) );

        $response = wp_remote_post( $token_url, array(
            'timeout' => 20,
            'body'    => array(
                'client_id'     => $cfg['client_id'],
                'client_secret' => $cfg['client_secret'],
                'scope'         => 'https://graph.microsoft.com/.default',
                'grant_type'    => 'client_credentials',
            ),
            'headers' => array(
                'Content-Type' => 'application/x-www-form-urlencoded',
            ),
        ) );

        if ( is_wp_error( $response ) ) {
            UCB_Logger::log( 'graph', 'token_request', 'error', 'Token request failed: ' . $response->get_error_message() );
            return $response;
        }

        $code = wp_remote_retrieve_response_code( $response );
        $body = json_decode( wp_remote_retrieve_body( $response ), true );

        if ( $code !== 200 || empty( $body['access_token'] ) ) {
            $error_desc = $body['error_description'] ?? ( $body['error'] ?? 'HTTP ' . $code );
            UCB_Logger::log( 'graph', 'token_request', 'error', 'Failed to retrieve access token: ' . $error_desc, $body );
            return new WP_Error( 'token_error', sprintf( __( 'Microsoft Entra ID token error: %s', 'universal-consultation-booking' ), $error_desc ) );
        }

        $token      = $body['access_token'];
        $expires_in = intval( $body['expires_in'] ?? 3600 );
        // Buffer by 5 minutes
        $cache_time = max( 60, $expires_in - 300 );
        set_transient( self::TOKEN_TRANSIENT, $token, $cache_time );

        UCB_Logger::log( 'graph', 'token_request', 'success', 'Acquired new Microsoft Graph access token.' );
        return $token;
    }

    /**
     * Test Microsoft Graph connection
     *
     * @return array
     */
    public static function test_connection() {
        $token = self::get_access_token( true );
        if ( is_wp_error( $token ) ) {
            return array(
                'success' => false,
                'message' => $token->get_error_message(),
            );
        }

        $cfg   = self::get_settings();
        $email = $cfg['consultant_email'];
        $url   = sprintf( 'https://graph.microsoft.com/v1.0/users/%s', rawurlencode( $email ) );

        $response = wp_remote_get( $url, array(
            'timeout' => 20,
            'headers' => array(
                'Authorization' => 'Bearer ' . $token,
                'Accept'        => 'application/json',
            ),
        ) );

        if ( is_wp_error( $response ) ) {
            return array(
                'success' => false,
                'message' => $response->get_error_message(),
            );
        }

        $code = wp_remote_retrieve_response_code( $response );
        $body = json_decode( wp_remote_retrieve_body( $response ), true );

        if ( $code >= 200 && $code < 300 ) {
            return array(
                'success' => true,
                'message' => sprintf(
                    __( 'Successfully connected to Microsoft Graph! Consultant: %s (%s).', 'universal-consultation-booking' ),
                    $body['displayName'] ?? $email,
                    $body['userPrincipalName'] ?? $email
                ),
                'user'    => $body,
            );
        }

        $msg = $body['error']['message'] ?? ( 'HTTP ' . $code );
        return array(
            'success' => false,
            'message' => sprintf( __( 'Graph API error: %s', 'universal-consultation-booking' ), $msg ),
        );
    }

    /**
     * Retrieve consultant calendar schedule for a given date
     *
     * @param string $date ISO YYYY-MM-DD
     * @return array|WP_Error Array of busy intervals [ ['start' => '...', 'end' => '...'], ... ]
     */
    public static function get_consultant_calendar_busy_slots( $date ) {
        if ( ! self::is_configured() ) {
            return array();
        }

        $token = self::get_access_token();
        if ( is_wp_error( $token ) ) {
            return $token;
        }

        $cfg   = self::get_settings();
        $email = $cfg['consultant_email'];
        $tz    = $cfg['timezone'];

        // Build getSchedule request
        $url = sprintf( 'https://graph.microsoft.com/v1.0/users/%s/calendar/getSchedule', rawurlencode( $email ) );

        $start_dt = $date . 'T00:00:00';
        $end_dt   = $date . 'T23:59:59';

        $payload = array(
            'schedules'                => array( $email ),
            'startTime'                => array(
                'dateTime' => $start_dt,
                'timeZone' => $tz,
            ),
            'endTime'                  => array(
                'dateTime' => $end_dt,
                'timeZone' => $tz,
            ),
            'availabilityViewInterval' => 45,
        );

        $response = wp_remote_post( $url, array(
            'timeout' => 20,
            'headers' => array(
                'Authorization'   => 'Bearer ' . $token,
                'Content-Type'    => 'application/json',
                'Prefer'          => 'outlook.timezone="' . $tz . '"',
            ),
            'body'    => wp_json_encode( $payload ),
        ) );

        if ( is_wp_error( $response ) ) {
            UCB_Logger::log( 'graph', 'get_schedule', 'error', 'Error calling getSchedule: ' . $response->get_error_message() );
            return $response;
        }

        $code = wp_remote_retrieve_response_code( $response );
        $body = json_decode( wp_remote_retrieve_body( $response ), true );

        if ( $code !== 200 || empty( $body['value'] ) ) {
            $err_msg = $body['error']['message'] ?? ( 'HTTP ' . $code );
            UCB_Logger::log( 'graph', 'get_schedule', 'warning', 'getSchedule returned error: ' . $err_msg, $body );
            return array();
        }

        $schedule_items = $body['value'][0]['scheduleItems'] ?? array();
        $busy_intervals = array();

        foreach ( $schedule_items as $item ) {
            $status = strtolower( $item['status'] ?? 'busy' );
            if ( in_array( $status, array( 'busy', 'tentative', 'oof', 'workingelsewhere' ), true ) ) {
                $busy_intervals[] = array(
                    'start'  => $item['start']['dateTime'] ?? '',
                    'end'    => $item['end']['dateTime'] ?? '',
                    'status' => $status,
                );
            }
        }

        return $busy_intervals;
    }

    /**
     * Create Calendar Event with Microsoft Teams Online Meeting
     *
     * @param array $booking_params
     * @return array|WP_Error Contains ['event_id' => '...', 'teams_join_url' => '...']
     */
    public static function create_teams_consultation_event( $booking_params ) {
        $cfg = self::get_settings();

        if ( ! self::is_configured() ) {
            // Simulated fallback link if credentials are not configured yet
            $ref_id   = $booking_params['ref_id'] ?? ( 'LK-TEAMS-' . strtoupper( wp_generate_password( 6, false ) ) );
            $sim_link = 'https://teams.microsoft.com/l/meetup-join/19%3ameeting_' . md5( $ref_id . time() ) . '%40thread.v2/0?context=' . urlencode( '{"Tid":"universal-secretaries","Oid":"' . md5( $booking_params['client_email'] ) . '"}' );
            return array(
                'event_id'        => 'sim_' . $ref_id,
                'teams_join_url'  => $sim_link,
                'web_link'        => $sim_link,
                'is_simulated'    => true,
            );
        }

        $token = self::get_access_token();
        if ( is_wp_error( $token ) ) {
            return $token;
        }

        $consultant_email = $cfg['consultant_email'];
        $consultant_name  = $cfg['consultant_name'];
        $tz               = $cfg['timezone'];

        $date       = $booking_params['date'];          // e.g. "2026-11-06"
        $time_slot  = $booking_params['time_slot'];     // e.g. "07:00-07:45"
        $parts      = explode( '-', $time_slot );
        $start_time = trim( $parts[0] );
        $end_time   = trim( $parts[1] );

        $start_iso  = sprintf( '%sT%s:00', $date, $start_time );
        $end_iso    = sprintf( '%sT%s:00', $date, $end_time );

        $client_name  = $booking_params['client_name'];
        $client_email = $booking_params['client_email'];
        $client_phone = $booking_params['client_phone'];
        $client_notes = $booking_params['client_notes'] ?? '';
        $service_type = $booking_params['service_type'] ?? 'Company registration';
        $ref_id       = $booking_params['ref_id'];

        $subject = sprintf( '%s Consultation – %s', $service_type, $client_name );

        $html_body = sprintf(
            '<div style="font-family: Arial, sans-serif; line-height: 1.6; color: #1e293b;">
                <h2 style="color: #0369a1; border-bottom: 2px solid #e2e8f0; padding-bottom: 8px;">Universal Secretaries – Private Consultation</h2>
                <table style="width: 100%%; max-width: 600px; border-collapse: collapse; margin-top: 15px;">
                    <tr><td style="padding: 6px 0; font-weight: bold; width: 180px;">Booking Reference:</td><td>%s</td></tr>
                    <tr><td style="padding: 6px 0; font-weight: bold;">Consultation Type:</td><td>%s</td></tr>
                    <tr><td style="padding: 6px 0; font-weight: bold;">Scheduled Slot:</td><td>%s (%s to %s) Sri Lanka Time</td></tr>
                    <tr><td style="padding: 6px 0; font-weight: bold;">Client Name:</td><td>%s</td></tr>
                    <tr><td style="padding: 6px 0; font-weight: bold;">Client Phone / WhatsApp:</td><td>%s</td></tr>
                    <tr><td style="padding: 6px 0; font-weight: bold;">Client Email:</td><td><a href="mailto:%s">%s</a></td></tr>
                    <tr><td style="padding: 6px 0; font-weight: bold; vertical-align: top;">Client Notes:</td><td>%s</td></tr>
                </table>
                <div style="margin-top: 25px; padding: 15px; background: #f0fdf4; border-left: 4px solid #16a34a; border-radius: 4px;">
                    <p style="margin: 0; font-weight: bold; color: #15803d;">Microsoft Teams Meeting Attached</p>
                    <p style="margin: 5px 0 0; font-size: 13px;">Both client and consultant can join using the Microsoft Teams link generated in this calendar invite.</p>
                </div>
            </div>',
            esc_html( $ref_id ),
            esc_html( $service_type ),
            esc_html( $date ),
            esc_html( $start_time ),
            esc_html( $end_time ),
            esc_html( $client_name ),
            esc_html( $client_phone ),
            esc_attr( $client_email ),
            esc_html( $client_email ),
            nl2br( esc_html( $client_notes ?: 'No special notes provided.' ) )
        );

        $payload = array(
            'subject'               => $subject,
            'body'                  => array(
                'contentType' => 'HTML',
                'content'     => $html_body,
            ),
            'start'                 => array(
                'dateTime' => $start_iso,
                'timeZone' => $tz,
            ),
            'end'                   => array(
                'dateTime' => $end_iso,
                'timeZone' => $tz,
            ),
            'location'              => array(
                'displayName' => 'Microsoft Teams Meeting (Universal Secretaries)',
            ),
            'attendees'             => array(
                array(
                    'emailAddress' => array(
                        'address' => $client_email,
                        'name'    => $client_name,
                    ),
                    'type'         => 'required',
                ),
            ),
            'isOnlineMeeting'       => true,
            'onlineMeetingProvider' => 'teamsForBusiness',
        );

        $url = sprintf( 'https://graph.microsoft.com/v1.0/users/%s/events', rawurlencode( $consultant_email ) );

        $response = wp_remote_post( $url, array(
            'timeout' => 25,
            'headers' => array(
                'Authorization'   => 'Bearer ' . $token,
                'Content-Type'    => 'application/json',
                'Prefer'          => 'outlook.timezone="' . $tz . '"',
            ),
            'body'    => wp_json_encode( $payload ),
        ) );

        if ( is_wp_error( $response ) ) {
            UCB_Logger::log( 'graph', 'create_event', 'error', 'Error calling create event: ' . $response->get_error_message(), $payload );
            return $response;
        }

        $code = wp_remote_retrieve_response_code( $response );
        $body = json_decode( wp_remote_retrieve_body( $response ), true );

        if ( $code !== 201 || empty( $body['id'] ) ) {
            $err_msg = $body['error']['message'] ?? ( 'HTTP ' . $code );
            UCB_Logger::log( 'graph', 'create_event', 'error', 'Failed to create event on Microsoft Graph: ' . $err_msg, $body );
            return new WP_Error( 'graph_event_failed', sprintf( __( 'Microsoft Graph error creating meeting: %s', 'universal-consultation-booking' ), $err_msg ) );
        }

        $event_id  = $body['id'];
        $teams_url = $body['onlineMeeting']['joinUrl'] ?? ( $body['webLink'] ?? '' );

        UCB_Logger::log( 'graph', 'create_event', 'success', sprintf( 'Created Teams meeting event %s for %s', $event_id, $client_name ), array(
            'eventId'  => $event_id,
            'teamsUrl' => $teams_url,
        ) );

        return array(
            'event_id'       => $event_id,
            'teams_join_url' => $teams_url,
            'web_link'       => $body['webLink'] ?? '',
            'is_simulated'   => false,
        );
    }

    /**
     * Cancel an event on Microsoft Graph
     *
     * @param string $event_id
     * @param string $comment
     * @return true|WP_Error
     */
    public static function cancel_event( $event_id, $comment = 'Consultation cancelled by administrator' ) {
        if ( empty( $event_id ) || strpos( $event_id, 'sim_' ) === 0 ) {
            return true;
        }

        if ( ! self::is_configured() ) {
            return true;
        }

        $token = self::get_access_token();
        if ( is_wp_error( $token ) ) {
            return $token;
        }

        $cfg   = self::get_settings();
        $email = $cfg['consultant_email'];

        $url = sprintf( 'https://graph.microsoft.com/v1.0/users/%s/events/%s/cancel', rawurlencode( $email ), rawurlencode( $event_id ) );

        $response = wp_remote_post( $url, array(
            'timeout' => 20,
            'headers' => array(
                'Authorization' => 'Bearer ' . $token,
                'Content-Type'  => 'application/json',
            ),
            'body'    => wp_json_encode( array( 'comment' => $comment ) ),
        ) );

        if ( is_wp_error( $response ) ) {
            UCB_Logger::log( 'graph', 'cancel_event', 'error', 'Error cancelling event: ' . $response->get_error_message() );
            return $response;
        }

        $code = wp_remote_retrieve_response_code( $response );
        if ( $code === 202 || $code === 200 || $code === 204 ) {
            UCB_Logger::log( 'graph', 'cancel_event', 'success', 'Cancelled Microsoft Graph event ' . $event_id );
            return true;
        }

        return new WP_Error( 'cancel_failed', 'HTTP ' . $code );
    }

    /**
     * Reschedule an event on Microsoft Graph
     *
     * @param string $event_id
     * @param string $new_date ISO YYYY-MM-DD
     * @param string $new_slot e.g. "08:30-09:15"
     * @return true|WP_Error
     */
    public static function reschedule_event( $event_id, $new_date, $new_slot ) {
        if ( empty( $event_id ) || strpos( $event_id, 'sim_' ) === 0 ) {
            return true;
        }

        if ( ! self::is_configured() ) {
            return true;
        }

        $token = self::get_access_token();
        if ( is_wp_error( $token ) ) {
            return $token;
        }

        $cfg   = self::get_settings();
        $email = $cfg['consultant_email'];
        $tz    = $cfg['timezone'];

        $parts      = explode( '-', $new_slot );
        $start_time = trim( $parts[0] );
        $end_time   = trim( $parts[1] );

        $payload = array(
            'start' => array(
                'dateTime' => sprintf( '%sT%s:00', $new_date, $start_time ),
                'timeZone' => $tz,
            ),
            'end'   => array(
                'dateTime' => sprintf( '%sT%s:00', $new_date, $end_time ),
                'timeZone' => $tz,
            ),
        );

        $url = sprintf( 'https://graph.microsoft.com/v1.0/users/%s/events/%s', rawurlencode( $email ), rawurlencode( $event_id ) );

        $response = wp_remote_request( $url, array(
            'method'  => 'PATCH',
            'timeout' => 20,
            'headers' => array(
                'Authorization' => 'Bearer ' . $token,
                'Content-Type'  => 'application/json',
                'Prefer'        => 'outlook.timezone="' . $tz . '"',
            ),
            'body'    => wp_json_encode( $payload ),
        ) );

        if ( is_wp_error( $response ) ) {
            UCB_Logger::log( 'graph', 'reschedule_event', 'error', 'Error rescheduling event: ' . $response->get_error_message() );
            return $response;
        }

        $code = wp_remote_retrieve_response_code( $response );
        if ( $code === 200 ) {
            UCB_Logger::log( 'graph', 'reschedule_event', 'success', sprintf( 'Rescheduled event %s to %s @ %s', $event_id, $new_date, $new_slot ) );
            return true;
        }

        return new WP_Error( 'reschedule_failed', 'HTTP ' . $code );
    }
}

