// Create our map, giving it the streetmap and earthquakes layers to display on load
var myMap = L.map("map", {
  center: [
    37.09, -95.71
  ],
  zoom: 5,

});

 var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
}).addto(myMap);





// Store our API endpoint inside queryUrl
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
d3.json(queryUrl, function(data) {

  /// We will create three function. 
  // function 1 for style, function 2 for color and function 3 for radiues

  
  function mapStyle(feature) 
  {
    return {
      opacity: 1,
      fillOpacity: 1,
      fillColor: pointColor(feature.properties.mag),
      color: "white",
      radius: mapRadius(feature.properties.mag),
      stroke: true,
      weight: 0.5
    };
  }
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
  


  L.geoJson(data, {

    pointToLayer: function(feature, latlng) {
      return L.circleMarker(latlng);
    },

    style: mapStyle,

    onEachFeature: function(feature, layer) {
      layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place);

    }
  }).addTo(myMap);

  var legend = L.control({
    position: "topright"
  });

  legend.onAdd = function() {
    var div = L.DomUtil.create("div", "info legend");

    var grades = [0, 1, 2, 3, 4, 5];
    var colors = [ "#ccff33","#99ff66", "#80dfff","ff9933", "#ff6633", "#ff3333"];


  // loop thry the intervals of colors to put it in the label
  for (var i = 0; i < mags.length; i++) {
    div.innerHTML +=
        '<i style="background:' + pointColor(mags[i] + 1) + '"></i> ' +
        mags[i] + (mags[i + 1] ? '&ndash;' + mags[i + 1] + '<br>' : '+');
}
    return div;

  };

  legend.addTo(streetMap)
  
});

// Add legend to the map
var legend = L.control({position: 'bottomright'});
  
legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
     mags = [0, 1, 2, 3, 4, 5];
    // var colors = [ "#ccff33","#99ff66", "#80dfff","ff9933", "#ff6633", "#ff3333"];


    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < mags.length; i++) {
        div.innerHTML +=
            '<i style="background:' + pointColor(mags[i] + 1) + '"></i> ' +
            mags[i] + (mags[i + 1] ? '&ndash;' + mags[i + 1] + '<br>' : '+');
    }

    return div;
};

legend.addTo(myMap);