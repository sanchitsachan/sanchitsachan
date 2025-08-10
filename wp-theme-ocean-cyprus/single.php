<?php if (!defined('ABSPATH')) { exit; }
get_header(); ?>
<main id="primary" class="site-main section">
  <div class="container">
    <?php
    if (have_posts()) {
      while (have_posts()) {
        the_post();
        echo '<h1 class="section-title">' . esc_html(get_the_title()) . '</h1>';
        the_content();
      }
    }
    ?>
  </div>
</main>
<?php get_footer(); ?>