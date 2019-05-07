//DECLARES GLOBAL VARIABLES

let latitude = "";
let longitude = "";
let isChecked;

//CURRENT LOCATION CHECKBOX EVENT LISTENER

$("#currentLocationCheck").change(function() {
  //checks if box was checked or unchecked
  if ($("#currentLocationCheck").is(":checked")) {
    console.log("checkbox checked!");
    //when checked, verifies that geolocation is enabled
    if (navigator.geolocation) {
      //if yes, runs getCurrentPosition method that prompts user to allow access to their location
      navigator.geolocation.getCurrentPosition(function(position) {
        //saves location as latitude and longitude variables
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;
        isChecked = true;
        //disables the city search box so user can't search a city if current location is being used
        $("#citySearch").prop("disabled", true);
        //runs positionError function if permission is denied or if there is an error
      }, positionError);
      //runs positionError if location is not enabled
    } else {
      console.log("location not enabled");
      positionError();
    }
    //resets longitude and latitude to empty strings if box is unchecked and re-allows for city search
  } else {
    console.log("checkbox was unchecked!");
    latitude = "";
    longitude = "";
    $("#citySearch").prop("disabled", false);
  }
});

//DECLARES FUNCTION TO THROW ERROR MESSAGE IF GEOLOCATION NOT ENABLED/ALLOWED
function positionError() {
  $("#currentLocationCheck").remove();
  $("#currentLocationLabel").hide();
  $("#errorMsj").html(
    `<p class="h3 text-warning font-weight-bold">Geolocation services not supported. Please enter city below.</p>`
  );
}

//DECLARES FUNCTION TO RENDER RESULTS

function renderResults(
  trailName,
  trailLength,
  thumbnail,
  location,
  travelDist,
  description,
  conditions,
  currentWeatherIcon,
  feelsLike,
  maximumTemp,
  minimumTemp,
  trailUrl,
  latitude,
  longitude,
  trailLat,
  trailLong
) {
  $("#errorMsj").html("Your Next Adventure Awaits");
  $("#cards").append(`
  <div class="portfolio-modal mfp-hide" id="portfolio-modal-1">
<div class="portfolio-modal-dialog bg-white">
       <div class="row">
           <div class="col-lg-12 mx-auto">
           <h3 class="text-secondary text-uppercase mb-0">${trailName}&nbsp; &latail; ${trailLength} Mile Hike &ratail; <i class='fas fa-hiking' style='font-size:30px;color:green'></i>
           </h3>
               <hr class="star-dark mb-5">
               <div class="row">
                   <div class="col-lg-5 col-md-12 col-sm-12 col-xs-12">
                       <img class="img-fluid mb-4" src="${thumbnail}" alt="">
                   </div>
                   <div class="col-lg-7 col-md-12 col-sm-12 col-xs-12">
                       <h4>${location}&ensp; (${travelDist} miles away) &ensp; <i class='fas fa-car-side' style='font-size:30px;color:green'></i>
                       </h4>
                       <p class="mb-1">${description}</p>
                       <h5 class="text-capitalize my-0">${conditions}&ensp;<image class="my-0" src="http://openweathermap.org/img/w/${currentWeatherIcon}.png" width="80px" height="80px"></h5>
                       <p class="font-weight-bold align-baseline">Feels Like:  &ensp; ${feelsLike}&ensp;ºF</p>
                       <p class="font-weight-bold align-baseline">High: &ensp; ${maximumTemp}&ensp;ºF</p>
                       <p class="font-weight-bold align-baseline">Low: &ensp; ${minimumTemp}&ensp;ºF</p>
                       
                       <a class="btn btn-primary btn-lg rounded-pill portfolio-modal-dismiss mr-3 text-right" href="${trailUrl}" target="_blank">
                       <i class='fas fa-angle-double-right' style='font-size:20px'></i>
                       Details</a>
                           <a class="btn btn-primary btn-lg rounded-pill portfolio-modal-dismiss text-right" href="https://www.google.com/maps/dir/?api=1&origin=${latitude},${longitude}&destination=${trailLat},${trailLong}" target="_blank">
                           <i class='fas fa-map-marked-alt' style='font-size:20px'></i>
                           Directions</a>
                   </div>
               </div>
           </div> `);
}

// DECLARES FUNCTION TO CLEAR PREVIOUS SEARCH RESULTS
function clear() {
  $("#cards").empty();
}

//EVENT LISTENER FOR SEARCH BUTTON (LOTS OF STUFF IN HERE)

$("#run-search").click(function(event) {
  event.preventDefault();
  // clear card upon new search criteria
  clear();
  let userInput = $("#citySearch").val();
  //checks if using geolocation, If not checked, searches by City instead
  if (!isChecked) {
    //resets latitude and longitude from previous search
    latitude = "";
    longitude = "";
    //checks if city input is blank then throws error message and doesn't proceed with search
    if (!userInput) {
      $("#errorMsj").html(
        `<p class="h3 text-warning font-weight-bold">Enter a city or select 'Use Current Location' to search.</p>`
      );
    } else {
      $.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${userInput}&key=AIzaSyCoxgeV06M15Vcxj5i-SD89TJxPQYl3nIM`
      ).then(function(response) {
        latitude = response.results[0].geometry.location.lat;
        longitude = response.results[0].geometry.location.lng;
        const params = $.param({
          key: "200460387-e5b1d616b3250f62fab9619fc65bde2d",
          lat: latitude,
          lon: longitude
        });
        $.ajax({
          url: "https://www.hikingproject.com/data/get-trails?" + params,
          method: "GET"
        }).then(function(response) {
          //Promise that will run once object is returned from API call
          //creates array of trails from JSON object
          const trailArr = response.trails;
          //logs array to console
          //console.log(trailArr);
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
            const startLatLng = new google.maps.LatLng(latitude, longitude);
            const trailLatLng = new google.maps.LatLng(trailLat, trailLong);
            const travelDist = Math.floor(
              google.maps.geometry.spherical.computeDistanceBetween(
                startLatLng,
                trailLatLng
              ) / 1609.344
            );
            //MAKE AN AJAX CALL TO WEATHER API FOR TRAIL LOCATION AND .THEN(STORE RESULTS AND RENDER CARD)
            //appends a card with trail info and variables (for each) HTML came from Ivan
            let apiKey = "28d434e8969b198ac0dc819997cb40d1";
            let newUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=${apiKey}`;
            $.ajax({
              url: newUrl,
              method: "GET"
            }).then(function(weather) {
              //console.log(weather);
              let feelsLike = Math.round(weather.main.temp);
              let minimumTemp = Math.round(weather.main.temp_min);
              let maximumTemp = Math.round(weather.main.temp_max);
              let conditions = weather.weather[0].description;
              let currentWeatherIcon = weather.weather[0].icon;
              renderResults(
                trailName,
                trailLength,
                thumbnail,
                location,
                travelDist,
                description,
                conditions,
                currentWeatherIcon,
                feelsLike,
                maximumTemp,
                minimumTemp,
                trailUrl,
                latitude,
                longitude,
                trailLat,
                trailLong
              );
            });
          });
        });
      });
    }
  }
  //if latitude exists (is not a blank string) it goes directly to searchTrails function followed by ajax call to trail search
  else {
    console.log("using current data instead");
    let params;
    function searchTrails(lat, lon) {
      params = $.param({
        key: "200460387-e5b1d616b3250f62fab9619fc65bde2d",
        lat: lat,
        lon: lon
      });
    }
    searchTrails(latitude, longitude);
    //console.log(params);
    $.ajax({
      url: "https://www.hikingproject.com/data/get-trails?" + params,
      method: "GET"
    }).then(function(response) {
      //Promise that will run once object is returned from API call
      //creates array of trails from JSON object
      const trailArr = response.trails;
      //logs array to console
      //console.log(trailArr);
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
        const startLatLng = new google.maps.LatLng(latitude, longitude);
        const trailLatLng = new google.maps.LatLng(trailLat, trailLong);
        const travelDist = Math.floor(
          google.maps.geometry.spherical.computeDistanceBetween(
            startLatLng,
            trailLatLng
          ) / 1609.344
        );
        //MAKE AN AJAX CALL TO WEATHER API FOR TRAIL LOCATION AND .THEN(STORE RESULTS AND RENDER CARD)
        //appends a card with trail info and variables (for each) HTML came from Ivan
        let apiKey = "28d434e8969b198ac0dc819997cb40d1";
        let newUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=${apiKey}`;
        $.ajax({
          url: newUrl,
          method: "GET"
        }).then(function(weather) {
          let feelsLike = Math.round(weather.main.temp);
          let minimumTemp = Math.round(weather.main.temp_min);
          let maximumTemp = Math.round(weather.main.temp_max);
          let conditions = weather.weather[0].description;
          let currentWeatherIcon = weather.weather[0].icon;
          renderResults(
            trailName,
            trailLength,
            thumbnail,
            location,
            travelDist,
            description,
            conditions,
            currentWeatherIcon,
            feelsLike,
            maximumTemp,
            minimumTemp,
            trailUrl,
            latitude,
            longitude,
            trailLat,
            trailLong
          );
        });
      });
    });
  }
});

$("#send").on("click", function(e) {
  e.preventDefault();
  const name = encodeURI($("#name").val());
  const email = encodeURI($("#email").val());
  const phone = encodeURI($("#phone").val());
  const message = encodeURI($("#message").val());
  const subject = encodeURI(`${name} Says.. Your Website Rocks!!!!`);

  const hrefText = `mailto:ivansito87@gmail.com?cc=ceceliacreates@gmail.com&bcc=tonjaps3@gmail.com&subject=${subject}&body=${message}`;
  window.location.href = hrefText;
});

//     Location Icon
