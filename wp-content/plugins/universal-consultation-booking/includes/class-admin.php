<?php
/**
 * Consultation Bookings - WordPress Admin Management & Settings
 *
 * @package Universal_Consultation_Booking
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

class UCB_Admin {

    public static function init() {
        add_action( 'admin_menu', array( __CLASS__, 'register_admin_menus' ) );
        add_action( 'admin_init', array( __CLASS__, 'save_settings' ) );
        add_action( 'admin_enqueue_scripts', array( __CLASS__, 'enqueue_admin_assets' ) );
    }

    public static function register_admin_menus() {
        // Main Menu
        add_menu_page(
            __( 'Consultation Bookings', 'universal-consultation-booking' ),
            __( 'Consultation Bookings', 'universal-consultation-booking' ),
            'manage_options',
            'consultation-bookings',
            array( __CLASS__, 'render_bookings_dashboard' ),
            'dashicons-calendar-alt',
            26
        );

        // Submenu: All Bookings
        add_submenu_page(
            'consultation-bookings',
            __( 'All Bookings', 'universal-consultation-booking' ),
            __( 'All Bookings', 'universal-consultation-booking' ),
            'manage_options',
            'consultation-bookings',
            array( __CLASS__, 'render_bookings_dashboard' )
        );

        // Submenu: Settings
        add_submenu_page(
            'consultation-bookings',
            __( 'Integration Settings', 'universal-consultation-booking' ),
            __( 'Settings & Credentials', 'universal-consultation-booking' ),
            'manage_options',
            'consultation-booking-settings',
            array( __CLASS__, 'render_settings_page' )
        );

        // Submenu: Logs
        add_submenu_page(
            'consultation-bookings',
            __( 'Integration Logs & Errors', 'universal-consultation-booking' ),
            __( 'Logs & Diagnostics', 'universal-consultation-booking' ),
            'manage_options',
            'consultation-booking-logs',
            array( __CLASS__, 'render_logs_page' )
        );
    }

    public static function enqueue_admin_assets( $hook ) {
        if ( strpos( $hook, 'consultation-booking' ) === false && strpos( $hook, 'us_booking' ) === false ) {
            return;
        }

        wp_enqueue_style( 'dashicons' );
    }

    public static function save_settings() {
        if ( ! isset( $_POST['ucb_save_settings_nonce'] ) || ! wp_verify_nonce( $_POST['ucb_save_settings_nonce'], 'ucb_save_settings' ) ) {
            return;
        }

        if ( ! current_user_can( 'manage_options' ) ) {
            return;
        }

        // Consultant details
        if ( isset( $_POST['ucb_consultant_name'] ) ) {
            update_option( 'ucb_consultant_name', sanitize_text_field( $_POST['ucb_consultant_name'] ) );
        }
        if ( isset( $_POST['ucb_consultant_email'] ) ) {
            update_option( 'ucb_consultant_email', sanitize_email( $_POST['ucb_consultant_email'] ) );
        }
        if ( isset( $_POST['ucb_consultant_whatsapp'] ) ) {
            update_option( 'ucb_consultant_whatsapp', sanitize_text_field( $_POST['ucb_consultant_whatsapp'] ) );
        }

        // Microsoft Graph
        if ( isset( $_POST['ucb_ms_tenant_id'] ) ) {
            update_option( 'ucb_ms_tenant_id', sanitize_text_field( $_POST['ucb_ms_tenant_id'] ) );
        }
        if ( isset( $_POST['ucb_ms_client_id'] ) ) {
            update_option( 'ucb_ms_client_id', sanitize_text_field( $_POST['ucb_ms_client_id'] ) );
        }
        if ( isset( $_POST['ucb_ms_client_secret'] ) ) {
            update_option( 'ucb_ms_client_secret', sanitize_text_field( $_POST['ucb_ms_client_secret'] ) );
        }
        if ( isset( $_POST['ucb_timezone'] ) ) {
            update_option( 'ucb_timezone', sanitize_text_field( $_POST['ucb_timezone'] ) );
        }

        // WhatsApp Cloud API
        $wa_enabled = isset( $_POST['ucb_wa_enabled'] ) ? 'yes' : 'no';
        update_option( 'ucb_wa_enabled', $wa_enabled );

        if ( isset( $_POST['ucb_wa_phone_number_id'] ) ) {
            update_option( 'ucb_wa_phone_number_id', sanitize_text_field( $_POST['ucb_wa_phone_number_id'] ) );
        }
        if ( isset( $_POST['ucb_wa_business_account_id'] ) ) {
            update_option( 'ucb_wa_business_account_id', sanitize_text_field( $_POST['ucb_wa_business_account_id'] ) );
        }
        if ( isset( $_POST['ucb_wa_access_token'] ) ) {
            update_option( 'ucb_wa_access_token', sanitize_textarea_field( $_POST['ucb_wa_access_token'] ) );
        }
        if ( isset( $_POST['ucb_wa_template_name'] ) ) {
            update_option( 'ucb_wa_template_name', sanitize_text_field( $_POST['ucb_wa_template_name'] ) );
        }
        if ( isset( $_POST['ucb_wa_template_lang'] ) ) {
            update_option( 'ucb_wa_template_lang', sanitize_text_field( $_POST['ucb_wa_template_lang'] ) );
        }

        add_settings_error( 'ucb_settings_messages', 'ucb_settings_saved', __( 'Settings saved successfully!', 'universal-consultation-booking' ), 'updated' );
    }

    /**
     * Screen 1: All Bookings Management Dashboard
     */
    public static function render_bookings_dashboard() {
        if ( ! current_user_can( 'manage_options' ) ) {
            wp_die( esc_html__( 'Unauthorized', 'universal-consultation-booking' ) );
        }

        $paged  = isset( $_GET['paged'] ) ? max( 1, intval( $_GET['paged'] ) ) : 1;
        $search = isset( $_GET['s'] ) ? sanitize_text_field( $_GET['s'] ) : '';
        $filter_status = isset( $_GET['status'] ) ? sanitize_text_field( $_GET['status'] ) : '';

        $query_args = array(
            'post_type'      => 'us_booking',
            'post_status'    => 'publish',
            'posts_per_page' => 20,
            'paged'          => $paged,
            'orderby'        => 'date',
            'order'          => 'DESC',
        );

        if ( ! empty( $search ) ) {
            $query_args['s'] = $search;
        }

        if ( ! empty( $filter_status ) ) {
            $query_args['meta_query'] = array(
                array(
                    'key'   => '_us_status',
                    'value' => $filter_status,
                ),
            );
        }

        $bookings_query = new WP_Query( $query_args );
        $consultant_name = get_option( 'ucb_consultant_name', 'Senior Tax & Corporate Advisor' );
        ?>
        <div class="wrap">
            <h1 class="wp-heading-inline">
                <span class="dashicons dashicons-calendar-alt" style="font-size:28px; line-height:1; margin-right:8px;"></span>
                <?php esc_html_e( 'Consultation Bookings', 'universal-consultation-booking' ); ?>
            </h1>
            <a href="<?php echo esc_url( admin_url( 'admin.php?page=consultation-booking-settings' ) ); ?>" class="page-title-action">
                <span class="dashicons dashicons-admin-generic" style="font-size:14px; margin-top:2px;"></span> <?php esc_html_e( 'Configure API & Consultant', 'universal-consultation-booking' ); ?>
            </a>
            <hr class="wp-header-end">

            <!-- Summary Bar -->
            <div style="display:flex; gap:15px; margin: 20px 0; flex-wrap:wrap;">
                <div style="background:#fff; border-left:4px solid #0284c7; padding:12px 20px; box-shadow:0 1px 3px rgba(0,0,0,0.05); border-radius:4px; flex:1; min-width:200px;">
                    <div style="font-size:12px; color:#64748b; text-transform:uppercase; font-weight:700;">Assigned Consultant</div>
                    <div style="font-size:16px; font-weight:700; color:#0f172a; margin-top:4px;"><?php echo esc_html( $consultant_name ); ?></div>
                    <div style="font-size:12px; color:#475569;"><?php echo esc_html( get_option( 'ucb_consultant_email', 'snisal@corporate.mediadefined.com' ) ); ?></div>
                </div>
                <div style="background:#fff; border-left:4px solid #464eb8; padding:12px 20px; box-shadow:0 1px 3px rgba(0,0,0,0.05); border-radius:4px; flex:1; min-width:200px;">
                    <div style="font-size:12px; color:#64748b; text-transform:uppercase; font-weight:700;">Microsoft Graph Status</div>
                    <div style="font-size:16px; font-weight:700; color:#0f172a; margin-top:4px;">
                        <?php echo UCB_Microsoft_Graph::is_configured() ? '<span style="color:#16a34a;">● Connected</span>' : '<span style="color:#eab308;">● Needs Setup</span>'; ?>
                    </div>
                    <div style="font-size:12px; color:#475569;">Outlook Calendar &amp; Teams Meetings</div>
                </div>
                <div style="background:#fff; border-left:4px solid #16a34a; padding:12px 20px; box-shadow:0 1px 3px rgba(0,0,0,0.05); border-radius:4px; flex:1; min-width:200px;">
                    <div style="font-size:12px; color:#64748b; text-transform:uppercase; font-weight:700;">WhatsApp Cloud API</div>
                    <div style="font-size:16px; font-weight:700; color:#0f172a; margin-top:4px;">
                        <?php echo UCB_WhatsApp_API::is_configured() ? '<span style="color:#16a34a;">● Active</span>' : '<span style="color:#eab308;">● Not Configured</span>'; ?>
                    </div>
                    <div style="font-size:12px; color:#475569;">Customer &amp; Consultant Alerts</div>
                </div>
                <div style="background:#fff; border-left:4px solid #0f172a; padding:12px 20px; box-shadow:0 1px 3px rgba(0,0,0,0.05); border-radius:4px; flex:1; min-width:160px;">
                    <div style="font-size:12px; color:#64748b; text-transform:uppercase; font-weight:700;">Total Bookings</div>
                    <div style="font-size:22px; font-weight:800; color:#0f172a; margin-top:2px;"><?php echo intval( $bookings_query->found_posts ); ?></div>
                </div>
            </div>

            <!-- Filters & Search -->
            <form method="get" action="" style="display:flex; justify-content:space-between; align-items:center; margin-bottom:15px; flex-wrap:wrap; gap:10px;">
                <input type="hidden" name="page" value="consultation-bookings">
                <div style="display:flex; gap:10px; align-items:center;">
                    <select name="status" onchange="this.form.submit()">
                        <option value=""><?php esc_html_e( 'All Statuses', 'universal-consultation-booking' ); ?></option>
                        <option value="Confirmed" <?php selected( $filter_status, 'Confirmed' ); ?>>Confirmed</option>
                        <option value="Rescheduled" <?php selected( $filter_status, 'Rescheduled' ); ?>>Rescheduled</option>
                        <option value="Cancelled" <?php selected( $filter_status, 'Cancelled' ); ?>>Cancelled</option>
                        <option value="Completed" <?php selected( $filter_status, 'Completed' ); ?>>Completed</option>
                    </select>
                </div>
                <div style="display:flex; gap:5px;">
                    <input type="search" name="s" value="<?php echo esc_attr( $search ); ?>" placeholder="<?php esc_attr_e( 'Search by Name, Ref ID...', 'universal-consultation-booking' ); ?>">
                    <input type="submit" class="button" value="<?php esc_attr_e( 'Search', 'universal-consultation-booking' ); ?>">
                </div>
            </form>

            <!-- Bookings Table -->
            <table class="wp-list-table widefat fixed striped posts" style="border-radius:6px; overflow:hidden;">
                <thead>
                    <tr>
                        <th style="width:130px;"><?php esc_html_e( 'Booking ID', 'universal-consultation-booking' ); ?></th>
                        <th style="width:160px;"><?php esc_html_e( 'Customer Name', 'universal-consultation-booking' ); ?></th>
                        <th style="width:180px;"><?php esc_html_e( 'Email / WhatsApp', 'universal-consultation-booking' ); ?></th>
                        <th style="width:150px;"><?php esc_html_e( 'Type', 'universal-consultation-booking' ); ?></th>
                        <th style="width:170px;"><?php esc_html_e( 'Date &amp; Time (SL)', 'universal-consultation-booking' ); ?></th>
                        <th style="width:150px;"><?php esc_html_e( 'Teams Meeting', 'universal-consultation-booking' ); ?></th>
                        <th style="width:120px;"><?php esc_html_e( 'WhatsApp', 'universal-consultation-booking' ); ?></th>
                        <th style="width:100px;"><?php esc_html_e( 'Status', 'universal-consultation-booking' ); ?></th>
                        <th style="width:140px; text-align:right;"><?php esc_html_e( 'Actions', 'universal-consultation-booking' ); ?></th>
                    </tr>
                </thead>
                <tbody>
                    <?php if ( $bookings_query->have_posts() ) : ?>
                        <?php while ( $bookings_query->have_posts() ) : $bookings_query->the_post();
                            $b_id       = get_the_ID();
                            $ref_id     = get_post_meta( $b_id, '_us_ref_id', true ) ?: get_the_title( $b_id );
                            $client     = get_post_meta( $b_id, '_us_client_name', true );
                            $phone      = get_post_meta( $b_id, '_us_client_phone', true );
                            $email      = get_post_meta( $b_id, '_us_client_email', true );
                            $service    = get_post_meta( $b_id, '_us_service', true );
                            $date       = get_post_meta( $b_id, '_us_date_formatted', true ) ?: get_post_meta( $b_id, '_us_date', true );
                            $iso_date   = get_post_meta( $b_id, '_us_date', true );
                            $slot       = get_post_meta( $b_id, '_us_time_slot', true );
                            $teams_url  = get_post_meta( $b_id, '_us_teams_url', true );
                            $event_id   = get_post_meta( $b_id, '_us_outlook_event_id', true );
                            $status     = get_post_meta( $b_id, '_us_status', true ) ?: 'Confirmed';
                            $wa_status  = get_post_meta( $b_id, '_us_whatsapp_status', true ) ?: 'Pending';
                            $notes      = get_post_meta( $b_id, '_us_client_notes', true );
                        ?>
                        <tr>
                            <td>
                                <strong><?php echo esc_html( $ref_id ); ?></strong>
                                <?php if ( $event_id && strpos( $event_id, 'sim_' ) !== 0 ) : ?>
                                    <div style="font-size:10px; color:#16a34a; font-weight:600;"><span class="dashicons dashicons-yes-alt" style="font-size:11px; vertical-align:middle;"></span> Outlook Event</div>
                                <?php endif; ?>
                            </td>
                            <td>
                                <strong><?php echo esc_html( $client ); ?></strong>
                            </td>
                            <td>
                                <a href="tel:<?php echo esc_attr( $phone ); ?>"><?php echo esc_html( $phone ); ?></a><br>
                                <a href="mailto:<?php echo esc_attr( $email ); ?>" style="font-size:12px; color:#64748b;"><?php echo esc_html( $email ); ?></a>
                            </td>
                            <td>
                                <span style="background:#e0f2fe; color:#0369a1; padding:3px 8px; border-radius:4px; font-size:11px; font-weight:600;">
                                    <?php echo esc_html( $service ); ?>
                                </span>
                            </td>
                            <td>
                                <strong><?php echo esc_html( $date ); ?></strong>
                                <div style="font-size:12px; color:#0369a1; font-weight:600;"><?php echo esc_html( $slot ); ?></div>
                            </td>
                            <td>
                                <?php if ( ! empty( $teams_url ) ) : ?>
                                    <a href="<?php echo esc_url( $teams_url ); ?>" target="_blank" class="button button-small" style="background:#464eb8; color:#fff; border-color:#464eb8;">
                                        <span class="dashicons dashicons-video-alt3" style="font-size:13px; margin-top:2px;"></span> Teams
                                    </a>
                                    <button type="button" class="button button-small" title="<?php esc_attr_e( 'Copy Teams Link', 'universal-consultation-booking' ); ?>" onclick="navigator.clipboard.writeText('<?php echo esc_js( $teams_url ); ?>'); alert('Teams link copied to clipboard!');">
                                        <span class="dashicons dashicons-admin-page" style="font-size:13px; margin-top:2px;"></span>
                                    </button>
                                <?php else : ?>
                                    <span style="color:#94a3b8;">—</span>
                                <?php endif; ?>
                            </td>
                            <td>
                                <?php
                                $badge_bg  = '#f1f5f9';
                                $badge_col = '#475569';
                                if ( $wa_status === 'Sent' ) {
                                    $badge_bg  = '#dcfce7';
                                    $badge_col = '#15803d';
                                } elseif ( strpos( $wa_status, 'Failed' ) !== false ) {
                                    $badge_bg  = '#fee2e2';
                                    $badge_col = '#b91c1c';
                                }
                                ?>
                                <span style="background:<?php echo esc_attr( $badge_bg ); ?>; color:<?php echo esc_attr( $badge_col ); ?>; padding:3px 8px; border-radius:12px; font-size:11px; font-weight:600;" title="<?php echo esc_attr( $wa_status ); ?>">
                                    <?php echo esc_html( substr( $wa_status, 0, 10 ) ); ?>
                                </span>
                            </td>
                            <td>
                                <?php
                                $st_col = '#0284c7';
                                if ( $status === 'Cancelled' ) $st_col = '#ef4444';
                                if ( $status === 'Rescheduled' ) $st_col = '#f59e0b';
                                if ( $status === 'Completed' ) $st_col = '#10b981';
                                ?>
                                <span style="background:<?php echo esc_attr( $st_col ); ?>; color:#fff; padding:3px 8px; border-radius:4px; font-size:11px; font-weight:600;">
                                    <?php echo esc_html( $status ); ?>
                                </span>
                            </td>
                            <td style="text-align:right;">
                                <div style="display:inline-flex; gap:4px;">
                                    <a href="<?php echo esc_url( get_edit_post_link( $b_id ) ); ?>" class="button button-small" title="<?php esc_attr_e( 'View Details', 'universal-consultation-booking' ); ?>">
                                        <span class="dashicons dashicons-visibility" style="font-size:13px; margin-top:2px;"></span>
                                    </a>
                                    <?php if ( $status !== 'Cancelled' ) : ?>
                                        <button type="button" class="button button-small" style="color:#d97706;" title="<?php esc_attr_e( 'Reschedule Appointment', 'universal-consultation-booking' ); ?>" onclick="openRescheduleModal('<?php echo esc_js( $ref_id ); ?>', '<?php echo esc_js( $iso_date ); ?>', '<?php echo esc_js( $slot ); ?>');">
                                            <span class="dashicons dashicons-update" style="font-size:13px; margin-top:2px;"></span>
                                        </button>
                                        <button type="button" class="button button-small" style="color:#dc2626;" title="<?php esc_attr_e( 'Cancel Appointment', 'universal-consultation-booking' ); ?>" onclick="openCancelModal('<?php echo esc_js( $ref_id ); ?>');">
                                            <span class="dashicons dashicons-dismiss" style="font-size:13px; margin-top:2px;"></span>
                                        </button>
                                    <?php endif; ?>
                                </div>
                            </td>
                        </tr>
                        <?php endwhile; wp_reset_postdata(); ?>
                    <?php else : ?>
                        <tr>
                            <td colspan="9" style="text-align:center; padding:30px; color:#64748b;">
                                <?php esc_html_e( 'No consultation bookings found.', 'universal-consultation-booking' ); ?>
                            </td>
                        </tr>
                    <?php endif; ?>
                </tbody>
            </table>

            <!-- Reschedule Modal -->
            <div id="ucbRescheduleModal" style="display:none; position:fixed; z-index:99999; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.5); align-items:center; justify-content:center;">
                <div style="background:#fff; border-radius:8px; padding:25px; width:440px; max-width:90%; box-shadow:0 10px 25px rgba(0,0,0,0.2);">
                    <h3 style="margin-top:0; color:#0f172a;"><span class="dashicons dashicons-update"></span> Reschedule Appointment</h3>
                    <p style="font-size:13px; color:#64748b;">Updates the meeting in Microsoft Outlook Calendar and notifies both the client and consultant via WhatsApp.</p>
                    <input type="hidden" id="rescheduleBookingId" value="">
                    <div style="margin-bottom:12px;">
                        <label style="display:block; font-weight:600; margin-bottom:4px;">New Date (YYYY-MM-DD):</label>
                        <input type="date" id="rescheduleNewDate" class="widefat" style="padding:6px;">
                    </div>
                    <div style="margin-bottom:15px;">
                        <label style="display:block; font-weight:600; margin-bottom:4px;">New 45-min Time Slot:</label>
                        <select id="rescheduleNewSlot" class="widefat" style="padding:6px;">
                            <?php foreach ( UCB_Booking_Service::get_standard_slots() as $s ) : ?>
                                <option value="<?php echo esc_attr( $s ); ?>"><?php echo esc_html( $s ); ?></option>
                            <?php endforeach; ?>
                        </select>
                    </div>
                    <div style="display:flex; justify-content:flex-end; gap:8px;">
                        <button type="button" class="button" onclick="closeRescheduleModal();">Cancel</button>
                        <button type="button" class="button button-primary" id="btnConfirmReschedule" onclick="submitReschedule();">Confirm Reschedule</button>
                    </div>
                </div>
            </div>

            <!-- Cancel Modal -->
            <div id="ucbCancelModal" style="display:none; position:fixed; z-index:99999; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.5); align-items:center; justify-content:center;">
                <div style="background:#fff; border-radius:8px; padding:25px; width:440px; max-width:90%; box-shadow:0 10px 25px rgba(0,0,0,0.2);">
                    <h3 style="margin-top:0; color:#dc2626;"><span class="dashicons dashicons-dismiss"></span> Cancel Appointment</h3>
                    <p style="font-size:13px; color:#64748b;">This will remove the event from Microsoft Outlook Calendar and send cancellation WhatsApp notices to both parties.</p>
                    <input type="hidden" id="cancelBookingId" value="">
                    <div style="margin-bottom:15px;">
                        <label style="display:block; font-weight:600; margin-bottom:4px;">Cancellation Reason:</label>
                        <textarea id="cancelReason" class="widefat" rows="3" placeholder="Client requested rescheduling / Consultant unavailable"></textarea>
                    </div>
                    <div style="display:flex; justify-content:flex-end; gap:8px;">
                        <button type="button" class="button" onclick="closeCancelModal();">Back</button>
                        <button type="button" class="button button-primary" style="background:#dc2626; border-color:#dc2626;" id="btnConfirmCancel" onclick="submitCancel();">Confirm Cancellation</button>
                    </div>
                </div>
            </div>

            <script>
            function openRescheduleModal(refId, currentDate, currentSlot) {
                document.getElementById('rescheduleBookingId').value = refId;
                document.getElementById('rescheduleNewDate').value = currentDate;
                document.getElementById('rescheduleNewSlot').value = currentSlot;
                document.getElementById('ucbRescheduleModal').style.display = 'flex';
            }
            function closeRescheduleModal() {
                document.getElementById('ucbRescheduleModal').style.display = 'none';
            }
            function openCancelModal(refId) {
                document.getElementById('cancelBookingId').value = refId;
                document.getElementById('ucbCancelModal').style.display = 'flex';
            }
            function closeCancelModal() {
                document.getElementById('ucbCancelModal').style.display = 'none';
            }

            async function submitReschedule() {
                const bookingId = document.getElementById('rescheduleBookingId').value;
                const newDate = document.getElementById('rescheduleNewDate').value;
                const newSlot = document.getElementById('rescheduleNewSlot').value;
                const btn = document.getElementById('btnConfirmReschedule');

                if (!newDate || !newSlot) {
                    alert('Please select a valid new date and slot.');
                    return;
                }

                btn.disabled = true;
                btn.textContent = 'Rescheduling...';

                try {
                    const res = await fetch('<?php echo esc_url( rest_url( 'universal/v1/admin/reschedule' ) ); ?>', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'X-WP-Nonce': '<?php echo wp_create_nonce( 'wp_rest' ); ?>'
                        },
                        body: JSON.stringify({ bookingId: bookingId, newDate: newDate, newSlot: newSlot })
                    });
                    const data = await res.json();
                    if (!res.ok) throw new Error(data.error || 'Reschedule failed');
                    alert('Appointment rescheduled successfully!');
                    location.reload();
                } catch (err) {
                    alert('Error: ' + err.message);
                } finally {
                    btn.disabled = false;
                    btn.textContent = 'Confirm Reschedule';
                }
            }

            async function submitCancel() {
                const bookingId = document.getElementById('cancelBookingId').value;
                const reason = document.getElementById('cancelReason').value;
                const btn = document.getElementById('btnConfirmCancel');

                btn.disabled = true;
                btn.textContent = 'Cancelling...';

                try {
                    const res = await fetch('<?php echo esc_url( rest_url( 'universal/v1/admin/cancel' ) ); ?>', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'X-WP-Nonce': '<?php echo wp_create_nonce( 'wp_rest' ); ?>'
                        },
                        body: JSON.stringify({ bookingId: bookingId, reason: reason })
                    });
                    const data = await res.json();
                    if (!res.ok) throw new Error(data.error || 'Cancel failed');
                    alert('Appointment cancelled successfully.');
                    location.reload();
                } catch (err) {
                    alert('Error: ' + err.message);
                } finally {
                    btn.disabled = false;
                    btn.textContent = 'Confirm Cancellation';
                }
            }
            </script>
        </div>
        <?php
    }

    /**
     * Screen 2: Integration Settings & Credentials Configuration
     */
    public static function render_settings_page() {
        if ( ! current_user_can( 'manage_options' ) ) {
            wp_die( esc_html__( 'Unauthorized', 'universal-consultation-booking' ) );
        }

        settings_errors( 'ucb_settings_messages' );

        $consultant_name     = get_option( 'ucb_consultant_name', 'Senior Tax & Corporate Advisor' );
        $consultant_email    = get_option( 'ucb_consultant_email', 'snisal@corporate.mediadefined.com' );
        $consultant_whatsapp = get_option( 'ucb_consultant_whatsapp', '94774087869' );

        $ms_tenant_id        = get_option( 'ucb_ms_tenant_id', '' );
        $ms_client_id        = get_option( 'ucb_ms_client_id', '' );
        $ms_client_secret    = get_option( 'ucb_ms_client_secret', '' );
        $timezone            = get_option( 'ucb_timezone', 'Sri Lanka Standard Time' );

        $wa_enabled          = get_option( 'ucb_wa_enabled', 'yes' );
        $wa_phone_id         = get_option( 'ucb_wa_phone_number_id', '' );
        $wa_business_id      = get_option( 'ucb_wa_business_account_id', '' );
        $wa_access_token     = get_option( 'ucb_wa_access_token', '' );
        $wa_template_name    = get_option( 'ucb_wa_template_name', '' );
        $wa_template_lang    = get_option( 'ucb_wa_template_lang', 'en' );
        ?>
        <div class="wrap">
            <h1><span class="dashicons dashicons-admin-generic" style="font-size:28px; line-height:1; margin-right:8px;"></span> Consultation Booking – Microsoft Teams &amp; WhatsApp Settings</h1>
            <p style="color:#64748b;">Configure consultant details, Microsoft Entra ID (Graph API) authentication for Outlook Calendar &amp; Teams, and official WhatsApp Business Cloud API credentials.</p>

            <form method="post" action="">
                <?php wp_nonce_field( 'ucb_save_settings', 'ucb_save_settings_nonce' ); ?>

                <!-- Section 1: Consultant Details -->
                <div style="background:#fff; border:1px solid #cbd5e1; border-radius:6px; padding:20px; margin-bottom:25px; box-shadow:0 1px 3px rgba(0,0,0,0.05);">
                    <h2 style="margin-top:0; border-bottom:1px solid #e2e8f0; padding-bottom:10px; color:#0369a1;">
                        <span class="dashicons dashicons-businessperson"></span> 1. Assigned Consultant Profile
                    </h2>
                    <table class="form-table">
                        <tr>
                            <th scope="row"><label for="ucb_consultant_name">Consultant Display Name</label></th>
                            <td>
                                <input type="text" id="ucb_consultant_name" name="ucb_consultant_name" class="regular-text" value="<?php echo esc_attr( $consultant_name ); ?>" required>
                                <p class="description">Displayed in the confirmation modal, emails, and client notifications.</p>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row"><label for="ucb_consultant_email">Consultant Microsoft 365 Email</label></th>
                            <td>
                                <input type="email" id="ucb_consultant_email" name="ucb_consultant_email" class="regular-text" value="<?php echo esc_attr( $consultant_email ); ?>" required>
                                <p class="description">The Microsoft 365 / Entra ID user account whose Outlook Calendar will sync and host the Teams meetings.</p>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row"><label for="ucb_consultant_whatsapp">Consultant WhatsApp Phone</label></th>
                            <td>
                                <input type="text" id="ucb_consultant_whatsapp" name="ucb_consultant_whatsapp" class="regular-text" value="<?php echo esc_attr( $consultant_whatsapp ); ?>" required>
                                <p class="description">International format without plus, e.g. <code>94774087869</code>. Receives instant WhatsApp booking alerts.</p>
                            </td>
                        </tr>
                    </table>
                </div>

                <!-- Section 2: Microsoft Entra ID / Microsoft 365 Graph API -->
                <div style="background:#fff; border:1px solid #cbd5e1; border-radius:6px; padding:20px; margin-bottom:25px; box-shadow:0 1px 3px rgba(0,0,0,0.05);">
                    <h2 style="margin-top:0; border-bottom:1px solid #e2e8f0; padding-bottom:10px; color:#464eb8;">
                        <span class="dashicons dashicons-microsoft"></span> 2. Microsoft Entra ID &amp; Outlook Calendar Integration
                    </h2>
                    <p style="font-size:13px; color:#475569;">
                        Connects to Microsoft Graph API using OAuth 2.0 Client Credentials flow. Required Microsoft Graph Application Permissions: <code>Calendars.ReadWrite</code> and <code>OnlineMeetings.ReadWrite.All</code> (with admin consent granted in Azure Portal).
                    </p>
                    <table class="form-table">
                        <tr>
                            <th scope="row"><label for="ucb_ms_tenant_id">Directory (Tenant) ID</label></th>
                            <td>
                                <input type="text" id="ucb_ms_tenant_id" name="ucb_ms_tenant_id" class="large-text" value="<?php echo esc_attr( $ms_tenant_id ); ?>" placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx">
                            </td>
                        </tr>
                        <tr>
                            <th scope="row"><label for="ucb_ms_client_id">Application (Client) ID</label></th>
                            <td>
                                <input type="text" id="ucb_ms_client_id" name="ucb_ms_client_id" class="large-text" value="<?php echo esc_attr( $ms_client_id ); ?>" placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx">
                            </td>
                        </tr>
                        <tr>
                            <th scope="row"><label for="ucb_ms_client_secret">Client Secret Value</label></th>
                            <td>
                                <input type="password" id="ucb_ms_client_secret" name="ucb_ms_client_secret" class="large-text" value="<?php echo esc_attr( $ms_client_secret ); ?>" placeholder="Client Secret string from Entra ID">
                            </td>
                        </tr>
                        <tr>
                            <th scope="row"><label for="ucb_timezone">Calendar Timezone</label></th>
                            <td>
                                <input type="text" id="ucb_timezone" name="ucb_timezone" class="regular-text" value="<?php echo esc_attr( $timezone ); ?>">
                                <p class="description">Default: <code>Sri Lanka Standard Time</code> (UTC+5:30).</p>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">Connection Test</th>
                            <td>
                                <button type="button" class="button button-secondary" id="btnTestGraph" onclick="testGraphConnection();">
                                    <span class="dashicons dashicons-cloud" style="margin-top:4px;"></span> Test Microsoft Graph Connection
                                </button>
                                <span id="graphTestResult" style="margin-left:12px; font-weight:600;"></span>
                            </td>
                        </tr>
                    </table>
                </div>

                <!-- Section 3: WhatsApp Cloud API -->
                <div style="background:#fff; border:1px solid #cbd5e1; border-radius:6px; padding:20px; margin-bottom:25px; box-shadow:0 1px 3px rgba(0,0,0,0.05);">
                    <h2 style="margin-top:0; border-bottom:1px solid #e2e8f0; padding-bottom:10px; color:#16a34a;">
                        <span class="dashicons dashicons-format-chat"></span> 3. WhatsApp Business Cloud API Integration
                    </h2>
                    <p style="font-size:13px; color:#475569;">
                        Sends automated confirmation to the client and alerts to the consultant via Meta's official WhatsApp Business Cloud API.
                    </p>
                    <table class="form-table">
                        <tr>
                            <th scope="row">Enable WhatsApp Notifications</th>
                            <td>
                                <label>
                                    <input type="checkbox" name="ucb_wa_enabled" value="yes" <?php checked( $wa_enabled, 'yes' ); ?>>
                                    Enable automated WhatsApp notifications
                                </label>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row"><label for="ucb_wa_phone_number_id">Phone Number ID</label></th>
                            <td>
                                <input type="text" id="ucb_wa_phone_number_id" name="ucb_wa_phone_number_id" class="regular-text" value="<?php echo esc_attr( $wa_phone_id ); ?>" placeholder="e.g. 109283746501928">
                                <p class="description">Found under Meta for Developers &gt; WhatsApp &gt; API Setup &gt; Phone number ID.</p>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row"><label for="ucb_wa_business_account_id">WhatsApp Business Account ID</label></th>
                            <td>
                                <input type="text" id="ucb_wa_business_account_id" name="ucb_wa_business_account_id" class="regular-text" value="<?php echo esc_attr( $wa_business_id ); ?>" placeholder="e.g. 108273645192837">
                            </td>
                        </tr>
                        <tr>
                            <th scope="row"><label for="ucb_wa_access_token">System User Permanent Access Token</label></th>
                            <td>
                                <textarea id="ucb_wa_access_token" name="ucb_wa_access_token" class="large-text" rows="3" placeholder="EAAB... Meta System User Access Token"><?php echo esc_textarea( $wa_access_token ); ?></textarea>
                                <p class="description">Generate a permanent System User token with <code>whatsapp_business_messaging</code> and <code>whatsapp_business_management</code> permissions.</p>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row"><label for="ucb_wa_template_name">WhatsApp Approved Template Name (Optional)</label></th>
                            <td>
                                <input type="text" id="ucb_wa_template_name" name="ucb_wa_template_name" class="regular-text" value="<?php echo esc_attr( $wa_template_name ); ?>" placeholder="e.g. consultation_confirmed">
                                <p class="description">If left blank, the system sends formatted direct text messages.</p>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">WhatsApp Connection Test</th>
                            <td>
                                <div style="display:flex; gap:8px; align-items:center;">
                                    <input type="text" id="waTestRecipient" placeholder="Recipient Phone (e.g. 94774087869)" value="<?php echo esc_attr( $consultant_whatsapp ); ?>" style="width:220px;">
                                    <button type="button" class="button button-secondary" id="btnTestWA" onclick="testWhatsAppConnection();">
                                        <span class="dashicons dashicons-format-chat" style="margin-top:4px;"></span> Test WhatsApp API
                                    </button>
                                </div>
                                <span id="waTestResult" style="display:block; margin-top:6px; font-weight:600;"></span>
                            </td>
                        </tr>
                    </table>
                </div>

                <p class="submit">
                    <input type="submit" name="submit" id="submit" class="button button-primary button-large" value="<?php esc_attr_e( 'Save All Settings', 'universal-consultation-booking' ); ?>">
                </p>
            </form>

            <script>
            async function testGraphConnection() {
                const resultSpan = document.getElementById('graphTestResult');
                resultSpan.innerHTML = '<span style="color:#0284c7;">Testing connection to Microsoft Graph...</span>';

                try {
                    const res = await fetch('<?php echo esc_url( rest_url( 'universal/v1/admin/test-graph' ) ); ?>', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'X-WP-Nonce': '<?php echo wp_create_nonce( 'wp_rest' ); ?>'
                        }
                    });
                    const data = await res.json();
                    if (data.success) {
                        resultSpan.innerHTML = '<span style="color:#16a34a;">✅ ' + data.message + '</span>';
                    } else {
                        resultSpan.innerHTML = '<span style="color:#dc2626;">❌ ' + data.message + '</span>';
                    }
                } catch (err) {
                    resultSpan.innerHTML = '<span style="color:#dc2626;">❌ Connection error: ' + err.message + '</span>';
                }
            }

            async function testWhatsAppConnection() {
                const recipient = document.getElementById('waTestRecipient').value;
                const resultSpan = document.getElementById('waTestResult');
                resultSpan.innerHTML = '<span style="color:#0284c7;">Verifying WhatsApp Business Cloud API...</span>';

                try {
                    const res = await fetch('<?php echo esc_url( rest_url( 'universal/v1/admin/test-whatsapp' ) ); ?>', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'X-WP-Nonce': '<?php echo wp_create_nonce( 'wp_rest' ); ?>'
                        },
                        body: JSON.stringify({ recipient: recipient })
                    });
                    const data = await res.json();
                    if (data.success) {
                        resultSpan.innerHTML = '<span style="color:#16a34a;">✅ ' + data.message + '</span>';
                    } else {
                        resultSpan.innerHTML = '<span style="color:#dc2626;">❌ ' + data.message + '</span>';
                    }
                } catch (err) {
                    resultSpan.innerHTML = '<span style="color:#dc2626;">❌ Connection error: ' + err.message + '</span>';
                }
            }
            </script>
        </div>
        <?php
    }

    /**
     * Screen 3: Integration Activity & Error Logs
     */
    public static function render_logs_page() {
        if ( ! current_user_can( 'manage_options' ) ) {
            wp_die( esc_html__( 'Unauthorized', 'universal-consultation-booking' ) );
        }

        if ( isset( $_POST['ucb_clear_logs_nonce'] ) && wp_verify_nonce( $_POST['ucb_clear_logs_nonce'], 'ucb_clear_logs' ) ) {
            UCB_Logger::clear_logs();
            echo '<div class="notice notice-success is-dismissible"><p>Logs cleared successfully.</p></div>';
        }

        $logs = UCB_Logger::get_logs( 100 );
        ?>
        <div class="wrap">
            <h1 class="wp-heading-inline"><span class="dashicons dashicons-clipboard"></span> Consultation Booking Integration Logs &amp; Errors</h1>
            <form method="post" action="" style="display:inline-block; margin-left:15px;">
                <?php wp_nonce_field( 'ucb_clear_logs', 'ucb_clear_logs_nonce' ); ?>
                <button type="submit" class="button" onclick="return confirm('Clear all logs?');">Clear Logs</button>
            </form>
            <p style="color:#64748b;">Real-time diagnostics and error tracking for Microsoft Graph API and WhatsApp Business Cloud API transactions.</p>

            <table class="wp-list-table widefat fixed striped" style="margin-top:15px; border-radius:6px; overflow:hidden;">
                <thead>
                    <tr>
                        <th style="width:160px;">Timestamp</th>
                        <th style="width:110px;">Service</th>
                        <th style="width:130px;">Action</th>
                        <th style="width:90px;">Status</th>
                        <th>Message</th>
                        <th style="width:250px;">Context / Payload</th>
                    </tr>
                </thead>
                <tbody>
                    <?php if ( ! empty( $logs ) ) : ?>
                        <?php foreach ( $logs as $l ) :
                            $status_col = '#0284c7';
                            if ( $l['status'] === 'success' ) $status_col = '#16a34a';
                            if ( $l['status'] === 'error' ) $status_col = '#dc2626';
                            if ( $l['status'] === 'warning' ) $status_col = '#d97706';
                        ?>
                        <tr>
                            <td><code><?php echo esc_html( $l['time'] ); ?></code></td>
                            <td>
                                <strong><?php echo esc_html( strtoupper( $l['service'] ) ); ?></strong>
                            </td>
                            <td><?php echo esc_html( $l['action'] ); ?></td>
                            <td>
                                <span style="background:<?php echo esc_attr( $status_col ); ?>; color:#fff; padding:2px 7px; border-radius:3px; font-size:10px; font-weight:700;">
                                    <?php echo esc_html( strtoupper( $l['status'] ) ); ?>
                                </span>
                            </td>
                            <td><?php echo esc_html( $l['message'] ); ?></td>
                            <td>
                                <?php if ( ! empty( $l['context'] ) ) : ?>
                                    <pre style="margin:0; font-size:11px; max-height:80px; overflow:auto; background:#f8fafc; padding:4px;"><?php echo esc_html( $l['context'] ); ?></pre>
                                <?php else : ?>
                                    <span style="color:#94a3b8;">—</span>
                                <?php endif; ?>
                            </td>
                        </tr>
                        <?php endforeach; ?>
                    <?php else : ?>
                        <tr>
                            <td colspan="6" style="text-align:center; padding:30px; color:#64748b;">
                                No integration logs recorded yet.
                            </td>
                        </tr>
                    <?php endif; ?>
                </tbody>
            </table>
        </div>
        <?php
    }
}

