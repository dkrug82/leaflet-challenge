var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

d3.json(url).then(function(data){

console.log(data);
});


//d3.json(url).then(createMarkers);

function createMap(earthquakes) {
  // Create the map object with options
  var map = L.map("map", {
    center: [37.09, -95.7129],
    zoom: 5,
    layers: [lightmap, earthquakes]
  });

    // Create the tile layer that will be the background of our map
  var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "light-v10",
    accessToken: API_KEY
  });

  // Create a baseMaps object to hold the lightmap layer
  var baseMaps = {
    "Light Map": lightmap
  };

  // Create an overlayMaps object to hold the earthquake layer
  var overlayMaps = {
    "Earthquakes": earthquakes
  };

  // Create a layer control, pass in the baseMaps and overlayMaps. Add the layer control to the map
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(map);
}








// function createMarkers(response){
//     var features = response.features;
//     // var properties = features.properties;
//     // var geometry = features[0].geometry;
//     console.log(features)
//     earthquakeMarkers = [];

//     for (var index = 0; index < features.length; index++) {
//         var earthquakeMarker = L.marker([features[index].geometry.coordinates[1], features[index].geometry.coordinates[0]]);

//         earthquakeMarkers.push(earthquakeMarker);
//     }
    
//     console.log(earthquakeMarkers);
//     createMap(L.layerGroup(earthquakeMarkers));
// }



