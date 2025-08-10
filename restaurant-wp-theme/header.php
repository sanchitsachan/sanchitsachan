<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>
<div class="stripes" aria-hidden="true"></div>
<header class="site-header">
    <div class="container header-inner">
        <div class="branding">
            <?php if (has_custom_logo()) { the_custom_logo(); } else { ?>
                <a class="site-title" href="<?php echo esc_url(home_url('/')); ?>"><?php bloginfo('name'); ?></a>
            <?php } ?>
        </div>
        <nav class="primary-nav" aria-label="Primary">
            <?php
            wp_nav_menu([
                'theme_location' => 'primary',
                'container'      => false,
                'menu_class'     => 'menu',
                'fallback_cb'    => '__return_empty_string',
            ]);
            ?>
        </nav>
        <div class="header-cta">
            <a class="btn btn-accent" href="<?php echo esc_url(seaside_get_mod('seaside_reserve_url', '#reserve')); ?>">Reserve a Table</a>
        </div>
        <button class="mobile-toggle" aria-controls="mobile-menu" aria-expanded="false">☰</button>
    </div>
    <nav id="mobile-menu" class="mobile-nav" hidden>
        <?php
        wp_nav_menu([
            'theme_location' => 'primary',
            'container'      => false,
            'menu_class'     => 'menu',
            'fallback_cb'    => '__return_empty_string',
        ]);
        ?>
        <a class="btn btn-accent mobile-reserve" href="<?php echo esc_url(seaside_get_mod('seaside_reserve_url', '#reserve')); ?>">Reserve</a>
    </nav>
</header>