<?php
/**
 * The template for displaying all single posts
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
                    <div class="col-xl-8 col-lg-9 col-md-10">
                        <div class="cr-breadcrumb">
                            <ul class="cr-breadcrumb__pagination">
                                <li><a href="<?php echo esc_url( home_url( '/' ) ); ?>">Home</a></li>
                                <li><a href="<?php echo esc_url( home_url( '/news-and-updates/' ) ); ?>">News &amp; Updates</a></li>
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

            <div class="news-details-section section-padding--xlg bg--white">
                <div class="container">
                    <div class="row g-4 g-xl-5">

                        <!-- Main Article Body -->
                        <div class="col-lg-8">
                            <?php
                            while ( have_posts() ) : the_post();
                                $badge = universal_get_field( 'post_badge', get_the_ID(), 'Company Law' );
                                $reading_time = universal_get_field( 'post_reading_time', get_the_ID(), '4 min read' );
                                $thumb_url = get_the_post_thumbnail_url( get_the_ID(), 'full' );
                            ?>
                                <article class="article-details">

                                    <div class="article-meta mb-3">
                                        <span class="badge bg-primary me-2"><?php echo esc_html( $badge ); ?></span>
                                        <span class="text-muted me-3"><i class="fa fa-calendar"></i> <?php echo esc_html( get_the_date( 'd M Y' ) ); ?></span>
                                        <span class="text-muted me-3"><i class="fa fa-user"></i> <?php the_author(); ?></span>
                                        <span class="text-muted"><i class="fa fa-clock-o"></i> <?php echo esc_html( $reading_time ); ?></span>
                                    </div>

                                    <?php if ( $thumb_url ) : ?>
                                        <div class="article-featured-image mb-4">
                                            <img src="<?php echo esc_url( $thumb_url ); ?>" alt="<?php the_title_attribute(); ?>" style="width:100%; border-radius:8px;">
                                        </div>
                                    <?php endif; ?>

                                    <div class="article-content typography-wrapper">
                                        <?php the_content(); ?>
                                    </div>

                                    <hr class="my-5">

                                    <!-- Author Bio Box -->
                                    <div class="author-bio-box p-4 bg-light rounded d-flex align-items-center">
                                        <div class="author-avatar me-3">
                                            <img src="<?php echo esc_url( $theme_uri . '/assets/images/advisors/advisor-1.webp' ); ?>" alt="Advisor" style="width:70px; height:70px; border-radius:50%; object-fit:cover;">
                                        </div>
                                        <div class="author-info">
                                            <h5 class="mb-1">Universal Secretaries Advisory Team</h5>
                                            <p class="text-muted mb-0" style="font-size:14px;">Licensed company secretarial and corporate tax advisory firm in Colombo, Sri Lanka. Guiding companies on ROC compliance and IRD requirements since 2012.</p>
                                        </div>
                                    </div>

                                    <!-- Post Navigation -->
                                    <div class="post-navigation d-flex justify-content-between mt-4">
                                        <div><?php previous_post_link( '%link', '← %title' ); ?></div>
                                        <div><?php next_post_link( '%link', '%title →' ); ?></div>
                                    </div>

                                </article>
                            <?php endwhile; ?>
                        </div>

                        <!-- Sidebar -->
                        <div class="col-lg-4">
                            <aside class="news-sidebar">

                                <!-- Consultation Box -->
                                <div class="news-widget widget--consultation mb-4 p-4 text-center" style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:8px;">
                                    <h4 style="font-size:18px; margin-bottom:10px;">Need ROC or Tax Assistance?</h4>
                                    <p style="font-size:14px; color:#64748b; margin-bottom:16px;">Schedule a 45-minute private consultation with our Colombo secretarial team.</p>
                                    <a href="<?php echo esc_url( home_url( '/appointment/' ) ); ?>" class="cr-btn">
                                        <span>Book Consultation</span>
                                    </a>
                                </div>

                                <!-- Recent Advisories -->
                                <div class="news-widget widget--recent-posts mb-4">
                                    <h5 class="widget-title" style="border-bottom:2px solid #0284c7; padding-bottom:8px; margin-bottom:16px;">MORE ADVISORIES</h5>
                                    <ul class="list-unstyled">
                                        <?php
                                        $recent = wp_get_recent_posts( array( 'numberposts' => 4, 'post_status' => 'publish', 'exclude' => array( get_the_ID() ) ) );
                                        foreach ( $recent as $r ) :
                                        ?>
                                            <li class="mb-3 pb-3 border-bottom">
                                                <a href="<?php echo esc_url( get_permalink( $r['ID'] ) ); ?>" style="font-weight:600; color:#1e293b; display:block; margin-bottom:4px;">
                                                    <?php echo esc_html( $r['post_title'] ); ?>
                                                </a>
                                                <span style="font-size:12px; color:#64748b;"><i class="fa fa-calendar"></i> <?php echo esc_html( get_the_date( 'd M Y', $r['ID'] ) ); ?></span>
                                            </li>
                                        <?php endforeach; wp_reset_query(); ?>
                                    </ul>
                                </div>

                            </aside>
                        </div>

                    </div>
                </div>
            </div>

        </main>
        <!-- //Page Content -->

<?php
get_footer();

