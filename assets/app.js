// Uses api.openweathermap.org

jQuery(document).ready(function($) {
  // Get user location. Use metric system as default.
  getUserLocation("metric");
  function getUserLocation(unit) {
    $.get("http://ipinfo.io", function(location) {
      var loc = (location.city + "; " + location.country);
      getWeather(unit,loc);
      //display location name
      $(".location").html(location.city);
    }, "jsonp");
  }

  // Change unit system metric/imperial
    $(".change-unit").click(function(){
    // reset both buttons
    $(".change-unit").removeClass("active");
    // make selected button look active
    $(this).addClass("active");
    // store unit
    var unit = $(".active").data("unit");
    // change unit in toggle intro sentence
    unit == "metric" ? $("#unit").html("a metric system") : $("#unit").html("an imperial system");
    // get location with new unit
    getUserLocation(unit);
  });

  // Get weather and display information
  function getWeather(unit,loc) {
    var whatsTheWeather = "http://api.openweathermap.org/data/2.5/weather?q="+loc+"&units="+unit +  "&appid=64989c25e65964e904e335fd30b5a55a";

    $.getJSON(whatsTheWeather, function(weather) {
      //define unit labels
      var unitTemp = "";
      unit === "metric" ? unitTemp = "°C" : unitTemp = "F";
      //get temp
      $(".temperature").html((weather.main.temp).toFixed(1)+" "+unitTemp);
      //get icon
      $(".weather").attr("src","http://openweathermap.org/img/w/" + weather.weather[0].icon + ".png");
      //get weather description

      $('.location').append(location.city);
      $(".description").html(weather.weather[0].description);

    });
  }
});
