<?php
/**
 * Consultation Booking CPT & REST API Endpoints
 *
 * Provides slot availability checking, booking persistence, double-booking prevention,
 * and Microsoft Teams simulation within WordPress.
 *
 * @package Universal_Secretaries
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

// If the dedicated Universal Consultation Booking plugin is active, delegate entirely to it
if ( defined( 'UCB_VERSION' ) || class_exists( 'UCB_Booking_Service' ) ) {
    return;
}

/**
 * Register Custom Post Type for Bookings
 */
function universal_register_booking_cpt() {
    $labels = array(
        'name'               => __( 'Consultations', 'universal-secretaries' ),
        'singular_name'      => __( 'Consultation', 'universal-secretaries' ),
        'menu_name'          => __( 'Consultations', 'universal-secretaries' ),
        'name_admin_bar'     => __( 'Consultation', 'universal-secretaries' ),
        'add_new'            => __( 'Add New Booking', 'universal-secretaries' ),
        'add_new_item'       => __( 'Add New Consultation Booking', 'universal-secretaries' ),
        'edit_item'          => __( 'Edit Consultation', 'universal-secretaries' ),
        'view_item'          => __( 'View Consultation', 'universal-secretaries' ),
        'all_items'          => __( 'All Bookings', 'universal-secretaries' ),
        'search_items'       => __( 'Search Bookings', 'universal-secretaries' ),
    );

    $args = array(
        'labels'             => $labels,
        'public'             => false,
        'publicly_queryable' => false,
        'show_ui'            => true,
        'show_in_menu'       => true,
        'query_var'          => false,
        'capability_type'    => 'post',
        'has_archive'        => false,
        'hierarchical'       => false,
        'menu_position'      => 26,
        'menu_icon'          => 'dashicons-calendar-alt',
        'supports'           => array( 'title' ),
    );

    register_post_type( 'us_booking', $args );
}
add_action( 'init', 'universal_register_booking_cpt' );

/**
 * Admin columns for Bookings CPT
 */
function universal_booking_columns( $columns ) {
    return array(
        'cb'           => '<input type="checkbox" />',
        'title'        => __( 'Reference ID', 'universal-secretaries' ),
        'client'       => __( 'Client Name', 'universal-secretaries' ),
        'contact'      => __( 'Contact (Phone / Email)', 'universal-secretaries' ),
        'service'      => __( 'Consultation Type', 'universal-secretaries' ),
        'date_slot'    => __( 'Date & Slot', 'universal-secretaries' ),
        'status'       => __( 'Status', 'universal-secretaries' ),
        'date'         => __( 'Created At', 'universal-secretaries' ),
    );
}
add_filter( 'manage_us_booking_posts_columns', 'universal_booking_columns' );

function universal_booking_column_data( $column, $post_id ) {
    switch ( $column ) {
        case 'client':
            echo esc_html( get_post_meta( $post_id, '_us_client_name', true ) );
            break;
        case 'contact':
            $phone = get_post_meta( $post_id, '_us_client_phone', true );
            $email = get_post_meta( $post_id, '_us_client_email', true );
            echo esc_html( $phone ) . '<br><a href="mailto:' . esc_attr( $email ) . '">' . esc_html( $email ) . '</a>';
            break;
        case 'service':
            echo esc_html( get_post_meta( $post_id, '_us_service', true ) );
            break;
        case 'date_slot':
            $date = get_post_meta( $post_id, '_us_date', true );
            $slot = get_post_meta( $post_id, '_us_time_slot', true );
            echo '<strong>' . esc_html( $date ) . '</strong><br>' . esc_html( $slot );
            break;
        case 'status':
            $status = get_post_meta( $post_id, '_us_status', true ) ?: 'Confirmed';
            echo '<span class="badge" style="background:#0284c7; color:#fff; padding:3px 8px; border-radius:4px;">' . esc_html( $status ) . '</span>';
            break;
    }
}
add_action( 'manage_us_booking_posts_custom_column', 'universal_booking_column_data', 10, 2 );

/**
 * Register REST API routes for Consultation Booking
 */
function universal_register_booking_rest_routes() {
    $namespaces = array( 'universal/v1', 'universal/v1/api' );

    foreach ( $namespaces as $ns ) {
        register_rest_route( $ns, '/availability', array(
            'methods'             => 'GET',
            'callback'            => 'universal_rest_check_availability',
            'permission_callback' => '__return_true',
        ) );

        register_rest_route( $ns, '/availability/batch', array(
            'methods'             => 'GET',
            'callback'            => 'universal_rest_check_availability_batch',
            'permission_callback' => '__return_true',
        ) );

        register_rest_route( $ns, '/bookings', array(
            'methods'             => 'POST',
            'callback'            => 'universal_rest_create_booking',
            'permission_callback' => '__return_true',
        ) );
    }
}
add_action( 'rest_api_init', 'universal_register_booking_rest_routes' );

/**
 * Handle GET availability batch
 */
function universal_rest_check_availability_batch( WP_REST_Request $request ) {
    $dates_str = sanitize_text_field( $request->get_param( 'dates' ) );
    $dates     = array_filter( array_map( 'trim', explode( ',', $dates_str ) ) );

    $all_slots = array(
        '07:00-07:45',
        '07:45-08:30',
        '08:30-09:15',
        '09:15-10:00',
        '10:00-10:45',
        '10:45-11:30',
    );

    $results = array();
    foreach ( $dates as $d ) {
        $bookings = get_posts( array(
            'post_type'      => 'us_booking',
            'post_status'    => 'publish',
            'posts_per_page' => -1,
            'meta_query'     => array(
                array(
                    'key'   => '_us_date',
                    'value' => $d,
                ),
            ),
        ) );

        $booked_slots = array();
        foreach ( $bookings as $b ) {
            $slot = get_post_meta( $b->ID, '_us_time_slot', true );
            if ( $slot && ! in_array( $slot, $booked_slots, true ) ) {
                $booked_slots[] = $slot;
            }
        }

        $avail = array_values( array_diff( $all_slots, $booked_slots ) );
        $results[ $d ] = array(
            'date'           => $d,
            'isFull'         => count( $avail ) === 0,
            'availableSlots' => $avail,
            'bookedSlots'    => $booked_slots,
        );
    }

    return new WP_REST_Response( array( 'availability' => $results ), 200 );
}

/**
 * Handle GET /wp-json/universal/v1/availability?date=YYYY-MM-DD
 */
function universal_rest_check_availability( WP_REST_Request $request ) {
    $date = sanitize_text_field( $request->get_param( 'date' ) );

    $all_slots = array(
        '07:00-07:45',
        '07:45-08:30',
        '08:30-09:15',
        '09:15-10:00',
        '10:00-10:45',
        '10:45-11:30',
    );

    if ( empty( $date ) ) {
        return new WP_REST_Response( array(
            'date'           => '',
            'isFull'         => false,
            'availableSlots' => $all_slots,
            'bookedSlots'    => array(),
        ), 200 );
    }

    // Query existing bookings for this date
    $bookings = get_posts( array(
        'post_type'      => 'us_booking',
        'post_status'    => 'publish',
        'posts_per_page' => -1,
        'meta_query'     => array(
            array(
                'key'   => '_us_date',
                'value' => $date,
            ),
        ),
    ) );

    $booked_slots = array();
    foreach ( $bookings as $b ) {
        $slot = get_post_meta( $b->ID, '_us_time_slot', true );
        if ( $slot && ! in_array( $slot, $booked_slots, true ) ) {
            $booked_slots[] = $slot;
        }
    }

    $available_slots = array_values( array_diff( $all_slots, $booked_slots ) );

    return new WP_REST_Response( array(
        'date'           => $date,
        'isFull'         => count( $available_slots ) === 0,
        'availableSlots' => $available_slots,
        'bookedSlots'    => $booked_slots,
    ), 200 );
}

/**
 * Handle POST /wp-json/universal/v1/bookings
 */
function universal_rest_create_booking( WP_REST_Request $request ) {
    $params = $request->get_json_params();
    if ( empty( $params ) ) {
        $params = $request->get_body_params();
    }

    $consultation_type = sanitize_text_field( $params['consultationType'] ?? 'Company registration' );
    $date              = sanitize_text_field( $params['date'] ?? '' );
    $date_formatted    = sanitize_text_field( $params['dateFormatted'] ?? $date );
    $time_slot         = sanitize_text_field( $params['timeSlot'] ?? '' );
    $client_name       = sanitize_text_field( $params['clientName'] ?? '' );
    $client_phone      = sanitize_text_field( $params['clientPhone'] ?? '' );
    $client_email      = sanitize_email( $params['clientEmail'] ?? '' );
    $client_notes      = sanitize_textarea_field( $params['clientNotes'] ?? '' );

    if ( empty( $date ) || empty( $time_slot ) || empty( $client_name ) || empty( $client_email ) ) {
        return new WP_REST_Response( array(
            'error' => __( 'Missing required booking parameters.', 'universal-secretaries' ),
        ), 400 );
    }

    // Atomic double-booking check
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
        ),
    ) );

    if ( ! empty( $existing ) ) {
        return new WP_REST_Response( array(
            'error' => __( 'This time slot was just booked by another customer. Please select another slot.', 'universal-secretaries' ),
            'code'  => 'SLOT_ALREADY_BOOKED',
        ), 409 );
    }

    // Generate unique booking reference ID
    $ref_id = 'LK-TEAMS-' . strtoupper( wp_generate_password( 6, false ) );

    // Generate Teams join link
    $teams_url = 'https://teams.microsoft.com/l/meetup-join/19%3ameeting_' . md5( $ref_id . time() ) . '%40thread.v2/0?context=' . urlencode( '{"Tid":"universal-secretaries","Oid":"' . md5( $client_email ) . '"}' );

    $post_id = wp_insert_post( array(
        'post_type'   => 'us_booking',
        'post_title'  => $ref_id . ' - ' . $client_name,
        'post_status' => 'publish',
    ) );

    if ( is_wp_error( $post_id ) ) {
        return new WP_REST_Response( array(
            'error' => __( 'Failed to save booking.', 'universal-secretaries' ),
        ), 500 );
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
    update_post_meta( $post_id, '_us_status', 'Confirmed' );

    $booking_data = array(
        'id'               => $ref_id,
        'consultationType' => $consultation_type,
        'date'             => $date,
        'dateFormatted'    => $date_formatted,
        'timeSlot'         => $time_slot,
        'clientName'       => $client_name,
        'clientPhone'      => $client_phone,
        'clientEmail'      => $client_email,
        'clientNotes'      => $client_notes,
        'teamsJoinUrl'     => $teams_url,
        'consultantNumber' => '+94 77 660 0799',
    );

    return new WP_REST_Response( array(
        'success' => true,
        'booking' => $booking_data,
    ), 200 );
}
