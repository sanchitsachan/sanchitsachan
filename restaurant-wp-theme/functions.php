<?php
/**
 * Seaside Restaurant Theme functions
 */

if (!defined('SEASIDE_VERSION')) {
    define('SEASIDE_VERSION', '1.0.0');
}

/**
 * Theme setup
 */
function seaside_setup() {
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_theme_support('html5', ['search-form', 'comment-form', 'comment-list', 'gallery', 'caption', 'style', 'script']);
    add_theme_support('custom-logo', [
        'height'      => 60,
        'width'       => 180,
        'flex-height' => true,
        'flex-width'  => true,
    ]);

    // Let WordPress know about our menus
    register_nav_menus([
        'primary' => __('Primary Menu', 'seaside'),
        'footer'  => __('Footer Menu', 'seaside'),
    ]);
}
add_action('after_setup_theme', 'seaside_setup');

/**
 * Elementor Pro Theme Builder support: allow Elementor to override header/footer
 */
function seaside_register_elementor_locations($elementor_theme_manager) {
    if (!class_exists('Elementor\\Theme\\Locations\\Manager')) {
        return;
    }
    $elementor_theme_manager->register_location('header');
    $elementor_theme_manager->register_location('footer');
}
add_action('elementor/theme/register_locations', 'seaside_register_elementor_locations');

/**
 * Enqueue assets
 */
function seaside_assets() {
    // Google Fonts
    wp_enqueue_style(
        'seaside-fonts',
        'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@400;600;700&display=swap',
        [],
        null
    );

    // Theme stylesheet header (style.css)
    wp_enqueue_style('seaside-style', get_stylesheet_uri(), ['seaside-fonts'], SEASIDE_VERSION);

    // Main theme styles
    $main_css_path = get_template_directory() . '/assets/css/main.css';
    $main_css_ver  = file_exists($main_css_path) ? filemtime($main_css_path) : SEASIDE_VERSION;
    wp_enqueue_style('seaside-main', get_template_directory_uri() . '/assets/css/main.css', ['seaside-style'], $main_css_ver);

    // Theme scripts
    wp_enqueue_script('seaside-scripts', get_template_directory_uri() . '/assets/js/main.js', [], SEASIDE_VERSION, true);
}
add_action('wp_enqueue_scripts', 'seaside_assets');

/**
 * Register a simple widget area (optional for footer)
 */
function seaside_widgets_init() {
    register_sidebar([
        'name'          => __('Footer Widgets', 'seaside'),
        'id'            => 'footer-1',
        'description'   => __('Add widgets here to appear in your footer.', 'seaside'),
        'before_widget' => '<section id="%1$s" class="widget %2$s">',
        'after_widget'  => '</section>',
        'before_title'  => '<h3 class="widget-title">',
        'after_title'   => '</h3>',
    ]);
}
add_action('widgets_init', 'seaside_widgets_init');

/**
 * Customizer options: contact, hours, hero copy, and menu links
 */
function seaside_customize_register($wp_customize) {
    $wp_customize->add_section('seaside_contact', [
        'title'       => __('Contact & Hours', 'seaside'),
        'description' => __('Contact info, opening hours and reservation link.', 'seaside'),
        'priority'    => 30,
    ]);

    // Phone
    $wp_customize->add_setting('seaside_phone', [
        'default'           => '+1 (555) 123-4567',
        'sanitize_callback' => 'sanitize_text_field',
    ]);
    $wp_customize->add_control('seaside_phone', [
        'label'   => __('Phone Number', 'seaside'),
        'section' => 'seaside_contact',
        'type'    => 'text',
    ]);

    // Address
    $wp_customize->add_setting('seaside_address', [
        'default'           => '123 Marina Road, Seaside City',
        'sanitize_callback' => 'sanitize_text_field',
    ]);
    $wp_customize->add_control('seaside_address', [
        'label'   => __('Address', 'seaside'),
        'section' => 'seaside_contact',
        'type'    => 'text',
    ]);

    // Opening hours (textarea)
    $wp_customize->add_setting('seaside_hours', [
        'default'           => "Mon–Fri: 12:00–22:00\nSat–Sun: 10:00–23:00",
        'sanitize_callback' => 'wp_kses_post',
    ]);
    $wp_customize->add_control('seaside_hours', [
        'label'   => __('Opening Hours', 'seaside'),
        'section' => 'seaside_contact',
        'type'    => 'textarea',
    ]);

    // Reservation Link
    $wp_customize->add_setting('seaside_reserve_url', [
        'default'           => '#reserve',
        'sanitize_callback' => 'esc_url_raw',
    ]);
    $wp_customize->add_control('seaside_reserve_url', [
        'label'   => __('Reservation Button URL', 'seaside'),
        'section' => 'seaside_contact',
        'type'    => 'url',
    ]);

    // Map Embed (iframe)
    $wp_customize->add_setting('seaside_map_embed', [
        'default'           => '<iframe width="100%" height="360" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://www.openstreetmap.org/export/embed.html?bbox=24.0%2C35.0%2C24.1%2C35.05&amp;layer=mapnik"></iframe>',
        'sanitize_callback' => 'wp_kses_post',
    ]);
    $wp_customize->add_control('seaside_map_embed', [
        'label'       => __('Map Embed (iframe)', 'seaside'),
        'description' => __('Paste your Google Maps or OpenStreetMap embed code.', 'seaside'),
        'section'     => 'seaside_contact',
        'type'        => 'textarea',
    ]);

    // Hero copy
    $wp_customize->add_section('seaside_hero', [
        'title'    => __('Hero', 'seaside'),
        'priority' => 25,
    ]);
    $wp_customize->add_setting('seaside_hero_title', [
        'default'           => __('Fish & Wine at its Best', 'seaside'),
        'sanitize_callback' => 'sanitize_text_field',
    ]);
    $wp_customize->add_control('seaside_hero_title', [
        'label'   => __('Hero Title', 'seaside'),
        'section' => 'seaside_hero',
        'type'    => 'text',
    ]);
    $wp_customize->add_setting('seaside_hero_subtitle', [
        'default'           => __('A seaside escape of authentic Cypriot flavors', 'seaside'),
        'sanitize_callback' => 'sanitize_text_field',
    ]);
    $wp_customize->add_control('seaside_hero_subtitle', [
        'label'   => __('Hero Subtitle', 'seaside'),
        'section' => 'seaside_hero',
        'type'    => 'text',
    ]);

    // Menu links (pills)
    $wp_customize->add_section('seaside_menu_links', [
        'title'    => __('Menu Links', 'seaside'),
        'priority' => 26,
    ]);
    foreach (['menu' => 'Menu', 'wine' => 'Wine List', 'desserts' => 'Desserts', 'drinks' => 'Drinks'] as $key => $label) {
        $setting = 'seaside_link_' . $key;
        $wp_customize->add_setting($setting, [
            'default'           => '#',
            'sanitize_callback' => 'esc_url_raw',
        ]);
        $wp_customize->add_control($setting, [
            'label'   => sprintf(__('%s URL', 'seaside'), $label),
            'section' => 'seaside_menu_links',
            'type'    => 'url',
        ]);
    }
}
add_action('customize_register', 'seaside_customize_register');

/**
 * Helper to get a theme mod with a sensible default.
 */
function seaside_get_mod($name, $default = '') {
    $value = get_theme_mod($name);
    return $value !== false && $value !== '' ? $value : $default;
}

/**
 * Check if a post is built with Elementor
 */
function seaside_is_elementor($post_id) {
    if (!did_action('elementor/loaded')) {
        return false;
    }
    try {
        $document = \Elementor\Plugin::$instance->documents->get($post_id);
        return $document && method_exists($document, 'is_built_with_elementor') && $document->is_built_with_elementor();
    } catch (\Throwable $e) {
        return false;
    }
}