<?php
/**
 * The main template file
 *
 * @package Universal_Secretaries
 */

if ( is_front_page() ) {
    require get_template_directory() . '/front-page.php';
} else {
    require get_template_directory() . '/home.php';
}
