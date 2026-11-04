<?php
/**
 * Template Name: Features Page
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
                                <li>Features</li>
                            </ul>
                            <h1><?php the_title(); ?></h1>
                            <p>Why businesses and investors trust Universal Secretaries for company incorporation and compliance in Sri Lanka.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--// Breadcrumb Area -->

        <!-- Page Content -->
        <main class="page-content">

            <!-- Features Area -->
            <section id="pg-features-area" class="cr-section pg-features-area section-padding--xlg">
                <div class="container">

                    <!-- Feature 1 -->
                    <div class="pg-features">
                        <div class="row align-items-center">
                            <div class="col-xl-8 col-lg-7 order-2 order-lg-1">
                                <div class="pg-features__description">
                                    <span class="pg-features__icon">
                                        <i class="flaticon-shield"></i>
                                    </span>
                                    <div class="pg-features__content">
                                        <h3>ENSURE STATUTORY COMPLIANCE &amp; SECURITY</h3>
                                        <p>Protecting your company against regulatory infractions, statutory fines, and missed ROC deadlines. We manage your statutory registers, Beneficial Ownership records, and eROC submissions with rigorous legal verification.</p>
                                        <p>With ever-evolving Registrar regulations, including mandatory BO Form 1 through Form 7 filings, our experienced team provides absolute legal assurance at every stage.</p>
                                    </div>
                                </div>
                            </div>
                            <div class="col-xl-4 col-lg-5 wow fadeInRight order-1 order-lg-2">
                                <div class="pg-features__thumb">
                                    <img src="<?php echo esc_url( $theme_uri . '/assets/images/feature/feature-thumb-1.webp' ); ?>" alt="Ensure Security">
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Feature 2 -->
                    <div class="pg-features">
                        <div class="row align-items-center">
                            <div class="col-xl-4 col-lg-5 wow fadeInLeft">
                                <div class="pg-features__thumb">
                                    <img src="<?php echo esc_url( $theme_uri . '/assets/images/feature/feature-thumb-2.webp' ); ?>" alt="Expert Team">
                                </div>
                            </div>
                            <div class="col-xl-8 col-lg-7">
                                <div class="pg-features__description">
                                    <span class="pg-features__icon">
                                        <i class="flaticon-team"></i>
                                    </span>
                                    <div class="pg-features__content">
                                        <h3>CHARTERED SECRETARIAL &amp; TAX EXPERTISE</h3>
                                        <p>Our team comprises qualified Chartered Accountants (ACA), licensed Company Secretaries, and tax advisors with cross-border and multinational corporate experience.</p>
                                        <p>We work closely with company directors to optimize corporate tax liabilities, structure share transfers, and maintain clear books for external audit and IRD reviews.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Feature 3 -->
                    <div class="pg-features">
                        <div class="row align-items-center">
                            <div class="col-xl-8 col-lg-7 order-2 order-lg-1">
                                <div class="pg-features__description">
                                    <span class="pg-features__icon">
                                        <i class="flaticon-24-hours"></i>
                                    </span>
                                    <div class="pg-features__content">
                                        <h3>DEDICATED CORPORATE ADVISORY SUPPORT</h3>
                                        <p>Direct access to your assigned corporate secretary and consultant via phone, WhatsApp, and Microsoft Teams. No automated call centres or unassigned client queues.</p>
                                        <p>Prompt advice on board resolutions, dividend declarations, AGM compliance, and urgent corporate filings whenever your company needs guidance.</p>
                                    </div>
                                </div>
                            </div>
                            <div class="col-xl-4 col-lg-5 wow fadeInRight order-1 order-lg-2">
                                <div class="pg-features__thumb">
                                    <img src="<?php echo esc_url( $theme_uri . '/assets/images/feature/feature-thumb-3.webp' ); ?>" alt="Dedicated Support">
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </section>
            <!--// Features Area -->

        </main>
        <!-- //Page Content -->

<?php
get_footer();

