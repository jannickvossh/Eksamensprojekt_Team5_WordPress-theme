<?php
/*
Plugin Name: Custom CRS Map Optimized
Description: Optimeret Leaflet-kort med CRS.Simple, billede-overlay, pixelmarkører og drag-funktion.
Version: 2.1
Author: Frederik
*/

add_shortcode('custom-map', 'custom_crs_map_shortcode');

function custom_crs_map_shortcode($atts)
{
    $atts = shortcode_atts(array(
        'zoom' => 2,
        'minzoom' => 0,
        'maxzoom' => 5,
        'height' => 600,
        'type' => '', // Type kan være 'desktop', 'mobile' eller tom (for begge)
        'id' => 'map-' . uniqid() // Unikt ID for hvert kort
    ), $atts);

    // Bestem CSS klasser baseret på korttype
    $map_classes = 'custom-crs-map-container';
    if ($atts['type'] === 'desktop') {
        $map_classes .= ' desktop-only';
    } elseif ($atts['type'] === 'mobile') {
        $map_classes .= ' mobile-only';
    }
    $plugin_url = plugin_dir_url(__FILE__);
    $map_settings_json = json_encode(array(
        'zoom' => (int) $atts['zoom'],
        'minZoom' => (int) $atts['minzoom'],
        'maxZoom' => (int) $atts['maxzoom'],
        'mapInstances' => array()
    ));

    ob_start(); ?>
        <!-- Direkte indlæsning af CSS -->
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css">
        <link rel="stylesheet" href="<?php echo $plugin_url; ?>assets/icons/iconfont.css">
        <link rel="stylesheet" href="https://unpkg.com/leaflet.fullscreen@1.6.0/Control.FullScreen.css">
        <link rel="stylesheet" href="https://unpkg.com/@raruto/leaflet-gesture-handling@latest/dist/leaflet-gesture-handling.min.css">
        <link rel="stylesheet" href="https://unpkg.com/leaflet.markercluster@1.5.3/dist/MarkerCluster.css">
        <link rel="stylesheet" href="https://unpkg.com/leaflet.markercluster@1.5.3/dist/MarkerCluster.Default.css">
        <link rel="stylesheet" href="<?php echo $plugin_url; ?>assets/custom-map-responsive.css">
    
        <div class="<?php echo esc_attr($map_classes); ?>" data-map-id="<?php echo esc_attr($atts['id']); ?>">
            <div id="<?php echo esc_attr($atts['id']); ?>" 
                 class="map-instance" 
                 style="width: 100%; height: <?php echo esc_attr($atts['height']); ?>px;"
                 data-map-type="<?php echo esc_attr($atts['type']); ?>"
                 data-initialized="false"></div>
        </div>
    
        <!-- Direkte indlæsning af JavaScript -->
        <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
        <script src="https://unpkg.com/leaflet.fullscreen@1.6.0/Control.FullScreen.js"></script>
        <script src="https://unpkg.com/@raruto/leaflet-gesture-handling@latest/dist/leaflet-gesture-handling.min.js"></script>
        <script src="<?php echo $plugin_url; ?>assets/leaflet-rastercoords.js"></script>
        <script src="https://unpkg.com/leaflet.markercluster@1.5.3/dist/leaflet.markercluster.js"></script>
        <script src="https://unpkg.com/leaflet.markercluster.layersupport@2.0.1/dist/leaflet.markercluster.layersupport.js"></script>
    
        <script>
        // Map settings
        var customMapSettings = <?php echo $map_settings_json; ?>;
        </script>
        <script src="<?php echo $plugin_url; ?>assets/markers.js"></script>
        <script src="<?php echo $plugin_url; ?>assets/hand-animation.js"></script>
        <script src="<?php echo $plugin_url; ?>assets/map.js"></script>
        <?php return ob_get_clean();
}
