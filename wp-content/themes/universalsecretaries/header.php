<!doctype html>
<html <?php language_attributes(); ?> class="no-js">
<head>
    <meta charset="<?php bloginfo( 'charset' ); ?>">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="shortcut icon" type="image/x-icon" href="<?php echo esc_url( get_template_directory_uri() . '/assets/images/favicon.webp' ); ?>">
    <?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
    <?php wp_body_open(); ?>

    <div class="fakeloader"></div>

    <!-- Main wrapper -->
    <div class="wrapper" id="wrapper">

        <!-- Header -->
        <header id="header" class="header sticky--header">

            <!-- Header Top Area -->
            <div class="header__top bg--blue d-none d-lg-block">
                <div class="container">
                    <div class="header__top__inner">
                        <div class="important-notice">
                            <p>
                                <label class="pearl">
                                    <?php echo esc_html( universal_get_option( 'top_notice_badge', 'NEW RULE' ) ); ?>
                                </label>
                                <?php echo esc_html( universal_get_option( 'top_notice_text', 'NOTICE: The BO Form 1 is currently unavailable on the ROC portal. Please do not attempt to submit any documents to the Registrar of Companies (ROC). For assistance, contact our office at 011-4518775.' ) ); ?>
                            </p>
                            <a href="<?php echo esc_url( universal_get_option( 'top_notice_link_url', home_url( '/news-and-updates/' ) ) ); ?>">
                                <?php echo esc_html( universal_get_option( 'top_notice_link_text', 'Talk us about your BO forms →' ) ); ?>
                            </a>
                        </div>
                        <div class="header__top__button">
                            <a class="cr-btn cr-btn--lg btn-open-appointment-modal" href="#consultationBookingModal" id="btnHeaderAppointment">
                                <span><?php echo esc_html( universal_get_option( 'header_appointment_btn_text', 'Make an appointment' ) ); ?></span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <!--// Header Top Area -->

            <!-- Header Bottom Area -->
            <div class="header__bottom bg--white">
                <div class="container">
                    <div class="header__bottom__inner">

                        <div class="header__logo">
                            <?php if ( has_custom_logo() ) : ?>
                                <?php the_custom_logo(); ?>
                            <?php else : ?>
                                <a href="<?php echo esc_url( home_url( '/' ) ); ?>">
                                    <img src="<?php echo esc_url( get_template_directory_uri() . '/assets/images/logo/logo-theme.webp' ); ?>" alt="<?php bloginfo( 'name' ); ?>">
                                </a>
                            <?php endif; ?>
                        </div>

                        <!-- Main Navigation -->
                        <nav id="main-navigation" class="header__menu main-navigation d-none d-lg-flex">
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

                        <button class="header__toggle d-lg-none" data-bs-toggle="offcanvas" data-bs-target="#offcanvasMenu" aria-label="Toggle Navigation">
                            <span></span>
                            <span></span>
                            <span></span>
                        </button>
                    </div>
                </div>
            </div>
            <!--// Header Bottom Area -->

        </header>
        <!-- //Header -->
