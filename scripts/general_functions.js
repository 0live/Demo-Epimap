// Function to check if a value is contained in a Array
const contains = function(needle) {
    // Per spec, the way to identify NaN is that it is not equal to itself
    var findNaN = needle !== needle;
    var indexOf;
    if(!findNaN && typeof Array.prototype.indexOf === 'function') {
        indexOf = Array.prototype.indexOf;
    } else {
        indexOf = function(needle) {
            var i = -1, index = -1;
            for(i = 0; i < this.length; i++) {
                var item = this[i];
                if((findNaN && item !== item) || item === needle) {
                    index = i;
                    break;
                }
            }
            return index;
        };
    }
    return indexOf.call(this, needle) > -1;
};

// Variable to convert month number to month name
const numb2Month = {
	'1': 'Janvier',
	'2': 'Février',
	'3': 'Mars',
	'4': 'Avril',
	'5': 'Mai',
	'6': 'Juin',
	'7': 'Juillet',
	'8': 'Aout',
	'9': 'Septembre',
	'10': 'Octobre',
	'11': 'Novembre',
	'12': 'Décembre',
}

// Return tresholds for each disease and indicator
const getTresholds = (indicator) => ({
  'mgt-1': 'No tresholds',
  'mgt-2': 'No tresholds',
  'mgt-3': [0.1,0.2,0.5,0.8,1],
  'mgt-4': [0.0001,0.0002,0.0003,0.0005,0.001],
  'chl-1': 'No tresholds',
  'chl-2': 'No tresholds',
  'chl-3': [0.2,0.5,0.8,1.5,2],
  'chl-4': [0.0001,0.0002,0.0003,0.0005,0.001],
  'rgl-1': 'No tresholds',
  'rgl-2': 'No tresholds',
  'rgl-3': [0.2,0.5,0.8,1.5,2],
  'rgl-4': [0.00001,0.00002,0.00003,0.00005,0.0001],
  'hpe-1': 'No tresholds',
  'hpe-2': 'No tresholds',
  'hpe-3': [0.02,0.05,0.08,0.15,0.2],
  'hpe-4': [0.05,0.1,0.2,0.5,1],
  'fvj-1': 'No tresholds',
  'fvj-2': 'No tresholds',
  'fvj-3': [0.002,0.005,0.008,0.015,0.02],
  'fvj-4': [0.00001,0.00002,0.00003,0.00005,0.0001],
  'plu-1': 'No tresholds',
  'plu-2': 'No tresholds',
  'plu-3': [100,200,400,600,1000],
  'plu-4': [0.001,0.002,0.004,0.005,0.01],
  'dng-1': 'No tresholds',
  'dng-2': 'No tresholds',
  'dng-3': [2,5,10,20,50],
  'dng-4': [0.05,0.1,0.2,0.5,1],
  'lsa-1': 'No tresholds',
  'lsa-2': 'No tresholds',
  'lsa-3': [2,5,10,20,50],
  'lsa-4': [0.05,0.1,0.2,0.5,1],
})[indicator]

function getCircleRadius(value, minValue, minRadius){
  const radius = (minRadius / 2 ) * Math.sqrt(value/minValue)
  return radius
}

function setPopUpContent(value, name){
  let place, type
  if (analyser.geo_mode == 2) {
    place = 'District : '+name+' / '
  } else if (analyser.geo_mode == 3) {
    place = "Région : "+name+' / '
  }
  if (analyser.indicator == 1) {
    type = "Cas : "+value
  } else if (analyser.indicator == 2) {
    type = "Décès : "+value
  } else if (analyser.indicator == 3) {
    type = "Attaque : "+value
  } else if (analyser.indicator == 4) {
    type = "Mortalité : "+value
  }
  return place+type
}
