<?php
/**
 * Template Name: Advisor Details Page
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
                                <li><a href="<?php echo esc_url( home_url( '/advisors/' ) ); ?>">Advisors</a></li>
                                <li><?php the_title(); ?></li>
                            </ul>
                            <h1><?php the_title(); ?></h1>
                            <p>Senior Chartered Advisor at Universal Secretaries.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--// Breadcrumb Area -->

        <!-- Page Content -->
        <main class="page-content">

            <!-- Advisor Details -->
            <div class="advisor-details-area bg--white section-padding--xlg">
                <div class="container">
                    <div class="pg-advisor">
                        <div class="pg-advisor__thumb">
                            <img src="<?php echo esc_url( $theme_uri . '/assets/images/advisors/advisor-details/advisor-1.webp' ); ?>" alt="Advisor Details Thumb">
                        </div>
                        <div class="pg-advisor__details">
                            <h2>DAVID MILLER</h2>
                            <h5>TAX ADVISOR</h5>
                            <p>Senior corporate tax advisor specializing in Sri Lankan corporate income tax, IRD compliance, and statutory assessments with over a decade of financial consulting experience.</p>

                            <div class="pg-advisor__progress">
                                <div class="pg-advisor__progress__single">
                                    <h6>Tax Expert</h6>
                                    <div class="progress">
                                        <div class="progress-bar wow slideInLeft" data-wow-delay="0.2s" role="progressbar" style="width: 90%;" aria-valuenow="90" aria-valuemin="0" aria-valuemax="100"><span>90%</span></div>
                                    </div>
                                </div>
                                <div class="pg-advisor__progress__single">
                                    <h6>Finance Expert</h6>
                                    <div class="progress">
                                        <div class="progress-bar wow slideInLeft" data-wow-delay="0.3s" role="progressbar" style="width: 85%;" aria-valuenow="85" aria-valuemin="0" aria-valuemax="100"><span>85%</span></div>
                                    </div>
                                </div>
                                <div class="pg-advisor__progress__single">
                                    <h6>Corporate Secretarial</h6>
                                    <div class="progress">
                                        <div class="progress-bar wow slideInLeft" data-wow-delay="0.4s" role="progressbar" style="width: 92%;" aria-valuenow="92" aria-valuemin="0" aria-valuemax="100"><span>92%</span></div>
                                    </div>
                                </div>
                            </div>

                            <ul class="social-area">
                                <li class="wow fadeInRight" data-wow-delay="0.2s"><a href="#"><i class="fa fa-facebook"></i></a></li>
                                <li class="wow fadeInRight" data-wow-delay="0.4s"><a href="#"><i class="fa fa-linkedin"></i></a></li>
                                <li class="wow fadeInRight" data-wow-delay="0.6s"><a href="#"><i class="fa fa-twitter"></i></a></li>
                            </ul>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-5">
                            <div class="pg-advisor__experience">
                                <h3>EXPERIENCE</h3>
                                <ul>
                                    <li>
                                        <h6>2020 - Present</h6>
                                        <p>Senior Tax Consultant, Universal Secretaries (Pvt) Ltd</p>
                                    </li>
                                    <li>
                                        <h6>2015 - 2020</h6>
                                        <p>Senior Associate - Tax Compliance &amp; Corporate Advisory</p>
                                    </li>
                                    <li>
                                        <h6>2012 - 2015</h6>
                                        <p>Corporate Secretarial &amp; Audit Associate</p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="col-lg-7">
                            <div class="pg-advisor__biography">
                                <h3>Biography</h3>
                                <p>Oversees complex multi-tier beneficial ownership reporting, cross-border shareholder structures, and corporate restructuring for foreign direct investment (FDI) entities in Sri Lanka.</p>
                                <h4>Need any help or consultation?</h4>
                                <h6>Email - <a href="mailto:tax@universalsecretaries.com">tax@universalsecretaries.com</a></h6>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!--// Advisor Details -->

        </main>
        <!-- //Page Content -->

<?php
get_footer();

