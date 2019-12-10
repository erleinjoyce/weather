// Realtime dates updating
getDate();

window.setInterval(function(){
	getDate();
}, 1000);

// Dispalaying date today
function getDate() {
	var d = new Date();
	// Getting month name
	const monthNames = ["January", "February", "March", "April", "May", "June",
	  "July", "August", "September", "October", "November", "December"
	];
	var strDate = monthNames[(d.getMonth())] + " " + d.getDate() + ", " + d.getFullYear();
	strDate += " " + d.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
	$(".datetoday").text(strDate);
}

// Get users location (region)
$.ajax({ 
    type: 'GET', 
    url: 'https://freegeoip.app/json/', 
    dataType: 'json',
    success: function (data) { 
        var region = data['region_name'];
        var country = data['country_name'];
        
        switch(region) {
        	// We need only Manila for Metro Manila because the API is not reading it
        	case 'Metro Manila' : region = 'Manila'; break;
        }

        $(".locationtext").text(region + ", " + country);

        getWoeid(region);
    }
});

function getWoeid(region) {
	// Call openweather API
	$.ajax({ 
	    type: 'GET', 
	    url: 'http://api.openweathermap.org/data/2.5/weather?APPID=91b065765fa8db386f21fbd3d778f2a1&q=' + region + '&units=metric', 
	    dataType: 'json',
	    success: function (data) { 
	    	console.log(data)

	    	// Actual weather
	    	var weather = data['weather']['main'];
	    	var description = data['weather'][0]['description'];

	    	// More details about weather
	        var humidity = data['main']['humidity'];
	        var temp = data['main']['temp'];
	        var temp_min = data['main']['temp_min'];
	        var temp_max = data['main']['temp_max'];

	        var time_calculated = new Date(data['dt']*1000);

	        var sunrise = new Date(data['sys']['sunrise']*1000);
	        var sunset = new Date(data['sys']['sunset']*1000);

	        // Convert to time only
	        sunrise = sunrise.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
	        sunset = sunset.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })

	        $(".temperature-value").text(temp);
	        $(".weather-description").text(description);

	        $(".mintemp span").text(temp_min);
	        $(".maxtemp span").text(temp_max);
	        $(".humidity span").text(humidity);
	        $(".sunrise span").text(sunrise);
	        $(".sunset span").text(sunset);
	    }
	});
}
