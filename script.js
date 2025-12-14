mapboxgl.accessToken = 'pk.eyJ1IjoiZWtmaXNrZSIsImEiOiJjbTFpYWE2eXUwYTU4MmxvZHpsMXB0MGFoIn0.PgmkPVfsppBuKfRqLuI66A';

const map = new mapboxgl.Map({
  container: 'map', // container ID
  style: 'mapbox://styles/ekfiske/cminsia6r00ij01sn6iqjdhal',
  center: [-122.272781, 37.875], // starting position [lng, lat]. Note that lat must be set between -90 and 90
  zoom: 12.5 // starting zoom
    });
const minDate = 1912;
const maxDate = 1943;

function filterBy(date) {
  const filters = ['<=', ['to-number', ['get', "date"]], date];
  map.setFilter('bc-points-layer', filters);
 document.getElementById('year').textContent = date;
}

map.on('load', function() {
  // Load an image from an external URL.
  map.loadImage(
      'https://raw.githubusercontent.com/ekfiske/bungalowcourtberkeley/refs/heads/main/bcb_icons/bcb_icon1.png',
          (error, image) => {
              if (error) throw error;

              // Add the image to the map style.
              map.addImage('icon1', image);

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
          'icon-size': 0.03,
          'icon-allow-overlap': true
        }
    });
            
filterBy(maxDate);
            
 document.getElementById('slider').addEventListener('input', (e) => {
      const date = parseInt(e.target.value, 10);
      filterBy(date);
   });

    // Add click event for bc popups
    map.on('click', 'bc-points-layer', (e) => {
        // Copy coordinates array
        const coordinates = e.features[0].geometry.coordinates.slice();
        const properties = e.features[0].properties;

        // Create popup content using the actual data properties
        const popupContent = `
            <div>
                <h3>${properties.address}</h3>
                <p><strong>Year constructed:</strong> ${properties.date}</p>
                <p><strong>Parcel land use:</strong> ${properties.land_use}</p>
                <p><strong>Dwelling type:</strong> ${properties.dwelling_type}</p>
                <p><strong>Dwelling type notes:</strong> ${properties.dwelling_type_notes}</p>
            </div>
        `;

        new mapboxgl.Popup()
            .setLngLat(coordinates)
            .setHTML(popupContent)
            .addTo(map);
    });
            
  });
  
});
