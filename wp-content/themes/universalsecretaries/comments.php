<?php
/**
 * The template for displaying comments
 *
 * @package Universal_Secretaries
 */

if ( post_password_required() ) {
    return;
}
?>

<div id="comments" class="comments-area">
    <?php if ( have_comments() ) : ?>
        <h3 class="comments-title">
            <?php
            $count = get_comments_number();
            echo esc_html( sprintf( _n( '%s Comment', '%s Comments', $count, 'universal-secretaries' ), number_format_i18n( $count ) ) );
            ?>
        </h3>
        <ol class="comment-list">
            <?php
            wp_list_comments( array(
                'style'      => 'ol',
                'short_ping' => true,
            ) );
            ?>
        </ol>
    <?php endif; ?>

    <?php comment_form(); ?>
</div>

