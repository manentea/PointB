$(document).ready(function(){
  navigator.geolocation.getCurrentPosition(function(position){
    createMap(position);
  });
  $('.search').on('submit', search);
});

function fail(){
  console.log('shit');
};

function createMap(position){
  lat = position.coords.latitude + '';
  lng = position.coords.longitude + '';
  var myLatlng = new google.maps.LatLng(lat, lng);
  var mapOptions = {
    zoom: 12,
    center: myLatlng,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
   map = new google.maps.Map(document.getElementById("map"),
      mapOptions);
};
  function search(event){
    event.preventDefault();
    var pos = new google.maps.LatLng(parseFloat(lat), parseFloat(lng));
    var request = {
      location: pos,
      radius: '500',
      query: $('#spot').val()
    };
    document.getElementById('searchbar').reset();
    service = new google.maps.places.PlacesService(map);
    service.textSearch(request, createMarkers);
  };


function createMarkers(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < 6; i++) {
      var place = results[i];
      createMarker(results[i]);
    }
  }
}

function createMarker(currentPlace){
  var lat = currentPlace.geometry.location.lat();
  var lng = currentPlace.geometry.location.lng()
  var thisPosition = {lat, lng};
  var name = currentPlace.name;
  var marker = new google.maps.Marker({
    position: thisPosition,
    map: map,
    title: name
  });
  marker.setMap(map);
}