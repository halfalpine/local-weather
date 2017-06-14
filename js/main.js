window.onload = function() {

    navigator.geolocation.getCurrentPosition(showPosition);

    function showPosition(position) {
      $.getJSON('https://api.wunderground.com/api/7d584a8cfc36f7d2/conditions/q/autoip.json', function(data) {
        var weather = data;
        getLocation(weather);
        getIcon(weather);
        getDescription(weather);
        farTemp(weather);
        celTemp(weather);
        $("#tempC").hide();
        $("#toggler").on("click", function() {
          $("#tempF").toggle();
          $("#tempC").toggle();
        });

        console.log(getMonth(weather));
        // Google custom seach based on user location
        $.getJSON('https://www.googleapis.com/customsearch/v1?q=' + weather.current_observation.display_location.city + '+' + weather.current_observation.display_location.state + '+' + '+landscape+' + '&cx=006650813773390692218%3Af-cpsdbza5c&imgColorType=color&imgSize=large&imgType=photo&num=1&rights=cc_publicdomain&safe=high&searchType=image&key=AIzaSyDW-wSyxwEyZTX0O7NDrWpegksRdxSSoic', function(data) {
          var bgImg = (data.items[0].link);
          console.log(bgImg);
          $('body').css({
            'background-image': 'url(' + bgImg + ')',
            'background-size': 'cover',
            'background-repeat': 'no-repeat'
          });
        });
      });
    }

  function farTemp(data) {
    $("#tempF").html(Math.floor(data.current_observation.temp_f).toString() + "&#8457;");
  }

  function celTemp(data) {
    $("#tempC").html(Math.floor(data.current_observation.temp_c) + "&#8451;");
  }

  function getIcon(data) {
    var weatherIcon = $("<img>", {
      id: 'weatherIcon',
      src: data.current_observation.icon_url,
      alt: "Image of current weather"
    });
    weatherIcon.appendTo($("#icon"));
  }

  function getLocation(data) {
    $("#location").html(data.current_observation.display_location.full);
  }

  function getDescription(data) {
    $("#description").html(data.current_observation.weather);
    $("#description").addClass("description-lower");
  }

  function getGoogleDescription(data) {
    return data.current_observation.weather
      .split(' ')
      .join('+');
  }

  function getMonth(data) {
    return data.current_observation.observation_time
      .match(/(on\s)\w+/)[0]
      .slice(3);
  }

};
