<?php
/*
Template Name: Full Width
*/
get_header();
?>
<main id="main" class="site-main">
  <div class="container" style="max-width:1240px;">
    <?php while (have_posts()) : the_post(); ?>
      <?php if (function_exists('seaside_is_elementor') && seaside_is_elementor(get_the_ID())) : ?>
        <?php the_content(); ?>
      <?php else : ?>
        <article id="post-<?php the_ID(); ?>" <?php post_class('entry'); ?>>
          <header class="entry-header"><h1 class="entry-title"><?php the_title(); ?></h1></header>
          <div class="entry-content"><?php the_content(); ?></div>
        </article>
      <?php endif; ?>
    <?php endwhile; ?>
  </div>
</main>
<?php get_footer(); ?>