<?php
/**
 * The template for displaying 404 pages (not found)
 *
 * @package Universal_Secretaries
 */

get_header();
?>

        <!-- Page Content -->
        <main class="page-content">
            <div class="error-404-section section-padding--xlg text-center bg--white">
                <div class="container">
                    <div class="row justify-content-center">
                        <div class="col-lg-8">
                            <h1 style="font-size: 80px; font-weight: 800; color: #0284c7;">404</h1>
                            <h2>Page Not Found</h2>
                            <p class="lead text-muted mb-4">The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.</p>
                            <a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="cr-btn">
                                <span>Return to Homepage</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </main>

<?php
get_footer();

