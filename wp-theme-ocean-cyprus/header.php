<?php if (!defined('ABSPATH')) { exit; } ?><!doctype html>
<html <?php language_attributes(); ?>>
<head>
<meta charset="<?php bloginfo('charset'); ?>" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>
<header class="site-header" role="banner">
  <div class="container nav">
    <div class="site-branding">
      <?php if (function_exists('the_custom_logo') && has_custom_logo()) { the_custom_logo(); } else { ?>
        <a href="<?php echo esc_url(home_url('/')); ?>" class="site-title"><?php bloginfo('name'); ?></a>
      <?php } ?>
    </div>
    <nav class="site-navigation" role="navigation" aria-label="Primary">
      <?php
        wp_nav_menu([
          'theme_location' => 'primary',
          'container'      => false,
          'menu_class'     => 'primary-menu',
          'fallback_cb'    => false,
        ]);
      ?>
    </nav>
    <div class="primary-cta">
      <a href="#reserve" class="oc-btn oc-btn--outline"><?php esc_html_e('Reserve a Table', 'ocean-cyprus'); ?></a>
    </div>
  </div>
</header>