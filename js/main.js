window.onload = function() {

    navigator.geolocation.getCurrentPosition(showPosition);

    function showPosition(position) {
      var lat = position.coords.latitude;
      var long = position.coords.longitude;
      $.getJSON('https://api.wunderground.com/api/7d584a8cfc36f7d2/conditions/q/autoip.json', function(data) {
        weather = data;
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
        $("#description").html(data.current_observation.icon);
        $("#description").addClass("description-lower");
      }

    };
