<?php
/**
 * Terrariet Reptile Zoo's functions and definitions
 * 
 * @package Terrariet Reptile Zoo
 * @since Terrariet Reptile Zoo 1.0
 */

if ( ! function_exists( 'terrarietreptilezoo_setup' ) ) {
	function terrarietreptilezoo_setup() {

		//Add default posts and comments RSS feed links to <head>
		add_theme_support( 'automatic-feed-links' );

		// Adds <title> tag support
		add_theme_support( 'title-tag' );

		// Add support for post thumbnails
		add_theme_support( 'post-thumbnails' );

		// Add support for custom logo
		add_theme_support( 'custom-logo' );

		// Add support for full widths in Gutenberg
		add_theme_support( 'align-wide' );

		// Add support for padding options in Gutenberg
		add_theme_support( 'custom-spacing' );

		// Add editor stylesheet
		add_theme_support( 'editor-styles' );
		add_editor_style( 'admin/editor-style.css' );

		// Add custom palette to Gutenberg
		add_theme_support( 'editor-color-palette', array(
			array(
				'name'  => esc_attr__( 'Dark', 'themeLangDomain' ),
				'slug'  => 'dark',
				'color' => '#303030'
			),
			array(
				'name'  => esc_attr__( 'Light', 'themeLangDomain' ),
				'slug'  => 'light',
				'color' => '#EFEEEB'
			),
			array(
				'name'  => esc_attr__( 'Sand', 'themeLangDomain' ),
				'slug'  => 'sand',
				'color' => '#E0DED3'
			),
			array(
				'name'  => esc_attr__( 'Moss', 'themeLangDomain' ),
				'slug'  => 'moss',
				'color' => '#446815'
			),
			array(
				'name'  => esc_attr__( 'Clay', 'themeLangDomain' ),
				'slug'  => 'clay',
				'color' => '#CE8200'
			),
			array(
				'name'  => esc_attr__( 'Sky', 'themeLangDomain' ),
				'slug'  => 'sky',
				'color' => '#A1C6DA'
			)
		) );

		// Add custom font sizes in Gutenberg
		add_theme_support( 'editor-font-sizes', array(
			array(
				'name' => esc_attr__( 'Small', 'themeLangDomain' ),
				'size' => 12,
				'slug' => 'small'
			),
			array(
				'name' => esc_attr__( 'Medium', 'themeLangDomain' ),
				'size' => 16,
				'slug' => 'medium'
			),
			array(
				'name' => esc_attr__( 'Large', 'themeLangDomain' ),
				'size' => 24,
				'slug' => 'large'
			),
			array(
				'name' => esc_attr__( 'X-Large', 'themeLangDomain' ),
				'size' => 36,
				'slug' => 'x-large'
			),
			array(
				'name' => esc_attr__( 'XX-Large', 'themeLangDomain' ),
				'size' => 50,
				'slug' => 'xx-large'
			)
		) );

		add_theme_support( 'appearance-tools' );

		// Remove core block patterns
		remove_theme_support( 'core-block-patterns' );

		// Add support for custom navigation menus.
		register_nav_menus( array(
			'primary'        => __( 'Primary Menu', 'terrarietreptilezoo' ),
			'cta'            => __( 'CTA Menu', 'terrarietreptilezoo' ),
			'mobile-nav-cta' => __( 'Secondary CTA Menu', 'terrarietreptilezoo' ),
			'mobile-nav-some' => __( 'Mobile Social Media Menu', 'terrarietreptilezoo' )
		) );
	}
}
add_action( 'after_setup_theme', 'terrarietreptilezoo_setup' );

function terrarietreptilezoo_register_block_styles() {

	register_block_style( 'core/image', array(
		'name'         => 'blob-1',
		'label'        => __( 'Billedstil 1', 'terrarietreptilezoo' ),
    ) );

	register_block_style( 'core/image', array(
		'name'         => 'blob-2',
		'label'        => __( 'Billedstil 2', 'terrarietreptilezoo' ),
    ) );

	register_block_style( 'core/image', array(
		'name'         => 'blob-3',
		'label'        => __( 'Billedstil 3', 'terrarietreptilezoo' ),
    ) );

	register_block_style( 'core/image', array(
		'name'         => 'blob-4',
		'label'        => __( 'Billedstil 4', 'terrarietreptilezoo' ),
    ) );

	register_block_style( 'core/image', array(
		'name'         => 'blob-5',
		'label'        => __( 'Billedstil 5', 'terrarietreptilezoo' ),
    ) );
}
add_action( 'init', 'terrarietreptilezoo_register_block_styles' );

function remove_wp_block_library_css(){
    wp_dequeue_style( 'wp-block-library' ); // Remove WordPress core CSS
    wp_dequeue_style( 'wp-block-library-theme' ); // Remove WordPress theme core CSS
}
add_action( 'wp_enqueue_scripts', 'remove_wp_block_library_css' );

function terrarietreptilezoo_scripts_styles() {

	// Loads JavaScript file with functionality specific to Terrariet Reptile Zoo.
	wp_enqueue_script( 
		'terrarietreptilezoo-script', 
		get_template_directory_uri() . '/js/scripts.js', 
		array(), 
		'1.0', 
		array(
			'strategy' => 'defer'
		)
	);

	// Loads CSS file with styles specific to Terrariet Reptile Zoo
	wp_enqueue_style( 'terrarietreptilezoo-style', get_stylesheet_uri(), array(), '1.0' );
}
add_action( 'wp_enqueue_scripts', 'terrarietreptilezoo_scripts_styles' );

function load_admin_style() {
    wp_enqueue_style( 'admin_css', get_template_directory_uri() . '/admin/admin-style.css', false, '1.0' );
}
add_action( 'admin_enqueue_scripts', 'load_admin_style' );

function add_menu_item_atts($atts) {
	// Adds classes to menu items

	$atts['class'] = "site-nav__item";
	return $atts;
}
add_filter( 'nav_menu_css_class', 'add_menu_item_atts');

function add_menu_link_atts($atts) {
	// Adds classes to menu item links

	$atts['class'] = "site-nav__link";
	return $atts;
}
add_filter( 'nav_menu_link_attributes', 'add_menu_link_atts');


// Include custom nav walker to get parentlinks into submenus
require_once get_template_directory() . '/helpers/class-parent-link-nav-walker.php';