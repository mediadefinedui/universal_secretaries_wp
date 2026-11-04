<?php
/**
 * Template Name: Services Page
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
                                <li>Services</li>
                            </ul>
                            <h1><?php the_title(); ?></h1>
                            <p>End-to-end company incorporation, chartered secretarial, taxation and accounting solutions in Sri Lanka.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--// Breadcrumb Area -->

        <!-- Page Content -->
        <main class="page-content">

            <!-- Service Area -->
            <section id="service-area" class="cr-section pg-features-area section-padding--xlg">
                <div class="container">

                    <!-- Service 1: Company Registration -->
                    <div class="pg-features">
                        <div class="row align-items-center">
                            <div class="col-xl-8 col-lg-7 order-2 order-lg-1">
                                <div class="pg-features__description">
                                    <span class="pg-features__icon">
                                        <i class="flaticon-shield"></i>
                                    </span>
                                    <div class="pg-features__content">
                                        <h3>COMPANY REGISTRATION IN SRI LANKA</h3>
                                        <p>We register your Pvt Ltd company on eROC, file the beneficial ownership forms the Registrar now requires, and stay on as your Company Secretary.</p>
                                        <ul class="pg-service-features-list">
                                            <li><i class="fa fa-check"></i> Name approval and Section 7 checks on eROC</li>
                                            <li><i class="fa fa-check"></i> Preparation &amp; filing of Forms 1, 18, and 19 on eROC</li>
                                            <li><i class="fa fa-check"></i> Beneficial ownership: <b>BO 5 and BO 1</b> at incorporation</li>
                                            <li><i class="fa fa-check"></i> BO 2, BO 3, BO 4 and BO 7 for existing companies</li>
                                            <li><i class="fa fa-check"></i> Qualified Company Secretary appointment under Section 221</li>
                                            <li><i class="fa fa-check"></i> Annual Return (Form 15) and statutory filings on Forms 13, 20 and 6</li>
                                        </ul>
                                        <div class="pg-features__btn mt-4">
                                            <a class="cr-btn" href="<?php echo esc_url( home_url( '/appointment/?service=Company%20registration' ) ); ?>">
                                                <span>Book a registration consultation</span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-xl-4 col-lg-5 wow fadeInRight order-1 order-lg-2">
                                <div class="pg-features__thumb">
                                    <img src="<?php echo esc_url( $theme_uri . '/assets/images/services/company-registration-sri-lanka.jpg' ); ?>" alt="Company registration in Sri Lanka" loading="lazy">
                                </div>
                            </div>
                        </div>
                    </div>
                    <!--// Service 1 -->

                    <!-- Service 2: Tax Consultation -->
                    <div class="pg-features">
                        <div class="row align-items-center">
                            <div class="col-xl-4 col-lg-5 wow fadeInLeft">
                                <div class="pg-features__thumb">
                                    <img style="background-color: #fff;" src="<?php echo esc_url( $theme_uri . '/assets/images/about/about-thumbnail.webp' ); ?>" alt="Tax consultation in Sri Lanka" loading="lazy">
                                </div>
                            </div>
                            <div class="col-xl-8 col-lg-7">
                                <div class="pg-features__description">
                                    <span class="pg-features__icon">
                                        <i class="flaticon-team"></i>
                                    </span>
                                    <div class="pg-features__content">
                                        <h3>TAX CONSULTATION</h3>
                                        <p>Tax planning and compliance for individuals and companies in Sri Lanka, from the first strategic plan to the final return.</p>
                                        <ul class="pg-service-features-list">
                                            <li><i class="fa fa-check"></i> Corporate income tax &amp; individual tax planning</li>
                                            <li><i class="fa fa-check"></i> <b>VAT</b> registration, quarterly assessments, and compliance</li>
                                            <li><i class="fa fa-check"></i> Capital gains tax (<b>CGT</b>) calculation and filings</li>
                                            <li><i class="fa fa-check"></i> Income tax returns and self-assessment payments</li>
                                            <li><i class="fa fa-check"></i> IRD correspondence, dispute representation, EPF and ETF compliance</li>
                                        </ul>
                                        <div class="pg-features__btn mt-4">
                                            <a class="cr-btn" href="<?php echo esc_url( home_url( '/appointment/?service=Tax%20consultation' ) ); ?>">
                                                <span>Book a tax consultation</span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!--// Service 2 -->

                    <!-- Service 3: Online Bookkeeping -->
                    <div class="pg-features">
                        <div class="row align-items-center">
                            <div class="col-xl-8 col-lg-7 order-2 order-lg-1">
                                <div class="pg-features__description">
                                    <span class="pg-features__icon">
                                        <i class="flaticon-24-hours"></i>
                                    </span>
                                    <div class="pg-features__content">
                                        <h3>ONLINE BOOKKEEPING SERVICE</h3>
                                        <p>Your books kept accurately online every month, so the figures are ready when your tax return, VAT filing or auditor needs them.</p>
                                        <ul class="pg-service-features-list">
                                            <li><i class="fa fa-check"></i> <b>Online bookkeeping</b>, with documents shared digitally and securely</li>
                                            <li><i class="fa fa-check"></i> Monthly ledgers, general journals, and bank reconciliations</li>
                                            <li><i class="fa fa-check"></i> Payables and receivables tracking with regular financial reports</li>
                                            <li><i class="fa fa-check"></i> Complete financial records audit-ready for auditors and the IRD</li>
                                            <li><i class="fa fa-check"></i> Transparent fixed monthly fee, agreed upfront</li>
                                        </ul>
                                        <div class="pg-features__btn mt-4">
                                            <a class="cr-btn" href="<?php echo esc_url( home_url( '/appointment/?service=Bookkeeping' ) ); ?>">
                                                <span>Book a bookkeeping consultation</span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-xl-4 col-lg-5 wow fadeInRight order-1 order-lg-2">
                                <div class="pg-features__thumb">
                                    <img src="<?php echo esc_url( $theme_uri . '/assets/images/advisors/advisor-3.webp' ); ?>" alt="Online bookkeeping in Sri Lanka" loading="lazy">
                                </div>
                            </div>
                        </div>
                    </div>
                    <!--// Service 3 -->

                </div>
            </section>
            <!--// Service Area -->

        </main>
        <!-- //Page Content -->

<?php
get_footer();

