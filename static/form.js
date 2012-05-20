$("#create_form").submit(function() {
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
        $.getJSON(url, function(data) {
            if (data.status == "OK") {
                var loc = data.results.geometry.location;
                lat = loc.lat;
                lng = loc.lng;
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
                            $("#form_message").hide();
                            $("#form_message").html("Thanks for sharing with HackerTracker!");
                            $("#form_message").fadeIn();
                            // overlay marker with lat and lng
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
});
