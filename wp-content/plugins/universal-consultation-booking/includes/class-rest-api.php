<?php
/**
 * REST API Endpoints for Consultation Booking
 *
 * @package Universal_Consultation_Booking
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

class UCB_REST_API {

    public static function init() {
        add_action( 'rest_api_init', array( __CLASS__, 'register_routes' ) );
    }

    public static function register_routes() {
        $namespaces = array( 'universal/v1', 'universal/v1/api' );

        foreach ( $namespaces as $ns ) {
            $routes = array( '/availability', '/api/availability' );
            foreach ( $routes as $r ) {
                register_rest_route( $ns, $r, array(
                    'methods'             => 'GET',
                    'callback'            => array( __CLASS__, 'handle_get_availability' ),
                    'permission_callback' => '__return_true',
                ) );
            }

            $batch_routes = array( '/availability/batch', '/api/availability/batch' );
            foreach ( $batch_routes as $br ) {
                register_rest_route( $ns, $br, array(
                    'methods'             => 'GET',
                    'callback'            => array( __CLASS__, 'handle_get_batch_availability' ),
                    'permission_callback' => '__return_true',
                ) );
            }

            $booking_routes = array( '/bookings', '/api/bookings' );
            foreach ( $booking_routes as $bkr ) {
                register_rest_route( $ns, $bkr, array(
                    'methods'             => 'POST',
                    'callback'            => array( __CLASS__, 'handle_create_booking' ),
                    'permission_callback' => '__return_true',
                ) );
            }

            // Admin cancel booking
            register_rest_route( $ns, '/admin/cancel', array(
                'methods'             => 'POST',
                'callback'            => array( __CLASS__, 'handle_admin_cancel' ),
                'permission_callback' => array( __CLASS__, 'admin_permission_check' ),
            ) );

            // Admin reschedule booking
            register_rest_route( $ns, '/admin/reschedule', array(
                'methods'             => 'POST',
                'callback'            => array( __CLASS__, 'handle_admin_reschedule' ),
                'permission_callback' => array( __CLASS__, 'admin_permission_check' ),
            ) );

            // Admin test Graph
            register_rest_route( $ns, '/admin/test-graph', array(
                'methods'             => 'POST',
                'callback'            => array( __CLASS__, 'handle_test_graph' ),
                'permission_callback' => array( __CLASS__, 'admin_permission_check' ),
            ) );

            // Admin test WhatsApp
            register_rest_route( $ns, '/admin/test-whatsapp', array(
                'methods'             => 'POST',
                'callback'            => array( __CLASS__, 'handle_test_whatsapp' ),
                'permission_callback' => array( __CLASS__, 'admin_permission_check' ),
            ) );
        }
    }

    public static function admin_permission_check() {
        return current_user_can( 'manage_options' );
    }

    /**
     * GET /availability?date=YYYY-MM-DD
     */
    public static function handle_get_availability( WP_REST_Request $request ) {
        $date = sanitize_text_field( $request->get_param( 'date' ) );
        $data = UCB_Booking_Service::get_date_availability( $date );

        // Include legacy format fields for backward compatibility
        $available_slots = array();
        $booked_slots    = array();
        foreach ( $data['slots'] as $s ) {
            if ( $s['available'] ) {
                $available_slots[] = $s['timeSlot'];
            } else {
                $booked_slots[] = $s['timeSlot'];
            }
        }

        $data['availableSlots'] = $available_slots;
        $data['bookedSlots']    = $booked_slots;
        $data['isFull']         = $data['fullyBooked'];

        return new WP_REST_Response( $data, 200 );
    }

    /**
     * GET /availability/batch?dates=2026-11-06,2026-11-09...
     */
    public static function handle_get_batch_availability( WP_REST_Request $request ) {
        $dates_raw = sanitize_text_field( $request->get_param( 'dates' ) );
        $dates     = array_filter( array_map( 'trim', explode( ',', $dates_raw ) ) );

        $results = UCB_Booking_Service::get_batch_availability( $dates );

        return new WP_REST_Response( array( 'availability' => $results ), 200 );
    }

    /**
     * POST /bookings
     */
    public static function handle_create_booking( WP_REST_Request $request ) {
        $params = $request->get_json_params();
        if ( empty( $params ) ) {
            $params = $request->get_body_params();
        }

        $result = UCB_Booking_Service::create_booking( $params );

        if ( is_wp_error( $result ) ) {
            $status = $result->get_error_data()['status'] ?? 400;
            if ( $result->get_error_code() === 'SLOT_ALREADY_BOOKED' ) {
                $status = 409;
            }
            return new WP_REST_Response( array(
                'error' => $result->get_error_message(),
                'code'  => $result->get_error_code(),
            ), $status );
        }

        return new WP_REST_Response( array(
            'success' => true,
            'booking' => $result,
        ), 200 );
    }

    /**
     * POST /admin/cancel
     */
    public static function handle_admin_cancel( WP_REST_Request $request ) {
        $params     = $request->get_json_params() ?: $request->get_body_params();
        $booking_id = sanitize_text_field( $params['bookingId'] ?? '' );
        $reason     = sanitize_text_field( $params['reason'] ?? 'Cancelled by administrator' );

        if ( empty( $booking_id ) ) {
            return new WP_REST_Response( array( 'error' => 'Missing booking ID' ), 400 );
        }

        $res = UCB_Booking_Service::cancel_booking( $booking_id, $reason );
        if ( is_wp_error( $res ) ) {
            return new WP_REST_Response( array( 'error' => $res->get_error_message() ), 400 );
        }

        return new WP_REST_Response( array( 'success' => true, 'message' => 'Appointment cancelled successfully.' ), 200 );
    }

    /**
     * POST /admin/reschedule
     */
    public static function handle_admin_reschedule( WP_REST_Request $request ) {
        $params     = $request->get_json_params() ?: $request->get_body_params();
        $booking_id = sanitize_text_field( $params['bookingId'] ?? '' );
        $new_date   = sanitize_text_field( $params['newDate'] ?? '' );
        $new_slot   = sanitize_text_field( $params['newSlot'] ?? '' );

        if ( empty( $booking_id ) || empty( $new_date ) || empty( $new_slot ) ) {
            return new WP_REST_Response( array( 'error' => 'Missing required reschedule parameters' ), 400 );
        }

        $res = UCB_Booking_Service::reschedule_booking( $booking_id, $new_date, $new_slot );
        if ( is_wp_error( $res ) ) {
            return new WP_REST_Response( array( 'error' => $res->get_error_message() ), 400 );
        }

        return new WP_REST_Response( array( 'success' => true, 'message' => 'Appointment rescheduled successfully.' ), 200 );
    }

    /**
     * POST /admin/test-graph
     */
    public static function handle_test_graph() {
        $res = UCB_Microsoft_Graph::test_connection();
        return new WP_REST_Response( $res, 200 );
    }

    /**
     * POST /admin/test-whatsapp
     */
    public static function handle_test_whatsapp( WP_REST_Request $request ) {
        $params    = $request->get_json_params() ?: $request->get_body_params();
        $recipient = sanitize_text_field( $params['recipient'] ?? '' );

        $res = UCB_WhatsApp_API::test_connection( $recipient );
        return new WP_REST_Response( $res, 200 );
    }
}
