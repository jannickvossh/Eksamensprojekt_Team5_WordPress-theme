<?php
/**
 * The 404 page template file
 * 
 * @package Terrariet Reptile Zoo
 * @since Terrariet Reptile Zoo 1.0
 */
?>

<?php
get_header();

// Define the error information once
$error_info_content = '<strong>Fejlkode:</strong> 404<br><strong>URL:</strong> ' . esc_html($_SERVER['REQUEST_URI']);

$page = get_page_by_path('fejlside');
?>
<main id="content" class="content">
    <?php
    if ($page) {
        // Set up the global post object required by the_content()
        global $post;
        $post = $page;
        setup_postdata($post);
        
        // Output the content using the_content() function
        the_content();
        
        // Reset post data
        wp_reset_postdata();
    } else {
        // Fallback content
        ?>
        <h1>404 – Siden blev ikke fundet</h1>
        <p>Siden eksisterer ikke eller er blevet flyttet.</p>
        <?php
    }
    ?>
</main><?php

// We'll add the error info via JavaScript to ensure it appears before footer
?>
<script>
document.addEventListener('DOMContentLoaded', function() {
    // Create the error info element
    const errorInfo = document.createElement('div');
    errorInfo.className = 'error-info';
    errorInfo.innerHTML = '<p><?php echo $error_info_content; ?></p>';
    
    // Find the footer element
    const footer = document.querySelector('footer.site-footer, footer.wp-block-group');
    
    // Insert error info before footer
    if (footer) {
        footer.parentNode.insertBefore(errorInfo, footer);
    } else {
        // If no footer found, append to body
        document.body.appendChild(errorInfo);
    }
});
</script>

<?php
get_footer();
?>