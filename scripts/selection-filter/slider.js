// Slider object, has method for each time range, initialize on years by default when extracting datas from CSV
const slider = {
  target: document.getElementById('slider'),
  default_year_start: [],
  default_month_start:[],
  default_week_start:[],
  year_range: {},
  month_range: {},
  week_range: {},
  initSlider(){
    // Initial Slider, with month range
    noUiSlider.create(this.target, {
      range: this.month_range,
      // Step by Month | Desactivate for the moment
      step: 1,
      // Handles start at ...
      start: this.default_month_start,
      // Display colored bars between handles
      connect: true,
      // Format Tooltips et set analyser object from ID of week/month/year range
      tooltips: [
        {
          to(value){
            let res = epibase.exec('SELECT year, month FROM month_range WHERE id='+Math.round(value))
            // Set value of analyser object
            analyser.start_time = res[0];
            res = numb2Month[res[0]['month']]+' '+res[0]['year']
            return res
          },
          from(value){
              return Math.round(value)
          }
        },{
          to(value){
            let res = epibase.exec('SELECT year, month FROM month_range WHERE id='+Math.round(value))
            // Set value of analyser object
            analyser.end_time = res[0];
            res = numb2Month[res[0]['month']]+' '+res[0]['year']
            return res
          },
          from(value){
              return Math.round(value)
          }
        }
      ],
      format: { to: function (value) {
                return Math.trunc(value)
            }, from: Number }
    })
    this.target.noUiSlider.on('slide', function () {
      analyser.time_range = [slider.target.noUiSlider.get()[0], slider.target.noUiSlider.get()[1]]
    })
    analyser.time_range = this.default_month_start
  },
  week(){
    // Destroy existing slider instead of update it, because tooltips can't be updated
    slider.target.noUiSlider.destroy()
    noUiSlider.create(this.target, {
      range: this.week_range,
      step: 1,
      start: this.default_week_start,
      connect: true,
      tooltips: [
        {
          to(value){
            let res = epibase.exec('SELECT year, month, week FROM week_range WHERE id='+Math.round(value))
            analyser.start_time = res[0]
            res = res[0]['week']+'/'+res[0]['month']+'/'+res[0]['year']
            return res
          },
          from(value){
              return Math.round(value)
          }
        },{
          to(value){
            let res = epibase.exec('SELECT year, month, week FROM week_range WHERE id='+Math.round(value))
            analyser.end_time = res[0]
            res = res[0]['week']+'/'+res[0]['month']+'/'+res[0]['year']
            return res
          },
          from(value){
              return Math.round(value)
          }
        }
      ],
      format: { to: function (value) {
                return Math.round(value)
            }, from: Number }
    })
    this.target.noUiSlider.on('slide', function () {
      analyser.time_range = [slider.target.noUiSlider.get()[0], slider.target.noUiSlider.get()[1]]
    })
    analyser.time_range = this.default_week_start
  },
  month(){
    slider.target.noUiSlider.destroy()
    noUiSlider.create(this.target, {
      range: this.month_range,
      step: 1,
      start: this.default_month_start,
      connect: true,
      tooltips: [
        {
          to(value){
            let res = epibase.exec('SELECT year, month FROM month_range WHERE id='+Math.round(value))
            analyser.start_time = res[0]
            res = numb2Month[res[0]['month']]+' '+res[0]['year']
            return res
          },
          from(value){
              return Math.round(value)
          }
        },{
          to(value){
            let res = epibase.exec('SELECT year, month FROM month_range WHERE id='+Math.round(value))
            analyser.end_time = res[0]
            res = numb2Month[res[0]['month']]+' '+res[0]['year']
            return res
          },
          from(value){
              return Math.round(value)
          }
        }
      ],
      format: { to: function (value) {
                return Math.round(value)
            }, from: Number }
    })
    this.target.noUiSlider.on('slide', function () {
      analyser.time_range = [slider.target.noUiSlider.get()[0], slider.target.noUiSlider.get()[1]]
    })
    analyser.time_range = this.default_month_start
  },
  year(){
    slider.target.noUiSlider.destroy()
    noUiSlider.create(this.target, {
      range: this.year_range,
      step: 1,
      start: this.default_year_start,
      connect: true,
      tooltips: [
        {
          to(value){
            let res = epibase.exec('SELECT year FROM year_range WHERE id='+Math.round(value))
            analyser.start_time = res[0]
            res = res[0]['year']
            return res
          },
          from(value){
              return Math.round(value)
          }
        },{
          to(value){
            let res = epibase.exec('SELECT year FROM year_range WHERE id='+Math.round(value))
            analyser.end_time = res[0]
            res = res[0]['year']
            return res
          },
          from(value){
              return Math.round(value)
          }
        }
      ],
      format: { to: function (value) {
                return Math.round(value)
            }, from: Number }
    })
    this.target.noUiSlider.on('slide', function () {
     analyser.time_range = [slider.target.noUiSlider.get()[0], slider.target.noUiSlider.get()[1]]
   })
    analyser.time_range = this.default_year_start
  }
}

// Change current period on the Slider
$('#prevStartDate').click(function(){
  const min = slider.target.noUiSlider.get()[0] -1
  const max = slider.target.noUiSlider.get()[1]
  slider.target.noUiSlider.set([min, max])
  analyser.time_range = [min, max]
})
$('#nextStartDate').click(function(){
  const min = slider.target.noUiSlider.get()[0] +1
  const max = slider.target.noUiSlider.get()[1]
  slider.target.noUiSlider.set([min, max])
  analyser.time_range = [min, max]
})
$('#prevEndDate').click(function(){
  const min = slider.target.noUiSlider.get()[0]
  const max = slider.target.noUiSlider.get()[1] -1
  slider.target.noUiSlider.set([min, max])
  analyser.time_range = [min, max]
})
$('#nextEndDate').click(function(){
  const min = slider.target.noUiSlider.get()[0]
  const max = slider.target.noUiSlider.get()[1] +1
  slider.target.noUiSlider.set([min, max])
  analyser.time_range = [min, max]
})
