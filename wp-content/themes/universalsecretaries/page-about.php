<?php
/**
 * Template Name: About Us Page
 *
 * @package Universal_Secretaries
 */

get_header();
$theme_uri = get_template_directory_uri();
?>

        <!-- Breadcrumb Area -->
        <div id="cr-breadcrumb-area" class="cr-breadcrumb-area section-padding--md">
            <div class="container">
                <div class="row">
                    <div class="col-xl-6 col-lg-7 col-md-8">
                        <div class="cr-breadcrumb">
                            <ul class="cr-breadcrumb__pagination">
                                <li><a href="<?php echo esc_url( home_url( '/' ) ); ?>">Home</a></li>
                                <li>About</li>
                            </ul>
                            <h1><?php the_title(); ?></h1>
                            <p>Company secretarial, tax compliance and financial advisory services in Sri Lanka since 2012.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--// Breadcrumb Area -->

        <!-- Page Content -->
        <main class="page-content">

            <!-- About Area -->
            <section id="about-area" class="cr-section about-area bg--white">
                <div class="container">
                    <div class="row justify-content-center align-items-center">
                        <div class="col-lg-10">
                            <div class="about-area__content2 text-center">
                                <h4>WE ARE “<span class="color--theme">Universal Secretaries</span>”</h4>
                                <h3 class="cd-headline cx-heading slide">
                                    <?php echo esc_html( universal_get_field( 'about_main_heading', null, 'PROVIDE BEST TAX SOLUTION FOR YOUR BUSINESS PERFORMANCE SUCCESS TO GROWUP' ) ); ?>
                                </h3>
                                <p>Universal Secretaries provides comprehensive company secretarial, statutory compliance, tax advisory, and bookkeeping services tailored to Sri Lankan private limited companies, overseas subsidiaries, and high-net-worth individuals.</p>
                                <p>With over a decade of hands-on experience navigating the Registrar of Companies (ROC), Inland Revenue Department (IRD), and central banking regulations, we ensure your business remains legally sound, compliant, and poised for sustained growth.</p>
                                <a href="<?php echo esc_url( home_url( '/services/' ) ); ?>" class="cr-btn">
                                    <span>Explore Our Services</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <!-- //About Area -->

            <!-- Team Area -->
            <section id="team-area" class="advisor-area bg--white section-padding--xlg">
                <div class="container">

                    <!-- Founder Showcase -->
                    <div class="founder-showcase mb-5">
                        <div class="row align-items-center">
                            <div class="col-lg-5">
                                <div class="about-area__image">
                                    <?php
                                    $founder_img = universal_get_field( 'founder_image' );
                                    if ( empty( $founder_img ) ) {
                                        $founder_img = $theme_uri . '/assets/images/advisors/advisor-1.webp';
                                    }
                                    ?>
                                    <img class="wow slideInLeft" style="width: 100%; border-radius: 8px;" src="<?php echo esc_url( $founder_img ); ?>" alt="<?php echo esc_attr( universal_get_field( 'founder_name', null, 'Sudarshana Prashad' ) ); ?>">
                                </div>
                            </div>
                            <div class="col-lg-7">
                                <div class="section-title">
                                    <h4><?php echo esc_html( universal_get_field( 'founder_tag', null, 'FOUNDER & OWNER' ) ); ?></h4>
                                    <h2>
                                        <?php echo esc_html( universal_get_field( 'founder_name', null, 'Sudarshana Prashad' ) ); ?><br />
                                        <span class="color--theme"><?php echo esc_html( universal_get_field( 'founder_role', null, 'Managing Director, Universal Secretaries (Pvt) Ltd' ) ); ?></span>
                                    </h2>
                                    <p><?php echo esc_html( universal_get_field( 'founder_bio_1', null, 'Prashad founded Universal Secretaries in 2012 and has spent over a decade in Sri Lankan and international taxation, financial reporting and compliance. He also founded TaxFiling.lk and brings working experience of Canadian taxation.' ) ); ?></p>
                                    <p><?php echo esc_html( universal_get_field( 'founder_bio_2', null, 'He reviews the work on every client file, so you deal with a firm that is run by its owner.' ) ); ?></p>
                                    <div class="mt-4">
                                        <a href="<?php echo esc_url( home_url( '/appointment/' ) ); ?>" class="cr-btn">
                                            <span>Schedule Consultation</span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Qualified Secretarial & Advisory Team -->
                    <div class="text-center mb-4">
                        <h4>OUR QUALIFIED ADVISORS</h4>
                        <h2>MEET OUR <span class="color--theme">EXPERT TEAM</span></h2>
                    </div>

                    <div class="row advisors">
                        <!-- Single Advisor -->
                        <div class="col-lg-4 col-sm-6">
                            <figure class="advisor">
                                <div class="advisor__image">
                                    <img src="<?php echo esc_url( $theme_uri . '/assets/images/advisors/advisor-2.webp' ); ?>" alt="Nishadi Jayasiri">
                                </div>
                                <figcaption class="advisor__content">
                                    <h6>Nishadi Jayasiri</h6>
                                    <p>Company Secretary <br /> <small>ACA · Qualified Company Secretary</small></p>
                                </figcaption>
                            </figure>
                        </div>

                        <!-- Single Advisor -->
                        <div class="col-lg-4 col-sm-6">
                            <figure class="advisor">
                                <div class="advisor__image">
                                    <img src="<?php echo esc_url( $theme_uri . '/assets/images/advisors/advisor-3.webp' ); ?>" alt="Buddhika Ekanayaka">
                                </div>
                                <figcaption class="advisor__content">
                                    <h6>Buddhika Ekanayaka</h6>
                                    <p>Audit &amp; Reporting <br /><small>ACA · ASA (CPA Australia) · Ex-EY</small></p>
                                </figcaption>
                            </figure>
                        </div>

                        <!-- Single Advisor -->
                        <div class="col-lg-4 col-sm-6">
                            <figure class="advisor">
                                <div class="advisor__image">
                                    <img src="<?php echo esc_url( $theme_uri . '/assets/images/advisors/advisor-4.webp' ); ?>" alt="Umesha Kuruwita">
                                </div>
                                <figcaption class="advisor__content">
                                    <h6>Umesha Kuruwita</h6>
                                    <p>Tax &amp; Finance <br /> <small>ACA · Tax &amp; Finance Specialist</small></p>
                                </figcaption>
                            </figure>
                        </div>
                    </div>

                </div>
            </section>
            <!--// Team Area -->

        </main>
        <!-- //Page Content -->

<?php
get_footer();

