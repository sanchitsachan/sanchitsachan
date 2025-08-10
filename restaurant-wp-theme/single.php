<?php get_header(); ?>
<main id="main" class="site-main container">
  <?php if (have_posts()) : while (have_posts()) : the_post(); ?>
    <article id="post-<?php the_ID(); ?>" <?php post_class('entry'); ?>>
      <header class="entry-header">
        <h1 class="entry-title"><?php the_title(); ?></h1>
      </header>
      <div class="entry-meta">
        <span class="posted-on"><?php echo esc_html(get_the_date()); ?></span>
      </div>
      <div class="entry-content">
        <?php the_content(); ?>
      </div>
      <?php comments_template(); ?>
    </article>
  <?php endwhile; endif; ?>
</main>
<?php get_footer(); ?>