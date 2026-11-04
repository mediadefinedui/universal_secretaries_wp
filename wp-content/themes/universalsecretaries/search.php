<?php
/**
 * The template for displaying search results
 *
 * @package Universal_Secretaries
 */

get_header();
?>

        <!-- Breadcrumb Area -->
        <div id="cr-breadcrumb-area" class="cr-breadcrumb-area section-padding--md">
            <div class="container">
                <div class="row">
                    <div class="col-xl-8 col-lg-9 col-md-10">
                        <div class="cr-breadcrumb">
                            <ul class="cr-breadcrumb__pagination">
                                <li><a href="<?php echo esc_url( home_url( '/' ) ); ?>">Home</a></li>
                                <li>Search</li>
                            </ul>
                            <h1>
                                <?php
                                /* translators: %s: search query. */
                                printf( esc_html__( 'Search Results for: %s', 'universal-secretaries' ), '<span>' . get_search_query() . '</span>' );
                                ?>
                            </h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--// Breadcrumb Area -->

        <!-- Page Content -->
        <main class="page-content">
            <div class="search-results-section section-padding--xlg bg--white">
                <div class="container">
                    <div class="row g-4">
                        <?php if ( have_posts() ) : ?>
                            <?php while ( have_posts() ) : the_post(); ?>
                                <div class="col-md-6">
                                    <div class="search-card p-4 border rounded mb-3">
                                        <h4><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h4>
                                        <p class="text-muted"><?php echo esc_html( wp_trim_words( get_the_excerpt(), 25 ) ); ?></p>
                                        <a href="<?php the_permalink(); ?>" class="text-primary font-weight-bold">Read More &rarr;</a>
                                    </div>
                                </div>
                            <?php endwhile; ?>
                            <div class="col-12 mt-4">
                                <?php the_posts_pagination(); ?>
                            </div>
                        <?php else : ?>
                            <div class="col-12">
                                <p><?php esc_html_e( 'Sorry, no matching results were found. Please try another search term.', 'universal-secretaries' ); ?></p>
                            </div>
                        <?php endif; ?>
                    </div>
                </div>
            </div>
        </main>

<?php
get_footer();

