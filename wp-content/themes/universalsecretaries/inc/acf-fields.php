<?php
/**
 * Advanced Custom Fields (ACF) Setup & Field Group Definitions
 *
 * @package Universal_Secretaries
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

/**
 * Register ACF Options Page
 */
function universal_acf_add_options_page() {
    if ( function_exists( 'acf_add_options_page' ) ) {
        acf_add_options_page( array(
            'page_title' => __( 'Theme Settings', 'universal-secretaries' ),
            'menu_title' => __( 'Theme Settings', 'universal-secretaries' ),
            'menu_slug'  => 'theme-settings',
            'capability' => 'edit_posts',
            'redirect'   => false,
            'icon_url'   => 'dashicons-admin-generic',
            'position'   => 28,
        ) );
    }
}
add_action( 'acf/init', 'universal_acf_add_options_page' );

/**
 * Register Local ACF Field Groups
 */
function universal_acf_register_field_groups() {
    if ( ! function_exists( 'acf_add_local_field_group' ) ) {
        return;
    }

    /*
     * 1. Theme Settings (Options Page)
     */
    acf_add_local_field_group( array(
        'key'                   => 'group_theme_settings',
        'title'                 => __( 'Theme Settings', 'universal-secretaries' ),
        'fields'                => array(
            // Tab 1: Header & Notice
            array(
                'key'   => 'field_tab_header_notice',
                'label' => __( 'Header & Notice Bar', 'universal-secretaries' ),
                'type'  => 'tab',
            ),
            array(
                'key'          => 'field_top_notice_badge',
                'label'        => __( 'Top Notice Badge', 'universal-secretaries' ),
                'name'         => 'top_notice_badge',
                'type'         => 'text',
                'default_value'=> 'NEW RULE',
            ),
            array(
                'key'          => 'field_top_notice_text',
                'label'        => __( 'Top Notice Text', 'universal-secretaries' ),
                'name'         => 'top_notice_text',
                'type'         => 'textarea',
                'rows'         => 3,
                'default_value'=> 'NOTICE: The BO Form 1 is currently unavailable on the ROC portal. Please do not attempt to submit any documents to the Registrar of Companies (ROC). For assistance, contact our office at 011-4518775.',
            ),
            array(
                'key'          => 'field_top_notice_link_text',
                'label'        => __( 'Top Notice Link Text', 'universal-secretaries' ),
                'name'         => 'top_notice_link_text',
                'type'         => 'text',
                'default_value'=> 'Talk us about your BO forms →',
            ),
            array(
                'key'          => 'field_top_notice_link_url',
                'label'        => __( 'Top Notice Link URL', 'universal-secretaries' ),
                'name'         => 'top_notice_link_url',
                'type'         => 'text',
                'default_value'=> '#',
            ),
            array(
                'key'          => 'field_header_appointment_btn_text',
                'label'        => __( 'Header Appointment Button Text', 'universal-secretaries' ),
                'name'         => 'header_appointment_btn_text',
                'type'         => 'text',
                'default_value'=> 'Make an appointment',
            ),
            array(
                'key'          => 'field_header_appointment_btn_url',
                'label'        => __( 'Header Appointment Button URL', 'universal-secretaries' ),
                'name'         => 'header_appointment_btn_url',
                'type'         => 'text',
                'default_value'=> '/appointment/',
            ),

            // Tab 2: Contact & Social
            array(
                'key'   => 'field_tab_contact_social',
                'label' => __( 'Contact Info & Social', 'universal-secretaries' ),
                'type'  => 'tab',
            ),
            array(
                'key'          => 'field_contact_phone',
                'label'        => __( 'Direct Phone', 'universal-secretaries' ),
                'name'         => 'contact_phone',
                'type'         => 'text',
                'default_value'=> '+94 77 40 87 869',
            ),
            array(
                'key'          => 'field_contact_whatsapp',
                'label'        => __( 'WhatsApp Number (without spaces/plus)', 'universal-secretaries' ),
                'name'         => 'contact_whatsapp',
                'type'         => 'text',
                'default_value'=> '94774087869',
            ),
            array(
                'key'          => 'field_contact_tax_email',
                'label'        => __( 'Tax Matters Email', 'universal-secretaries' ),
                'name'         => 'contact_tax_email',
                'type'         => 'email',
                'default_value'=> 'tax@universalsecretaries.com',
            ),
            array(
                'key'          => 'field_contact_roc_email',
                'label'        => __( 'Company Matters Email', 'universal-secretaries' ),
                'name'         => 'contact_roc_email',
                'type'         => 'email',
                'default_value'=> 'roc@universalsecretaries.com',
            ),
            array(
                'key'          => 'field_office_address',
                'label'        => __( 'Office Location Address', 'universal-secretaries' ),
                'name'         => 'office_address',
                'type'         => 'textarea',
                'rows'         => 3,
                'default_value'=> 'No. 55/1/A, Koswattha Road, Rajagiriya, Colombo, Sri Lanka, 20000',
            ),
            array(
                'key'          => 'field_office_map_url',
                'label'        => __( 'Google Maps Link', 'universal-secretaries' ),
                'name'         => 'office_map_url',
                'type'         => 'url',
                'default_value'=> 'https://maps.google.com/maps?q=6.8996595,79.8951185&z=16',
            ),
            array(
                'key'          => 'field_consultation_hours',
                'label'        => __( 'Consultation Hours', 'universal-secretaries' ),
                'name'         => 'consultation_hours',
                'type'         => 'text',
                'default_value'=> 'Mon - Fri: 7:00 AM – 12:00 Noon (SL Time)',
            ),
            array(
                'key'          => 'field_facebook_url',
                'label'        => __( 'Facebook URL', 'universal-secretaries' ),
                'name'         => 'facebook_url',
                'type'         => 'url',
                'default_value'=> 'https://www.facebook.com/taxfiling.lk/',
            ),
            array(
                'key'          => 'field_linkedin_url',
                'label'        => __( 'LinkedIn URL', 'universal-secretaries' ),
                'name'         => 'linkedin_url',
                'type'         => 'url',
                'default_value'=> 'https://www.linkedin.com/company/tax-filing-lk/',
            ),
            array(
                'key'          => 'field_youtube_url',
                'label'        => __( 'YouTube URL', 'universal-secretaries' ),
                'name'         => 'youtube_url',
                'type'         => 'url',
                'default_value'=> 'https://www.youtube.com/@taxfiling_lk',
            ),

            // Tab 3: Footer Settings
            array(
                'key'   => 'field_tab_footer_settings',
                'label' => __( 'Footer Settings', 'universal-secretaries' ),
                'type'  => 'tab',
            ),
            array(
                'key'          => 'field_footer_about_text',
                'label'        => __( 'Footer About Text', 'universal-secretaries' ),
                'name'         => 'footer_about_text',
                'type'         => 'textarea',
                'rows'         => 3,
                'default_value'=> 'Company secretarial and tax advisory, Sri Lanka. Since 2012.',
            ),
            array(
                'key'          => 'field_footer_copyright',
                'label'        => __( 'Footer Copyright', 'universal-secretaries' ),
                'name'         => 'footer_copyright',
                'type'         => 'text',
                'default_value'=> '© 2026 Universal Secretaries. Made by Media Defined (Pvt) Ltd',
            ),
        ),
        'location'              => array(
            array(
                array(
                    'param'    => 'options_page',
                    'operator' => '==',
                    'value'    => 'theme-settings',
                ),
            ),
        ),
    ) );

    /*
     * 2. Front Page Fields
     */
    acf_add_local_field_group( array(
        'key'                   => 'group_front_page',
        'title'                 => __( 'Front Page Settings', 'universal-secretaries' ),
        'fields'                => array(
            // Tab 1: Hero Section
            array(
                'key'   => 'field_tab_hero',
                'label' => __( 'Hero & Booking Header', 'universal-secretaries' ),
                'type'  => 'tab',
            ),
            array(
                'key'          => 'field_hero_badge_year',
                'label'        => __( 'Hero Badge Year', 'universal-secretaries' ),
                'name'         => 'hero_badge_year',
                'type'         => 'text',
                'default_value'=> 'Since 2012',
            ),
            array(
                'key'          => 'field_hero_badge_text',
                'label'        => __( 'Hero Badge Text', 'universal-secretaries' ),
                'name'         => 'hero_badge_text',
                'type'         => 'text',
                'default_value'=> 'Qualified company secretaries in Sri Lanka',
            ),
            array(
                'key'          => 'field_hero_title',
                'label'        => __( 'Hero Title (HTML supported)', 'universal-secretaries' ),
                'name'         => 'hero_title',
                'type'         => 'textarea',
                'rows'         => 3,
                'default_value'=> "We handle<br><span class=\"title-highlight\">your company<br>registration</span> in<br>Sri Lanka.",
            ),
            array(
                'key'          => 'field_hero_subtitle',
                'label'        => __( 'Hero Subtitle (HTML supported)', 'universal-secretaries' ),
                'name'         => 'hero_subtitle',
                'type'         => 'textarea',
                'rows'         => 2,
                'default_value'=> "Then your <span class=\"sub-highlight\">tax returns</span>, every year after.",
            ),
            array(
                'key'          => 'field_hero_description',
                'label'        => __( 'Hero Description', 'universal-secretaries' ),
                'name'         => 'hero_description',
                'type'         => 'textarea',
                'rows'         => 4,
                'default_value'=> 'Sri Lanka company registration, tax consultation and bookkeeping in one place. Book a private consultation and we take your company from name check to eROC, BO forms and certificate, then stay on as your Company Secretary.',
            ),
            array(
                'key'          => 'field_hero_primary_btn_text',
                'label'        => __( 'Primary Button Text', 'universal-secretaries' ),
                'name'         => 'hero_primary_btn_text',
                'type'         => 'text',
                'default_value'=> 'Book a consultation',
            ),
            array(
                'key'          => 'field_hero_primary_btn_url',
                'label'        => __( 'Primary Button URL', 'universal-secretaries' ),
                'name'         => 'hero_primary_btn_url',
                'type'         => 'text',
                'default_value'=> '#consultationBookingForm',
            ),
            array(
                'key'          => 'field_hero_secondary_btn_text',
                'label'        => __( 'Secondary Button Text', 'universal-secretaries' ),
                'name'         => 'hero_secondary_btn_text',
                'type'         => 'text',
                'default_value'=> 'See how we work',
            ),
            array(
                'key'          => 'field_hero_secondary_btn_url',
                'label'        => __( 'Secondary Button URL', 'universal-secretaries' ),
                'name'         => 'hero_secondary_btn_url',
                'type'         => 'text',
                'default_value'=> '#how-it-works',
            ),

            // Tab 2: About Section on Home
            array(
                'key'   => 'field_tab_home_about',
                'label' => __( 'Home About Section', 'universal-secretaries' ),
                'type'  => 'tab',
            ),
            array(
                'key'          => 'field_home_about_tagline',
                'label'        => __( 'About Tagline', 'universal-secretaries' ),
                'name'         => 'home_about_tagline',
                'type'         => 'text',
                'default_value'=> 'Universal Secretaries',
            ),
            array(
                'key'          => 'field_home_about_title',
                'label'        => __( 'About Main Title', 'universal-secretaries' ),
                'name'         => 'home_about_title',
                'type'         => 'textarea',
                'rows'         => 3,
                'default_value'=> 'PROVIDE BEST TAX SOLUTION FOR YOUR BUSINESS TO GROW UP',
            ),
            array(
                'key'          => 'field_home_about_p1',
                'label'        => __( 'About Paragraph 1', 'universal-secretaries' ),
                'name'         => 'home_about_p1',
                'type'         => 'textarea',
                'rows'         => 4,
                'default_value'=> 'Universal Secretaries provides end-to-end corporate secretarial, tax compliance, and financial advisory services in Sri Lanka. Since 2012, we have helped hundreds of businesses incorporate with confidence and maintain seamless statutory compliance.',
            ),
            array(
                'key'          => 'field_home_about_p2',
                'label'        => __( 'About Paragraph 2', 'universal-secretaries' ),
                'name'         => 'home_about_p2',
                'type'         => 'textarea',
                'rows'         => 4,
                'default_value'=> 'From company incorporation on eROC and mandatory Beneficial Ownership filings to annual returns and corporate income tax filings, every client file is reviewed by qualified chartered professionals.',
            ),
            array(
                'key'          => 'field_home_about_image',
                'label'        => __( 'About Image', 'universal-secretaries' ),
                'name'         => 'home_about_image',
                'type'         => 'image',
                'return_format'=> 'url',
            ),

            // Tab 3: Behind The Scenes
            array(
                'key'   => 'field_tab_home_bts',
                'label' => __( 'Behind The Scenes', 'universal-secretaries' ),
                'type'  => 'tab',
            ),
            array(
                'key'          => 'field_bts_eyebrow',
                'label'        => __( 'BTS Eyebrow', 'universal-secretaries' ),
                'name'         => 'bts_eyebrow',
                'type'         => 'text',
                'default_value'=> 'Behind the scenes',
            ),
            array(
                'key'          => 'field_bts_title',
                'label'        => __( 'BTS Title', 'universal-secretaries' ),
                'name'         => 'bts_title',
                'type'         => 'text',
                'default_value'=> 'How Sri Lanka company registration works with us',
            ),
            array(
                'key'          => 'field_bts_desc',
                'label'        => __( 'BTS Description', 'universal-secretaries' ),
                'name'         => 'bts_desc',
                'type'         => 'textarea',
                'rows'         => 3,
                'default_value'=> 'Most clients only see the certificate at the end. These are the steps our team works through, including the beneficial ownership forms the Registrar now requires before a company counts as fully incorporated.',
            ),

            // Tab 4: Client Recommendations (Testimonials)
            array(
                'key'   => 'field_tab_home_testimonials',
                'label' => __( 'Client Recommendations', 'universal-secretaries' ),
                'type'  => 'tab',
            ),
            array(
                'key'          => 'field_testi_badge',
                'label'        => __( 'Section Badge Text', 'universal-secretaries' ),
                'name'         => 'testi_badge',
                'type'         => 'text',
                'default_value'=> 'CLIENT RECOMMENDATIONS',
            ),
            array(
                'key'          => 'field_testi_heading',
                'label'        => __( 'Section Main Heading', 'universal-secretaries' ),
                'name'         => 'testi_heading',
                'type'         => 'text',
                'default_value'=> 'WHAT CLIENTS TELL US',
            ),
            array(
                'key'          => 'field_testi_subheading',
                'label'        => __( 'Section Subheading', 'universal-secretaries' ),
                'name'         => 'testi_subheading',
                'type'         => 'textarea',
                'rows'         => 2,
                'default_value'=> 'Trusted by directors, executives, and company founders across Sri Lanka since 2012.',
            ),
            array(
                'key'          => 'field_testimonials_list',
                'label'        => __( 'Testimonials List', 'universal-secretaries' ),
                'name'         => 'testimonials_list',
                'type'         => 'repeater',
                'instructions' => __( 'Add, edit, reorder or remove client testimonials displayed in the homepage carousel.', 'universal-secretaries' ),
                'layout'       => 'block',
                'button_label' => __( 'Add New Testimonial', 'universal-secretaries' ),
                'sub_fields'   => array(
                    array(
                        'key'          => 'field_testi_client_name',
                        'label'        => __( 'Client Name', 'universal-secretaries' ),
                        'name'         => 'client_name',
                        'type'         => 'text',
                        'required'     => 1,
                    ),
                    array(
                        'key'          => 'field_testi_client_credential',
                        'label'        => __( 'Client Credentials / Qualifications', 'universal-secretaries' ),
                        'name'         => 'client_credential',
                        'type'         => 'text',
                        'placeholder'  => 'e.g. FCMA (UK), CFA Finalist',
                    ),
                    array(
                        'key'          => 'field_testi_client_title',
                        'label'        => __( 'Client Job Title & Company', 'universal-secretaries' ),
                        'name'         => 'client_title',
                        'type'         => 'textarea',
                        'rows'         => 2,
                        'placeholder'  => 'e.g. Deputy Managing Director, Central Finance Company PLC',
                    ),
                    array(
                        'key'          => 'field_testi_client_avatar',
                        'label'        => __( 'Client Photo / Avatar', 'universal-secretaries' ),
                        'name'         => 'client_avatar',
                        'type'         => 'image',
                        'return_format'=> 'url',
                    ),
                    array(
                        'key'          => 'field_testi_stars',
                        'label'        => __( 'Star Rating (1 - 5)', 'universal-secretaries' ),
                        'name'         => 'stars',
                        'type'         => 'select',
                        'choices'      => array(
                            '5' => '5 Stars',
                            '4' => '4 Stars',
                            '3' => '3 Stars',
                            '2' => '2 Stars',
                            '1' => '1 Star',
                        ),
                        'default_value'=> '5',
                    ),
                    array(
                        'key'          => 'field_testi_quote',
                        'label'        => __( 'Testimonial Quote / Feedback', 'universal-secretaries' ),
                        'name'         => 'testimonial_text',
                        'type'         => 'textarea',
                        'rows'         => 5,
                        'required'     => 1,
                    ),
                ),
            ),
        ),
        'location'              => array(
            array(
                array(
                    'param'    => 'page_type',
                    'operator' => '==',
                    'value'    => 'front_page',
                ),
            ),
            array(
                array(
                    'param'    => 'page_template',
                    'operator' => '==',
                    'value'    => 'front-page.php',
                ),
            ),
        ),
    ) );

    /*
     * 3. About Page Fields
     */
    acf_add_local_field_group( array(
        'key'                   => 'group_about_page',
        'title'                 => __( 'About Page Settings', 'universal-secretaries' ),
        'fields'                => array(
            array(
                'key'          => 'field_about_main_heading',
                'label'        => __( 'Main Headline', 'universal-secretaries' ),
                'name'         => 'about_main_heading',
                'type'         => 'textarea',
                'rows'         => 2,
                'default_value'=> 'PROVIDE BEST TAX SOLUTION FOR YOUR BUSINESS PERFORMANCE SUCCESS TO GROWUP',
            ),
            array(
                'key'          => 'field_founder_title',
                'label'        => __( 'Founder Section Tag', 'universal-secretaries' ),
                'name'         => 'founder_tag',
                'type'         => 'text',
                'default_value'=> 'FOUNDER & OWNER',
            ),
            array(
                'key'          => 'field_founder_name',
                'label'        => __( 'Founder Name', 'universal-secretaries' ),
                'name'         => 'founder_name',
                'type'         => 'text',
                'default_value'=> 'Sudarshana Prashad',
            ),
            array(
                'key'          => 'field_founder_role',
                'label'        => __( 'Founder Role / Designation', 'universal-secretaries' ),
                'name'         => 'founder_role',
                'type'         => 'text',
                'default_value'=> 'Managing Director, Universal Secretaries (Pvt) Ltd',
            ),
            array(
                'key'          => 'field_founder_bio_1',
                'label'        => __( 'Founder Bio Paragraph 1', 'universal-secretaries' ),
                'name'         => 'founder_bio_1',
                'type'         => 'textarea',
                'rows'         => 4,
                'default_value'=> 'Prashad founded Universal Secretaries in 2012 and has spent over a decade in Sri Lankan and international taxation, financial reporting and compliance. He also founded TaxFiling.lk and brings working experience of Canadian taxation.',
            ),
            array(
                'key'          => 'field_founder_bio_2',
                'label'        => __( 'Founder Bio Paragraph 2', 'universal-secretaries' ),
                'name'         => 'founder_bio_2',
                'type'         => 'textarea',
                'rows'         => 3,
                'default_value'=> 'He reviews the work on every client file, so you deal with a firm that is run by its owner.',
            ),
            array(
                'key'          => 'field_founder_image',
                'label'        => __( 'Founder Photo', 'universal-secretaries' ),
                'name'         => 'founder_image',
                'type'         => 'image',
                'return_format'=> 'url',
            ),
        ),
        'location'              => array(
            array(
                array(
                    'param'    => 'page_template',
                    'operator' => '==',
                    'value'    => 'page-about.php',
                ),
            ),
        ),
    ) );

    /*
     * 4. Single Post Extra Meta (News & Updates)
     */
    acf_add_local_field_group( array(
        'key'                   => 'group_post_meta',
        'title'                 => __( 'Article Details', 'universal-secretaries' ),
        'fields'                => array(
            array(
                'key'          => 'field_post_badge',
                'label'        => __( 'Category Badge Text', 'universal-secretaries' ),
                'name'         => 'post_badge',
                'type'         => 'text',
                'default_value'=> 'Company Law',
            ),
            array(
                'key'          => 'field_post_reading_time',
                'label'        => __( 'Reading Time', 'universal-secretaries' ),
                'name'         => 'post_reading_time',
                'type'         => 'text',
                'default_value'=> '4 min read',
            ),
        ),
        'location'              => array(
            array(
                array(
                    'param'    => 'post_type',
                    'operator' => '==',
                    'value'    => 'post',
                ),
            ),
        ),
    ) );
}
add_action( 'acf/init', 'universal_acf_register_field_groups' );

/**
 * ACF JSON save and load points for version control
 */
function universal_acf_json_save_point( $path ) {
    return get_template_directory() . '/acf-json';
}
add_filter( 'acf/settings/save_json', 'universal_acf_json_save_point' );

function universal_acf_json_load_point( $paths ) {
    $paths[] = get_template_directory() . '/acf-json';
    return $paths;
}
add_filter( 'acf/settings/load_json', 'universal_acf_json_load_point' );


