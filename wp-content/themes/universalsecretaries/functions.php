<?php
/**
 * Universal Secretaries WordPress Theme Functions
 *
 * @package Universal_Secretaries
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

// Include Custom Booking API & REST Endpoints
require_once get_template_directory() . '/inc/booking-api.php';

// Include ACF Fields Configuration
require_once get_template_directory() . '/inc/acf-fields.php';

/**
 * Theme setup.
 */
function universal_secretaries_setup() {
    load_theme_textdomain(
        'universal-secretaries',
        get_template_directory() . '/languages'
    );

    add_theme_support( 'title-tag' );
    add_theme_support( 'post-thumbnails' );
    add_theme_support( 'custom-logo', array(
        'height'      => 60,
        'width'       => 240,
        'flex-height' => true,
        'flex-width'  => true,
    ) );
    add_theme_support( 'automatic-feed-links' );
    add_theme_support( 'responsive-embeds' );

    add_theme_support(
        'html5',
        array(
            'search-form',
            'comment-form',
            'comment-list',
            'gallery',
            'caption',
            'style',
            'script',
        )
    );

    register_nav_menus(
        array(
            'primary' => __( 'Primary Navigation Menu', 'universal-secretaries' ),
            'footer'  => __( 'Footer Quick Links Menu', 'universal-secretaries' ),
        )
    );
}
add_action( 'after_setup_theme', 'universal_secretaries_setup' );

/**
 * Helper to retrieve ACF Option or fallback
 */
function universal_get_option( $name, $default = '' ) {
    if ( function_exists( 'get_field' ) ) {
        $val = get_field( $name, 'option' );
        if ( ! empty( $val ) ) {
            return $val;
        }
    }
    return $default;
}

/**
 * Helper to retrieve ACF Field or fallback
 */
function universal_get_field( $name, $post_id = null, $default = '' ) {
    if ( function_exists( 'get_field' ) ) {
        $val = get_field( $name, $post_id );
        if ( ! empty( $val ) ) {
            return $val;
        }
    }
    return $default;
}

/**
 * Enqueue theme styles and scripts.
 */
function universal_secretaries_enqueue_assets() {
    $theme_uri = get_template_directory_uri();
    $theme_dir = get_template_directory();

    // 1. Google Fonts & Icons
    wp_enqueue_style(
        'universal-font-josefin',
        'https://fonts.googleapis.com/css?family=Josefin+Sans:300,400,600,700&display=swap',
        array(),
        null
    );

    wp_enqueue_style(
        'universal-font-jakarta',
        'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap',
        array(),
        null
    );

    wp_enqueue_style(
        'universal-font-symbols',
        'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&icon_names=keyboard_double_arrow_right',
        array(),
        null
    );

    // 2. CSS Plugins
    $plugin_styles = array(
        'universal-pe-icon'         => 'assets/css/plugins/pe-icon-7-stroke.css',
        'universal-fontawesome'     => 'assets/css/plugins/font-awesome.min.css',
        'universal-flaticon'       => 'assets/css/plugins/flaticon.css',
        'universal-bootstrap'       => 'assets/css/bootstrap.min.css',
        'universal-animate'         => 'assets/css/plugins/animate.min.css',
        'universal-fakeloader'      => 'assets/css/plugins/fakeloader.css',
        'universal-meanmenu'        => 'assets/css/plugins/meanmenu.css',
        'universal-slick'           => 'assets/css/plugins/slick.min.css',
        'universal-animated-head'   => 'assets/css/plugins/animated-headline.css',
        'universal-youtubepopup'    => 'assets/css/plugins/youtubepopup.min.css',
        'universal-calender'        => 'assets/css/plugins/calender.css',
        'universal-plyr'            => 'assets/css/plugins/plyr.min.css',
        'universal-select2'         => 'assets/css/plugins/select2.min.css',
        'universal-datepicker'      => 'assets/css/plugins/datepicker.min.css',
    );

    foreach ( $plugin_styles as $handle => $rel_path ) {
        if ( file_exists( $theme_dir . '/' . $rel_path ) ) {
            wp_enqueue_style( $handle, $theme_uri . '/' . $rel_path, array(), filemtime( $theme_dir . '/' . $rel_path ) );
        }
    }

    // 3. Main & Component Styles
    if ( file_exists( $theme_dir . '/assets/css/style.css' ) ) {
        wp_enqueue_style(
            'universal-main-style',
            $theme_uri . '/assets/css/style.css',
            array( 'universal-bootstrap', 'universal-slick' ),
            filemtime( $theme_dir . '/assets/css/style.css' )
        );
    }

    $component_styles = array(
        'universal-booking-css'     => 'assets/css/booking-consultation.css',
        'universal-appointment-css' => 'assets/css/appointment-modal.css',
        'universal-whatsapp-css'    => 'assets/css/whatsapp-chatbot.css',
        'universal-faq-css'         => 'assets/css/faq-section.css',
        'universal-awards-css'      => 'assets/css/awards-carousel.css',
        'universal-testi-css'       => 'assets/css/testimonials-carousel.css',
        'universal-bts-css'         => 'assets/css/behind-the-scenes.css',
        'universal-compliance-css'  => 'assets/css/compliance-calendar.css',
        'universal-page-bg-css'     => 'assets/css/page-backgrounds.css',
        'universal-contact-css'     => 'assets/css/contact-page.css',
        'universal-news-css'        => 'assets/css/news-and-updates.css',
    );

    foreach ( $component_styles as $handle => $rel_path ) {
        if ( file_exists( $theme_dir . '/' . $rel_path ) ) {
            wp_enqueue_style( $handle, $theme_uri . '/' . $rel_path, array( 'universal-main-style' ), filemtime( $theme_dir . '/' . $rel_path ) );
        }
    }

    // 4. Scripts
    // Modernizr in head
    if ( file_exists( $theme_dir . '/assets/js/vendor/modernizr-3.5.0.min.js' ) ) {
        wp_enqueue_script(
            'universal-modernizr',
            $theme_uri . '/assets/js/vendor/modernizr-3.5.0.min.js',
            array(),
            filemtime( $theme_dir . '/assets/js/vendor/modernizr-3.5.0.min.js' ),
            false
        );
    }

    // WordPress jQuery
    wp_enqueue_script( 'jquery' );

    // Popper & Bootstrap
    if ( file_exists( $theme_dir . '/assets/js/popper.min.js' ) ) {
        wp_enqueue_script(
            'universal-popper',
            $theme_uri . '/assets/js/popper.min.js',
            array( 'jquery' ),
            filemtime( $theme_dir . '/assets/js/popper.min.js' ),
            true
        );
    }

    if ( file_exists( $theme_dir . '/assets/js/bootstrap.min.js' ) ) {
        wp_enqueue_script(
            'universal-bootstrap',
            $theme_uri . '/assets/js/bootstrap.min.js',
            array( 'jquery', 'universal-popper' ),
            filemtime( $theme_dir . '/assets/js/bootstrap.min.js' ),
            true
        );
    }

    // Theme Plugins
    if ( file_exists( $theme_dir . '/assets/js/plugins.js' ) ) {
        wp_enqueue_script(
            'universal-plugins',
            $theme_uri . '/assets/js/plugins.js',
            array( 'jquery' ),
            filemtime( $theme_dir . '/assets/js/plugins.js' ),
            true
        );
    }

    if ( file_exists( $theme_dir . '/assets/js/ajax-mail.js' ) ) {
        wp_enqueue_script(
            'universal-ajax-mail',
            $theme_uri . '/assets/js/ajax-mail.js',
            array( 'jquery' ),
            filemtime( $theme_dir . '/assets/js/ajax-mail.js' ),
            true
        );
    }

    if ( file_exists( $theme_dir . '/assets/js/active.js' ) ) {
        wp_enqueue_script(
            'universal-active',
            $theme_uri . '/assets/js/active.js',
            array( 'jquery' ),
            filemtime( $theme_dir . '/assets/js/active.js' ),
            true
        );
    }

    if ( file_exists( $theme_dir . '/assets/js/scripts.js' ) ) {
        wp_enqueue_script(
            'universal-scripts',
            $theme_uri . '/assets/js/scripts.js',
            array( 'jquery', 'universal-bootstrap', 'universal-plugins', 'universal-active' ),
            filemtime( $theme_dir . '/assets/js/scripts.js' ),
            true
        );
    }

    // Component Scripts
    $component_scripts = array(
        'universal-booking-js'     => 'assets/js/booking-consultation.js',
        'universal-appointment-js' => 'assets/js/appointment-modal.js',
        'universal-whatsapp-js'    => 'assets/js/whatsapp-chatbot.js',
        'universal-faq-js'         => 'assets/js/faq-accordion.js',
        'universal-awards-js'      => 'assets/js/awards-carousel.js',
        'universal-testi-js'       => 'assets/js/testimonials-carousel.js',
        'universal-bts-js'         => 'assets/js/behind-the-scenes.js',
        'universal-compliance-js'  => 'assets/js/compliance-calendar.js',
    );

    foreach ( $component_scripts as $handle => $rel_path ) {
        if ( file_exists( $theme_dir . '/' . $rel_path ) ) {
            wp_enqueue_script(
                $handle,
                $theme_uri . '/' . $rel_path,
                array( 'jquery', 'universal-bootstrap', 'universal-scripts' ),
                filemtime( $theme_dir . '/' . $rel_path ),
                true
            );
        }
    }

    // Localize Booking Script to WP REST API
    wp_localize_script( 'universal-booking-js', 'universalConfig', array(
        'root'     => esc_url_raw( rest_url() ),
        'apiBase'  => esc_url_raw( rest_url( 'universal/v1' ) ),
        'nonce'    => wp_create_nonce( 'wp_rest' ),
        'whatsapp' => universal_get_option( 'contact_whatsapp', '94774087869' ),
        'themeUri' => esc_url_raw( $theme_uri ),
    ) );
}
add_action( 'wp_enqueue_scripts', 'universal_secretaries_enqueue_assets' );

/**
 * Filter custom logo markup for clean integration
 */
function universal_custom_logo_markup( $html ) {
    $theme_logo = get_template_directory_uri() . '/assets/images/logo/logo-theme.webp';
    if ( empty( $html ) ) {
        $html = sprintf(
            '<a href="%1$s" class="custom-logo-link" rel="home"><img src="%2$s" class="custom-logo" alt="%3$s"></a>',
            esc_url( home_url( '/' ) ),
            esc_url( $theme_logo ),
            esc_attr( get_bloginfo( 'name' ) )
        );
    }
    return $html;
}
add_filter( 'get_custom_logo', 'universal_custom_logo_markup' );

/**
 * Enable WebP Upload & Media Library Support
 */
function universal_mime_types_webp( $mimes ) {
    $mimes['webp'] = 'image/webp';
    return $mimes;
}
add_filter( 'upload_mimes', 'universal_mime_types_webp' );

/**
 * Correct WebP filetype and extension check in WordPress
 */
function universal_check_filetype_webp( $data, $file, $filename, $mimes ) {
    if ( empty( $data['ext'] ) && empty( $data['type'] ) ) {
        $filetype = wp_check_filetype( $filename, $mimes );
        $ext      = $filetype['ext'];
        $type     = $filetype['type'];

        if ( 'webp' === $ext ) {
            $data['ext']  = 'webp';
            $data['type'] = 'image/webp';
        }
    }
    return $data;
}
add_filter( 'wp_check_filetype_and_ext', 'universal_check_filetype_webp', 10, 4 );

/**
 * Ensure WebP images are recognized as displayable for previews and thumbnails
 */
function universal_displayable_image_webp( $result, $path ) {
    if ( false === $result ) {
        $displayable_image_types = array( IMAGETYPE_WEBP );
        $info = @getimagesize( $path );
        if ( ! empty( $info ) && in_array( $info[2], $displayable_image_types, true ) ) {
            $result = true;
        }
    }
    return $result;
}
add_filter( 'file_is_displayable_image', 'universal_displayable_image_webp', 10, 2 );

/**
 * Prevent plupload from blocking WebP uploads due to responsive size checks
 */
function universal_disable_webp_upload_error( $defaults ) {
    if ( is_array( $defaults ) ) {
        $defaults['webp_upload_error'] = false;
    }
    return $defaults;
}
add_filter( 'plupload_default_settings', 'universal_disable_webp_upload_error' );
add_filter( 'plupload_init', 'universal_disable_webp_upload_error' );


