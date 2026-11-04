<?php
/**
 * The template for displaying all default pages
 *
 * @package Universal_Secretaries
 */

get_header();
?>

        <!-- Breadcrumb Area -->
        <div id="cr-breadcrumb-area" class="cr-breadcrumb-area section-padding--md">
            <div class="container">
                <div class="row">
                    <div class="col-xl-6 col-lg-7 col-md-8">
                        <div class="cr-breadcrumb">
                            <ul class="cr-breadcrumb__pagination">
                                <li><a href="<?php echo esc_url( home_url( '/' ) ); ?>">Home</a></li>
                                <li><?php the_title(); ?></li>
                            </ul>
                            <h1><?php the_title(); ?></h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--// Breadcrumb Area -->

        <!-- Page Content -->
        <main class="page-content">
            <div class="page-wrapper section-padding--xlg bg--white">
                <div class="container">
                    <div class="row justify-content-center">
                        <div class="col-lg-10">
                            <?php
                            while ( have_posts() ) : the_post();
                                the_content();
                            endwhile;
                            ?>
                        </div>
                    </div>
                </div>
            </div>
        </main>

<?php
get_footer();

