let chart1 = null
let chart2 = null

function makeCharts(ds1, ds2, ds3, ds4, ds5, ds6) {
	// Destroy Charts if they already exist
	if (chart1 != null){
      chart1.destroy();
  }
	if (chart2 != null){
      chart2.destroy();
  }

	const chartData1 = {
			labels: ds1,
			datasets: [{
				type: 'line',
				label: "Taux d'attaque",
				borderColor: '#070C0F',
				pointBackgroundColor: '#070C0F',
				borderWidth: 2,
				fill: false,
				data: ds2,
				yAxisID: 'y-axis-2',
			}, {
				type: 'bar',
				label: 'Cas',
				backgroundColor: '#FF5A5F',
				data: ds3,
				yAxisID: 'y-axis-1',
				borderColor: '#FF5A5F',
				borderWidth: 2
			}]
		};

		const chartData2 = {
				labels: ds4,
				datasets: [{
					type: 'line',
					label: 'Mortalité',
					borderColor: '#070C0F',
					pointBackgroundColor: '#070C0F',
					borderWidth: 2,
					fill: false,
					data: ds5,
					yAxisID: 'y-axis-2',
				}, {
					type: 'bar',
					label: 'Décès',
					backgroundColor: '#FF5A5F',
					data: ds6,
					yAxisID: 'y-axis-1',
					borderColor: '#FF5A5F',
					borderWidth: 2
				}]
			};


	const ctx = document.getElementById('chart1').getContext('2d');
	chart1 = new Chart(ctx, {
		type: 'bar',
		data: chartData1,
		options: {
      responsive: true,
      maintainAspectRatio: false,
			title: {
				display: true,
				text: "Cas et taux d'attaque"
			},
			scales: {
				yAxes: [{
					type: 'linear',
					display: true,
					position: 'left',
					id: 'y-axis-1',
				}, {
					type: 'linear',
					display: true,
					position: 'right',
					id: 'y-axis-2',

					// grid line settings
					gridLines: {
						drawOnChartArea: false, // only want the grid lines for one axis to show up
					},
				}],
			},
			tooltips: {
				mode: 'index',
				intersect: true
			}
		}
	});

  const ctx2 = document.getElementById('chart2').getContext('2d');
	chart2 = new Chart(ctx2, {
		type: 'bar',
		data: chartData2,
		options: {
			responsive: true,
      maintainAspectRatio: false,
			title: {
				display: true,
				text: "Décès et létalité"
			},
			scales: {
				yAxes: [{
					type: 'linear',
					display: true,
					position: 'left',
					id: 'y-axis-1',
				}, {
					type: 'linear',
					display: true,
					position: 'right',
					id: 'y-axis-2',

					// grid line settings
					gridLines: {
						drawOnChartArea: false, // only want the grid lines for one axis to show up
					},
				}],
			},
			tooltips: {
				mode: 'index',
				intersect: true
			}
		}
	});

};
