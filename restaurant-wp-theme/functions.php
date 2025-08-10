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

    register_nav_menus([
        'primary' => __('Primary Menu', 'seaside'),
        'footer'  => __('Footer Menu', 'seaside'),
    ]);
}
add_action('after_setup_theme', 'seaside_setup');

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

    // Theme scripts (if needed in future)
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
 * Customizer options: contact and opening hours
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

    // Map Embed (iframe or URL)
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
}
add_action('customize_register', 'seaside_customize_register');

/**
 * Helper to get a theme mod with a sensible default.
 */
function seaside_get_mod($name, $default = '') {
    $value = get_theme_mod($name);
    return $value !== false && $value !== '' ? $value : $default;
}