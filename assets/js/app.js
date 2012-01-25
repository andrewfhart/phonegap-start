// 
//  --- our app behavior logic ---
//
run(function () {
    // immediately invoked on first run
    var init = (function () {
        if (navigator.network.connection.type == Connection.NONE) {
            alert("You have no internet connection. I have no idea where you are!");
        } else {
            alert("You have internet! There's at least a chance I can tell you where you are!");
        }
    })();
    
    // a little inline controller
    when('#welcome');
    
    when('#map', function () {
        store.get('config', function (saved) {
            // construct a datafluency geo request
            var map  = saved ? saved.map || ui('map') : ui('map')
            ,   zoom = saved ? saved.zoom || ui('zoom') : ui('zoom')
            ,   path = "http://datafluency.com/geo/info/";
			
            navigator.geolocation.getCurrentPosition(function (position) {
                var location = "" + position.coords.latitude + "/" + position.coords.longitude;
                path += location;
                x$('#positioner').attr('value', path);
            }, function () {
                x$('#positioner').attr('value', "Unable to determine position...");
            });
        });
    });
});
