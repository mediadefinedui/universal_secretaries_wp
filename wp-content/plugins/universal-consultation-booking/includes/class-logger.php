<?php
/**
 * Integration Logger for Consultation Booking
 *
 * @package Universal_Consultation_Booking
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

class UCB_Logger {

    const LOG_OPTION = 'ucb_integration_logs';
    const MAX_LOGS   = 200;

    /**
     * Log an event
     *
     * @param string $service  'graph', 'whatsapp', 'booking', 'admin'.
     * @param string $action   e.g. 'token_request', 'create_event', 'send_message'.
     * @param string $status   'success', 'error', 'info', 'warning'.
     * @param string $message  Human readable summary.
     * @param mixed  $context  Optional payload or response.
     */
    public static function log( $service, $action, $status, $message, $context = null ) {
        $logs = get_option( self::LOG_OPTION, array() );
        if ( ! is_array( $logs ) ) {
            $logs = array();
        }

        $entry = array(
            'id'        => uniqid( 'log_', true ),
            'time'      => current_time( 'mysql' ),
            'timestamp' => time(),
            'service'   => sanitize_key( $service ),
            'action'    => sanitize_text_field( $action ),
            'status'    => sanitize_key( $status ),
            'message'   => sanitize_text_field( $message ),
            'context'   => $context ? ( is_string( $context ) ? $context : wp_json_encode( $context ) ) : '',
        );

        array_unshift( $logs, $entry );

        if ( count( $logs ) > self::MAX_LOGS ) {
            $logs = array_slice( $logs, 0, self::MAX_LOGS );
        }

        update_option( self::LOG_OPTION, $logs, false );
    }

    /**
     * Get logs
     *
     * @param int    $limit   Max items.
     * @param string $service Optional filter by service.
     * @return array
     */
    public static function get_logs( $limit = 50, $service = '' ) {
        $logs = get_option( self::LOG_OPTION, array() );
        if ( ! is_array( $logs ) ) {
            return array();
        }

        if ( ! empty( $service ) ) {
            $logs = array_filter( $logs, function ( $item ) use ( $service ) {
                return isset( $item['service'] ) && $item['service'] === $service;
            } );
        }

        return array_slice( $logs, 0, $limit );
    }

    /**
     * Clear all logs
     */
    public static function clear_logs() {
        update_option( self::LOG_OPTION, array(), false );
    }
}

