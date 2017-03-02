// instantiate the map object
var map = L.map('mapContainer').setView([33.137551192346145,-343.125], 1);

//add a dark basemap from carto's free basemaps
L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png', {
  maxZoom: 18,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attribution">CARTO</a>'
}).addTo(map);


$.getJSON('data/data.json', function(jqueryData) {

  //add geojson data from another js file
  L.geoJson(myData, {
    onEachFeature: function (feature, layer) {
      if (feature.properties && feature.properties.popupContent) {
        layer.bindPopup(feature.properties.name + ' - ' + feature.properties.popupContent);
      }
    }
  }).addTo(map);


  L.geoJson(myData, {
    pointToLayer: function (feature, latlng) {
      var customColor;

      if(feature.properties.region == 1) {
        customColor = 'red';
      }

      if(feature.properties.region == 2) {
        customColor = 'blue';
      }

      if(feature.properties.region == 3) {
        customColor = 'green';
      }

      return L.circleMarker(latlng, {
        fillColor: customColor,
        fillOpacity: .8,
        weight: 1,
      });
    }
  }).addTo(map);
  
}) // this is the end of the $.getJSON callback





// L.circleMarker(data.coord, {
//     color: 'orange',
//     fillColor: 'steelblue',
//     fillOpacity: .9,
//     weight: 1,
//   })