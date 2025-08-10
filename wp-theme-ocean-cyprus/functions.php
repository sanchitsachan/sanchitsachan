<?php
/**
 * Ocean Cyprus Restaurant Theme functions
 */

if (!defined('ABSPATH')) { exit; }

// Theme setup
add_action('after_setup_theme', function () {
    // Make theme available for translation
    load_theme_textdomain('ocean-cyprus', get_template_directory() . '/languages');

    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_theme_support('custom-logo', [
        'height'      => 60,
        'width'       => 200,
        'flex-height' => true,
        'flex-width'  => true,
    ]);
    add_theme_support('html5', [
        'search-form', 'comment-form', 'comment-list', 'gallery', 'caption', 'style', 'script'
    ]);
    add_theme_support('align-wide');

    register_nav_menus([
        'primary' => __('Primary Menu', 'ocean-cyprus'),
        'footer'  => __('Footer Menu', 'ocean-cyprus'),
    ]);

    // Content width for embeds
    if (!isset($GLOBALS['content_width'])) {
        $GLOBALS['content_width'] = 1200;
    }
});

// Enqueue styles and scripts
add_action('wp_enqueue_scripts', function () {
    // Google Fonts
    wp_enqueue_style(
        'ocean-cyprus-fonts',
        'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Playfair+Display:wght@600;700;800&display=swap',
        [],
        null
    );

    // Theme stylesheet
    wp_enqueue_style(
        'ocean-cyprus-style',
        get_stylesheet_uri(),
        [],
        wp_get_theme()->get('Version')
    );

    // Additional CSS
    wp_enqueue_style(
        'ocean-cyprus-main',
        get_template_directory_uri() . '/assets/css/main.css',
        ['ocean-cyprus-style'],
        wp_get_theme()->get('Version')
    );

    // Scripts
    wp_enqueue_script(
        'ocean-cyprus-main-js',
        get_template_directory_uri() . '/assets/js/main.js',
        ['jquery'],
        wp_get_theme()->get('Version'),
        true
    );
});

// Register a simple widget area for footer
add_action('widgets_init', function () {
    register_sidebar([
        'name'          => __('Footer Widgets', 'ocean-cyprus'),
        'id'            => 'footer-widgets',
        'description'   => __('Add widgets here to appear in your footer.', 'ocean-cyprus'),
        'before_widget' => '<section id="%1$s" class="widget %2$s">',
        'after_widget'  => '</section>',
        'before_title'  => '<h3 class="widget-title">',
        'after_title'   => '</h3>',
    ]);
});

// Add Elementor-friendly full width class
add_filter('body_class', function ($classes) {
    if (is_page_template('templates/page-elementor-full-width.php')) {
        $classes[] = 'elementor-full-width-page';
    }
    return $classes;
});

// Recommended plugins notice (Elementor)
add_action('admin_notices', function () {
    if (!current_user_can('install_plugins')) { return; }
    if (is_plugin_active('elementor/elementor.php')) { return; }
    echo '<div class="notice notice-info is-dismissible"><p>' . esc_html__(
        'For the best editing experience, please install and activate the Elementor plugin.',
        'ocean-cyprus'
    ) . '</p></div>';
});