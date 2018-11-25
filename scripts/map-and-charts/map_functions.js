function lvl1MapInteraction(feature, layer){
  layer.on('click', function (e) {
    // If user click on selected area, area gets deselected
    if (e.target.feature.properties.selected) {
      e.target.feature.properties.selected = false;
      const index = analyser.area_list.indexOf(e.target.feature.properties.pcode)
      analyser.area_list.splice(index, 1)
    }
    // Area gets selected
    else {
      e.target.feature.properties.selected = true;
    }
    // Loop on each layer to set analyser.area_list
    level1.eachLayer(function(layer){
      if (layer.feature.properties.selected) {
        analyser.area_list.push(layer.feature.properties.pcode)
      }
    })
    if (analyser.area_list == 0) {
      analyser.area_list = ['*']
    }
    // Refresh the sector list
    $("#sectorlist").val(analyser.area_list);
    $('#sectorlist').selectpicker('render');
    analyser.selectMapData()
  })
}


function lvl2MapInteraction(feature, layer){
  layer.on('click', function (e) {
    // If user click on selected area, area gets deselected
    if (e.target.feature.properties.selected) {
      e.target.feature.properties.selected = false;
      const index = analyser.area_list.indexOf(e.target.feature.properties.pcode)
      analyser.area_list.splice(index, 1)
    }
    // Area gets selected
    else {
      e.target.feature.properties.selected = true;
    }
    // Loop on each layer to set analyser.area_list
    level2.eachLayer(function(layer){
      if (layer.feature.properties.selected) {
        analyser.area_list.push(layer.feature.properties.pcode)
      }
    })
    if (analyser.area_list == 0) {
      analyser.area_list = ['*']
    }
    // Refresh the sector list
    $("#sectorlist").val(analyser.area_list);
    $('#sectorlist').selectpicker('render');
    analyser.selectMapData()
  })
}

function lvl3MapInteraction(feature, layer){
  layer.on('click', function (e) {
    // If user click on selected area, area gets deselected
    if (e.target.feature.properties.selected) {
      e.target.feature.properties.selected = false;
      const index = analyser.area_list.indexOf(e.target.feature.properties.pcode)
      analyser.area_list.splice(index, 1)
    }
    // Area gets selected
    else {
      e.target.feature.properties.selected = true;
    }
    // Loop on each layer to set analyser.area_list
    level3.eachLayer(function(layer){
      if (layer.feature.properties.selected) {
        analyser.area_list.push(layer.feature.properties.pcode)
      }
    })
    if (analyser.area_list == 0) {
      analyser.area_list = ['*']
    }
    // Refresh the sector list
    $("#sectorlist").val(analyser.area_list);
    $('#sectorlist').selectpicker('render');
    analyser.selectMapData()
  })
}

function displayAttack(dataset, tresholds){
  if (mymap.hasLayer(caseCircles)) {
    mymap.removeLayer(caseCircles)
  }
  if (analyser.geo_mode == 2) {
    level2.eachLayer(function(layer){
      $.each(dataset, function(i, v){
        const attackRate = v['result'] / v['occurence']
        if (layer.feature.properties.pcode == v['pcode']) {
          layer.feature.properties.selected = true
          layer.bindPopup(setPopUpContent(attackRate, layer.feature.properties.name));
          layer.on('mouseover', function (e) {
              this.openPopup();
          });
          layer.on('mouseout', function (e) {
              this.closePopup();
          });
          if (attackRate <= tresholds[0]) {
            layer.setStyle({
              "weight": 1,
              "color": "#000",
              "opacity": 0.7,
              "fillColor": "#FFE9E0",
              "fillOpacity": 0.7
            });
          } else if (attackRate > tresholds[0] && attackRate <= tresholds[1]) {
            layer.setStyle({
              "weight": 1,
              "color": "#000",
              "opacity": 0.7,
              "fillColor": "#FFC7B4",
              "fillOpacity": 0.7
            });
          } else if (attackRate > tresholds[1] && attackRate <= tresholds[2]) {
            layer.setStyle({
              "weight": 1,
              "color": "#000",
              "opacity": 0.7,
              "fillColor": "#FFA791",
              "fillOpacity": 0.7
            });
          } else if (attackRate > tresholds[2] && attackRate <= tresholds[3]) {
            layer.setStyle({
              "weight": 1,
              "color": "#000",
              "opacity": 0.7,
              "fillColor": "#FF8875",
              "fillOpacity": 0.7
            });
          } else if (attackRate > tresholds[3] && attackRate <= tresholds[4]) {
            layer.setStyle({
              "weight": 1,
              "color": "#000",
              "opacity": 0.7,
              "fillColor": "#E75B5B",
              "fillOpacity": 0.7
            });
          } else if (attackRate > tresholds[4]) {
            layer.setStyle({
              "weight": 1,
              "color": "#000",
              "opacity": 0.7,
              "fillColor": "#B8474F",
              "fillOpacity": 0.7
            });
          }
        }
      })
    })
    level2.eachLayer(function(layer){
      if (!layer.feature.properties.selected) {
        layer.setStyle({
          "weight": 1,
          "color": "#000",
          "opacity": 0.7,
          "fillColor": "#fff",
          "fillOpacity": 0.3
        });
      }
    })
  } else if (analyser.geo_mode == 3) {
    level3.eachLayer(function(layer){
      $.each(dataset, function(i, v){
        const attackRate = v['result'] / v['occurence']
        if (layer.feature.properties.pcode == v['pcode']) {
          layer.feature.properties.selected = true
          layer.bindPopup(setPopUpContent(attackRate, layer.feature.properties.name));
          layer.on('mouseover', function (e) {
              this.openPopup();
          });
          layer.on('mouseout', function (e) {
              this.closePopup();
          });
          if (attackRate <= tresholds[0]) {
            layer.setStyle({
              "weight": 1,
              "color": "#000",
              "opacity": 0.7,
              "fillColor": "#FFE9E0",
              "fillOpacity": 0.7
            });
          } else if (attackRate > tresholds[0] && attackRate <= tresholds[1]) {
            layer.setStyle({
              "weight": 1,
              "color": "#000",
              "opacity": 0.7,
              "fillColor": "#FFC7B4",
              "fillOpacity": 0.7
            });
          } else if (attackRate > tresholds[1] && attackRate <= tresholds[2]) {
            layer.setStyle({
              "weight": 1,
              "color": "#000",
              "opacity": 0.7,
              "fillColor": "#FFA791",
              "fillOpacity": 0.7
            });
          } else if (attackRate > tresholds[2] && attackRate <= tresholds[3]) {
            layer.setStyle({
              "weight": 1,
              "color": "#000",
              "opacity": 0.7,
              "fillColor": "#FF8875",
              "fillOpacity": 0.7
            });
          } else if (attackRate > tresholds[3] && attackRate <= tresholds[4]) {
            layer.setStyle({
              "weight": 1,
              "color": "#000",
              "opacity": 0.7,
              "fillColor": "#E75B5B",
              "fillOpacity": 0.7
            });
          } else if (attackRate > tresholds[4]) {
            layer.setStyle({
              "weight": 1,
              "color": "#000",
              "opacity": 0.7,
              "fillColor": "#B8474F",
              "fillOpacity": 0.7
            });
          }
        }
      })
    })
    level3.eachLayer(function(layer){
      if (!layer.feature.properties.selected) {
        layer.setStyle({
          "weight": 1,
          "color": "#000",
          "opacity": 0.7,
          "fillColor": "#fff",
          "fillOpacity": 0.3
        });
      }
    })
  }
}

function displayMortality(dataset, tresholds){
  console.log(tresholds);
  if (mymap.hasLayer(caseCircles)) {
    mymap.removeLayer(caseCircles)
  }
  console.log(dataset);
  if (analyser.geo_mode == 2) {
    level2.eachLayer(function(layer){
      layer.unbindPopup();
      $.each(dataset, function(i, v){
        const mortalityRate = v['result'] / v['occurence']
        if (layer.feature.properties.pcode == v['pcode']) {
          layer.feature.properties.selected = true
          layer.bindPopup(setPopUpContent(mortalityRate, layer.feature.properties.name));
          layer.on('mouseover', function (e) {
              this.openPopup();
          });
          layer.on('mouseout', function (e) {
              this.closePopup();
          });
          if (mortalityRate <= tresholds[0]) {
            layer.setStyle({
              "weight": 1,
              "color": "#000",
              "opacity": 0.7,
              "fillColor": "#FFE9E0",
              "fillOpacity": 0.7
            });
          } else if (mortalityRate > tresholds[0] && mortalityRate <= tresholds[1]) {
            layer.setStyle({
              "weight": 1,
              "color": "#000",
              "opacity": 0.7,
              "fillColor": "#FFC7B4",
              "fillOpacity": 0.7
            });
          } else if (mortalityRate > tresholds[1] && mortalityRate <= tresholds[2]) {
            layer.setStyle({
              "weight": 1,
              "color": "#000",
              "opacity": 0.7,
              "fillColor": "#FFA791",
              "fillOpacity": 0.7
            });
          } else if (mortalityRate > tresholds[2] && mortalityRate <= tresholds[3]) {
            layer.setStyle({
              "weight": 1,
              "color": "#000",
              "opacity": 0.7,
              "fillColor": "#FF8875",
              "fillOpacity": 0.7
            });
          } else if (mortalityRate > tresholds[3] && mortalityRate <= tresholds[4]) {
            layer.setStyle({
              "weight": 1,
              "color": "#000",
              "opacity": 0.7,
              "fillColor": "#E75B5B",
              "fillOpacity": 0.7
            });
          } else if (mortalityRate > tresholds[4]) {
            layer.setStyle({
              "weight": 1,
              "color": "#000",
              "opacity": 0.7,
              "fillColor": "#B8474F",
              "fillOpacity": 0.7
            });
          }
        }
      })
    })
    level2.eachLayer(function(layer){
      if (!layer.feature.properties.selected) {
        layer.setStyle({
          "weight": 1,
          "color": "#000",
          "opacity": 0.7,
          "fillColor": "#fff",
          "fillOpacity": 0.3
        });
      }
    })
  } else if (analyser.geo_mode == 3) {
    level3.eachLayer(function(layer){
      layer.unbindPopup();
      $.each(dataset, function(i, v){
        const mortalityRate = v['result'] / v['occurence']
        if (layer.feature.properties.pcode == v['pcode']) {
          layer.bindPopup(setPopUpContent(mortalityRate, layer.feature.properties.name));
          layer.on('mouseover', function (e) {
              this.openPopup();
          });
          layer.on('mouseout', function (e) {
              this.closePopup();
          });
          layer.feature.properties.selected = true
          if (mortalityRate <= tresholds[0]) {
            layer.setStyle({
              "weight": 1,
              "color": "#000",
              "opacity": 0.7,
              "fillColor": "#FFE9E0",
              "fillOpacity": 0.7
            });
          } else if (mortalityRate > tresholds[0] && mortalityRate <= tresholds[1]) {
            layer.setStyle({
              "weight": 1,
              "color": "#000",
              "opacity": 0.7,
              "fillColor": "#FFC7B4",
              "fillOpacity": 0.7
            });
          } else if (mortalityRate > tresholds[1] && mortalityRate <= tresholds[2]) {
            layer.setStyle({
              "weight": 1,
              "color": "#000",
              "opacity": 0.7,
              "fillColor": "#FFA791",
              "fillOpacity": 0.7
            });
          } else if (mortalityRate > tresholds[2] && mortalityRate <= tresholds[3]) {
            layer.setStyle({
              "weight": 1,
              "color": "#000",
              "opacity": 0.7,
              "fillColor": "#FF8875",
              "fillOpacity": 0.7
            });
          } else if (mortalityRate > tresholds[3] && mortalityRate <= tresholds[4]) {
            layer.setStyle({
              "weight": 1,
              "color": "#000",
              "opacity": 0.7,
              "fillColor": "#E75B5B",
              "fillOpacity": 0.7
            });
          } else if (mortalityRate > tresholds[4]) {
            layer.setStyle({
              "weight": 1,
              "color": "#000",
              "opacity": 0.7,
              "fillColor": "#B8474F",
              "fillOpacity": 0.7
            });
          }
        }
      })
    })
    level3.eachLayer(function(layer){
      if (!layer.feature.properties.selected) {
        layer.setStyle({
          "weight": 1,
          "color": "#000",
          "opacity": 0.7,
          "fillColor": "#fff",
          "fillOpacity": 0.3
        });
      }
    })
  }
}

let caseCircles
function displayCase(dataset, minValue){
  if (mymap.hasLayer(caseCircles)) {
    mymap.removeLayer(caseCircles)
  }
  caseCircles = L.layerGroup()
  if (analyser.geo_mode == 2) {
      level2.eachLayer(function(layer){
        // Reset layer style
        layer.unbindPopup();
        layer.setStyle({
          "weight": 1,
          "color": "#000",
          "opacity": 0.7,
          "fillColor": "#fff",
          "fillOpacity": 0.3
        });
        $.each(dataset, function(i, v){
          if (layer.feature.properties.pcode == v['pcode'] && v['result'] > 0) {
              layer.feature.properties.selected = true
              var centroid = turf.centerOfMass(layer.feature);
              var lon = centroid.geometry.coordinates[0];
              var lat = centroid.geometry.coordinates[1];
              let circle
              const radius = getCircleRadius(v['result'], minValue, 10000)
              circle = L.circle([lat, lon], {
                "weight": 1,
                "color": "#000",
                "opacity": 0.7,
                "fillColor": "#e91625",
                "fillOpacity": 0.7,
                "radius": radius
              })
            caseCircles.addLayer(circle)
            circle.bindPopup(setPopUpContent(v['result'], layer.feature.properties.name));
            circle.on('mouseover', function (e) {
                this.openPopup();
            });
            circle.on('mouseout', function (e) {
                this.closePopup();
            });
          }
        })
        caseCircles.addTo(mymap)
      })

  } else if (analyser.geo_mode == 3) {
    level3.eachLayer(function(layer){
      // Reset layer style
      layer.unbindPopup();
      layer.setStyle({
        "weight": 1,
        "color": "#000",
        "opacity": 0.7,
        "fillColor": "#fff",
        "fillOpacity": 0.3
      });

      $.each(dataset, function(i, v){
        if (layer.feature.properties.pcode == v['pcode'] && v['result'] > 0) {
          layer.feature.properties.selected = true
          var centroid = turf.centerOfMass(layer.feature);
          var lon = centroid.geometry.coordinates[0];
          var lat = centroid.geometry.coordinates[1];
          let circle
          const radius = getCircleRadius(v['result'], minValue, 30000)
          circle = L.circle([lat, lon], {
            "weight": 1,
            "color": "#000",
            "opacity": 0.7,
            "fillColor": "#e91625",
            "fillOpacity": 0.7,
            "radius": radius
          })
          caseCircles.addLayer(circle)
          circle.bindPopup(setPopUpContent(v['result'], layer.feature.properties.name));
          circle.on('mouseover', function (e) {
              this.openPopup();
          });
          circle.on('mouseout', function (e) {
              this.closePopup();
          });
        }
      })
      caseCircles.addTo(mymap)
    })
  }
}


function displayDeath(dataset, minValue){
  if (mymap.hasLayer(caseCircles)) {
    mymap.removeLayer(caseCircles)
  }
  console.log(dataset);
  caseCircles = L.layerGroup()
  if (analyser.geo_mode == 2) {
      level2.eachLayer(function(layer){
        // Reset layer style
        layer.unbindPopup();
        layer.setStyle({
          "weight": 1,
          "color": "#000",
          "opacity": 0.7,
          "fillColor": "#fff",
          "fillOpacity": 0.3
        });
        $.each(dataset, function(i, v){
          if (layer.feature.properties.pcode == v['pcode'] && v['result'] > 0) {
            layer.feature.properties.selected = true
            var centroid = turf.centerOfMass(layer.feature);
            var lon = centroid.geometry.coordinates[0];
            var lat = centroid.geometry.coordinates[1];
            let circle
            const radius = getCircleRadius(v['result'], minValue, 10000)
            circle = L.circle([lat, lon], {
              "weight": 1,
              "color": "#000",
              "opacity": 0.7,
              "fillColor": "#e91625",
              "fillOpacity": 0.7,
              "radius": radius
            })
            caseCircles.addLayer(circle)
            circle.bindPopup(setPopUpContent(v['result'], layer.feature.properties.name));
            circle.on('mouseover', function (e) {
                this.openPopup();
            });
            circle.on('mouseout', function (e) {
                this.closePopup();
            });
          }
        })
        caseCircles.addTo(mymap)
      })

  } else if (analyser.geo_mode == 3) {
    level3.eachLayer(function(layer){
      // console.log(layer.feature.properties.name);
      // Reset layer style
      layer.unbindPopup();
      layer.setStyle({
        "weight": 1,
        "color": "#000",
        "opacity": 0.7,
        "fillColor": "#fff",
        "fillOpacity": 0.3
      });
      $.each(dataset, function(i, v){
        if (layer.feature.properties.pcode == v['pcode'] && v['result'] > 0) {
          layer.feature.properties.selected = true
          layer.feature.properties.result = v['result']
          var centroid = turf.centerOfMass(layer.feature);
          var lon = centroid.geometry.coordinates[0];
          var lat = centroid.geometry.coordinates[1];
          let circle
          const radius = getCircleRadius(v['result'], minValue, 30000)
          circle = L.circle([lat, lon], {
            "weight": 1,
            "color": "#000",
            "opacity": 0.7,
            "fillColor": "#e91625",
            "fillOpacity": 0.7,
            "radius": radius
          })
          caseCircles.addLayer(circle)
          circle.bindPopup(setPopUpContent(v['result'], layer.feature.properties.name));
          circle.on('mouseover', function (e) {
              this.openPopup();
          });
          circle.on('mouseout', function (e) {
              this.closePopup();
          });
        }
      })
      caseCircles.addTo(mymap)
    })
  }
}


let valueInfo
function showInfo(e){
  valueInfo = L.Control({position: 'bottomleft'}).addTo(mymap)
  console.log("Secteur: "+e.target.feature.properties.name+" Valeur: "+e.target.feature.properties.result);
  // e.bindPopup("Result"+e.target.feature.properties.result).openPopup();
}

function hideInfo(e){
  // console.log(e);
}
