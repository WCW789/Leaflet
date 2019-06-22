// API key
const API_KEY = "pk.eyJ1Ijoic2VhdHVydGxlIiwiYSI6ImNqd2RuYndndDE4NW00M2xqOG9qOGpyZzEifQ.mcuEghXRnoJx5iADCTXQ8w"


// function markerSize(size) {
//     return size * 50000;
//   }

//   let queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson";

//   let createMarkers2 = d3.json(queryUrl, function (response) {
//     let quakes2 = response.features;

//     let quakeMarkers = [];

//     for (let i = 0; i < quakes2.length; i++) {
//       let quake2 = quakes2[i];

//       let quakeMarker = L.marker([quake2.geometry.coordinates[1], quake2.geometry.coordinates[0]])
//         .bindPopup("<h3>Place: " + quake2.properties.place + "<h3>");

//       quakeMarkers.push(quakeMarker);
//     }

//     L.layerGroup(quakeMarkers)
//   })



//   let createMarkers1 = d3.json(queryUrl, function (response) {
//     let quakes = response.features;
//     // console.log(quakes)

//     let quakeCircles = [];

//     for (let i = 0; i < quakes.length; i++) {
//       let quake = quakes[i];

//       console.log("testing", quake.properties.mag)
//       let quakeCircle = L.circle([quake.geometry.coordinates[1], quake.geometry.coordinates[0]], {
//         fillOpacity: 0.75,
//         color: "white",
//         fillColor: "purple",
//         radius: markerSize(quake.properties.mag)
//       }).addTo(myMap);

//       quakeCircles.push(quakeCircle);
//     }

//     L.layerGroup(quakeCircles)
//   })

//   let platesLink = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_plates.json";

//   let createPlates = d3.json(queryUrl, function (res) {
//     let plates = res.features;

//     let tecPlates = [];

//     for (let j = 0; j < plates.length; j++) {
//       let plate = plates[j];
//       // console.log("plate coord", plate.geometry.coordinates)

//       let plateShape = L.polygon(
//         plate.geometry.coordinates[0], {
//           color: "yellow",
//           fillColor: "yellow",
//           fillOpacity: 0.75
//         }).addTo(myMap);

//       console.log("what up")
//       tecPlates.push(plateShape);
//     }

//     L.layerGroup(tecPlates);
//   })

//   // function createMap(quakeCircles, quakeMarkers) {
//   let streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
//     attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
//     maxZoom: 18,
//     id: "mapbox.streets",
//     accessToken: API_KEY
//   });

//   let baseMaps = {
//     "Light Map": streetmap
//   };

//   let overlay = {
//     "qCircles": createMarkers1,
//     "qMarkers": createMarkers2,
//     "qPlates": createPlates,
//   }

//   let myMap = L.map("map", {
//     center: [
//       37.09, -95.71
//     ],
//     zoom: 2,
//     layers: [streetmap, createMarkers1]
//   });

//   L.control.layers(baseMaps, overlay, {
//     collapsed: false
//   }).addTo(myMap);
//   // }