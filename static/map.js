function createMarker(point, name, email, loc, description, map) {
    // create marker
    var marker = new google.maps.Marker({
        position: point,
        title: name
    });
    var html = "<div class='marker_info'><div class='marker_name'>" + name + "</div><div class='marker_email'>" + email
                + "</div><div class='marker_loc'>Location: " + loc + "</div><div class='marker_description'>" + description
                + "</div></div>";
    var info = new google.maps.InfoWindow({ content: html });
    google.maps.event.addListener(marker, 'click', function() {
        info.open(map, marker);
    });
    return marker;
}

function initialize() {
    var options = {
        center: new google.maps.LatLng(33.73, -7.7),
        zoom: 1,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
    }
    map = new google.maps.Map(document.getElementById("map"), options);
    $.getJSON("/get_markers_json/", function(data) {
        // add markers to map
        console.log(data)
        var markers = data.markers
        for (var i = 0; i < markers.length; i++) {
            var name = markers[i].name;
            var email = markers[i].email;
            var loc = markers[i].loc
            var description = markers[i].description;
            var point = new google.maps.LatLng(parseFloat(markers[i].lat),
                                    parseFloat(markers[i].lng));
            var marker = createMarker(point, name, email, loc, description, map);
            marker.setMap(map);
        }
    });
}

$(document).ready(function() {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "http://maps.googleapis.com/maps/api/js?key=AIzaSyBk1O7uFh58S24GmPFit0iQMCN8ToTkoJw&sensor=false&callback=initialize";
    $("#gmap_script").append(script);
});
