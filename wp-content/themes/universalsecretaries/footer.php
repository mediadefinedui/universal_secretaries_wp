<?php
/**
 * Universal Secretaries WordPress Theme Footer
 *
 * @package Universal_Secretaries
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

$fb_url = universal_get_option( 'facebook_url', 'https://www.facebook.com/taxfiling.lk/' );
$li_url = universal_get_option( 'linkedin_url', 'https://www.linkedin.com/company/tax-filing-lk/' );
$yt_url = universal_get_option( 'youtube_url', 'https://www.youtube.com/@taxfiling_lk' );
$wa_num = universal_get_option( 'contact_whatsapp', '94774087869' );
$tax_email = universal_get_option( 'contact_tax_email', 'tax@universalsecretaries.com' );
$roc_email = universal_get_option( 'contact_roc_email', 'roc@universalsecretaries.com' );
?>

        <!-- Offcanvas -->
        <div class="offcanvas offcanvas-start" tabindex="2" id="offcanvasMenu">
            <div class="offcanvas-header">
                <div class="offcanvas__logo">
                    <a href="<?php echo esc_url( home_url( '/' ) ); ?>">
                        <img src="<?php echo esc_url( get_template_directory_uri() . '/assets/images/logo/logo-theme.webp' ); ?>" alt="<?php bloginfo( 'name' ); ?>">
                    </a>
                </div>
                <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div class="offcanvas-body">

                <ul class="offcanvas__info">
                    <li>
                        <a href="tel:<?php echo esc_attr( preg_replace( '/[^0-9+]/', '', universal_get_option( 'contact_phone', '+94 77 40 87 869' ) ) ); ?>">
                            <i class="flaticon-old-typical-phone"></i> <?php echo esc_html( universal_get_option( 'contact_phone', '+94 77 40 87 869' ) ); ?>
                        </a>
                    </li>
                    <li>
                        <a href="mailto:<?php echo esc_attr( universal_get_option( 'contact_tax_email', 'tax@universalsecretaries.com' ) ); ?>">
                            <i class="flaticon-black-back-closed-envelope-shape"></i> <?php echo esc_html( universal_get_option( 'contact_tax_email', 'tax@universalsecretaries.com' ) ); ?>
                        </a>
                    </li>
                </ul>

                <!-- Main Navigation -->
                <nav class="canvas-menu">
                    <?php
                    if ( has_nav_menu( 'primary' ) ) {
                        wp_nav_menu( array(
                            'theme_location' => 'primary',
                            'container'      => false,
                            'menu_class'     => '',
                            'fallback_cb'    => false,
                        ) );
                    } else {
                    ?>
                        <ul>
                            <li><a href="<?php echo esc_url( home_url( '/' ) ); ?>">Home</a></li>
                            <li><a href="<?php echo esc_url( home_url( '/services/' ) ); ?>">OUR SERVICES</a></li>
                            <li><a href="<?php echo esc_url( home_url( '/news-and-updates/' ) ); ?>">NEWS & UPDATES</a></li>
                            <li><a href="<?php echo esc_url( home_url( '/about-us/' ) ); ?>">ABOUT</a></li>
                        </ul>
                    <?php } ?>
                </nav>
                <!--// Main Navigation -->

                <div class="offcanvas__button">
                    <a class="cr-btn cr-btn--lg btn-open-appointment-modal" href="#consultationBookingModal" id="btnOffcanvasAppointment">
                        <span><?php echo esc_html( universal_get_option( 'header_appointment_btn_text', 'Make an appointment' ) ); ?></span>
                    </a>
                </div>
            </div>
        </div>
        <!-- //Offcanvas -->

        <!-- Footer Area -->
        <footer id="footer" class="footer-area fixed--footer">

            <!-- Footer Widgets Area -->
            <div class="footer-area__widgets section-padding--md bg--dark--light">
                <div class="container">
                    <div class="footer-area__logo text-center">
                        <a href="<?php echo esc_url( home_url( '/' ) ); ?>">
                            <img src="<?php echo esc_url( get_template_directory_uri() . '/assets/images/logo/logo-footer.webp' ); ?>" style="width: 30%; max-width: 260px;" alt="<?php bloginfo( 'name' ); ?>">
                        </a>
                    </div>

                    <div class="widget-area footer--widgets">

                        <!-- Single Widget: About -->
                        <section class="widget widget-about">
                            <h5 class="widget-title">ABOUT Universal Secretaries</h5>
                            <p><?php echo esc_html( universal_get_option( 'footer_about_text', 'Company secretarial and tax advisory, Sri Lanka. Since 2012.' ) ); ?></p>
                            <div class="social-icons social-icons--rounded">
                                <ul>
                                    <?php if ( ! empty( $fb_url ) ) : ?>
                                        <li class="facebook">
                                            <a href="<?php echo esc_url( $fb_url ); ?>" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                                                <i class="fa fa-facebook"></i>
                                            </a>
                                        </li>
                                    <?php endif; ?>
                                    <?php if ( ! empty( $li_url ) ) : ?>
                                        <li class="linkedin">
                                            <a href="<?php echo esc_url( $li_url ); ?>" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                                                <i class="fa fa-linkedin"></i>
                                            </a>
                                        </li>
                                    <?php endif; ?>
                                    <?php if ( ! empty( $yt_url ) ) : ?>
                                        <li class="youtube">
                                            <a href="<?php echo esc_url( $yt_url ); ?>" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                                                <i class="fa fa-youtube"></i>
                                            </a>
                                        </li>
                                    <?php endif; ?>
                                </ul>
                            </div>
                        </section>
                        <!--// Single Widget -->

                        <!-- Single Widget: Quick Links -->
                        <section class="widget widget-quick-links">
                            <h5 class="widget-title">QUICK LINKS</h5>
                            <?php
                            if ( has_nav_menu( 'footer' ) ) {
                                wp_nav_menu( array(
                                    'theme_location' => 'footer',
                                    'container'      => false,
                                    'menu_class'     => '',
                                    'fallback_cb'    => false,
                                ) );
                            } else {
                            ?>
                                <ul>
                                    <li><a href="<?php echo esc_url( home_url( '/services/' ) ); ?>">Our Services</a></li>
                                    <li><a href="<?php echo esc_url( home_url( '/news-and-updates/' ) ); ?>">News &amp; Updates</a></li>
                                    <li><a href="<?php echo esc_url( home_url( '/about-us/' ) ); ?>">About</a></li>
                                    <li><a href="<?php echo esc_url( home_url( '/appointment/' ) ); ?>">Make an Appointment</a></li>
                                </ul>
                            <?php } ?>
                        </section>
                        <!--// Single Widget -->

                        <!-- Single Widget: Consultations -->
                        <section class="widget widget-contact-info">
                            <h5 class="widget-title">Consultations</h5>
                            <ul>
                                <li><p>Monday to Friday</p></li>
                                <li>
                                    <p>7:00 a.m. to 12:00 noon, Sri Lanka time</p>
                                    <p>45 minutes, one client per slot</p>
                                </li>
                            </ul>
                        </section>
                        <!--// Single Widget -->

                        <!-- Single Widget: Contact Info -->
                        <section class="widget widget-contact-info">
                            <h5 class="widget-title">Contact Info</h5>
                            <ul>
                                <li>
                                    <p>For Tax Matter: <a href="mailto:<?php echo esc_attr( $tax_email ); ?>"><?php echo esc_html( $tax_email ); ?></a></p>
                                </li>
                                <li>
                                    <p>For Company Matter: <a href="mailto:<?php echo esc_attr( $roc_email ); ?>"><?php echo esc_html( $roc_email ); ?></a></p>
                                </li>
                                <li>
                                    <p>
                                        Call (WhatsApp only):
                                        <a href="https://wa.me/<?php echo esc_attr( $wa_num ); ?>" target="_blank" rel="noopener noreferrer">
                                            +<?php echo esc_html( $wa_num ); ?>
                                        </a>
                                    </p>
                                </li>
                            </ul>
                        </section>
                        <!--// Single Widget -->

                    </div>
                </div>
            </div>
            <!--// Footer Widgets Area -->

            <!-- Footer Copyright Area -->
            <div class="footer-area__copyright bg--dark">
                <div class="container">
                    <div class="copyright text-center">
                        <p><?php echo esc_html( universal_get_option( 'footer_copyright', '© 2026 Universal Secretaries. Made by Media Defined (Pvt) Ltd' ) ); ?></p>
                    </div>
                </div>
            </div>
            <!--// Footer Copyright Area -->

        </footer>
        <!-- //Footer Area -->

    </div>
    <!-- //Main wrapper -->

    <!-- Back To Top Start -->
    <button id="backBTn" class="backbtn" aria-label="Back to Top">
        <span class="material-symbols-outlined">keyboard_double_arrow_right</span>
    </button>
    <!-- //Back To Top end -->

    <!-- =========================================================================
         Appointment Popup Modal — "Book Your Consultation"
         ========================================================================= -->
    <div class="appt-modal-overlay" id="apptModalOverlay" role="dialog" aria-modal="true" aria-labelledby="apptModalTitle" tabindex="-1">
        <div class="appt-modal-shell" id="apptModalShell">

            <!-- Close button -->
            <button type="button" class="appt-modal-close" id="apptModalClose" aria-label="Close consultation booking form">
                <i class="fa fa-times"></i>
            </button>

            <!-- Pill header -->
            <div class="appt-modal-header">
                <div class="appt-modal-pill">
                    <span class="pill-dot"><i class="fa fa-calendar"></i></span>
                    <span class="pill-text">Book a 45-minute consultation</span>
                </div>
            </div>

            <!-- ===== Booking Card (Exact same structure & styles as home screen) ===== -->
            <div class="booking-card">
                <h2 class="booking-card__title" id="apptModalTitle">Book your consultation</h2>
                <p class="booking-card__subtitle">One client per 45-minute slot, by video or phone.</p>

                <form id="consultationBookingForm-modal" novalidate>
                    <!-- Alert Banner -->
                    <div class="booking-alert" id="bookingAlert-modal" style="display:none;"></div>

                    <!-- 1. CONSULTATION TYPE -->
                    <div class="booking-group">
                        <span class="booking-label">CONSULTATION</span>
                        <div class="consultation-types" id="consultationTypes-modal">
                            <button type="button" class="consultation-type-btn active" data-type="Company registration">Company registration</button>
                            <button type="button" class="consultation-type-btn" data-type="Tax consultation">Tax consultation</button>
                            <button type="button" class="consultation-type-btn" data-type="Bookkeeping">Bookkeeping</button>
                        </div>
                    </div>

                    <!-- 2. DAY SELECTOR -->
                    <div class="booking-group">
                        <span class="booking-label">DAY</span>
                        <div class="day-scroll-wrapper">
                            <div class="day-scroll-track" id="dayScrollTrack-modal"></div>
                        </div>
                    </div>

                    <!-- 3. TIME SLOTS -->
                    <div class="booking-group">
                        <span class="booking-label">TIME</span>
                        <div class="time-slot-grid" id="timeSlotGrid-modal">
                            <button type="button" class="time-slot-btn active" data-time="07:00-07:45">07:00-07:45</button>
                            <button type="button" class="time-slot-btn" data-time="07:45-08:30">07:45-08:30</button>
                            <button type="button" class="time-slot-btn" data-time="08:30-09:15">08:30-09:15</button>
                            <button type="button" class="time-slot-btn" data-time="09:15-10:00">09:15-10:00</button>
                            <button type="button" class="time-slot-btn" data-time="10:00-10:45">10:00-10:45</button>
                            <button type="button" class="time-slot-btn" data-time="10:45-11:30">10:45-11:30</button>
                        </div>
                        <div class="time-note">
                            <i class="fa fa-clock-o"></i>
                            <span>Sri Lanka time (UTC+5:30). Weekdays, 7:00 a.m. to 12:00 noon.</span>
                        </div>
                    </div>

                    <!-- 4. YOUR DETAILS -->
                    <div class="booking-group">
                        <span class="booking-label">YOUR DETAILS</span>
                        <div class="form-grid-2">
                            <div class="form-field">
                                <label class="field-label" for="clientFullName-modal">Full name</label>
                                <input type="text" id="clientFullName-modal" class="field-input" placeholder="" required>
                            </div>
                            <div class="form-field">
                                <label class="field-label" for="clientPhone-modal">Phone or WhatsApp</label>
                                <input type="tel" id="clientPhone-modal" class="field-input" placeholder="" required>
                            </div>
                        </div>
                        <div class="form-field full-width">
                            <label class="field-label" for="clientEmail-modal">Email</label>
                            <input type="email" id="clientEmail-modal" class="field-input" placeholder="" required>
                        </div>
                        <div class="form-field full-width">
                            <label class="field-label" for="clientNotes-modal">
                                Anything we should know? <span class="optional-tag">(optional)</span>
                            </label>
                            <textarea id="clientNotes-modal" class="field-textarea" rows="3" placeholder="For example: two directors, one foreign shareholder, planned company name"></textarea>
                        </div>
                    </div>

                    <!-- Submit -->
                    <button type="submit" class="confirm-booking-btn" id="confirmBookingBtn-modal">
                        <span>Confirm booking</span>
                        <div class="btn-spinner" id="btnSpinner-modal"></div>
                    </button>
                </form>
            </div>
            <!-- ===== /Booking Card ===== -->

        </div>
    </div>

    <!-- =========================================================================
         Booking Confirmation & Microsoft Teams / WhatsApp Modal
         ========================================================================= -->
    <div class="booking-modal-overlay" id="bookingSuccessModal" role="dialog" aria-modal="true" aria-labelledby="modalSuccessTitle">
        <div class="booking-modal">
            <button type="button" class="booking-modal-close" id="closeModalBtn" aria-label="Close modal">
                <i class="fa fa-times"></i>
            </button>

            <div class="modal-success-icon">
                <i class="fa fa-check"></i>
            </div>

            <h3 class="modal-title" id="modalSuccessTitle">Booking Confirmed!</h3>
            <p class="modal-desc">Your consultation has been scheduled with our Sri Lankan consultant. Microsoft Teams meeting invitation, Outlook calendar schedule, and WhatsApp notification have been generated.</p>

            <div class="modal-details-box">
                <div class="modal-details-row">
                    <span class="modal-details-label">Booking Reference:</span>
                    <span class="modal-details-val" id="modalBookingId">LK-TEAMS-XXXXX</span>
                </div>
                <div class="modal-details-row">
                    <span class="modal-details-label">Consultation Type:</span>
                    <span class="modal-details-val" id="modalService">Company registration</span>
                </div>
                <div class="modal-details-row">
                    <span class="modal-details-label">Scheduled Slot:</span>
                    <span class="modal-details-val" id="modalDateTime">Fri, 16 Oct @ 07:00-07:45</span>
                </div>
                <div class="modal-details-row">
                    <span class="modal-details-label">Client Name:</span>
                    <span class="modal-details-val" id="modalClientName">-</span>
                </div>
                <div class="modal-details-row">
                    <span class="modal-details-label">Client Contact:</span>
                    <span class="modal-details-val" id="modalClientContact">-</span>
                </div>
                <div class="modal-details-row">
                    <span class="modal-details-label">Meeting Platform:</span>
                    <span class="modal-details-val" id="modalPlatform">
                        Microsoft Teams
                        <span class="teams-platform-pill"><i class="fa fa-video-camera"></i> Video Meeting</span>
                    </span>
                </div>
                <div class="modal-details-row">
                    <span class="modal-details-label">Consultant WhatsApp:</span>
                    <span class="modal-details-val text-success" id="modalConsultantNumber">+94 77 660 0799</span>
                </div>
            </div>

            <div class="modal-actions">
                <!-- Connect to Microsoft Teams -->
                <a href="#" id="modalTeamsJoinBtn" target="_blank" class="btn-teams-connect">
                    <i class="fa fa-video-camera"></i>
                    <span>Connect &amp; Join Microsoft Teams Meeting</span>
                </a>

                <!-- Open WhatsApp to Consultant -->
                <a href="#" id="modalWhatsAppBtn" target="_blank" class="btn-whatsapp-send">
                    <i class="fa fa-whatsapp"></i>
                    <span>Send / Re-open WhatsApp to Consultant</span>
                </a>

                <!-- Calendar Invite (.ics) -->
                <button type="button" id="modalCalendarBtn" class="btn-calendar-ics">
                    <i class="fa fa-calendar"></i>
                    <span>Download MS Teams Calendar Invite (.ics)</span>
                </button>
            </div>
        </div>
    </div>

    <?php wp_footer(); ?>
</body>
</html>
