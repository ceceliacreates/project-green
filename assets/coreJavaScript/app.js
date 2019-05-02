$.get(
  "https://www.hikingproject.com/data/get-trails?lat=40.0274&lon=-105.2519&key=200460387-e5b1d616b3250f62fab9619fc65bde2d"
).then(function(response) {
const trailArr = response.trails;
  console.log(trailArr);
  trailArr.forEach(function(trail) {
    const trailName = trail.name;
    const thumbnail = trail.imgMedium;
    const description = trail.summary;
    $("#cards").append(`
    <div class="portfolio-modal mfp-hide" id="portfolio-modal-1">
 <div class="portfolio-modal-dialog bg-white">
     <a class="close-button d-none d-md-block portfolio-modal-dismiss" href="#">
     </a>

         <div class="row">
             <div class="col-lg-12 mx-auto">
                 <h3 class="text-secondary text-uppercase mb-0">${trailName}</h3>
                 <hr class="star-dark mb-5">
                 <div class="row">
                     <div class="col-lg-3 col-md-4">
                         <img class="img-fluid mb-4" src="${thumbnail}" alt="">
                     </div>
                     <div class="col-lg-9 col-md-8">
                         <h4>Maybe Some Description or Locatlion </h4>
                         <p class="mb-5">${description}</p>
                         <h5 class="mb-3">Mybe Reviews or Weather</h5>
                         <a class="btn btn-primary btn-lg rounded-pill portfolio-modal-dismiss" href="#">
                             Action</a>
                     </div>
                 </div>
             </div>
         </div>
     </div>
 </div>
    `)
  })
});

//$("#cards").html(`<div class="portfolio-modal mfp-hide" id="portfolio-modal-1">
// <div class="portfolio-modal-dialog bg-white">
//     <a class="close-button d-none d-md-block portfolio-modal-dismiss" href="#">
//     </a>

//         <div class="row">
//             <div class="col-lg-12 mx-auto">
//                 <h3 class="text-secondary text-uppercase mb-0">Trail Name</h3>
//                 <hr class="star-dark mb-5">
//                 <div class="row">
//                     <div class="col-lg-3 col-md-4">
//                         <img class="img-fluid mb-4" src="assets/images/try.jpg" alt="">
//                     </div>
//                     <div class="col-lg-9 col-md-8">
//                         <h4>Maybe Some Description or Locatlion </h4>
//                         <p class="mb-5">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia neque
//                             assumenda ipsam nihil, molestias magnam, recusandae quos quis inventore quisquam velit
//                             asperiores, vitae? Reprehenderit soluta, eos quod consequuntur itaque. Nam.</p>
//                         <h5 class="mb-3">Mybe Reviews or Weather</h5>
//                         <a class="btn btn-primary btn-lg rounded-pill portfolio-modal-dismiss" href="#">
//                             Action</a>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     </div>
// </div>
// <div class="portfolio-modal mfp-hide" id="portfolio-modal-1">
// <div class="portfolio-modal-dialog bg-white">
//     <a class="close-button d-none d-md-block portfolio-modal-dismiss" href="#">
//     </a>

//         <div class="row">
//             <div class="col-lg-12 mx-auto">
//                 <h3 class="text-secondary text-uppercase mb-0">Trail Name</h3>
//                 <hr class="star-dark mb-5">
//                 <div class="row">
//                     <div class="col-lg-3 col-md-4">
//                         <img class="img-fluid mb-4" src="assets/images/try.jpg" alt="">
//                     </div>
//                     <div class="col-lg-9 col-md-8">
//                         <h4>Maybe Some Description or Locatlion </h4>
//                         <p class="mb-5">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia neque
//                             assumenda ipsam nihil, molestias magnam, recusandae quos quis inventore quisquam velit
//                             asperiores, vitae? Reprehenderit soluta, eos quod consequuntur itaque. Nam.</p>
//                         <h5 class="mb-3">Mybe Reviews or Weather</h5>
//                         <a class="btn btn-primary btn-lg rounded-pill portfolio-modal-dismiss" href="#">
//                             Action</a>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     </div>
// </div>`)
