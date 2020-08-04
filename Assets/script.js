$(document).ready(function(){
    // Submit button click event
    $("#submit").click(function(e){
        // $(".current-display").empty();
        // $(".week-display").empty()
        e.preventDefault();
        var submit = $("#city-input").val();
    
        if (submit != "") {

        } else {
            alert("Please enter a city name");
        }
    
        getMainWeather(submit)
        
        // $("city-display").append('<button>' +submit+ '</button>');
        var maxCity = 10;
        var button= $('<input type="button"/>'); $(button).attr("value", submit);
        
        
        var cityDisplay = $(".city-display").append(button);
        var cityArray = [];
        
        var setStorage = localStorage.setItem("city", cityDisplay);
        var getStorage = localStorage.getItem("city");

        console.log(setStorage);
        // console.log(getStorage);

        $(".city-display").append(getStorage);
    
        // for (i = 0; i < localStorage.length; i++) {
        //     x = localStorage.key(i);
        //     $(".city-display").append(x);
        // }
});

// Calling weather for city search
    function getMainWeather(searchTerm) {
        var apiKey= "58eaa9883fe1ae8b7ca141f8514a59b6";
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q="+searchTerm+"&appid="+apiKey;
        $.ajax({
            url: queryURL,
            method: "GET"
// Adding parameters to the page for city search
        }) .then(function(response){
            // console.log(response)
// Making another pull from API for weather icon
            var icon = response.weather[0].icon;
            var iconURL = "http://openweathermap.org/img/w/" + icon + ".png";
            var tempF = (response.main.temp - 273.15) * 1.80 + 32;
// Making variable for current date and time
            const now = moment().format('MMMM Do YYYY');
            $(".date").text(JSON.stringify(now))
            $(".city").text(JSON.stringify(response.name));  
            $(".icon").html("<img src=" + iconURL  + ">");
            $(".temp").text(JSON.stringify("Temperature (F): " + tempF.toFixed(1) )); 
            $(".wind").text(JSON.stringify("Wind Speed: " + response.wind.speed +" mph"));
            $(".humidity").text(JSON.stringify("Humidity: " + response.main.humidity + "%"));
// Setting Lat and Lon for the UV index API call
            var lat = response.coord.lat
            var lon = response.coord.lon
// Calling UV Index API from the lat and lon of the main weather API
            function GetUvIndex() {
                
                var api= "58eaa9883fe1ae8b7ca141f8514a59b6";
                var QueryURL = "https://api.openweathermap.org/data/2.5/uvi?appid=" + api + "&lat="+lat+ "&lon="+lon;
                
                $.ajax({
                    url: QueryURL,
                    method: "GET"
                }) .then(function(response){
                $(".uvIndex").append("UV Index: " +response.value.toFixed());
                console.log()
                })
            }
            GetUvIndex()
            get5Day(searchTerm)
        })
    }
// Calling the 5 day forecast for city search
    function get5Day(searchTerm) {
        // console.log('time ot hit the 5 day api url!!!', searchTerm)
        
        var apiKey= "58eaa9883fe1ae8b7ca141f8514a59b6";
        var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + searchTerm + "&appid="+apiKey + "&units=imperial";
        $.ajax({
            url: queryURL,
            method: "GET"
        }) .then(function(response){
            // console.log(iconURL)
            var fiveDayCleaned = [response.list[0], response.list[8], response.list[16], response.list[24], response.list[32]];
            var fiveDayIcon = [response.list[0].weather[0].icon, response.list[8].weather[0].icon, response.list[16].weather[0].icon, response.list[24].weather[0].icon, response.list[32].weather[0].icon]
// Adding cards for the 5 day forecast
            for (let i = 0; i < fiveDayCleaned.length; i++) {
// Adding Icons to 5 day forecast 
                var iconURL = "http://openweathermap.org/img/w/" + fiveDayIcon[i] + ".png";
                var cardIcon = $("<h4>").html("<img src=" + iconURL  + ">");
                var cardContainer = $('<div>').addClass('card col-md-2')
                var cardBody = $("<div>").addClass("card-body");
                var cardDate = $("<h4>").text(fiveDayCleaned[i].dt_txt.split(" ")[0])
                var cardTemp = $("<h5>").text("Temp: " +fiveDayCleaned[i].main.temp);
                var cardHumid = $("<h5>").text("Humidity: " +fiveDayCleaned[i].main.humidity +"%");
                cardBody.append(cardDate, cardIcon, cardTemp, cardHumid)
                cardContainer.append(cardBody)
                $('.card-deck').append(cardContainer)


            }
        })

    }









});