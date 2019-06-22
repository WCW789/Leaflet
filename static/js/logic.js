function createMap(quakeMarkers, quakeCircles, tecPlatez) {
  let streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken: API_KEY
  });

  let lightmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.light",
    accessToken: API_KEY
  });

  let darkmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.dark",
    accessToken: API_KEY
  });

  let baseMaps = {
    "Light Map": lightmap,
    "Dark Map": darkmap,
    "Street Map": streetmap
  };

  let overlay = {
    "Markers": quakeMarkers,
    "Radius": quakeCircles,
    "Plates": tecPlatez
  }

  let myMap = L.map("map", {
    center: [
      37.09, -95.71
    ],
    zoom: 3,
    layers: [streetmap, quakeCircles]
  });

  L.control.layers(baseMaps, overlay, {
    collapsed: false
  }).addTo(myMap);

  let info = L.control({
    position: "bottomright"
  });

  info.onAdd = function () {
    let div = L.DomUtil.create("div", "legend");
    return div;
  };
  info.addTo(myMap);
}

function markerSize(size) {
  return size * 50000;
}


let queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson";
let platesLink = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_plates.json";


d3.json(queryUrl, function (response) {

  d3.json(platesLink, function (res) {
    let plates = res.features;

    let tecPlates = [];
    let plateShape;

    for (let j = 0; j < plates.length; j++) {
      let plate = plates[j];
      // console.log("plate coord", plate.geometry.coordinates)

      if (plate.geometry.types = "Polygon") {
        plateShape = L.polygon(
          plate.geometry.coordinates, {
            color: "yellow",
            // fillColor: none,
            fillOpacity: 0
          })
      }
      tecPlates.push(plateShape);
    }
    tecPlatez = L.layerGroup(tecPlates); ///


    let quakes = response.features;
    // console.log(quakes)

    let quakeMarkers = [];
    let quakeCircles = [];
    let quakeCircle;

    for (let i = 0; i < quakes.length; i++) {
      let quake = quakes[i];

      if (quake.properties.mag > 4) {
        quakeCircle = L.circle([quake.geometry.coordinates[1], quake.geometry.coordinates[0]], {
          fillOpacity: 0.75,
          color: "white",
          fillColor: "purple",
          radius: markerSize(quake.properties.mag)
        })
      } else if (quake.properties.mag > 3) {
        quakeCircle = L.circle([quake.geometry.coordinates[1], quake.geometry.coordinates[0]], {
          fillOpacity: 0.75,
          color: "white",
          fillColor: "red",
          radius: markerSize(quake.properties.mag)
        })
      } else if (quake.properties.mag > 2) {
        quakeCircle = L.circle([quake.geometry.coordinates[1], quake.geometry.coordinates[0]], {
          fillOpacity: 0.75,
          color: "white",
          fillColor: "green",
          radius: markerSize(quake.properties.mag)
        })
      } else {
        quakeCircle = L.circle([quake.geometry.coordinates[1], quake.geometry.coordinates[0]], {
          fillOpacity: 0.75,
          color: "white",
          fillColor: "yellow",
          radius: markerSize(quake.properties.mag)
        })
      }

      quakeCircles.push(quakeCircle);

      let quakeMarker = L.marker([quake.geometry.coordinates[1], quake.geometry.coordinates[0]])
        .bindPopup("<h3>Place: " + quake.properties.place + "<h3>");

      quakeMarkers.push(quakeMarker);
      quakeCircles.push(quakeCircle);

      function updateLegend() {
        let limits = [];
        let colors = ["yellow", "green", "red", "purple"];

        let labels = [];

        for (let i = 0; i < quakes.length; i++) {
          let limit = (quakeCircles[i].options.radius / 50000);
          // console.log("here", quakeCircles[i].options)

          limits.push(limit)
          limits = limits.sort(function (a, b) { return a - b });

          let legendInfo = "<h1>Earthquake Size</h1>" +
            "<div class=\"labels\">" +
            "<div class=\"min\">" + Math.min(...limits) + "</div>" +
            "<div class=\"max\">" + Math.max(...limits) + "</div>" +
            "</div>";

          document.querySelector(".legend").innerHTML = legendInfo;
        }

        labels.push("<li style=\"background-color: " + colors[0] + "\"><2</li>");
        labels.push("<li style=\"background-color: " + colors[1] + "\"><3</li>");
        labels.push("<li style=\"background-color: " + colors[2] + "\"><4</li>");
        labels.push("<li style=\"background-color: " + colors[3] + "\">4+</li>");

        document.querySelector(".legend").innerHTML += "<ul>" + labels.join("") + "</ul>";

        console.log("limitz", limits)
        console.log("colorz", colors)
      }
    }

    createMap(L.layerGroup(quakeMarkers), L.layerGroup(quakeCircles), tecPlatez);

    updateLegend();
  })
})

