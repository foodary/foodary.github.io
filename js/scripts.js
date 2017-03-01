navigator.geolocation.getCurrentPosition(function (result) {
    var lat = result.coords.latitude;
    var lon = result.coords.longitude;
    var location = new google.maps.LatLng(lat, lon);
    var request = {
        location: location,
        radius: 2000,
        types: ['food', 'restaurant']
    };
    var map = new google.maps.Map(document.getElementById('map-canvas'), {
        center: location,
        zoom: 15
    });
    var service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, function (results, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
            for (var i = 0; i < results.length; i++) {
                var result = results[i];
                if (result.rating == null) {
                    var rating = "No Ratings Available";
                }
                else {
                    var rating = "Rating: " + result.rating + "/5";
                }
                if (result.price_level == null) {
                    var price = "No price level available";
                }
                else {
                    var price = "Price: " + result.price_level + "/5";
                }
                if (result.formatted_phone_number != null) {
                    var phone = "Phone Number: " + result.formatted_phone_number;
                }
                else {
                    var phone = "No Phone Number Available";
                }
                document.getElementById("main").innerHTML = "";
                $(".jumbotron").append("<div class=\"card " + i + "\"><img src=\"" + result.icon + "\"><h1>" + result.name + "</h1><div class=\"" + i + "details\"><h3>" + result.vicinity + "<br>" + price + "<br>" + rating + "<br>" + phone + "</h3></div><br><a href=\"https://www.google.com/maps/dir/"+lat+","+lon+"/" + result.vicinity + "\" target=\"blank\"><button class=\"btn-default btn\" style=\"border-radius:50%;color:#0F0;\"><i class=\"fa fa-heart\" style=\"font-size:33px\"></i></button></a> <button class=\"btn-default btn\" style=\"border-radius:50%;color:#00F\" onclick=\"details(" + i + ")\"><i class=\"fa fa-ellipsis-h\" style=\"font-size:36px\"></i></button> <button class=\"btn-default btn\" style=\"border-radius:50%;color:#F00\" onclick=\"no(" + i + ")\"><i class=\"fa fa-times\" style=\"font-size:36px\"></i></button></div>");
                $("." + i).hide();
                $("." + i + "details").hide();
                $(".0").show();
            }
            $(".jumbotron").append("<div class=\"card " + results.length + "\">End of results.</div>");
        }
    });
}, function () {
        alert("Sorry, something went wrong. Please check your device's location settings");
    });
function callback(results, status) {

}
$(".hide").hide();
function details(num) {
    $("." + num + "details").toggle();
}
function no(num) {
    $("." + num).fadeOut(0);
    $("." + (num + 1)).fadeIn();
}
