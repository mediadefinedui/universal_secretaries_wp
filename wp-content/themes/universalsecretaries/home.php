<?php
/**
 * The template for displaying the News & Updates (Blog Archive) page.
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
                                <li>News &amp; Updates</li>
                            </ul>
                            <h1>News &amp; Statutory Updates</h1>
                            <p>Official circulars, ROC compliance updates, corporate tax deadlines and legal advisories.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--// Breadcrumb Area -->

        <!-- Page Content -->
        <main class="page-content">

            <div class="news-updates-section section-padding--xlg bg--white">
                <div class="container">
                    <div class="row g-4 g-xl-5">

                        <!-- Main News Stream -->
                        <div class="col-lg-8">
                            <div class="row g-4">

                                <?php
                                if ( have_posts() ) :
                                    while ( have_posts() ) : the_post();
                                        $badge = universal_get_field( 'post_badge', get_the_ID(), 'Company Law' );
                                        $reading_time = universal_get_field( 'post_reading_time', get_the_ID(), '4 min read' );
                                        $thumb_url = get_the_post_thumbnail_url( get_the_ID(), 'large' );
                                        if ( ! $thumb_url ) {
                                            $thumb_url = $theme_uri . '/assets/images/blog/blog-thumbnail-1.webp';
                                        }
                                ?>
                                    <div class="col-md-6">
                                        <article class="news-card">
                                            <div class="news-card-thumb">
                                                <span class="news-card-badge badge--urgent"><?php echo esc_html( $badge ); ?></span>
                                                <a href="<?php the_permalink(); ?>">
                                                    <img src="<?php echo esc_url( $thumb_url ); ?>" alt="<?php the_title_attribute(); ?>">
                                                </a>
                                            </div>
                                            <div class="news-card-body">
                                                <div class="news-card-meta">
                                                    <span><i class="fa fa-calendar"></i> <?php echo esc_html( get_the_date( 'd M Y' ) ); ?></span>
                                                    <span><i class="fa fa-user"></i> <?php the_author(); ?></span>
                                                </div>
                                                <h3 class="news-card-title">
                                                    <a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
                                                </h3>
                                                <p class="news-card-excerpt">
                                                    <?php echo esc_html( wp_trim_words( get_the_excerpt(), 22, '...' ) ); ?>
                                                </p>
                                                <div class="news-card-footer">
                                                    <a href="<?php the_permalink(); ?>" class="news-read-more">
                                                        <span>Read Advisory</span> <i class="fa fa-angle-right"></i>
                                                    </a>
                                                    <span class="news-reading-time"><i class="fa fa-clock-o"></i> <?php echo esc_html( $reading_time ); ?></span>
                                                </div>
                                            </div>
                                        </article>
                                    </div>
                                <?php
                                    endwhile;

                                    // Pagination
                                    echo '<div class="col-12 mt-4 text-center pagination-wrapper">';
                                    the_posts_pagination( array(
                                        'mid_size'  => 2,
                                        'prev_text' => '<i class="fa fa-angle-left"></i> Previous',
                                        'next_text' => 'Next <i class="fa fa-angle-right"></i>',
                                    ) );
                                    echo '</div>';

                                else :
                                ?>
                                    <div class="col-12">
                                        <div class="alert alert-info">
                                            <p><?php esc_html_e( 'No news or advisories found. Please check back soon.', 'universal-secretaries' ); ?></p>
                                        </div>
                                    </div>
                                <?php endif; ?>

                            </div>
                        </div>

                        <!-- Sidebar -->
                        <div class="col-lg-4">
                            <aside class="news-sidebar">

                                <!-- Search Box -->
                                <div class="news-widget widget--search mb-4">
                                    <form role="search" method="get" class="search-form" action="<?php echo esc_url( home_url( '/' ) ); ?>">
                                        <div class="search-input-wrap position-relative">
                                            <input type="search" class="search-field form-control" placeholder="Search advisories &amp; circulars..." value="<?php echo get_search_query(); ?>" name="s" />
                                            <button type="submit" class="search-submit" style="position:absolute; right:12px; top:50%; transform:translateY(-50%); background:none; border:none; color:#0284c7;">
                                                <i class="fa fa-search"></i>
                                            </button>
                                        </div>
                                    </form>
                                </div>

                                <!-- ROC Guidance Alert Card -->
                                <div class="news-widget widget--roc-alert mb-4 p-4" style="background:#f0fdf4; border:1px solid #bbf7d0; border-radius:8px;">
                                    <h5 style="color:#166534; font-size:16px; margin-bottom:8px;">
                                        <i class="fa fa-info-circle"></i> ROC BO Form 1 Update
                                    </h5>
                                    <p style="color:#15803d; font-size:14px; margin-bottom:12px;">
                                        BO Form 1 submission is undergoing ROC portal upgrades. For assistance verifying and cataloging your UBO declarations before portal reopening:
                                    </p>
                                    <a href="<?php echo esc_url( home_url( '/appointment/' ) ); ?>" class="cr-btn" style="padding:6px 14px; font-size:13px;">
                                        <span>Talk To Our Secretary</span>
                                    </a>
                                </div>

                                <!-- Recent Posts Widget -->
                                <div class="news-widget widget--recent-posts mb-4">
                                    <h5 class="widget-title" style="border-bottom:2px solid #0284c7; padding-bottom:8px; margin-bottom:16px;">LATEST ADVISORIES</h5>
                                    <ul class="list-unstyled">
                                        <?php
                                        $recent = wp_get_recent_posts( array( 'numberposts' => 4, 'post_status' => 'publish' ) );
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

