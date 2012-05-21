$("#create_form").submit(function(e) {
    e.preventDefault();
    var name = $("#name").val();
    var email = $("#email").val();
    var description = $("#description").val();
    var location = $("#location").val();
    var lat = "";
    var lng = "";
    // add validation when each field is unfocused?
    var message = "";
    if (name == "" || email == "" || location == "") {
        message = "Please fill out all required fields!";
        $("#form_message").hide();
        $("#form_message").html(message);
        $("#form_message").fadeIn();
    } else {
        // geocode
        var address = location.split(" ").join("+");
        var url = "http://maps.googleapis.com/maps/api/geocode/json?address=" + address + "&sensor=false";
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode( {'address': location }, function(data, status) {
            console.log(data);
            console.log(status);
            console.log(data[0].geometry);
            if (status == "OK") {
                var loc = data[0].geometry.location;
                lat = loc.lat();
                lng = loc.lng();
                $.ajax({
                    url: "/create/",
                    type: "POST",
                    data: {
                        name: name,
                        email: email,
                        description: description,
                        location: location,
                        lat: lat,
                        lng: lng
                    },
                    dataType: "text",
                    success: function(data) {
                        console.log(data);
                        if (data == "Success") {
                            $("#name").val("");
                            $("#email").val("");
                            $("#description").val("");
                            $("#location").val("");
                            $("#form_message").hide();
                            $("#form_message").html("Thanks for sharing with HackerTracker!");
                            $("#form_message").fadeIn();
                            // overlay marker with lat and lng
                            var point = new google.maps.LatLng(parseFloat(lat), parseFloat(lng));
                            var marker = createMarker(point, name, email, location, description, map);
                            //map.addOverlay(marker);
                            marker.setMap(map);
                        } else {
                            $("#form_message").hide();
                            $("#form_message").html("Sorry, there was an error on the server! Call me maybe?");
                            $("#form_message").fadeIn();
                        }
                    },
                    error: function() {
                        $("#form_message").hide();
                        $("#form_message").html("Sorry, there was an error on the server! Call me maybe?");
                        $("#form_message").fadeIn();
                        // DRY!!! fix this
                    }
                });
            } else {
                message = "Sorry, there was a problem finding your location!";
                $("#form_message").hide();
                $("#form_message").html(message);
                $("#form_message").fadeIn();
            }
        });
    }
    return false;
});
