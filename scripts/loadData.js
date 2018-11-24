// Create SQL Database
const epibase = new alasql.Database('epibase');
// Create tables
// One with all datas, one for each time range, because we need to have unique ID for each month/week
epibase.exec('CREATE TABLE csv_extract (id serial PRIMARY KEY NOT NULL, lvl1 STRING, lvl1code STRING, lvl2 STRING, lvl2code STRING, lvl3 STRING, lvl3code STRING, year INT, month INT, week INT, mgt_1 FLOAT,	mgt_2 FLOAT,	mgt_3 FLOAT,	mgt_4 FLOAT,	mgt_5 FLOAT,	chl_1 FLOAT,	chl_2 FLOAT,	chl_3 FLOAT,	chl_4 FLOAT,	chl_5 FLOAT, rgl_1 FLOAT,	rgl_2 FLOAT,	rgl_3 FLOAT,	rgl_4 FLOAT,	rgl_5 FLOAT, hpe_1 FLOAT,	hpe_2 FLOAT,	hpe_3 FLOAT,	hpe_4 FLOAT,	hpe_5 FLOAT,  fvj_1 FLOAT,	fvj_2 FLOAT,	fvj_3 FLOAT,	fvj_4 FLOAT,	fvj_5 FLOAT, plu_1 FLOAT,	plu_2 FLOAT,	plu_3 FLOAT,	plu_4 FLOAT,	plu_5 FLOAT, dng_1 FLOAT,	dng_2 FLOAT,	dng_3 FLOAT,	dng_4 FLOAT,	dng_5 FLOAT, lsa_1 FLOAT,	lsa_2 FLOAT,	lsa_3 FLOAT,	lsa_4 FLOAT,	lsa_5 FLOAT)');
epibase.exec('CREATE TABLE week_range (id serial PRIMARY KEY NOT NULL, year INT, month INT, week INT)');
epibase.exec('CREATE TABLE month_range (id serial PRIMARY KEY NOT NULL, year INT, month INT)');
epibase.exec('CREATE TABLE year_range (id serial PRIMARY KEY NOT NULL, year INT)');
//Extract CSV datas and insert into SQLDB, then configure the "slider" object
console.log(epibase);
alasql.promise('SELECT * FROM CSV("data/datamodel.csv", {headers:false})')
            .then(function(data){
                 $.each(data, function(i, v){
                   if (i > 0) {
                     console.log(i);
                     // Convert all data after column 9 from string to number or 'NULL'
                     for (var j = 9; j < v.length; j++) {
                       exec('if (isNan(Number(v["'+j+'"]))) {v["'+j+'"] = "NULL"} else {v["'+j+'"] = Number(v["'+j+'"])}')
                    }
                    // Insert data into table
                     epibase.exec('insert into csv_extract (id, lvl1, lvl1code, lvl2, lvl2code, lvl3, lvl3code, year, month, week, mgt_1, mgt_2, mgt_3, mgt_4, mgt_5, chl_1, chl_2, chl_3, chl_4, chl_5, rgl_1, rgl_2, rgl_3, rgl_4, rgl_5, hpe_1, hpe_2, hpe_3, hpe_4, hpe_5, fvj_1, fvj_2, fvj_3, fvj_4, fvj_5, plu_1, plu_2, plu_3, plu_4, plu_5, dng_1, dng_2, dng_3, dng_4, dng_5, dng_1, dng_2, dng_3, dng_4, dng_5) values ('+i+', "'+v['0']+'", "'+v['1']+'", "'+v['2']+'", "'+v['3']+'", "'+v['4']+'", "'+v['5']+'", '+v['6']+', '+v['7']+', '+v['8']+', "'+v['9']+'", "'+v['10']+'", "'+v['11']+'", "'+v['12']+'", "'+v['13']+'", "'+v['14']+'", "'+v['15']+'", "'+v['16']+'", "'+v['17']+'", "'+v['18']+'", "'+v['19']+'", "'+v['20']+'", "'+v['21']+'", "'+v['22']+'", "'+v['23']+'", "'+v['24']+'", "'+v['25']+'", "'+v['26']+'", "'+v['27']+'", "'+v['28']+'", "'+v['29']+'", "'+v['30']+'", "'+v['31']+'", "'+v['32']+'", "'+v['33']+'", "'+v['34']+'", "'+v['35']+'", "'+v['36']+'", "'+v['37']+'", "'+v['38']+'", "'+v['39']+'", "'+v['40']+'", "'+v['41']+'", "'+v['42']+'", "'+v['43']+'", "'+v['44']+'", "'+v['45']+'", "'+v['46']+'", "'+v['47']+'", "'+v['48']+'")')
                   }
                 })
                 // Create a table for each time mode in order to have a unique ID for each week/month/year
								 epibase.exec('INSERT INTO week_range (year, month, week) SELECT DISTINCT year, month, week FROM csv_extract ORDER BY year, month, week')
								 epibase.exec('INSERT INTO month_range (year, month) SELECT DISTINCT year, month FROM csv_extract ORDER BY year, month')
								 epibase.exec('INSERT INTO year_range (year) SELECT DISTINCT year FROM csv_extract ORDER BY year')
                 // Configure Slider
								 const years = epibase.exec('SELECT MIN(year) AS min, MAX(year) AS max FROM year_range');
                 slider.default_year_start.push(years[0]['min'], years[0]['max'])
                 slider.year_range = years[0];
                 const months = epibase.exec('SELECT MIN(id) AS min, MAX(id) AS max FROM month_range');
                 slider.default_month_start.push(months[0]['min'], months[0]['max'])
                 slider.month_range = months[0];
                 const weeks = epibase.exec('SELECT MIN(id) AS min, MAX(id) AS max FROM week_range');
                 slider.default_week_start.push(weeks[0]['min'], weeks[0]['max'])
                 slider.week_range = weeks[0];
                 // Initialise Default Slider
                 slider.initSlider()
                 slider.target.noUiSlider.on('slide', function (values, handle) {
                   analyser.time_range = [slider.target.noUiSlider.get()[0], slider.target.noUiSlider.get()[1]]
                 })
                 // Itiniatlise area list selector, districts by default
                 setAreaList('3')
                 $('.overlay-loader').hide()
            }).catch(function(err){
                 console.log('Error:', err);
            });
