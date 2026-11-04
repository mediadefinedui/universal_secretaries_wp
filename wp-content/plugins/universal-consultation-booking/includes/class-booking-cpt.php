<?php
/**
 * Custom Post Type for Bookings
 *
 * @package Universal_Consultation_Booking
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

class UCB_Booking_CPT {

    public static function init() {
        add_action( 'init', array( __CLASS__, 'register_cpt' ) );
        add_filter( 'manage_us_booking_posts_columns', array( __CLASS__, 'set_columns' ) );
        add_action( 'manage_us_booking_posts_custom_column', array( __CLASS__, 'render_column' ), 10, 2 );
        add_action( 'add_meta_boxes', array( __CLASS__, 'add_meta_boxes' ) );
    }

    public static function register_cpt() {
        if ( post_type_exists( 'us_booking' ) ) {
            return;
        }

        $labels = array(
            'name'               => __( 'Consultation Bookings', 'universal-consultation-booking' ),
            'singular_name'      => __( 'Consultation Booking', 'universal-consultation-booking' ),
            'menu_name'          => __( 'Consultation Bookings', 'universal-consultation-booking' ),
            'name_admin_bar'     => __( 'Booking', 'universal-consultation-booking' ),
            'add_new'            => __( 'Add New Booking', 'universal-consultation-booking' ),
            'add_new_item'       => __( 'Add New Consultation Booking', 'universal-consultation-booking' ),
            'edit_item'          => __( 'Edit Consultation Booking', 'universal-consultation-booking' ),
            'view_item'          => __( 'View Booking', 'universal-consultation-booking' ),
            'all_items'          => __( 'All Bookings', 'universal-consultation-booking' ),
            'search_items'       => __( 'Search Bookings', 'universal-consultation-booking' ),
        );

        $args = array(
            'labels'             => $labels,
            'public'             => false,
            'publicly_queryable' => false,
            'show_ui'            => true,
            'show_in_menu'       => 'consultation-bookings', // Attached under our custom top-level admin menu
            'query_var'          => false,
            'capability_type'    => 'post',
            'has_archive'        => false,
            'hierarchical'       => false,
            'supports'           => array( 'title' ),
        );

        register_post_type( 'us_booking', $args );
    }

    public static function set_columns( $columns ) {
        return array(
            'cb'          => '<input type="checkbox" />',
            'ref_id'      => __( 'Booking ID', 'universal-consultation-booking' ),
            'customer'    => __( 'Customer Name', 'universal-consultation-booking' ),
            'contact'     => __( 'Email / WhatsApp', 'universal-consultation-booking' ),
            'service'     => __( 'Consultation Type', 'universal-consultation-booking' ),
            'slot'        => __( 'Date & Time (SL Time)', 'universal-consultation-booking' ),
            'teams'       => __( 'Microsoft Teams', 'universal-consultation-booking' ),
            'whatsapp'    => __( 'WhatsApp Status', 'universal-consultation-booking' ),
            'status'      => __( 'Status', 'universal-consultation-booking' ),
            'date'        => __( 'Booked On', 'universal-consultation-booking' ),
        );
    }

    public static function render_column( $column, $post_id ) {
        switch ( $column ) {
            case 'ref_id':
                $ref = get_post_meta( $post_id, '_us_ref_id', true );
                echo '<strong>' . esc_html( $ref ?: get_the_title( $post_id ) ) . '</strong>';
                break;
            case 'customer':
                echo esc_html( get_post_meta( $post_id, '_us_client_name', true ) );
                break;
            case 'contact':
                $phone = get_post_meta( $post_id, '_us_client_phone', true );
                $email = get_post_meta( $post_id, '_us_client_email', true );
                echo '<a href="tel:' . esc_attr( $phone ) . '">' . esc_html( $phone ) . '</a><br>';
                echo '<a href="mailto:' . esc_attr( $email ) . '">' . esc_html( $email ) . '</a>';
                break;
            case 'service':
                echo '<span class="badge" style="background:#e0f2fe; color:#0369a1; padding:3px 8px; border-radius:4px; font-weight:600;">' . esc_html( get_post_meta( $post_id, '_us_service', true ) ) . '</span>';
                break;
            case 'slot':
                $date = get_post_meta( $post_id, '_us_date_formatted', true ) ?: get_post_meta( $post_id, '_us_date', true );
                $slot = get_post_meta( $post_id, '_us_time_slot', true );
                echo '<strong>' . esc_html( $date ) . '</strong><br>' . esc_html( $slot );
                break;
            case 'teams':
                $teams_url = get_post_meta( $post_id, '_us_teams_url', true );
                $event_id  = get_post_meta( $post_id, '_us_outlook_event_id', true );
                if ( ! empty( $teams_url ) ) {
                    echo '<a href="' . esc_url( $teams_url ) . '" target="_blank" class="button button-small" style="background:#464eb8; color:#fff; border-color:#464eb8;"><span class="dashicons dashicons-video-alt3" style="font-size:14px; margin-top:2px;"></span> Join Teams</a>';
                    if ( $event_id && strpos( $event_id, 'sim_' ) !== 0 ) {
                        echo '<div style="font-size:11px; color:#16a34a; margin-top:2px;">Outlook Synced</div>';
                    }
                } else {
                    echo '<span style="color:#94a3b8;">—</span>';
                }
                break;
            case 'whatsapp':
                $wa_status = get_post_meta( $post_id, '_us_whatsapp_status', true ) ?: 'Not Sent';
                $badge_bg  = '#f1f5f9';
                $badge_col = '#475569';
                if ( $wa_status === 'Sent' ) {
                    $badge_bg  = '#dcfce7';
                    $badge_col = '#15803d';
                } elseif ( $wa_status === 'Failed' ) {
                    $badge_bg  = '#fee2e2';
                    $badge_col = '#b91c1c';
                } elseif ( $wa_status === 'Disabled' ) {
                    $badge_bg  = '#f3f4f6';
                    $badge_col = '#9ca3af';
                }
                echo '<span style="background:' . esc_attr( $badge_bg ) . '; color:' . esc_attr( $badge_col ) . '; padding:3px 8px; border-radius:12px; font-size:11px; font-weight:600;">' . esc_html( $wa_status ) . '</span>';
                break;
            case 'status':
                $status = get_post_meta( $post_id, '_us_status', true ) ?: 'Confirmed';
                $color  = '#0284c7';
                if ( $status === 'Cancelled' ) {
                    $color = '#ef4444';
                } elseif ( $status === 'Rescheduled' ) {
                    $color = '#f59e0b';
                } elseif ( $status === 'Completed' ) {
                    $color = '#10b981';
                }
                echo '<span style="background:' . esc_attr( $color ) . '; color:#fff; padding:3px 8px; border-radius:4px; font-size:11px; font-weight:600;">' . esc_html( $status ) . '</span>';
                break;
        }
    }

    public static function add_meta_boxes() {
        add_meta_box(
            'ucb_booking_details',
            __( 'Consultation Booking Full Details', 'universal-consultation-booking' ),
            array( __CLASS__, 'render_details_meta_box' ),
            'us_booking',
            'normal',
            'high'
        );
    }

    public static function render_details_meta_box( $post ) {
        $meta = array(
            'Booking Reference'    => get_post_meta( $post->ID, '_us_ref_id', true ),
            'Consultation Type'    => get_post_meta( $post->ID, '_us_service', true ),
            'Appointment Date'     => get_post_meta( $post->ID, '_us_date', true ),
            'Formatted Date'       => get_post_meta( $post->ID, '_us_date_formatted', true ),
            'Time Slot'            => get_post_meta( $post->ID, '_us_time_slot', true ),
            'Client Name'          => get_post_meta( $post->ID, '_us_client_name', true ),
            'Client Phone'         => get_post_meta( $post->ID, '_us_client_phone', true ),
            'Client Email'         => get_post_meta( $post->ID, '_us_client_email', true ),
            'Client Notes'         => get_post_meta( $post->ID, '_us_client_notes', true ),
            'Teams Meeting Link'   => get_post_meta( $post->ID, '_us_teams_url', true ),
            'Outlook Event ID'     => get_post_meta( $post->ID, '_us_outlook_event_id', true ),
            'Booking Status'       => get_post_meta( $post->ID, '_us_status', true ) ?: 'Confirmed',
            'Customer WhatsApp'    => get_post_meta( $post->ID, '_us_whatsapp_status', true ) ?: 'Pending',
            'Consultant WhatsApp'  => get_post_meta( $post->ID, '_us_whatsapp_consultant_status', true ) ?: 'Pending',
            'Integration Errors'   => get_post_meta( $post->ID, '_us_integration_error', true ),
        );
        ?>
        <table class="widefat striped" style="margin-top:10px;">
            <tbody>
                <?php foreach ( $meta as $label => $val ) : ?>
                    <tr>
                        <th style="width: 220px; font-weight:600;"><?php echo esc_html( $label ); ?></th>
                        <td>
                            <?php
                            if ( $label === 'Teams Meeting Link' && ! empty( $val ) ) {
                                echo '<a href="' . esc_url( $val ) . '" target="_blank" class="button button-primary"><span class="dashicons dashicons-video-alt3" style="margin-top:4px;"></span> ' . esc_html__( 'Open Microsoft Teams Meeting', 'universal-consultation-booking' ) . '</a> ';
                                echo '<input type="text" readonly style="width:50%;" value="' . esc_attr( $val ) . '" onclick="this.select();">';
                            } elseif ( $label === 'Client Notes' ) {
                                echo nl2br( esc_html( $val ?: '—' ) );
                            } elseif ( $label === 'Integration Errors' && ! empty( $val ) ) {
                                echo '<span style="color:#b91c1c; font-weight:600;">' . esc_html( $val ) . '</span>';
                            } else {
                                echo esc_html( $val ?: '—' );
                            }
                            ?>
                        </td>
                    </tr>
                <?php endforeach; ?>
            </tbody>
        </table>
        <?php
    }
}

