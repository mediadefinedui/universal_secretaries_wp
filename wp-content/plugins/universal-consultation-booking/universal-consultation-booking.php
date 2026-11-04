<?php
/**
 * Plugin Name: Universal Consultation Booking – Microsoft Teams & WhatsApp Automation
 * Plugin URI: https://universalsecretaries.lk/
 * Description: Fully automated consultation booking system integrating Microsoft Outlook Calendar, Microsoft Teams online meetings, and WhatsApp Business Cloud API.
 * Version: 1.0.0
 * Author: Universal Secretaries
 * Author URI: https://universalsecretaries.lk/
 * Text Domain: universal-consultation-booking
 * Domain Path: /languages
 *
 * @package Universal_Consultation_Booking
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

define( 'UCB_VERSION', '1.0.0' );
define( 'UCB_PLUGIN_DIR', plugin_dir_path( __FILE__ ) );
define( 'UCB_PLUGIN_URL', plugin_dir_url( __FILE__ ) );

// Load components
require_once UCB_PLUGIN_DIR . 'includes/class-logger.php';
require_once UCB_PLUGIN_DIR . 'includes/class-microsoft-graph.php';
require_once UCB_PLUGIN_DIR . 'includes/class-whatsapp-api.php';
require_once UCB_PLUGIN_DIR . 'includes/class-booking-service.php';
require_once UCB_PLUGIN_DIR . 'includes/class-booking-cpt.php';
require_once UCB_PLUGIN_DIR . 'includes/class-rest-api.php';
require_once UCB_PLUGIN_DIR . 'includes/class-admin.php';

/**
 * Initialize Plugin
 */
function ucb_init_plugin() {
    UCB_Booking_CPT::init();
    UCB_REST_API::init();

    if ( is_admin() ) {
        UCB_Admin::init();
    }
}
add_action( 'plugins_loaded', 'ucb_init_plugin' );

/**
 * Activation Hook
 */
function ucb_activate_plugin() {
    UCB_Booking_CPT::register_cpt();
    flush_rewrite_rules();

    // Set sensible defaults if not set
    if ( ! get_option( 'ucb_consultant_name' ) ) {
        update_option( 'ucb_consultant_name', 'Senior Tax & Corporate Advisor' );
    }
    if ( ! get_option( 'ucb_consultant_email' ) ) {
        update_option( 'ucb_consultant_email', 'snisal@corporate.mediadefined.com' );
    }
    if ( ! get_option( 'ucb_consultant_whatsapp' ) ) {
        update_option( 'ucb_consultant_whatsapp', '94774087869' );
    }
    if ( ! get_option( 'ucb_timezone' ) ) {
        update_option( 'ucb_timezone', 'Sri Lanka Standard Time' );
    }
}
register_activation_hook( __FILE__, 'ucb_activate_plugin' );

