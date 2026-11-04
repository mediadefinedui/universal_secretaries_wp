<?php
/**
 * Template Name: Advisors Page
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
                                <li>Advisors</li>
                            </ul>
                            <h1><?php the_title(); ?></h1>
                            <p>Our senior corporate secretarial, audit, and chartered tax advisory professionals.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--// Breadcrumb Area -->

        <!-- Page Content -->
        <main class="page-content">

            <!-- Team Area 1 -->
            <section id="team-area" class="advisor-area bg--white section-padding--xlg">
                <div class="container">
                    <div class="row justify-content-center">
                        <div class="col-lg-8 col-md-10">
                            <div class="section-title text-center">
                                <h4>OUR SPECIALISTS</h4>
                                <h2>MEET OUR <span class="color--theme">TAX &amp; CORPORATE ADVISORS</span></h2>
                                <p>Every client file is overseen by seasoned practitioners with deep expertise in Sri Lankan corporate law, IRD guidelines, and cross-border structuring.</p>
                            </div>
                        </div>
                    </div>

                    <div class="row advisors">
                        <!-- Single Advisor -->
                        <div class="col-lg-3 col-sm-6">
                            <figure class="advisor">
                                <div class="advisor__image">
                                    <img src="<?php echo esc_url( $theme_uri . '/assets/images/advisors/advisor-1.webp' ); ?>" alt="Sudarshana Prashad">
                                </div>
                                <figcaption class="advisor__content">
                                    <h6>Sudarshana Prashad</h6>
                                    <p>Managing Director <br><small>Chartered Tax Advisor</small></p>
                                </figcaption>
                            </figure>
                        </div>

                        <!-- Single Advisor -->
                        <div class="col-lg-3 col-sm-6">
                            <figure class="advisor">
                                <div class="advisor__image">
                                    <img src="<?php echo esc_url( $theme_uri . '/assets/images/advisors/advisor-2.webp' ); ?>" alt="Nishadi Jayasiri">
                                </div>
                                <figcaption class="advisor__content">
                                    <h6>Nishadi Jayasiri</h6>
                                    <p>Company Secretary <br><small>ACA · Qualified Secretary</small></p>
                                </figcaption>
                            </figure>
                        </div>

                        <!-- Single Advisor -->
                        <div class="col-lg-3 col-sm-6">
                            <figure class="advisor">
                                <div class="advisor__image">
                                    <img src="<?php echo esc_url( $theme_uri . '/assets/images/advisors/advisor-3.webp' ); ?>" alt="Buddhika Ekanayaka">
                                </div>
                                <figcaption class="advisor__content">
                                    <h6>Buddhika Ekanayaka</h6>
                                    <p>Audit &amp; Reporting <br><small>ACA · ASA (CPA Australia)</small></p>
                                </figcaption>
                            </figure>
                        </div>

                        <!-- Single Advisor -->
                        <div class="col-lg-3 col-sm-6">
                            <figure class="advisor">
                                <div class="advisor__image">
                                    <img src="<?php echo esc_url( $theme_uri . '/assets/images/advisors/advisor-4.webp' ); ?>" alt="Umesha Kuruwita">
                                </div>
                                <figcaption class="advisor__content">
                                    <h6>Umesha Kuruwita</h6>
                                    <p>Tax &amp; Finance <br><small>ACA · Tax Specialist</small></p>
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

