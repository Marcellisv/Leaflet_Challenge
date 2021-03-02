// Set layers for satelit map

var sateliteMap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox.satellite",
    accessToken: API_KEY
  });

// Create map 

  var myMap = L.map("map", {
    center: [37.09, -95.71],
    zoom: 5,
  
  }).addto(sateliteMap);

// Store API link
var link = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson"
d3.json(link, function(data) {

//Style map with color 

//Query URL Link 
d3.json(link, function(data) {
    createfeature(data.feature)
  }).addto(myMap);

//
  
Function mapStyle(feature) {
    return {
        fillColor: pointColor(magnitude.properties.magnitude),
        color: "#",
        opacity: 1,
        fillOpacity: 1, 
        radius: mag * 5
    }
}
    Funtion pointColor(mag){
    switch(true){
        case mag > 5:
        return "#ea2c2c";
      case mag > 4:
        return "#ea822c";
      case mag > 3:
        return "#ee9c00";
      case mag > 2:
        return "#eecc00";
      case mag > 1:
        return "#d4ee00";
      default:
        return "#98ee00";
      }
    }
//Create Legend
var legend =L.control({
    position: "topright"

});
legend.addon = function(){
    var div = L.DomUtil.create("div", infor legend);

    var div = L.DomUtil.create('div', 'info legend'),
    magnitudes = [0, 1, 2, 3, 4, 5];

for (var i = 0; i < magnitudes.length; i++) {
    div.innerHTML +=
        '<i style="background:' + markerColor(magnitudes[i] + 1) + '"></i> ' + 
+ magnitudes[i] + (magnitudes[i + 1] ? ' - ' + magnitudes[i + 1] + '<br>' : ' + ');
}
return div

}
legend.addto(myMap)

};

