# Epimap - Dakar / West Africa


Epidemiologic maps application for West Africa


How it works:


Extract CSV datas / Create SQL Local DB: "mybase" JS Object / Insert datas into SQLDB / Initialise slider Object with default values
*  loadData.js


Watch for change on selector filters or in the Slider object
*  scripts/selection-filter/selectors.js
*  scripts/selection-filter/slider.js


If change is detected: update the displayData object
*  scripts/map-and-charts/display_data.js


Demo : https://0live.github.io/DemoEpimap/
