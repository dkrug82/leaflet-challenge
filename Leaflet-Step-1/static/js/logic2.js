// Created url variable
var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

d3.json(url).then(function (data) {

    console.log(data);
});

// Create the tile layer that will be the background of our map
var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "light-v10",
    accessToken: API_KEY
});

// Create the map object with options
var map = L.map("map", {
    center: [37.09, -95.7129],
    zoom: 4
});

lightmap.addTo(map);

// read in data from url
d3.json(url).then(function (data) {
    function createMarkers(feature) {
        return {

            radius: radius(feature.properties.mag),
            fillColor: color(feature.geometry.coordinates[2]),
            color: "#000",
            weight: 1,
            opacity: 1,
            fillOpacity: 0.8
        }
    }
    // Created funtion to return the radius of each circle marker
    function radius(mag) {
        return mag * 4;
    }
    // Created function to determine the color of each marker
    function color(depth) {

        switch (true) {
            case depth > 90:
                return "red";
            case depth > 70:
                return "darkorange";
            case depth > 50:
                return "orange";
            case depth > 30:
                return "yellow";
            case depth > 10:
                return "greenyellow";
            default:
                return "green";
        }
    }

    // Called the data and placed each marker on the map
    L.geoJson(data, {
        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng);
        },
        style: createMarkers,
        onEachFeature: function (feature, layer) {
            layer.bindPopup("Magnitude " + feature.properties.mag + "<br>" + feature.properties.place)
        }
    }).addTo(map);

    // Created the legend
    var legend = L.control({ position: 'bottomright' });

    legend.onAdd = function () {
        var div = L.DomUtil.create('div', 'info legend'),
            grades = [-10, 10, 30, 50, 70, 90],
            colors = ["green", "greenyellow", "yellow", "orange", "darkorange", "red"];

        for (var i = 0; i < grades.length; i++) {
            div.innerHTML +=
                '<ui style="background:' + color(grades[i] + 1) + '">&nbsp&nbsp</ui> ' +
                grades[i] + (grades[i + 1] ? "&ndash;" + grades[i + 1] + "<br>" : "+");
        }
        return div;
    };

    legend.addTo(map);
})

