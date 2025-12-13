mapboxgl.accessToken = 'pk.eyJ1IjoiZWtmaXNrZSIsImEiOiJjbTFpYWE2eXUwYTU4MmxvZHpsMXB0MGFoIn0.PgmkPVfsppBuKfRqLuI66A';

const map = new mapboxgl.Map({
  container: 'map', // container ID
  style: 'mapbox://styles/ekfiske/cminsia6r00ij01sn6iqjdhal',
  center: [-122.272781, 37.875], // starting position [lng, lat]. Note that lat must be set between -90 and 90
  zoom: 12.5 // starting zoom
    });

map.on('load', function() {
  // Load an image from an external URL.
    map.loadImage(
      'https://github.com/ekfiske/bungalowcourtberkeley/blob/main/bcb_icons/bcb_icon1.png?raw=true',
          (error, image) => {
              if (error) throw error;

              // Add the image to the map style.
              map.addImage('icon1', image);
    });
  
    map.addSource('bc-points', {
      type: 'geojson',
      data: 'https://raw.githubusercontent.com/ekfiske/bungalowcourtberkeley/refs/heads/main/bcb_data/bc_pointsall.geojson'
    });
  
    map.addLayer({
      id: 'bc-points-layer',
      type: 'symbol',
      source: 'bc-points',
      layout: {
          'icon-image': 'icon1', // reference the image
          'icon-size': 0.5
          'icon-allow-overlap': true
      }
    });
  
});
