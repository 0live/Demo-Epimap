// Change on area mode selector
$(document).on('change','#secteur',function(){
    const selection = $('#secteur').val()
    // Intialise analyser Object
    analyser.geo_mode = parseInt(selection)

    analyser.area_list = ['*']
    // Change layer on the map
    boundarieslayers.eachLayer(function(layer){
      if (mymap.hasLayer(layer)) {
        mymap.removeLayer(layer)
      }
    })
    eval('level'+selection+'.addTo(mymap)')
    setAreaList(selection)
});

// Change on time selector
$(document).on('change','#intervalle',function(){
    const selection = $('#intervalle').val()
    analyser.time_mode = parseInt(selection)
    // Change slider mode
    if (selection === '1') {
      slider.year()
    } else if (selection === '2') {
      slider.month()
    } else if (selection === '3') {
      slider.week()
    }
});

// Change on disease selector
$(document).on('change','#disease',function(){
    analyser.disease = $('#disease').val()
});

// Change on indicator selector
$(document).on('change','#indicator',function(){
    analyser.indicator = $('#indicator').val()
});

// Change on area list selector (Charts DIV)
let allWasSelected = true
$(document).on('change','#sectorlist',function(){
    let selection = $('#sectorlist').val()
    const allIsSelected = contains.call(selection, '*');
    // If user click on an area -> Deselect the "*" value
    if (selection.length > 1 && allIsSelected && allWasSelected) {
      allWasSelected = false
      const index = selection.indexOf('*')
      selection.splice(index, 1)
      analyser.area_list = selection
      $('#sectorlist').val(analyser.area_list)
      $('#sectorlist').selectpicker('render');
      $('#sectorlist').selectpicker('toggle');
      $('#sectorlist').selectpicker('toggle');
    }
    // If user click on "All" -> Deselect all others area
    else if (selection.length > 1 && allIsSelected  && !allWasSelected) {
      allWasSelected = true
      selection = ['*']
      analyser.area_list = selection
      $('#sectorlist').val(analyser.area_list)
      $('#sectorlist').selectpicker('render');
      $('#sectorlist').selectpicker('toggle');
      $('#sectorlist').selectpicker('toggle');
    } else {
      analyser.area_list = selection
    }
});

// Click on button after selected areas in area list
$('#launchAnalyzer').click(function(e){
  e.preventDefault()
  // Reset Map style
  if (analyser.geo_mode == 2) {
    level2.eachLayer(function(layer){
      layer.feature.properties.selected = false
    })
  } else if (analyser.geo_mode == 3) {
    level3.eachLayer(function(layer){
      layer.feature.properties.selected = false
    })
  }
  analyser.selectMapData()
})


// Load area list according to area mode selector
function setAreaList(areamode){
  // Change list of area
  if (areamode === '1') {
    console.log("This level is not currently working (No Dataset)");
  }

  else if (areamode === '2') {
    $('#sectorlist').selectpicker('destroy')
    const districts = epibase.exec('SELECT DISTINCT lvl2, lvl2code, lvl3, lvl3code FROM csv_extract ORDER BY lvl3, lvl2')
    const regions = epibase.exec('SELECT DISTINCT lvl3, lvl3code FROM csv_extract ORDER BY lvl3')
    let query = '<select class="selectpicker form-control" title="Secteur" data-live-search="true" multiple id="sectorlist">'
    query += '<option selected value="*">Tous les districts</option>'
    $.each(regions, function(i,v){
      query += '<optgroup label="'+v['lvl3']+'">'
      $.each(districts, function(item, value){
        if (value['lvl3code'] == v['lvl3code']) {
          query += '<option value="'+value['lvl2code']+'">'+value['lvl2']+'</option>'
        }
      })
      query += '</optgroup>'
    })
    query += '</select>'
    $('#sectorSelector').html(query)
    $('#sectorlist').selectpicker();
  }

  else if (areamode === '3') {
    $('#sectorlist').selectpicker('destroy')
    const result = epibase.exec('SELECT DISTINCT lvl3, lvl3code FROM csv_extract ORDER BY lvl3')
    let query = '<select class="selectpicker form-control" title="Secteur" data-live-search="true" multiple id="sectorlist">'
    query += '<option selected value="*">Toutes les régions</option>'
    $.each(result, function(i,v){
      query += '<option value="'+v['lvl3code']+'">'+v['lvl3']+'</option>'
    })
    query += '</select>'
    $('#sectorSelector').html(query)
    $('#sectorlist').selectpicker();
  }

  else if (areamode === '4') {
    console.log("No country for old man");
  }
}
