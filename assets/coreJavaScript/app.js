// //Placeholder URL to return an array to render

// $.get(
//   "https://www.hikingproject.com/data/get-trails?lat=33.84953&lon=-84.4898655&key=200460387-e5b1d616b3250f62fab9619fc65bde2d"
// ).then(function(response) {
//     //Promise that will run once object is returned from API call
//     //creates array of trails from JSON object
// const trailArr = response.trails;
// //logs array to console 
//   console.log(trailArr);
//   //renders a card for each item in the array
//   trailArr.forEach(function(trail) {
//       //creates variable for trail name, thumbnail image, description, and trail length (for each)
//     const trailName = trail.name;
//     const thumbnail = trail.imgMedium;
//     const description = trail.summary;
//     const trailLength = trail.length;
//     const trailUrl = trail.url;
//     //appends a card with trail info and variables (for each) HTML came from Ivan
//     $("#cards").append(`
//     <div class="portfolio-modal mfp-hide" id="portfolio-modal-1">
//  <div class="portfolio-modal-dialog bg-white">
//      <a class="close-button d-none d-md-block portfolio-modal-dismiss" href="#">
//      </a>

//          <div class="row">
//              <div class="col-lg-12 mx-auto">
//                  <h3 class="text-secondary text-uppercase mb-0">${trailName} (${trailLength} miles)</h3>
//                  <hr class="star-dark mb-5">
//                  <div class="row">
//                      <div class="col-lg-3 col-md-4">
//                          <img class="img-fluid mb-4" src="${thumbnail}" alt="">
//                      </div>
//                      <div class="col-lg-9 col-md-8">
//                          <h4>Trail Summary</h4>
//                          <p class="mb-5">${description}</p>
//                          <h5 class="mb-3">Mybe Reviews or Weather</h5>
//                          <a class="btn btn-primary btn-lg rounded-pill portfolio-modal-dismiss" href="${trailUrl}" targ="_blank">
//                              Find Out More!</a>
//                      </div>
//                  </div>
//              </div>
//          </div>
//      </div>
//  </div>
//     `)
//   })
// });
// //EXTRA CODE JUST IN CASE THIS DOES NOTHING
// //$("#cards").html(`<div class="portfolio-modal mfp-hide" id="portfolio-modal-1">
// // <div class="portfolio-modal-dialog bg-white">
// //     <a class="close-button d-none d-md-block portfolio-modal-dismiss" href="#">
// //     </a>

// //         <div class="row">
// //             <div class="col-lg-12 mx-auto">
// //                 <h3 class="text-secondary text-uppercase mb-0">Trail Name</h3>
// //                 <hr class="star-dark mb-5">
// //                 <div class="row">
// //                     <div class="col-lg-3 col-md-4">
// //                         <img class="img-fluid mb-4" src="assets/images/try.jpg" alt="">
// //                     </div>
// //                     <div class="col-lg-9 col-md-8">
// //                         <h4>Maybe Some Description or Locatlion </h4>
// //                         <p class="mb-5">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia neque
// //                             assumenda ipsam nihil, molestias magnam, recusandae quos quis inventore quisquam velit
// //                             asperiores, vitae? Reprehenderit soluta, eos quod consequuntur itaque. Nam.</p>
// //                         <h5 class="mb-3">Mybe Reviews or Weather</h5>
// //                         <a class="btn btn-primary btn-lg rounded-pill portfolio-modal-dismiss" href="#">
// //                             Action</a>
// //                     </div>
// //                 </div>
// //             </div>
// //         </div>
// //     </div>
// // </div>
// // <div class="portfolio-modal mfp-hide" id="portfolio-modal-1">
// // <div class="portfolio-modal-dialog bg-white">
// //     <a class="close-button d-none d-md-block portfolio-modal-dismiss" href="#">
// //     </a>

// //         <div class="row">
// //             <div class="col-lg-12 mx-auto">
// //                 <h3 class="text-secondary text-uppercase mb-0">Trail Name</h3>
// //                 <hr class="star-dark mb-5">
// //                 <div class="row">
// //                     <div class="col-lg-3 col-md-4">
// //                         <img class="img-fluid mb-4" src="assets/images/try.jpg" alt="">
// //                     </div>
// //                     <div class="col-lg-9 col-md-8">
// //                         <h4>Maybe Some Description or Locatlion </h4>
// //                         <p class="mb-5">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia neque
// //                             assumenda ipsam nihil, molestias magnam, recusandae quos quis inventore quisquam velit
// //                             asperiores, vitae? Reprehenderit soluta, eos quod consequuntur itaque. Nam.</p>
// //                         <h5 class="mb-3">Mybe Reviews or Weather</h5>
// //                         <a class="btn btn-primary btn-lg rounded-pill portfolio-modal-dismiss" href="#">
// //                             Action</a>
// //                     </div>
// //                 </div>
// //             </div>
// //         </div>
// //     </div>
// // </div>`)

      const apiKey = "28d434e8969b198ac0dc819997cb40d1";
      const city = "Boulder, Colorado";
      const queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&unit=imperial&appid=${apiKey}`;
      let searchCity;
      let currentWeatherIcon;

      //pulling the api using the weather url for longitude and latitude data
      $.ajax({
        url: queryURL,
        method: "GET"
      })
        //pulling the response from the previous api of longitude and latitude
        .then(function(response) {
          console.log(response);
          const latitude = response.coord.lat;
          const longitude = response.coord.lon;
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
      function searchTrails(lat, lon, searchCity) {
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
                //appends a card with trail info and variables (for each) HTML came from Ivan
                $("#cards").append(`
                <div class="portfolio-modal mfp-hide" id="portfolio-modal-1">
             <div class="portfolio-modal-dialog bg-white">
                 <a class="close-button d-none d-md-block portfolio-modal-dismiss" href="#">
                 </a>
            
                     <div class="row">
                         <div class="col-lg-12 mx-auto">
                             <h3 class="text-secondary text-uppercase mb-0">${trailName} (${trailLength} miles)</h3>
                             <hr class="star-dark mb-5">
                             <div class="row">
                                 <div class="col-lg-3 col-md-4">
                                     <img class="img-fluid mb-4" src="${thumbnail}" alt="">
                                 </div>
                                 <div class="col-lg-9 col-md-8">
                                     <h4>Trail Summary</h4>
                                     <p class="mb-5">${description}</p>
                                     <h5 class="mb-3">The current weather in ${location} is: <image src="http://openweathermap.org/img/w/${currentWeatherIcon}.png"></h5>
                                     <a class="btn btn-primary btn-lg rounded-pill portfolio-modal-dismiss" href="${trailUrl}" targ="_blank">
                                         Find Out More!</a>
                                 </div>
                             </div>
                         </div>
                     </div>
                 </div>
             </div>
                `)
              })
            });
            // rendering the cards to the dom based on the two responses



      }
    