<?php
/**
 * WhatsApp Business Cloud API Client for Consultation Booking
 *
 * @package Universal_Consultation_Booking
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

class UCB_WhatsApp_API {

    /**
     * Get WhatsApp settings
     */
    public static function get_settings() {
        return array(
            'enabled'            => get_option( 'ucb_wa_enabled', 'yes' ) === 'yes',
            'phone_number_id'    => trim( get_option( 'ucb_wa_phone_number_id', '' ) ),
            'waba_id'            => trim( get_option( 'ucb_wa_business_account_id', '' ) ),
            'access_token'       => trim( get_option( 'ucb_wa_access_token', '' ) ),
            'consultant_phone'   => trim( get_option( 'ucb_consultant_whatsapp', '94774087869' ) ),
            'consultant_name'    => trim( get_option( 'ucb_consultant_name', 'Senior Tax & Corporate Advisor' ) ),
            'template_name'      => trim( get_option( 'ucb_wa_template_name', '' ) ),
            'template_language'  => trim( get_option( 'ucb_wa_template_lang', 'en' ) ),
            'api_version'        => 'v19.0',
        );
    }

    /**
     * Check if WhatsApp API is fully configured
     */
    public static function is_configured() {
        $cfg = self::get_settings();
        return $cfg['enabled'] && ! empty( $cfg['phone_number_id'] ) && ! empty( $cfg['access_token'] );
    }

    /**
     * Normalize international phone number to E.164 digits without leading +
     *
     * @param string $phone
     * @return string
     */
    public static function format_phone( $phone ) {
        $digits = preg_replace( '/[^0-9]/', '', $phone );
        // Handle Sri Lankan local numbers starting with 0: e.g. 0774087869 -> 94774087869
        if ( strlen( $digits ) === 10 && strpos( $digits, '0' ) === 0 ) {
            $digits = '94' . substr( $digits, 1 );
        }
        return $digits;
    }

    /**
     * Test WhatsApp Cloud API connection
     *
     * @param string $test_recipient
     * @return array
     */
    public static function test_connection( $test_recipient = '' ) {
        $cfg = self::get_settings();

        if ( empty( $cfg['phone_number_id'] ) || empty( $cfg['access_token'] ) ) {
            return array(
                'success' => false,
                'message' => __( 'Phone Number ID and Access Token must be provided.', 'universal-consultation-booking' ),
            );
        }

        // Test 1: Verify phone number ID with Meta Graph
        $check_url = sprintf( 'https://graph.facebook.com/%s/%s', $cfg['api_version'], rawurlencode( $cfg['phone_number_id'] ) );
        $response  = wp_remote_get( $check_url, array(
            'timeout' => 20,
            'headers' => array(
                'Authorization' => 'Bearer ' . $cfg['access_token'],
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

        if ( $code !== 200 || empty( $body['id'] ) ) {
            $err = $body['error']['message'] ?? ( 'HTTP ' . $code );
            return array(
                'success' => false,
                'message' => sprintf( __( 'Meta Cloud API Error: %s', 'universal-consultation-booking' ), $err ),
            );
        }

        $display_phone = $body['display_phone_number'] ?? $body['id'];
        $verified_name = $body['verified_name'] ?? 'Universal Secretaries';

        // Optional Test 2: If a test recipient is provided, send a test ping
        if ( ! empty( $test_recipient ) ) {
            $test_msg = sprintf( "✅ *Universal Secretaries API Test*\nConnection verified successfully with Meta Cloud API for WhatsApp.\nVerified Name: %s\nTime: %s", $verified_name, current_time( 'mysql' ) );
            $send_res = self::send_text_message( $test_recipient, $test_msg );
            if ( is_wp_error( $send_res ) ) {
                return array(
                    'success' => false,
                    'message' => sprintf( __( 'Verified phone %s (%s), but test message send failed: %s', 'universal-consultation-booking' ), $display_phone, $verified_name, $send_res->get_error_message() ),
                );
            }
        }

        return array(
            'success' => true,
            'message' => sprintf( __( 'Successfully connected to WhatsApp Business Cloud API! Phone: %s (%s).', 'universal-consultation-booking' ), $display_phone, $verified_name ),
            'data'    => $body,
        );
    }

    /**
     * Send direct text message via WhatsApp Business Cloud API
     *
     * @param string $recipient_phone
     * @param string $message
     * @return array|WP_Error
     */
    public static function send_text_message( $recipient_phone, $message ) {
        $cfg = self::get_settings();
        if ( ! self::is_configured() ) {
            return new WP_Error( 'not_configured', __( 'WhatsApp API credentials are not configured.', 'universal-consultation-booking' ) );
        }

        $phone = self::format_phone( $recipient_phone );
        if ( empty( $phone ) ) {
            return new WP_Error( 'invalid_phone', __( 'Recipient phone number is invalid.', 'universal-consultation-booking' ) );
        }

        $url = sprintf( 'https://graph.facebook.com/%s/%s/messages', $cfg['api_version'], rawurlencode( $cfg['phone_number_id'] ) );

        $payload = array(
            'messaging_product' => 'whatsapp',
            'recipient_type'    => 'individual',
            'to'                => $phone,
            'type'              => 'text',
            'text'              => array(
                'preview_url' => true,
                'body'        => $message,
            ),
        );

        $response = wp_remote_post( $url, array(
            'timeout' => 25,
            'headers' => array(
                'Authorization' => 'Bearer ' . $cfg['access_token'],
                'Content-Type'  => 'application/json',
            ),
            'body'    => wp_json_encode( $payload ),
        ) );

        if ( is_wp_error( $response ) ) {
            UCB_Logger::log( 'whatsapp', 'send_text', 'error', 'Error calling WhatsApp Cloud API: ' . $response->get_error_message(), array( 'to' => $phone ) );
            return $response;
        }

        $code = wp_remote_retrieve_response_code( $response );
        $body = json_decode( wp_remote_retrieve_body( $response ), true );

        if ( $code >= 200 && $code < 300 && ! empty( $body['messages'] ) ) {
            $msg_id = $body['messages'][0]['id'] ?? '';
            UCB_Logger::log( 'whatsapp', 'send_text', 'success', sprintf( 'Sent WhatsApp message %s to %s', $msg_id, $phone ) );
            return array(
                'success'    => true,
                'message_id' => $msg_id,
                'raw'        => $body,
            );
        }

        $err_msg = $body['error']['message'] ?? ( 'HTTP ' . $code );
        UCB_Logger::log( 'whatsapp', 'send_text', 'error', sprintf( 'Failed sending WhatsApp to %s: %s', $phone, $err_msg ), $body );
        return new WP_Error( 'wa_send_failed', $err_msg, $body );
    }

    /**
     * Send template message via WhatsApp Business Cloud API
     *
     * @param string $recipient_phone
     * @param string $template_name
     * @param string $lang_code
     * @param array  $parameters
     * @return array|WP_Error
     */
    public static function send_template_message( $recipient_phone, $template_name, $lang_code = 'en', $parameters = array() ) {
        $cfg = self::get_settings();
        if ( ! self::is_configured() ) {
            return new WP_Error( 'not_configured', __( 'WhatsApp API credentials are not configured.', 'universal-consultation-booking' ) );
        }

        $phone = self::format_phone( $recipient_phone );
        $url   = sprintf( 'https://graph.facebook.com/%s/%s/messages', $cfg['api_version'], rawurlencode( $cfg['phone_number_id'] ) );

        $components = array();
        if ( ! empty( $parameters ) ) {
            $body_params = array();
            foreach ( $parameters as $param_val ) {
                $body_params[] = array(
                    'type' => 'text',
                    'text' => (string) $param_val,
                );
            }
            $components[] = array(
                'type'       => 'body',
                'parameters' => $body_params,
            );
        }

        $payload = array(
            'messaging_product' => 'whatsapp',
            'recipient_type'    => 'individual',
            'to'                => $phone,
            'type'              => 'template',
            'template'          => array(
                'name'       => $template_name,
                'language'   => array( 'code' => $lang_code ),
                'components' => $components,
            ),
        );

        $response = wp_remote_post( $url, array(
            'timeout' => 25,
            'headers' => array(
                'Authorization' => 'Bearer ' . $cfg['access_token'],
                'Content-Type'  => 'application/json',
            ),
            'body'    => wp_json_encode( $payload ),
        ) );

        if ( is_wp_error( $response ) ) {
            UCB_Logger::log( 'whatsapp', 'send_template', 'error', 'Error calling WhatsApp template API: ' . $response->get_error_message() );
            return $response;
        }

        $code = wp_remote_retrieve_response_code( $response );
        $body = json_decode( wp_remote_retrieve_body( $response ), true );

        if ( $code >= 200 && $code < 300 && ! empty( $body['messages'] ) ) {
            $msg_id = $body['messages'][0]['id'] ?? '';
            UCB_Logger::log( 'whatsapp', 'send_template', 'success', sprintf( 'Sent WhatsApp template [%s] to %s', $template_name, $phone ) );
            return array(
                'success'    => true,
                'message_id' => $msg_id,
                'raw'        => $body,
            );
        }

        $err_msg = $body['error']['message'] ?? ( 'HTTP ' . $code );
        UCB_Logger::log( 'whatsapp', 'send_template', 'error', sprintf( 'Failed sending template [%s] to %s: %s', $template_name, $phone, $err_msg ), $body );
        return new WP_Error( 'wa_template_failed', $err_msg, $body );
    }

    /**
     * Send Customer WhatsApp Booking Confirmation
     *
     * @param array $booking
     * @return array|WP_Error
     */
    public static function send_customer_confirmation( $booking ) {
        $cfg = self::get_settings();
        if ( ! $cfg['enabled'] ) {
            return array( 'success' => false, 'status' => 'Disabled' );
        }

        $client_phone    = $booking['client_phone'];
        $client_name     = $booking['client_name'];
        $service_type    = $booking['service_type'];
        $date            = $booking['date_formatted'] ?: $booking['date'];
        $time_slot       = $booking['time_slot'];
        $consultant_name = $cfg['consultant_name'];
        $teams_url       = $booking['teams_url'];

        // If template name is defined, attempt template send first
        if ( ! empty( $cfg['template_name'] ) ) {
            $template_params = array(
                $client_name,
                $service_type,
                $date,
                $time_slot,
                $consultant_name,
                $teams_url,
            );
            $tpl_res = self::send_template_message( $client_phone, $cfg['template_name'], $cfg['template_language'], $template_params );
            if ( ! is_wp_error( $tpl_res ) ) {
                return $tpl_res;
            }
            UCB_Logger::log( 'whatsapp', 'customer_confirm', 'warning', 'Template send failed, falling back to direct text format: ' . $tpl_res->get_error_message() );
        }

        // Direct Text format matching specification
        $message = sprintf(
            "Hello %s,

Your consultation booking has been successfully confirmed!

*Consultation:* %s
*Date:* %s
*Time:* %s (Sri Lanka Time, UTC+5:30)
*Duration:* 45 minutes
*Consultant:* %s

*Join your Microsoft Teams meeting:*
%s

Thank you for booking with Universal Secretaries!",
            $client_name,
            $service_type,
            $date,
            $time_slot,
            $consultant_name,
            $teams_url
        );

        return self::send_text_message( $client_phone, $message );
    }

    /**
     * Send Consultant WhatsApp Booking Alert
     *
     * @param array $booking
     * @return array|WP_Error
     */
    public static function send_consultant_alert( $booking ) {
        $cfg = self::get_settings();
        if ( ! $cfg['enabled'] || empty( $cfg['consultant_phone'] ) ) {
            return array( 'success' => false, 'status' => 'Disabled' );
        }

        $consultant_phone = $cfg['consultant_phone'];
        $client_name      = $booking['client_name'];
        $client_phone     = $booking['client_phone'];
        $client_email     = $booking['client_email'];
        $client_notes     = $booking['client_notes'] ?: 'None';
        $service_type     = $booking['service_type'];
        $date             = $booking['date_formatted'] ?: $booking['date'];
        $time_slot        = $booking['time_slot'];
        $teams_url        = $booking['teams_url'];
        $ref_id           = $booking['ref_id'];

        $message = sprintf(
            "🇱🇰 *NEW CONSULTATION BOOKING ALERT*
━━━━━━━━━━━━━━━━━━━━━━
👤 *Client:* %s
📱 *Phone/WhatsApp:* %s
✉️ *Email:* %s
💼 *Type:* %s
📅 *Date:* %s
⏰ *Slot:* %s (Sri Lanka Time)
📝 *Client Notes:* %s

━━━━━━━━━━━━━━━━━━━━━━
💼 *MICROSOFT TEAMS MEETING SCHEDULED*
🆔 *Booking Ref:* %s
🔗 *Join Meeting:*
%s

Verified and added to your Microsoft 365 Outlook Calendar.",
            $client_name,
            $client_phone,
            $client_email,
            $service_type,
            $date,
            $time_slot,
            $client_notes,
            $ref_id,
            $teams_url
        );

        return self::send_text_message( $consultant_phone, $message );
    }

    /**
     * Send Cancellation WhatsApp Notification
     *
     * @param array  $booking
     * @param string $reason
     */
    public static function send_cancellation_notifications( $booking, $reason = 'Cancelled by administrator' ) {
        $cfg = self::get_settings();
        if ( ! $cfg['enabled'] ) {
            return;
        }

        $client_phone = $booking['client_phone'];
        $client_name  = $booking['client_name'];
        $date         = $booking['date_formatted'] ?: $booking['date'];
        $time_slot    = $booking['time_slot'];

        $msg = sprintf(
            "Hello %s,

Your scheduled consultation with Universal Secretaries for %s at %s has been cancelled.
*Reason:* %s

If you would like to reschedule, please visit our website to book a new appointment slot.

Universal Secretaries",
            $client_name,
            $date,
            $time_slot,
            $reason
        );

        self::send_text_message( $client_phone, $msg );

        if ( ! empty( $cfg['consultant_phone'] ) ) {
            $alert = sprintf(
                "⚠️ *CONSULTATION CANCELLED*\nClient: %s (%s)\nScheduled: %s @ %s\nBooking Ref: %s\nReason: %s",
                $client_name,
                $client_phone,
                $date,
                $time_slot,
                $booking['ref_id'],
                $reason
            );
            self::send_text_message( $cfg['consultant_phone'], $alert );
        }
    }

    /**
     * Send Rescheduled WhatsApp Notification
     *
     * @param array  $booking
     * @param string $new_date
     * @param string $new_slot
     */
    public static function send_reschedule_notifications( $booking, $new_date, $new_slot ) {
        $cfg = self::get_settings();
        if ( ! $cfg['enabled'] ) {
            return;
        }

        $client_phone    = $booking['client_phone'];
        $client_name     = $booking['client_name'];
        $consultant_name = $cfg['consultant_name'];
        $teams_url       = $booking['teams_url'];

        $msg = sprintf(
            "Hello %s,

Your consultation with Universal Secretaries has been RESCHEDULED.

*Consultation:* %s
*New Date:* %s
*New Time:* %s (Sri Lanka Time)
*Consultant:* %s

*Join Microsoft Teams Meeting:*
%s

Thank you!",
            $client_name,
            $booking['service_type'],
            $new_date,
            $new_slot,
            $consultant_name,
            $teams_url
        );

        self::send_text_message( $client_phone, $msg );

        if ( ! empty( $cfg['consultant_phone'] ) ) {
            $alert = sprintf(
                "🔄 *CONSULTATION RESCHEDULED*\nClient: %s (%s)\nNew Date & Time: %s @ %s\nRef: %s\nTeams: %s",
                $client_name,
                $client_phone,
                $new_date,
                $new_slot,
                $booking['ref_id'],
                $teams_url
            );
            self::send_text_message( $cfg['consultant_phone'], $alert );
        }
    }
}

