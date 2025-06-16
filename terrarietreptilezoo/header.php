<?php
/**
 * The header
 * 
 * @package Terrariet Reptile Zoo
 * @since Terrariet Reptile Zoo 1.0
 */
?>

<!doctype html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>" />
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<link rel="preconnect" href="https://use.typekit.net" crossorigin>
	<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
    <?php wp_body_open(); ?>
	<header id="site-header-mobile" class="site-header site-header--mobile" aria-label="Mobile Header">
		<div class="site-header__inner">
			<button id="mobile-menu-open" class="mobile-menu-open">
				<div class="mobile-menu-open__lines" aria-hidden="true">
					<div class="mobile-menu-open__line"></div>
					<div class="mobile-menu-open__line"></div>
					<div class="mobile-menu-open__line"></div>
				</div>
				<p class="mobile-menu-open__text">Menu</p>
			</button>

			<a href="<?php echo esc_url( get_home_url() ) ?>" class="site-header__home-link">
				<img 
					src="<?php echo esc_url( wp_get_attachment_url( get_theme_mod( 'custom_logo' ) ) ); ?>"
					alt="Terrariet Reptile Zoo logo" 
					class="site-header__logo"
				>
			</a>

			<?php
			if ( has_nav_menu( 'cta' ) ) {
			?>
				<nav class="cta-nav" aria-label="Mobile Call to Action">
					<?php
					wp_nav_menu(
						array(
							'theme_location'  		=> 'cta',
							'menu_class'      		=> 'site-nav__items',
							'container_class' 		=> 'site-nav__inner',
							'items_wrap'      		=> '<ul id="cta-menu-list" class="%2$s">%3$s</ul>',
							'fallback_cb'     		=> false,
							'container_aria_label' 	=> 'Primary Mobile Navigation', // Descriptive label
						)
					);
					?>
				</nav>
			<?php
			}
			?>
		</div>

		<div id="mobile-menu" class="mobile-site-nav-wrapper">
			<header class="mobile-site-nav-header" aria-label="Mobile Menu Header">
				<div class="mobile-site-nav-header__inner">
					<button id="mobile-menu-close" class="mobile-menu-close">
						<div class="mobile-menu-close__lines" aria-hidden="true">
							<div class="mobile-menu-close__line"></div>
							<div class="mobile-menu-close__line"></div>
						</div>
						<p class="mobile-menu-close__text">Luk</p>
					</button>

					<a href="<?php echo esc_url( get_home_url() ) ?>" class="mobile-site-nav-header__home-link">
						<img 
							src="<?php echo esc_url( wp_get_attachment_url( get_theme_mod( 'custom_logo' ) ) ); ?>"
							alt="Terrariet Reptile Zoo logo" 
							class="mobile-site-nav-header__logo filters-light"
						>
					</a>
				</div>
			</header>

			<?php
			if ( has_nav_menu( 'primary' ) ) {
			?>
				<nav class="site-nav site-nav--mobile" aria-label="Mobile Primary Navigation">
					<?php
					wp_nav_menu(
						array(
							'theme_location'  		=> 'primary',
							'menu_class'      		=> 'site-nav__items',
							'container_class' 		=> 'site-nav__inner',
							'items_wrap'     		=> '<ul id="primary-menu-list-mobile" class="%2$s">%3$s</ul>',
							'fallback_cb'     		=> false,
							'container_aria_label' 	=> 'Mobile Primary Navigation',
       						'walker'         		=> new Parent_Link_Nav_Walker(), // Add this line
						)
					);
					?>
				</nav>
			<?php
			}
			?>

			<footer class="mobile-site-nav-footer" aria-label="Mobile Menu Footer">
				<div class="mobile-site-nav-footer__inner">
					<?php
					if ( has_nav_menu( 'mobile-nav-cta' ) ) {
					?>
						<nav class="mobile-nav-cta" aria-label="Mobile Secondary Call to Action">
							<?php
							wp_nav_menu(
								array(
									'theme_location'  		=> 'mobile-nav-cta',
									'menu_class'      		=> 'site-nav__items',
									'container_class' 		=> 'site-nav__inner',
									'items_wrap'      		=> '<ul id="mobile-nav-cta-menu-list" class="%2$s">%3$s</ul>',
									'fallback_cb'     		=> false,
        							'container_aria_label' => 'Mobile Call to Action Navigation', // Descriptive label
								)
							);
							?>
						</nav>
					<?php
					}
					?>

					<?php
					if ( has_nav_menu( 'mobile-nav-some' ) ) {
					?>
						<nav class="mobile-nav-some" aria-label="Mobile Secondary Social Media">
							<?php
							wp_nav_menu(
								array(
									'theme_location'  		=> 'mobile-nav-some',
									'menu_class'      		=> 'site-nav__items',
									'container_class' 		=> 'site-nav__inner',
									'items_wrap'      		=> '<ul id="mobile-nav-some-menu-list" class="%2$s">%3$s</ul>',
									'fallback_cb'     		=> false,
        							'container_aria_label' => 'Mobile Social Media Navigation', // Descriptive label
								)
							);
							?>
						</nav>
					<?php
					}
					?>
				</div>
			</footer>
		</div>
	</header>

	<header id="site-header" class="site-header" aria-label="Desktop Header">
		<div class="site-header__inner">
			<a href="<?php echo esc_url( get_home_url() ) ?>" class="site-header__home-link">
				<img 
					src="<?php echo esc_url( wp_get_attachment_url( get_theme_mod( 'custom_logo' ) ) ); ?>"
					alt="Terrariet Reptile Zoo logo" 
					class="site-header__logo"
				>
			</a>

			<?php
			if ( has_nav_menu( 'primary' ) ) {
			?>
				<nav class="site-nav" aria-label="Desktop Primary Navigation">
					<?php
					wp_nav_menu(
						array(
							'theme_location'  => 'primary',
							'menu_class'      => 'site-nav__items',
							'container_class' => 'site-nav__inner',
							'items_wrap'      => '<ul id="primary-menu-list" class="%2$s">%3$s</ul>',
							'fallback_cb'     => false,
						)
					);
					?>
				</nav>
			<?php
			}
			?>

			<?php
			if ( has_nav_menu( 'cta' ) ) {
			?>
				<nav class="cta-nav" aria-label="Desktop Call to Action">
					<?php
					wp_nav_menu(
						array(
							'theme_location'  => 'cta',
							'menu_class'      => 'site-nav__items',
							'container_class' => 'site-nav__inner',
							'items_wrap'      => '<ul id="cta-menu-list" class="%2$s">%3$s</ul>',
							'fallback_cb'     => false,
						)
					);
					?>
				</nav>
			<?php
			}
			?>
		</div>
	</header>