<?php if (!defined('ABSPATH')) { exit; }
get_header(); ?>
<main id="primary" class="site-main section">
  <div class="container">
    <?php if (have_posts()) : while (have_posts()) : the_post(); ?>
      <article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
        <h1 class="section-title"><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h1>
        <div class="entry-content"><?php the_content(); ?></div>
      </article>
    <?php endwhile; else: ?>
      <p><?php esc_html_e('No content found.', 'ocean-cyprus'); ?></p>
    <?php endif; ?>
  </div>
</main>
<?php get_footer(); ?>