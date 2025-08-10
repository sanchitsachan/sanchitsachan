<?php
/**
 * Template Name: Elementor Full Width
 * Description: A full-width page template ideal for Elementor. Hides default page title and expands content edge-to-edge.
 */
if (!defined('ABSPATH')) { exit; }
get_header();
?>
<main id="primary" class="site-main" style="padding:0;">
  <div class="container" style="max-width: none; padding: 0;">
    <?php
    if (have_posts()) {
      while (have_posts()) { the_post(); the_content(); }
    }
    ?>
  </div>
</main>
<?php get_footer(); ?>