window.showHandAnimation = function (mapId) {
  // Find den specifikke kontrol for det givne kortID
  const layersControl = document.querySelector(`#${mapId}`).closest('.custom-crs-map-container').querySelector('.leaflet-control-layers');
  const toggleBtn = layersControl ? layersControl.querySelector('.leaflet-control-layers-toggle') : null;

  if (!layersControl || !toggleBtn) {
    return;
  }

  // Opret et unikt ID for denne hånd-animation baseret på kort-ID
  const handId = `pointer-hand-${mapId}`;

  // Fjern eventuelle eksisterende hånd-animationer for dette kort
  const existingHand = document.getElementById(handId);
  if (existingHand) {
    existingHand.remove();
  }

  const hand = document.createElement('div');
  hand.innerText = '👉';
  hand.id = handId;
  document.body.appendChild(hand);

  // Opret et unikt stylesheet kun for denne håndanimation
  const styleId = `hand-style-${mapId}`;
  let style = document.getElementById(styleId);

  if (!style) {
    style = document.createElement('style');
    style.id = styleId;
    style.innerHTML = `
      #${handId} {
        position: absolute;
        z-index: 1;
        font-size: 2.5rem;
        animation: fadein-${mapId} 0.5s ease, wiggle-${mapId} 1.2s infinite;
        cursor: pointer;
        pointer-events: none;
        opacity: 0;
        transition: opacity 0.5s ease;
      }

      @keyframes wiggle-${mapId} {
        0%, 100% { transform: translateX(0); }
        50% { transform: translateX(-20px); }
      }

      @keyframes fadein-${mapId} {
        from { opacity: 0; }
        to { opacity: 0.85; }
      }
    `;
    document.head.appendChild(style);
  }

  const positionHand = () => {
    const rect = toggleBtn.getBoundingClientRect();
    hand.style.top = `${rect.top + window.scrollY + -5}px`;
    hand.style.left = `${rect.left + window.scrollX - 60}px`;
  };

  // Placér og vis hånden
  positionHand();
  hand.style.opacity = '1';

  // Opdater placering ved scroll/resize
  window.addEventListener('scroll', positionHand);
  window.addEventListener('resize', positionHand);

  // Fjern hånden
  const removeHand = () => {
    hand.style.opacity = '0';
    setTimeout(() => {
      if (hand.parentNode) {
        hand.remove();
      }
    }, 500);
    observer.disconnect();
    window.removeEventListener('scroll', positionHand);
    window.removeEventListener('resize', positionHand);
  };

  // Observer når lag-menuen åbnes
  const observer = new MutationObserver(() => {
    if (layersControl.classList.contains('leaflet-control-layers-expanded')) {
      removeHand();
    }
  });

  observer.observe(layersControl, { attributes: true, attributeFilter: ['class'] });

  // Auto-fjern efter 10 sek
  setTimeout(removeHand, 10000);
};