function createMarker(point, name, email, location, description) {
    // create marker
}

function initialize() {
    var options = {
        center: new google.maps.LatLng(39.1140530, -94.6274636),
        zoom: 0,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
    }
    map = new google.maps.Map($("#map"), options);
    GDownloadUrl("/get_markers/", function(data) {
        // add markers to map
    });
}

$(document).ready(function() {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "http://maps.googleapis.com/maps/api/js?key=AIzaSyBk1O7uFh58S24GmPFit0iQMCN8ToTkoJw&sensor=false&callback=initialize";
    $("body").append(script);
}
