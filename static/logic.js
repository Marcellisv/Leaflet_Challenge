// Define streetmap
var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 10,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
});

// Create Map
var myMap = L.map("map", {
  center: [
    37.09, -95.71
  ],
  zoom: 5,

});

streetmap.addTo(myMap);

// Store our API endpoint inside queryUrl
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
d3.json(queryUrl, function(data) {

  /// Creat style 

  function mapStyle(feature) 
  {
    return {
      opacity: 1,
      fillOpacity: 1,
      fillColor: pointColor(feature.properties.mag),
      color: "fffff",
      radius: mapRadius(feature.properties.mag),
      stroke: true,
      weight: 0.5
    };
  }
  // Add color to markers
  function pointColor(magnitude) {
    switch (true) {
           case magnitude < 1:
        return "#99ff66";
           case magnitude < 2:
        return "#66d9ff";
           case magnitude < 3:
        return "ffff4d";
           case magnitude < 4:
        return "#ff6633";
           case magnitude < 5:
        return "#ff3333";
      
    }
  }

  function mapRadius(magnitude)
   {
    return magnitude * 7;
  }
  

//geoJson
  L.geoJson(data, {

    pointToLayer: function(feature, latlng) {
      return L.circleMarker(latlng);
    },

    style: mapStyle,

    onEachFeature: function(feature, layer) {
      layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place);

    }
  }).addTo(myMap);
//Create Legend
  var legend = L.control({
    position: "bottomright"
  });

  legend.onAdd = function() {
    var div = L.DomUtil.create("div", "info legend");

    var grades = [ 1, 2, 3, 4, 5];
    var colors = ["#99ff66", "#66d9ff", "#ffff4d","#ff6633", "#ff3333"];
    for (var i = 0; i<grades.length; i++) {
      div.innerHTML +=
      "<i style='background: " + colors[i] + "'></i> " +
      grades[i] + (grades[i + 1] ? "&ndash;" + grades[i + 1] + "<br>" : "+");
    }
    return div;

  };

  legend.addTo(myMap)
  
});
