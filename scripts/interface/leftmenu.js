// CHANGE ICON STYLE ON CLICK
$('.click-change').click(function(e){
  // Click on icon and not on the div
  if (e.target !== this){
    if (!$(e.target).hasClass("second-icon")) {
      $( e.target ).prev().toggleClass( "inactive-icon" );
      $( e.target ).toggleClass( "inactive-icon" );
    } else { //IS NOT ACTIVE
      $( e.target ).next().toggleClass( "inactive-icon" );
      $( e.target ).toggleClass( "inactive-icon" );
    }
  }
  // Click on the div, not on icon
  else {
    $( e.target ).children().each(function(){
      $(this).toggleClass('inactive-icon')
    })
  }
})

// CHANGE ICON STYLE ON HOVER
$('.hover-change').hover(
  function(e) {
     $( e.target ).children().each(function(){
       $(this).toggleClass('inactive-icon')
     })
  }, function(e) {
    $( e.target ).children().each(function(){
      $(this).toggleClass('inactive-icon')
    })
  }
);

//LEFT MENU BEHAVIOR
$('#map-left-menu').click(function(){
  if ($('#map').is(':visible')) {
    $('#map').hide()
    $('.legend-button').hide()
    $('#charts').removeClass('col-6')
    $('#charts').addClass('col-12')
  } else {
    $('#map').show()
    $('.legend-button').show()
    $('#charts').removeClass('col-12')
    $('#charts').addClass('col-6')
  }
  mymap.invalidateSize()
})

$('#charts-left-menu').click(function(){
  if ($('#charts').is(':visible')) {
    $('#charts').hide()
    $('#map').removeClass('col-6')
    $('#map').addClass('col-12')
  } else {
    $('#charts').show()
    $('#map').removeClass('col-12')
    $('#map').addClass('col-6')
  }
  mymap.invalidateSize()
})

$('#pdf-left-menu').click(function(e){
  // Show Modal
  $('#modalpdf').modal('show')
  // Change Icon style
  if (e.target !== this){//CLicking over icon
    if (!$(e.target).hasClass("second-icon")) {
      $( e.target ).prev().toggleClass( "inactive-icon" );
      $( e.target ).toggleClass( "inactive-icon" );
    } else { //IS NOT ACTIVE
      $( e.target ).next().toggleClass( "inactive-icon" );
      $( e.target ).toggleClass( "inactive-icon" );
    }
  }
  else {//Clicking in the div but outside icon
    $( e.target ).children().each(function(){
      $(this).toggleClass('inactive-icon')
    })
  }
})
$('#export-left-menu').click(function(e){
  // Show Modal
  $('#modalexport').modal('show')
  // Change Icon style
  if (e.target !== this){//CLicking over icon
    if (!$(e.target).hasClass("second-icon")) {
      $( e.target ).prev().toggleClass( "inactive-icon" );
      $( e.target ).toggleClass( "inactive-icon" );
    } else { //IS NOT ACTIVE
      $( e.target ).next().toggleClass( "inactive-icon" );
      $( e.target ).toggleClass( "inactive-icon" );
    }
  }
  else {//Clicking in the div but outside icon
    $( e.target ).children().each(function(){
      $(this).toggleClass('inactive-icon')
    })
  }
})
