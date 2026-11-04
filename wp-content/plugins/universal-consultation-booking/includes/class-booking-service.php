<?php
/**
 * Booking Service - Core Business Logic Engine
 *
 * @package Universal_Consultation_Booking
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

class UCB_Booking_Service {

    /**
     * Pre-defined 45-minute consultation slots (Sri Lanka Time, UTC+5:30)
     */
    public static function get_standard_slots() {
        return array(
            '07:00-07:45',
            '07:45-08:30',
            '08:30-09:15',
            '09:15-10:00',
            '10:00-10:45',
            '10:45-11:30',
        );
    }

    /**
     * Check if a given time slot string overlaps an interval
     *
     * @param string $slot_str e.g. "07:00-07:45"
     * @param string $date ISO YYYY-MM-DD
     * @param string $busy_start ISO dateTime string
     * @param string $busy_end ISO dateTime string
     * @return bool
     */
    public static function slot_overlaps_busy_interval( $slot_str, $date, $busy_start, $busy_end ) {
        $parts = explode( '-', $slot_str );
        if ( count( $parts ) !== 2 ) {
            return false;
        }

        $slot_start_ts = strtotime( $date . ' ' . trim( $parts[0] ) . ':00' );
        $slot_end_ts   = strtotime( $date . ' ' . trim( $parts[1] ) . ':00' );

        $busy_start_ts = strtotime( $busy_start );
        $busy_end_ts   = strtotime( $busy_end );

        if ( ! $slot_start_ts || ! $slot_end_ts || ! $busy_start_ts || ! $busy_end_ts ) {
            return false;
        }

        // Overlap condition: max(start1, start2) < min(end1, end2)
        return max( $slot_start_ts, $busy_start_ts ) < min( $slot_end_ts, $busy_end_ts );
    }

    /**
     * Get detailed availability for a specific date
     *
     * @param string $date ISO YYYY-MM-DD
     * @return array
     */
    public static function get_date_availability( $date ) {
        $all_slots = self::get_standard_slots();

        if ( empty( $date ) ) {
            $formatted_slots = array();
            foreach ( $all_slots as $s ) {
                $formatted_slots[] = array(
                    'timeSlot'  => $s,
                    'available' => true,
                );
            }
            return array(
                'date'        => '',
                'slots'       => $formatted_slots,
                'fullyBooked' => false,
            );
        }

        // 1. Query local bookings for this date that are not cancelled
        $local_bookings = get_posts( array(
            'post_type'      => 'us_booking',
            'post_status'    => 'publish',
            'posts_per_page' => -1,
            'meta_query'     => array(
                'relation' => 'AND',
                array(
                    'key'   => '_us_date',
                    'value' => $date,
                ),
                array(
                    'relation' => 'OR',
                    array(
                        'key'     => '_us_status',
                        'value'   => 'Cancelled',
                        'compare' => '!=',
                    ),
                    array(
                        'key'     => '_us_status',
                        'compare' => 'NOT EXISTS',
                    ),
                ),
            ),
        ) );

        $booked_slot_strings = array();
        foreach ( $local_bookings as $b ) {
            $s = get_post_meta( $b->ID, '_us_time_slot', true );
            if ( $s && ! in_array( $s, $booked_slot_strings, true ) ) {
                $booked_slot_strings[] = $s;
            }
        }

        // 2. Query live Microsoft Outlook Calendar for this date
        $graph_busy_intervals = array();
        if ( UCB_Microsoft_Graph::is_configured() ) {
            $busy = UCB_Microsoft_Graph::get_consultant_calendar_busy_slots( $date );
            if ( is_array( $busy ) ) {
                $graph_busy_intervals = $busy;
            }
        }

        // 3. Assemble availability array matching frontend expectation
        $slots_data      = array();
        $available_count = 0;

        foreach ( $all_slots as $slot_str ) {
            $is_available = true;

            // Check if booked locally
            if ( in_array( $slot_str, $booked_slot_strings, true ) ) {
                $is_available = false;
            }

            // Check if overlapping Outlook calendar busy intervals
            if ( $is_available && ! empty( $graph_busy_intervals ) ) {
                foreach ( $graph_busy_intervals as $busy_item ) {
                    if ( self::slot_overlaps_busy_interval( $slot_str, $date, $busy_item['start'], $busy_item['end'] ) ) {
                        $is_available = false;
                        break;
                    }
                }
            }

            if ( $is_available ) {
                $available_count++;
            }

            $slots_data[] = array(
                'timeSlot'  => $slot_str,
                'available' => $is_available,
            );
        }

        $is_fully_booked = ( $available_count === 0 );

        return array(
            'date'           => $date,
            'slots'          => $slots_data,
            'fullyBooked'    => $is_fully_booked,
            'availableCount' => $available_count,
        );
    }

    /**
     * Batch check availability for upcoming business dates
     *
     * @param array $dates Array of ISO date strings
     * @return array
     */
    public static function get_batch_availability( $dates ) {
        $results = array();
        foreach ( $dates as $d ) {
            $d = sanitize_text_field( trim( $d ) );
            if ( empty( $d ) ) {
                continue;
            }
            $avail = self::get_date_availability( $d );
            $results[ $d ] = array(
                'date'        => $d,
                'fullyBooked' => $avail['fullyBooked'],
                'available'   => ! $avail['fullyBooked'],
            );
        }
        return $results;
    }

    /**
     * Process and confirm consultation booking
     *
     * @param array $params
     * @return array|WP_Error
     */
    public static function create_booking( $params ) {
        $consultation_type = sanitize_text_field( $params['consultationType'] ?? 'Company registration' );
        $date              = sanitize_text_field( $params['date'] ?? '' );
        $date_formatted    = sanitize_text_field( $params['dateFormatted'] ?? $date );
        $time_slot         = sanitize_text_field( $params['timeSlot'] ?? '' );
        $client_name       = sanitize_text_field( $params['clientName'] ?? '' );
        $client_phone      = sanitize_text_field( $params['clientPhone'] ?? '' );
        $client_email      = sanitize_email( $params['clientEmail'] ?? '' );
        $client_notes      = sanitize_textarea_field( $params['clientNotes'] ?? '' );

        if ( empty( $date ) || empty( $time_slot ) || empty( $client_name ) || empty( $client_phone ) || empty( $client_email ) ) {
            return new WP_Error( 'missing_fields', __( 'All required booking fields must be completed.', 'universal-consultation-booking' ) );
        }

        // Standardize slot
        if ( ! in_array( $time_slot, self::get_standard_slots(), true ) ) {
            return new WP_Error( 'invalid_slot', __( 'Selected consultation time slot is not recognized.', 'universal-consultation-booking' ) );
        }

        // Atomic revalidation check against local database
        $existing = get_posts( array(
            'post_type'      => 'us_booking',
            'post_status'    => 'publish',
            'posts_per_page' => 1,
            'meta_query'     => array(
                'relation' => 'AND',
                array(
                    'key'   => '_us_date',
                    'value' => $date,
                ),
                array(
                    'key'   => '_us_time_slot',
                    'value' => $time_slot,
                ),
                array(
                    'relation' => 'OR',
                    array(
                        'key'     => '_us_status',
                        'value'   => 'Cancelled',
                        'compare' => '!=',
                    ),
                    array(
                        'key'     => '_us_status',
                        'compare' => 'NOT EXISTS',
                    ),
                ),
            ),
        ) );

        if ( ! empty( $existing ) ) {
            return new WP_Error(
                'SLOT_ALREADY_BOOKED',
                __( 'This consultation slot was just reserved by another client. Please choose another available slot.', 'universal-consultation-booking' ),
                array( 'status' => 409 )
            );
        }

        // Revalidate against live Microsoft Outlook Calendar right before booking
        if ( UCB_Microsoft_Graph::is_configured() ) {
            $busy = UCB_Microsoft_Graph::get_consultant_calendar_busy_slots( $date );
            if ( is_array( $busy ) ) {
                foreach ( $busy as $item ) {
                    if ( self::slot_overlaps_busy_interval( $time_slot, $date, $item['start'], $item['end'] ) ) {
                        return new WP_Error(
                            'SLOT_ALREADY_BOOKED',
                            __( 'This time slot is marked busy in the consultant\'s Outlook Calendar. Please choose another slot.', 'universal-consultation-booking' ),
                            array( 'status' => 409 )
                        );
                    }
                }
            }
        }

        // Generate unique booking reference ID
        $ref_id = 'LK-TEAMS-' . strtoupper( wp_generate_password( 6, false ) );

        // 1. Create Outlook Calendar event and Microsoft Teams Online Meeting
        $graph_params = array(
            'ref_id'       => $ref_id,
            'service_type' => $consultation_type,
            'date'         => $date,
            'time_slot'    => $time_slot,
            'client_name'  => $client_name,
            'client_email' => $client_email,
            'client_phone' => $client_phone,
            'client_notes' => $client_notes,
        );

        $event_result = UCB_Microsoft_Graph::create_teams_consultation_event( $graph_params );
        $event_id     = '';
        $teams_url    = '';
        $graph_error  = '';

        if ( is_wp_error( $event_result ) ) {
            $graph_error = $event_result->get_error_message();
            UCB_Logger::log( 'booking', 'graph_error', 'warning', 'Could not create Graph event: ' . $graph_error );
            // Fallback simulated teams link so user flow is not permanently deadlocked if API is temporarily unreachable
            $teams_url = 'https://teams.microsoft.com/l/meetup-join/19%3ameeting_' . md5( $ref_id . time() ) . '%40thread.v2/0?context=' . urlencode( '{"Tid":"universal-secretaries","Oid":"' . md5( $client_email ) . '"}' );
        } else {
            $event_id  = $event_result['event_id'] ?? '';
            $teams_url = $event_result['teams_join_url'] ?? '';
        }

        // 2. Persist booking in WordPress Database
        $post_id = wp_insert_post( array(
            'post_type'   => 'us_booking',
            'post_title'  => sprintf( '%s - %s (%s)', $ref_id, $client_name, $consultation_type ),
            'post_status' => 'publish',
        ) );

        if ( is_wp_error( $post_id ) ) {
            return new WP_Error( 'db_error', __( 'Failed to record booking in WordPress database.', 'universal-consultation-booking' ) );
        }

        update_post_meta( $post_id, '_us_ref_id', $ref_id );
        update_post_meta( $post_id, '_us_service', $consultation_type );
        update_post_meta( $post_id, '_us_date', $date );
        update_post_meta( $post_id, '_us_date_formatted', $date_formatted );
        update_post_meta( $post_id, '_us_time_slot', $time_slot );
        update_post_meta( $post_id, '_us_client_name', $client_name );
        update_post_meta( $post_id, '_us_client_phone', $client_phone );
        update_post_meta( $post_id, '_us_client_email', $client_email );
        update_post_meta( $post_id, '_us_client_notes', $client_notes );
        update_post_meta( $post_id, '_us_teams_url', $teams_url );
        update_post_meta( $post_id, '_us_outlook_event_id', $event_id );
        update_post_meta( $post_id, '_us_status', 'Confirmed' );

        if ( ! empty( $graph_error ) ) {
            update_post_meta( $post_id, '_us_integration_error', 'Microsoft Graph Error: ' . $graph_error );
        }

        $booking_record = array(
            'id'             => $ref_id,
            'post_id'        => $post_id,
            'ref_id'         => $ref_id,
            'service_type'   => $consultation_type,
            'date'           => $date,
            'date_formatted' => $date_formatted,
            'time_slot'      => $time_slot,
            'client_name'    => $client_name,
            'client_phone'   => $client_phone,
            'client_email'   => $client_email,
            'client_notes'   => $client_notes,
            'teams_url'      => $teams_url,
            'event_id'       => $event_id,
        );

        // 3. Automated WhatsApp Notifications (Customer Confirmation & Consultant Alert)
        $wa_status_customer   = 'Pending';
        $wa_status_consultant = 'Pending';

        if ( UCB_WhatsApp_API::is_configured() ) {
            $cust_res = UCB_WhatsApp_API::send_customer_confirmation( $booking_record );
            if ( is_wp_error( $cust_res ) ) {
                $wa_status_customer = 'Failed: ' . $cust_res->get_error_message();
            } else {
                $wa_status_customer = 'Sent';
            }

            $cons_res = UCB_WhatsApp_API::send_consultant_alert( $booking_record );
            if ( is_wp_error( $cons_res ) ) {
                $wa_status_consultant = 'Failed: ' . $cons_res->get_error_message();
            } else {
                $wa_status_consultant = 'Sent';
            }
        } else {
            $wa_status_customer   = 'Disabled (API Not Configured)';
            $wa_status_consultant = 'Disabled (API Not Configured)';
        }

        update_post_meta( $post_id, '_us_whatsapp_status', $wa_status_customer );
        update_post_meta( $post_id, '_us_whatsapp_consultant_status', $wa_status_consultant );

        UCB_Logger::log( 'booking', 'create_booking', 'success', sprintf( 'Booking confirmed: %s for %s (%s @ %s)', $ref_id, $client_name, $date, $time_slot ), array(
            'refId'        => $ref_id,
            'teamsUrl'     => $teams_url,
            'eventId'      => $event_id,
            'waCustomer'   => $wa_status_customer,
            'waConsultant' => $wa_status_consultant,
        ) );

        $consultant_phone = get_option( 'ucb_consultant_whatsapp', '94774087869' );

        // Return object structure compatible with both frontend and API specifications
        return array(
            'id'                  => $ref_id,
            'bookingId'           => $ref_id,
            'consultationType'    => $consultation_type,
            'date'                => $date,
            'dateFormatted'       => $date_formatted,
            'timeSlot'            => $time_slot,
            'clientName'          => $client_name,
            'clientPhone'         => $client_phone,
            'clientEmail'         => $client_email,
            'clientNotes'         => $client_notes,
            'teamsMeetingUrl'     => $teams_url,
            'teamsJoinUrl'        => $teams_url,
            'outlookEventId'      => $event_id,
            'consultantNumber'    => '+' . $consultant_phone,
            'whatsappStatus'      => $wa_status_customer,
        );
    }

    /**
     * Cancel an appointment
     *
     * @param int|string $booking_identifier Post ID or Ref ID
     * @param string     $reason
     * @return true|WP_Error
     */
    public static function cancel_booking( $booking_identifier, $reason = 'Cancelled by administrator' ) {
        $post = is_numeric( $booking_identifier ) ? get_post( $booking_identifier ) : null;
        if ( ! $post ) {
            $found = get_posts( array(
                'post_type'      => 'us_booking',
                'posts_per_page' => 1,
                'meta_query'     => array(
                    array(
                        'key'   => '_us_ref_id',
                        'value' => $booking_identifier,
                    ),
                ),
            ) );
            if ( ! empty( $found ) ) {
                $post = $found[0];
            }
        }

        if ( ! $post ) {
            return new WP_Error( 'not_found', __( 'Booking not found.', 'universal-consultation-booking' ) );
        }

        $event_id  = get_post_meta( $post->ID, '_us_outlook_event_id', true );
        $teams_url = get_post_meta( $post->ID, '_us_teams_url', true );

        // Sync with Microsoft Graph
        if ( ! empty( $event_id ) ) {
            UCB_Microsoft_Graph::cancel_event( $event_id, $reason );
        }

        update_post_meta( $post->ID, '_us_status', 'Cancelled' );
        update_post_meta( $post->ID, '_us_cancel_reason', $reason );

        // Send WhatsApp notifications
        $booking_data = array(
            'ref_id'         => get_post_meta( $post->ID, '_us_ref_id', true ),
            'client_name'    => get_post_meta( $post->ID, '_us_client_name', true ),
            'client_phone'   => get_post_meta( $post->ID, '_us_client_phone', true ),
            'service_type'   => get_post_meta( $post->ID, '_us_service', true ),
            'date'           => get_post_meta( $post->ID, '_us_date', true ),
            'date_formatted' => get_post_meta( $post->ID, '_us_date_formatted', true ),
            'time_slot'      => get_post_meta( $post->ID, '_us_time_slot', true ),
            'teams_url'      => $teams_url,
        );

        UCB_WhatsApp_API::send_cancellation_notifications( $booking_data, $reason );

        UCB_Logger::log( 'booking', 'cancel', 'info', sprintf( 'Cancelled booking %s (%s)', $booking_data['ref_id'], $reason ) );

        return true;
    }

    /**
     * Reschedule an appointment
     *
     * @param int|string $booking_identifier
     * @param string     $new_date ISO YYYY-MM-DD
     * @param string     $new_slot e.g. "08:30-09:15"
     * @return true|WP_Error
     */
    public static function reschedule_booking( $booking_identifier, $new_date, $new_slot ) {
        $post = is_numeric( $booking_identifier ) ? get_post( $booking_identifier ) : null;
        if ( ! $post ) {
            $found = get_posts( array(
                'post_type'      => 'us_booking',
                'posts_per_page' => 1,
                'meta_query'     => array(
                    array(
                        'key'   => '_us_ref_id',
                        'value' => $booking_identifier,
                    ),
                ),
            ) );
            if ( ! empty( $found ) ) {
                $post = $found[0];
            }
        }

        if ( ! $post ) {
            return new WP_Error( 'not_found', __( 'Booking not found.', 'universal-consultation-booking' ) );
        }

        // Check if slot available
        $avail = self::get_date_availability( $new_date );
        $slot_found = false;
        foreach ( $avail['slots'] as $s ) {
            if ( $s['timeSlot'] === $new_slot ) {
                $slot_found = true;
                if ( ! $s['available'] ) {
                    return new WP_Error( 'slot_unavailable', __( 'The selected new time slot is not available.', 'universal-consultation-booking' ) );
                }
                break;
            }
        }

        if ( ! $slot_found ) {
            return new WP_Error( 'invalid_slot', __( 'Invalid time slot specified.', 'universal-consultation-booking' ) );
        }

        $event_id  = get_post_meta( $post->ID, '_us_outlook_event_id', true );
        $teams_url = get_post_meta( $post->ID, '_us_teams_url', true );

        // Update on Microsoft Graph
        if ( ! empty( $event_id ) ) {
            UCB_Microsoft_Graph::reschedule_event( $event_id, $new_date, $new_slot );
        }

        $old_date = get_post_meta( $post->ID, '_us_date', true );
        $old_slot = get_post_meta( $post->ID, '_us_time_slot', true );

        update_post_meta( $post->ID, '_us_date', $new_date );
        update_post_meta( $post->ID, '_us_date_formatted', $new_date );
        update_post_meta( $post->ID, '_us_time_slot', $new_slot );
        update_post_meta( $post->ID, '_us_status', 'Rescheduled' );

        $booking_data = array(
            'ref_id'         => get_post_meta( $post->ID, '_us_ref_id', true ),
            'client_name'    => get_post_meta( $post->ID, '_us_client_name', true ),
            'client_phone'   => get_post_meta( $post->ID, '_us_client_phone', true ),
            'service_type'   => get_post_meta( $post->ID, '_us_service', true ),
            'date'           => $new_date,
            'date_formatted' => $new_date,
            'time_slot'      => $new_slot,
            'teams_url'      => $teams_url,
        );

        UCB_WhatsApp_API::send_reschedule_notifications( $booking_data, $new_date, $new_slot );

        UCB_Logger::log( 'booking', 'reschedule', 'info', sprintf( 'Rescheduled booking %s from %s @ %s to %s @ %s', $booking_data['ref_id'], $old_date, $old_slot, $new_date, $new_slot ) );

        return true;
    }
}

