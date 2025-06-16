/**
 * Lazy Loader for Custom CRS Map
 * Only loads the map when it becomes visible in the viewport
 */
document.addEventListener('DOMContentLoaded', function () {  // Find all map containers
  const mapContainers = document.querySelectorAll('.custom-crs-map-container');

  // IntersectionObserver to detect when maps are visible
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const mapId = entry.target.getAttribute('data-map-id');
      const mapElement = document.getElementById(mapId);

      if (entry.isIntersecting && mapElement) {
        // If the map is visible and not already initialized
        if (mapElement.getAttribute('data-initialized') !== 'true') {
          initializeMap(mapElement);
          mapElement.setAttribute('data-initialized', 'true');
        }
      }
    });
  }, {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  });
  // Observe all map containers
  mapContainers.forEach(container => {
    observer.observe(container);
  });
  // Function to initialize the map
  function initializeMap(mapElement) {

    // Prevents browser zoom (CTRL+scroll), but still allows the map's zoom
    mapElement.addEventListener('wheel', function (e) {
      if (e.ctrlKey) {
        e.preventDefault();
        // The map still handles zoom via its own controller
      }
    }, { passive: false });

    // Also prevents browser zoom via ctrl + "+" and ctrl + "-" keys
    document.addEventListener('keydown', function (e) {
      if (e.ctrlKey && (e.key === '+' || e.key === '-' || e.key === '=')) {
        if (mapElement.contains(document.activeElement) ||
          mapElement.matches(':hover')) {
          e.preventDefault();
        }
      }
    }, { passive: false });

    const mapId = mapElement.id;
    const mapType = mapElement.dataset.mapType;

    if (!mapId || typeof markers === 'undefined') {
      console.error("Map container or markers missing");
      return;
    }

    // Domain-based language detection (only .com and .dk)
    const host = window.location.hostname;
    let lang;
    if (host.endsWith('.com')) {
      lang = 'en';
    } else {
      lang = 'da';
    }    window._mapLang = lang;    // Gesture handling options need to use the correct language
    const gestureHandlingOptions = {
      text: lang === 'en'
        ? 'Use ctrl + scroll to zoom the map'
        : 'Brug ctrl + scroll for at zoome kortet',
      touch: lang === 'en'
        ? 'Use two fingers to move the map'
        : 'Brug to fingre for at flytte kortet',
      locale: 'en',  // Force English locale to prevent external file loading
      localeFiles: false  // Disable loading of locale files completely
    };

    const img = [10066, 6340];
    const map = L.map(mapId, {
      crs: L.CRS.Simple,
      gestureHandling: true,
      gestureHandlingOptions: gestureHandlingOptions,
      fullscreenControl: true,
      fullscreenControlOptions: {
        position: 'bottomleft'
      },
    });    // Handle fullscreen display
    map.on('enterFullscreen', () => {
      setTimeout(() => map.invalidateSize(), 200);
    });

    map.on('exitFullscreen', () => {
      setTimeout(() => map.invalidateSize(), 200);
    });

    map.on('resize', () => {
      map.invalidateSize();
    });

    // Explicit fix for gesture handling messages in different languages
    setTimeout(() => {
      const gestureElements = document.querySelectorAll('.leaflet-gesture-handling');
      gestureElements.forEach(element => {
        if (lang === 'en') {
          element.setAttribute('data-gesture-handling-scroll-content', 'Use ctrl + scroll to zoom the map');
          element.setAttribute('data-gesture-handling-touch-content', 'Use two fingers to move the map');
        } else {
          element.setAttribute('data-gesture-handling-scroll-content', 'Brug ctrl + scroll for at zoome kortet');
          element.setAttribute('data-gesture-handling-touch-content', 'Brug to fingre for at flytte kortet');
        }
      });
    }, 300);

    const rc = new L.RasterCoords(map, img);
    map.setMaxZoom(rc.zoomLevel());
    map.setView(rc.unproject([img[0], img[1]]), rc.zoomLevel() - 4);    // GENERATE MAP WITH GDAL2TILES USING THIS LINE: $ gdal2tiles.py -p raster -z 0-6 -w none --xyz U-signaturer@3x-fade.png tiles


    updateBoundsForZoom(map.getZoom());

    // GENERATE MAP WITH GDAL2TILES USING THIS LINE: $ gdal2tiles.py -p raster -z 0-6 -w none --xyz U-signaturer@3x-fade.png tiles    // Function to update bounds based on zoom level
    function updateBoundsForZoom(zoomLevel) {
      let padValue;

      // Adjust these values as needed - using larger values to see a clear effect
      if (zoomLevel <= 1) {
        padValue = 1.8; // Very zoomed out - larger pad to see the effect
      } else if (zoomLevel === 2) {
        padValue = 0.8; // Medium zoom - medium pad 
      } else if (zoomLevel === 3) {
        padValue = 0.3; // Medium zoom - medium pad
      } else if (zoomLevel === 4) {
        padValue = 0.08; // Closer - larger pad      } else if (zoomLevel <= 5) {
        padValue = 0; // Closer - larger pad
      } else {
        padValue = 2; // Very zoomed in - least pad
      }
      // console.log(`DEBUG: Zoom level: ${zoomLevel}, applying pad value: ${padValue}`);

      // Get the original bounds before padding
      const originalBounds = rc.getMaxBounds();
      // console.log("DEBUG: Original bounds:", originalBounds.toBBoxString());

      // Apply padding
      const paddedBounds = originalBounds.pad(padValue);
      // console.log("DEBUG: Bounds after padding:", paddedBounds.toBBoxString());

      // Set the new bounds
      map.setMaxBounds(paddedBounds);

      // Check if bounds have been applied correctly
      setTimeout(() => {
        const currentBounds = map.getBounds();
        // console.log("DEBUG: Current map bounds:", currentBounds.toBBoxString());
      }, 100);
    }

    // Listen for zoom changes and update bounds
    // map.on('zoomend', function () {
    //   console.log("DEBUG: Zoom changed to:", map.getZoom());
    //   updateBoundsForZoom(map.getZoom());
    // });

    // Also register an event handler for when the map is moved
    // map.on('moveend', function() {
    //   console.log("DEBUG: Map moved, new center:", map.getCenter());
    //   console.log("DEBUG: Map is at zoom level:", map.getZoom());
    // });

    L.tileLayer('../wp-content/uploads/tiles/{z}/{x}/{y}.png', {
      noWrap: true,
      bounds: rc.getMaxBounds(),
      maxNativeZoom: rc.zoomLevel(),
      minZoom: 0,
    }).addTo(map);

    const clusterGroups = {};
    const layerGroups = {};
    const overlays = {};

    const visibleByDefault = ['Information', 'Ørken', 'Grotte', 'Udendørs', 'Regnskov', 'Toiletter', 'Skraldespande'];

    const marginLogoLayer = `style="margin: 0 3px 0 3px;"`;

    const iconHTML = {
      'Information': {
        da: `<i ${marginLogoLayer} class="i mdi:information-variant"></i> Information`,
        en: `<i ${marginLogoLayer} class="i mdi:information-variant"></i> Information`
      },
      'Toiletter': {
        da: `<i ${marginLogoLayer} class="i mdi\:human-male-female-child"></i> Toiletter`,
        en: `<i ${marginLogoLayer} class="i mdi\:human-male-female-child"></i> Restrooms`
      },
      'Regnskov': {
        da: `<i ${marginLogoLayer} class="i game-icons\:monstera-leaf"></i> Regnskov`,
        en: `<i ${marginLogoLayer} class="i game-icons\:monstera-leaf"></i> Rainforest`
      },
      'Ørken': {
        da: `<i ${marginLogoLayer} class="i uil\:desert"></i> Ørken`,
        en: `<i ${marginLogoLayer} class="i uil\:desert"></i> Desert`
      },
      'Udendørs': {
        da: `<i ${marginLogoLayer} class="i healthicons\:forest-persons"></i> Udendørs`,
        en: `<i ${marginLogoLayer} class="i healthicons\:forest-persons"></i> Outdoor`
      },
      'Grotte': {
        da: `<i ${marginLogoLayer} class="i game-icons\:cave-entrance"></i> Grotte`,
        en: `<i ${marginLogoLayer} class="i game-icons\:cave-entrance"></i> Cave`
      },
      'Skraldespande': {
        da: `<i ${marginLogoLayer} class="i mdi\:recycle"></i> Skraldespande`,
        en: `<i ${marginLogoLayer} class="i mdi\:recycle"></i> Waste bins`
      }
    };

    // Create markers as in the original map.js
    markers.forEach(m => {
      const groupName = m.group || 'Andet';
      const clusterName = m.clusterGroup || 'default';
      const disableCluster = m.disableClustering === true;
      const effectiveGroupName = groupName;

      // Cluster groups
      if (!disableCluster && !clusterGroups[clusterName]) {
        clusterGroups[clusterName] = L.markerClusterGroup.layerSupport({
          maxClusterRadius: 70,
          disableClusteringAtZoom: 2,
          showCoverageOnHover: false,
          spiderfyOnMaxZoom: false,
          zoomToBoundsOnClick: true,
          iconCreateFunction: function (cluster) {
            const childCount = cluster.getChildCount();
            const c = ' marker-cluster cluster-group-' + (clusterName.toLowerCase());
            return new L.DivIcon({
              html: '<div><span>' + childCount + '</span></div>',
              className: 'marker-cluster' + c,
              iconSize: new L.Point(40, 40)
            });
          }
        }).addTo(map);
      }

      // Layer groups
      if (!layerGroups[effectiveGroupName]) {
        const layerGroup = L.layerGroup();
        layerGroups[effectiveGroupName] = layerGroup;
        const labelWithIcon = iconHTML[effectiveGroupName]
          ? iconHTML[effectiveGroupName][lang]
          : effectiveGroupName;
        overlays[labelWithIcon] = layerGroup;

        if (visibleByDefault.includes(effectiveGroupName)) {
          if (!disableCluster) clusterGroups[clusterName].checkIn(layerGroup);
          map.addLayer(layerGroup);
        } else {
          if (!disableCluster) clusterGroups[clusterName].checkIn(layerGroup);
        }
      }

      // Marker icons
      const iconSet = m.iconSet || 'i';
      const iconClass = m.icon || 'material-symbols:question-mark-rounded';
      const iconColor = m.color || 'var(--wp--preset--color--moss)';
      const outlineColor = m.outlineColor || 'var(--wp--preset--color--moss) solid 1.35px';
      const isSmall = m.small === true;

      const customIcon = L.divIcon({
        className: 'custom-pin-icon',
        html: `
          <div class="pin-container" style="transform: ${isSmall ? 'scale(0.6)' : 'scale(1)'};">
            <div class="pin" style="background-color: ${iconColor}; outline: ${outlineColor};">
              <i class="${iconSet} ${iconClass}"></i>
            </div>
          </div>
        `,
        iconAnchor: isSmall ? [18, 34] : [16, 48],
        popupAnchor: [2, -32],
        interactive: !isSmall
      });

      const marker = L.marker(rc.unproject([m.x, m.y]), { icon: customIcon });

      const label = typeof m.label === 'object' ? m.label[lang] : m.label;
      const popup = typeof m.popup === 'object' ? m.popup[lang] : m.popup;

      if (isSmall) {
        marker.bindTooltip(label, {
          permanent: false,
          direction: 'top',
          className: 'small-pin-tooltip',
          offset: [0, -15],
        });
      } else {
        const popupContent = popup
          ? `<h3 style="width: 95%; margin: 0 0 10px; font-size: 18px;">${label}</h3>${popup}`
          : `<i class="${iconSet} ${iconClass}"></i> ${label}`;

        marker.on('click', () => {
          const latlng = marker.getLatLng();
          map.panInside(latlng, {
            animate: true,
            duration: 0.3,
            paddingTopLeft: [0, 170]
          });

          marker.unbindPopup();
          marker.bindPopup(popupContent);

          const tempDiv = document.createElement('div');
          tempDiv.innerHTML = popupContent;
          const img = tempDiv.querySelector('img');

          if (img) {
            img.onload = () => marker.openPopup();
            img.onerror = () => marker.openPopup();
          } else {
            marker.openPopup();
          }
        });
      }

      layerGroups[effectiveGroupName].addLayer(marker);
    });

    // Add layer control
    const layersControl = L.control.layers(null, overlays, {
      collapsed: true,
      position: 'bottomright'
    }).addTo(map);

    // Change layers button text based on language
    setTimeout(() => {
      const layersToggle = document.querySelector('.leaflet-control-layers-toggle');
      if (layersToggle) {        // Ensure the image is removed
        layersToggle.style.backgroundImage = 'none';
        layersToggle.innerHTML = ''; // Remove default icon
        layersToggle.textContent = lang === 'en' ? 'Filter' : 'Filter'; // Add text
        layersToggle.style.width = 'auto';
        layersToggle.style.height = 'auto';
        layersToggle.style.padding = '6px 10px';
        layersToggle.style.backgroundColor = 'var(--wp--preset--color--moss)';
        layersToggle.style.color = '#f7f7f7';
        layersToggle.style.borderRadius = 'unset';
        layersToggle.style.fontSize = '20px';
        layersToggle.style.fontWeight = 'bold';
        // Ensure the image doesn't return on hover
        layersToggle.style.backgroundPosition = 'unset';
      }
    }, 100); // Small delay to ensure the element is rendered


    // 🔧 Coordinate tool    // const center = rc.unproject([img[0] / 2, img[1] / 2]);
    // const draggable = L.marker(center, { draggable: true })
    //   .addTo(map)
    //   .bindPopup("Move me to find coordinates")
    //   .openPopup();

    // draggable.on('dragend', function (e) {
    //   const pos = rc.project(e.target.getLatLng());
    //   console.log(`        x: ${Math.floor(pos.x)},\n        y: ${Math.floor(pos.y)},`);
    // });

    // Add popup styling
    const popupStyle = document.createElement('style');
    popupStyle.innerHTML = `
      .leaflet-popup-content-wrapper {
        border-radius: unset !important;
      }
      .leaflet-container a.leaflet-popup-close-button {
        margin-right: 8px !important;
        font: 30px Tahoma, Verdana, sans-serif !important;
      }

      .leaflet-popup-content img {
        border-radius: unset;
        height: 200px;
        width: 100%;
        display: block;
        margin: 0 auto;
        object-fit: cover;
      }

      .leaflet-popup-content-wrapper:has(img) {
        display: flex;
        flex-direction: column;
        align-items: center;
      }

      .leaflet-popup-content p {
        margin: 17px 0;
        margin: 1.3em 0;
        max-width: 250px;
        text-align: start;
      }
    `;
    document.head.appendChild(popupStyle);

    // Show hand animation
    setTimeout(() => {
      if (typeof showHandAnimation === 'function') {
        showHandAnimation(mapId);
      }
    }, 500);
  }
});