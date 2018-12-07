const analyser = {
  time_mode: 2,
  time_range: [],
  start_time: {},
  end_time: {},
  geo_mode: 3,
  area_list: ['*'],
  disease: 'mgt',
  indicator: 1,
  mapDataSet:{},
  chartsDataSet: {},
  selectMapData(){
    // Select the disease column
    const mapDiseaseSelection = 'SELECT SUM('+this.disease+'_'+this.indicator+') AS result, COUNT('+this.disease+'_'+this.indicator+') AS occurence'
    // Select the area column
    let geoColumn = ''
    if (this.geo_mode === 1) {
      geoColumn = 'lvl1code'
    } else if (this.geo_mode === 2) {
      geoColumn = 'lvl2code'
    } else if (this.geo_mode === 3) {
      geoColumn = 'lvl3code'
    } else if (this.geo_mode === 4) {
      geoColumn = 'lvl4code'
    }
    const mapAreaSelection = ', '+geoColumn+' AS pcode FROM csv_extract'

    // Filter considering the time mode
    let mapWhereClause = ''
    if (this.time_mode === 1) {
      mapWhereClause += ' WHERE '+this.disease+'_'+this.indicator+' NOT LIKE "null" AND year >= '+this.start_time['year']+' AND year <= '+this.end_time['year']
    } else if (this.time_mode === 2) {
      mapWhereClause += ' WHERE '+this.disease+'_'+this.indicator+' NOT LIKE "null" AND year >= '+this.start_time['year']+' AND year <= '+this.end_time['year']+' AND month >= '+this.start_time['month']+' AND month <= '+this.end_time['month']
    } else if (this.time_mode === 3) {
      mapWhereClause += ' WHERE '+this.disease+'_'+this.indicator+' NOT LIKE "null" AND year >= '+this.start_time['year']+' AND year <= '+this.end_time['year']+' AND month >= '+this.start_time['month']+' AND month <= '+this.end_time['month']+' AND week >= '+this.start_time['week']+' AND week <= '+this.end_time['week']
    }

    // Check if '*' is in area_list
    const allArea = contains.call(this.area_list, '*');
    // Several area are selectionned
    if (this.area_list.length > 1 && !allArea) {
      $.each(this.area_list, function(i, v){
        if (i == 0) {
          mapWhereClause += ' AND ('+geoColumn+' LIKE "'+v+'"'
        } else {
          mapWhereClause += ' OR '+geoColumn+' LIKE "'+v+'"'
        }
      })
      mapWhereClause += ')'
    }
    // All area are selectionned
    else if (this.area_list.length == 1 && allArea) {
      // console.log("All area selected");
    }
    // Only one area is selectionned
    else if (this.area_list.length == 1 && !allArea) {
      mapWhereClause += ' AND '+geoColumn+' LIKE "'+this.area_list[0]+'"'
    }


    const mapGroup = ' GROUP BY '+geoColumn
    const mapRequest = mapDiseaseSelection + mapAreaSelection + mapWhereClause + mapGroup
    this.mapDataSet = epibase.exec(mapRequest)
    this.selectChartsData()
  },
  selectChartsData(){
    // Select diseases column
    const chartsDiseaseSelection = 'SELECT SUM('+this.disease+'_1) AS cases, SUM('+this.disease+'_2) AS death, SUM('+this.disease+'_3) AS attack, SUM('+this.disease+'_4) AS mortality, SUM('+this.disease+'_5) AS vaccination, COUNT('+this.disease+'_'+this.indicator+') AS occurence'

    // Select the time column
    let timeColumn = ''
    if (this.time_mode === 1) {
      timeColumn = 'year'
    } else if (this.time_mode === 2) {
      timeColumn = 'month'
    } else if (this.time_mode === 3) {
      timeColumn = 'week'
    }
    const ChartsTimeSelection = ', '+timeColumn+' AS time , year FROM csv_extract'

    // Filter considering the time mode
    let chartsWhereClause = ''
    if (this.time_mode === 1) {
      chartsWhereClause += ' WHERE '+this.disease+'_1 NOT LIKE "null" AND '+this.disease+'_2 NOT LIKE "null" AND '+this.disease+'_3 NOT LIKE "null" AND '+this.disease+'_4 NOT LIKE "null" AND '+this.disease+'_5 NOT LIKE "null" AND year >= '+this.start_time['year']+' AND year <= '+this.end_time['year']
    } else if (this.time_mode === 2) {
      chartsWhereClause += ' WHERE '+this.disease+'_1 NOT LIKE "null" AND '+this.disease+'_2 NOT LIKE "null" AND '+this.disease+'_3 NOT LIKE "null" AND '+this.disease+'_4 NOT LIKE "null" AND '+this.disease+'_5 NOT LIKE "null" AND year >= '+this.start_time['year']+' AND year <= '+this.end_time['year']+' AND month >= '+this.start_time['month']+' AND month <= '+this.end_time['month']
    } else if (this.time_mode === 3) {
      chartsWhereClause += ' WHERE '+this.disease+'_1 NOT LIKE "null" AND '+this.disease+'_2 NOT LIKE "null" AND '+this.disease+'_3 NOT LIKE "null" AND '+this.disease+'_4 NOT LIKE "null" AND '+this.disease+'_5 NOT LIKE "null" AND year >= '+this.start_time['year']+' AND year <= '+this.end_time['year']+' AND month >= '+this.start_time['month']+' AND month <= '+this.end_time['month']+' AND week >= '+this.start_time['week']+' AND week <= '+this.end_time['week']
    }


    let geoColumn = ''
    if (this.geo_mode === 1) {
      geoColumn = 'lvl1code'
    } else if (this.geo_mode === 2) {
      geoColumn = 'lvl2code'
    } else if (this.geo_mode === 3) {
      geoColumn = 'lvl3code'
    } else if (this.geo_mode === 4) {
      geoColumn = 'lvl4code'
    }
    // Check if '*' is in area_list
    const allArea = contains.call(this.area_list, '*');
    // Several area are selectionned
    if (this.area_list.length > 1 && !allArea) {
      $.each(this.area_list, function(i, v){
        if (i == 0) {
          chartsWhereClause += ' AND ('+geoColumn+' LIKE "'+v+'"'
        } else {
          chartsWhereClause += ' OR '+geoColumn+' LIKE "'+v+'"'
        }
      })
      chartsWhereClause += ' )'
    }
    // All area are selectionned
    else if (this.area_list.length == 1 && allArea) {
      // console.log("All area selected");
    }
    // Only one area is selectionned
    else if (this.area_list.length == 1 && !allArea) {
      chartsWhereClause += ' AND '+geoColumn+' LIKE "'+this.area_list[0]+'"'
    }

    let chartsGroup = ''
    if (this.time_mode === 1) {
      chartsGroup = ' GROUP BY year'
    } else if (this.time_mode === 2) {
      chartsGroup = ' GROUP BY month, year'
    } else if (this.time_mode === 3) {
      chartsGroup = ' GROUP BY week, month, year'
    }

    const chartsRequest = chartsDiseaseSelection + ChartsTimeSelection + chartsWhereClause + chartsGroup
    this.chartsDataSet= epibase.exec(chartsRequest)
    this.displayData()
  },
  displayData(){
    // Create Charts Datasets and make charts
    let labels1 = [], labels2 = [], attack_dataset = [], cases_dataset = [], death_dataset = [], mortality_dataset = []
    $.each(this.chartsDataSet, function(i, v) {
      if (analyser.time_mode == 1) {
        labels1.push(v['time'])
        labels2.push(v['time'])
      } else if (analyser.time_mode == 2) {
        labels1.push(numb2Month[v['time']]+' '+v['year'])
        labels2.push(numb2Month[v['time']]+' '+v['year'])
      } else if (analyser.time_mode == 3) {
        labels1.push('Semaine '+v['time']+' - '+v['year'])
        labels2.push('Semaine '+v['time']+' - '+v['year'])
      }
      attack_dataset.push(v['attack'] / v['occurence'])
      cases_dataset.push(v['cases'])
      death_dataset.push(v['death'])
      mortality_dataset.push(v['mortality'] / v['occurence'])
    })
    makeCharts(labels1, attack_dataset, cases_dataset, labels2, mortality_dataset, death_dataset)
    // Change layer on the map
    boundarieslayers.eachLayer(function(layer){
      if (mymap.hasLayer(layer)) {
        mymap.removeLayer(layer)
      }
    })
    eval('level'+this.geo_mode+'.addTo(mymap)')
    // Get tresholds for map representation
    const tresholds = getTresholds(this.disease+'-'+this.indicator)
    // Calculate the min value for the circle Radius
    let minValue = [50000]
    console.log(this.mapDataSet);
    $.each(this.mapDataSet, function(i,v){
      if (v['result'] < minValue[0] && v['result'] > 0) {
        minValue.shift()
        minValue.push(v['result'])
      }
    })
    minValue = minValue[0]
    if (this.indicator == 1) {
      displayCase(this.mapDataSet, minValue)
    } else if (this.indicator == 2) {
      displayDeath(this.mapDataSet, minValue)
    } else if (this.indicator == 3) {
      displayAttack(this.mapDataSet, tresholds)
    } else if (this.indicator == 4) {
      displayMortality(this.mapDataSet, tresholds)
    }
  }
}



// Watch for changes on the analyser object
// When time_mode is changed, time range is changing too, so don't need to watch both, it will launch function two times
watch(analyser, ["geo_mode", "time_range", "disease", "indicator"], function(){
  analyser.selectMapData()
})
