

      const apiKey = "28d434e8969b198ac0dc819997cb40d1";
     const city = "Boulder, Colorado";
      const queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&unit=imperial&appid=${apiKey}`;
      let searchCity;
      let currentWeatherIcon;
      let latitude;
      let longitude;
      //pulling the api using the weather url for longitude and latitude data
      $.ajax({
        url: queryURL,
        method: "GET"
      })
        //pulling the response from the previous api of longitude and latitude
        .then(function(response) {
          console.log(response);
          latitude = response.coord.lat;
          longitude = response.coord.lon;
          searchCity = response.name;
          currentWeatherIcon = response.weather[0].icon;

          console.log(latitude);
          console.log(longitude);
          console.log(searchCity);
          console.log(currentWeatherIcon);

          //Returns data for the next promise
          return searchTrails(latitude, longitude, searchCity);
          
        })
        // calling for the function to display
        .then(function(trails) {
          console.log(trails);
        });
      function searchTrails(lat, lon) { 
        const params = $.param({
          key: "200460387-e5b1d616b3250f62fab9619fc65bde2d",
          lat: lat,
          lon: lon
        });
        return $.ajax({
          url: "https://www.hikingproject.com/data/get-trails?" + params,
          method: "GET"
        }).then(function(response) {
                //Promise that will run once object is returned from API call
                //creates array of trails from JSON object
            const trailArr = response.trails;
            //logs array to console 
              console.log(trailArr);
              //renders a card for each item in the array
              trailArr.forEach(function(trail) {
                  //creates variable for trail name, thumbnail image, description, and trail length (for each)
                const trailName = trail.name;
                const thumbnail = trail.imgMedium;
                const description = trail.summary;
                const trailLength = trail.length;
                const trailUrl = trail.url;
                const location = trail.location;
                const trailLat = trail.latitude;
                const trailLong = trail.longitude;
                const startLatLng = new google.maps.LatLng(latitude, longitude)
                const trailLatLng = new google.maps.LatLng(trailLat, trailLong)
                const travelDist = Math.floor((google.maps.geometry.spherical.computeDistanceBetween(startLatLng, trailLatLng)) / 1609.344);
                //MAKE AN AJAX CALL TO WEATHER API FOR TRAIL LOCATION AND .THEN(STORE RESULTS AND RENDER CARD)
                //appends a card with trail info and variables (for each) HTML came from Ivan
                let apiKey = "28d434e8969b198ac0dc819997cb40d1"; 
                let newUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&unit=imperial&appid=${apiKey}`;
                $.ajax({
                    url: newUrl,
                    method: "GET"
                  }).then(function(weather) {
                      console.log(weather);
                       let currentWeatherIcon = weather.weather[0].icon;
                    $("#cards").append(`
                <div class="portfolio-modal mfp-hide" id="portfolio-modal-1">
             <div class="portfolio-modal-dialog bg-white">
              
            
                     <div class="row">
                         <div class="col-lg-12 mx-auto">
                         <h3 class="text-secondary text-uppercase mb-0">${trailName} (${trailLength} Mile Hike)</h3>
                             <hr class="star-dark mb-5">
                             <div class="row">
                                 <div class="col-lg-3 col-md-4">
                                     <img class="img-fluid mb-4" src="${thumbnail}" alt="">
                                 </div>
                                 <div class="col-lg-9 col-md-8">
                                     <h4>${location}</h4>
                                     <h5>(${travelDist} miles away)</h5>
                                     <p class="mb-5">${description}</p>
                                     <h5 class="mb-3">The current weather in ${location} is: <image src="http://openweathermap.org/img/w/${currentWeatherIcon}.png"></h5>
                                     <a class="btn btn-primary btn-lg rounded-pill portfolio-modal-dismiss" href="${trailUrl}" target="_blank">
                                         Details</a>
                                         <a class="btn btn-primary btn-lg rounded-pill portfolio-modal-dismiss" href="https://www.google.com/maps/dir/?api=1&origin=${latitude},${longitude}&destination=${trailLat},${trailLong}" target="_blank">
                                         Directions</a>
                                 </div>
                             </div>
                         </div> `)

                  });
              })
            }); 


        }
