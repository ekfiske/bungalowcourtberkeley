mapboxgl.accessToken = 'pk.eyJ1IjoiZWtmaXNrZSIsImEiOiJjbTFpYWE2eXUwYTU4MmxvZHpsMXB0MGFoIn0.PgmkPVfsppBuKfRqLuI66A';

const map = new mapboxgl.Map({
  container: 'map', // container ID
  style: 'mapbox://styles/ekfiske/cminsia6r00ij01sn6iqjdhal',
  center: [-122.272781, 37.875], // starting position [lng, lat]. Note that lat must be set between -90 and 90
  zoom: 12.5 // starting zoom
    });

map.on('load', function() {
    map.addSource('bc-points', {
      type: 'geojson',
      data: './bcb_data/bc_pointsall.geojson'
    });
  
    map.addLayer({
      id: 'bc-points-layer',
      type: 'circle',
      source: 'bc-points',
      paint: {
          'circle-color': '#4264FB',
          'circle-radius': 6,
          'circle-stroke-width': 2,
          'circle-stroke-color': '#ffffff'
        }
    });
  
});
