"USE STRICT";
$(document).ready(function () {

    const url = "https://fearless-famous-glass.glitch.me/movies";

    // GET DATA FROM MOVIE API
    // fetch(url).then(response => response.json()).then(data => console.log(data));
    // fetch(url).then(response => response.json())
    //     .then(data => {
    //         console.log(data);
    //
    let msg = "<h1>Loading...</h1>";
    //
    $('#loading-message').html(msg);

    $(window).load(function () {
        $('#loading-message').hide();
        fetch(url).then(response => response.json())
            .then(data => {
                console.log(data);
                let html = "";

                //REFRESHING THE MAIN-DISPLAY ELEMENT BEFORE EACH ITERATION
                $("#main-display").empty();

                //ITERATION OF MOVIE INFORMATION
                data.forEach(function(movie){
                    console.log(movie.id);
                    let id = movie.id;
                    let title = movie.title;
                    let rating =  movie.rating;

                    html += `<p>ID: ${id}</p>`+
                        `<p>Movie Title: ${title}</p>`+
                        `<p>Movie Rating: ${rating}</p>`
                })

                $("#main-display").append(html);

            })
    });


});

// POST DATA TO MOVIE API
// const movieRating = {
//     title: "Lost Highway",
//     rating: 5
// };
// const options = {
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(movieRating),
// };
// fetch(url, options)
//     .then(response => console.log(response))
//     .catch(error => console.error(error));

//LOADING MESSAGE
// let msg = "<h1>Loading...</h1>";
//
// $('#loading-message').html(msg);
//
// $(window).load(function() {
//     $('#loading-message').hide();
// });


// });