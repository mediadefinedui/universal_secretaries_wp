<?php
/**
 * Template Name: Contact Us Page
 *
 * @package Universal_Secretaries
 */

get_header();

$address    = universal_get_option( 'office_address', "No. 55/1/A, Koswattha Road, Rajagiriya,\nColombo, Sri Lanka, 20000" );
$map_url    = universal_get_option( 'office_map_url', 'https://maps.google.com/maps?q=6.8996595,79.8951185&z=16' );
$phone      = universal_get_option( 'contact_phone', '+94 77 40 87 869' );
$hours      = universal_get_option( 'consultation_hours', 'Mon - Fri: 7:00 AM – 12:00 Noon (SL Time)' );
$tax_email  = universal_get_option( 'contact_tax_email', 'tax@universalsecretaries.com' );
?>

        <!-- Breadcrumb Area -->
        <div id="cr-breadcrumb-area" class="cr-breadcrumb-area section-padding--md">
            <div class="container">
                <div class="row">
                    <div class="col-xl-6 col-lg-7 col-md-8">
                        <div class="cr-breadcrumb">
                            <ul class="cr-breadcrumb__pagination">
                                <li><a href="<?php echo esc_url( home_url( '/' ) ); ?>">Home</a></li>
                                <li>Contact</li>
                            </ul>
                            <h1><?php the_title(); ?></h1>
                            <p>Get in touch with our qualified chartered secretaries and tax advisors in Colombo.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--// Breadcrumb Area -->

        <!-- Page Content -->
        <main class="page-content">

            <!-- Pg Contact Main Area -->
            <div class="pg-contact-main-area">
                <div class="container">

                    <!-- Contact Info Quick Cards -->
                    <div class="contact-info-cards">
                        <div class="row g-4 justify-content-center">

                            <!-- Card 1: Office Location -->
                            <div class="col-lg-4 col-md-6">
                                <div class="contact-info-card text-center h-100">
                                    <div class="contact-info-card__icon">
                                        <i class="fa fa-map-marker"></i>
                                    </div>
                                    <h5 class="contact-info-card__title">Office Location</h5>
                                    <p class="contact-info-card__desc">
                                        <?php echo nl2br( esc_html( $address ) ); ?>
                                    </p>
                                    <a href="<?php echo esc_url( $map_url ); ?>" target="_blank" rel="noopener noreferrer" class="contact-info-card__link">
                                        <span>View on Google Maps</span> <i class="fa fa-arrow-right"></i>
                                    </a>
                                </div>
                            </div>

                            <!-- Card 2: Phone -->
                            <div class="col-lg-4 col-md-6">
                                <div class="contact-info-card text-center h-100">
                                    <div class="contact-info-card__icon">
                                        <i class="fa fa-phone"></i>
                                    </div>
                                    <h5 class="contact-info-card__title">Call Directly</h5>
                                    <p class="contact-info-card__desc">
                                        <a href="tel:<?php echo esc_attr( preg_replace( '/[^0-9+]/', '', $phone ) ); ?>"><?php echo esc_html( $phone ); ?></a><br>
                                        <span class="consult-hours"><?php echo esc_html( $hours ); ?></span>
                                    </p>
                                    <a href="<?php echo esc_url( home_url( '/appointment/' ) ); ?>" class="contact-info-card__link">
                                        <span>Book Appointment</span> <i class="fa fa-arrow-right"></i>
                                    </a>
                                </div>
                            </div>

                            <!-- Card 3: Email -->
                            <div class="col-lg-4 col-md-6">
                                <div class="contact-info-card text-center h-100">
                                    <div class="contact-info-card__icon">
                                        <i class="fa fa-envelope-o"></i>
                                    </div>
                                    <h5 class="contact-info-card__title">Email Us</h5>
                                    <p class="contact-info-card__desc">
                                        <a href="mailto:<?php echo esc_attr( $tax_email ); ?>"><?php echo esc_html( $tax_email ); ?></a><br>
                                        <span class="consult-hours">Online inquiries &amp; corporate filing</span>
                                    </p>
                                    <a href="mailto:<?php echo esc_attr( $tax_email ); ?>" class="contact-info-card__link">
                                        <span>Send an Email</span> <i class="fa fa-arrow-right"></i>
                                    </a>
                                </div>
                            </div>

                        </div>
                    </div>
                    <!--// Contact Info Quick Cards -->

                    <!-- Two Columns: Form & Information -->
                    <div class="contact-two-columns mt-5">
                        <div class="row g-4 g-lg-5 align-items-stretch">

                            <!-- Column 1: Contact Form -->
                            <div class="col-lg-6 d-flex flex-column">
                                <div class="contact-form-box h-100">
                                    <div class="pg-appintment">
                                        <div class="pg-appintment__title">
                                            <h2>SEND A MESSAGE</h2>
                                            <p class="contact-form-subtitle">Have questions regarding tax filing, company registration, or secretarial advisory? Drop us a line below.</p>
                                        </div>
                                        <div class="pg-appintment__box">
                                            <form id="contact-form" action="#" method="POST">
                                                <div class="row">
                                                    <div class="col-sm-6">
                                                        <div class="single-input">
                                                            <input type="text" name="name" id="name" placeholder="Name" required>
                                                        </div>
                                                    </div>
                                                    <div class="col-sm-6">
                                                        <div class="single-input">
                                                            <input type="email" name="email" id="email" placeholder="Email" required>
                                                        </div>
                                                    </div>
                                                    <div class="col-sm-6">
                                                        <div class="single-input">
                                                            <input type="text" name="subject" id="subject" placeholder="Subject">
                                                        </div>
                                                    </div>
                                                    <div class="col-sm-6">
                                                        <div class="single-input">
                                                            <input type="text" name="phone" id="phone" placeholder="Phone">
                                                        </div>
                                                    </div>
                                                    <div class="col-12">
                                                        <div class="single-input">
                                                            <textarea name="message" cols="30" rows="5" placeholder="Message" required></textarea>
                                                        </div>
                                                    </div>
                                                    <div class="col-12">
                                                        <div class="single-input button">
                                                            <button type="submit" class="cr-btn"><span>Send Message</span></button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Column 2: Map Embed -->
                            <div class="col-lg-6 d-flex flex-column">
                                <div class="contact-map-box h-100" style="min-height: 400px; border-radius: 8px; overflow: hidden; box-shadow: 0 5px 25px rgba(0,0,0,0.06);">
                                    <iframe
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.84065675409!2d79.8929298153406!3d6.899659520478051!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae25a1b3260d3d5%3A0xc4aa089158564a5c!2sKoswatta%20Rd%2C%20Rajagiriya!5e0!3m2!1sen!2slk!4v1698000000000!5m2!1sen!2slk"
                                        width="100%"
                                        height="100%"
                                        style="border:0; min-height: 400px;"
                                        allowfullscreen=""
                                        loading="lazy"
                                        referrerpolicy="no-referrer-when-downgrade">
                                    </iframe>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>

        </main>
        <!-- //Page Content -->

<?php
get_footer();

