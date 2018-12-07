# Epimap - Dakar / West Africa


Epidemiologic maps application for West Africa


How it works:


Extract CSV datas / Create SQL Local DB: "mybase" JS Object / Insert datas into SQLDB / Initialise slider Object with default values
*  loadData.js


Change on selector filters or in the Slider object change the Analyser object's state
*  scripts/selection-filter/selectors.js
*  scripts/selection-filter/slider.js


If change is detected on Analyser object: launch 2 SQL Requests wich return Map and Charts Datasets and set map layer according to the analyser.geo_mode
*  scripts/map-and-charts/display_data.js



Map and charts are updated according to the Analyser state
*  scripts/map-and-charts/map_functions.js
*  scripts/map-and-charts/charts.js
