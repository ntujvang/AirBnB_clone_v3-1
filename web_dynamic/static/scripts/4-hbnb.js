$(document).ready(function () {
  let dlist = {};
  $('.small-list li input').change(function () {
    if (this.checked) {
      dlist[($(this).attr('data-id'))] = $(this).attr('data-name');
    } else {
      delete dlist[($(this).attr('data-id'))];
    }
    let string = Object.values(dlist).join(', ');
    $('.amenities H4').text(string);
  });

  $.get('http://0.0.0.0:5001/api/v1/status/', function (data) {
    if (data.status === 'OK') {
      $('DIV#api_status').addClass('available');
    }
  });

  $.ajax({
    url: 'http://0.0.0.0:5001/api/v1/places_search/',
    type: 'POST',
    contentType: 'application/json',
    data: '{}',
    success: function (data) {
      for (let place of data) {
        $('section.places')
	.append($('<article></article>')
        .append($('<div class="price_by_night">').text('$' + place.price_by_night),
        $('<h2></h2>').text(place.name),
        $('<div class="informations"></div>')
        .append($('<div class="max_guest"></div>').text(place.max_guest + ' Guests'),
        $('<div class="number_rooms"></div>').text(place.number_rooms + ' Rooms'),
	$('<div class="number_bathrooms"></div>').text(place.number_bathrooms + ' Bathrooms')),
        $('<div class="description"></div>').html(place.description)));
      }
    }
  });

  $('button').click(function () {
    let datalist = {};
    if (dlist.length !== 0) {
      datalist = {'amenities': dlist};
    }
    $('.places').empty();
    $('.places').append('<h1>Places</h1>');
    $.ajax({
      url: 'http://0.0.0.0:5001/api/v1/places_search/',
      type: 'POST',
      data: JSON.stringify(datalist),
      contentType: 'application/json',
      success: function (data) {
        for (let place of data) {
          $('section.places')
          .append($('<article></article>')
          .append($('<div class="price_by_night">').text('$' + place.price_by_night),
	  $('<h2></h2>').text(place.name),
	  $('<div class="informations"></div>')
	  .append($('<div class="max_guest"></div>').text(place.max_guest + ' Guests'),
	  $('<div class="number_rooms"></div>').text(place.number_rooms + ' Rooms'),
	  $('<div class="number_bathrooms"></div>').text(place.number_bathrooms + ' Bathrooms')),
	  $('<div class="description"></div>').html(place.description)));
        }
      }
    });
  });
});
