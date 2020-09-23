"use strict";
$(document).ready(function () {

    const url = "https://fearless-famous-glass.glitch.me/movies";

    let msg = "<h1>Loading...</h1>";

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
                data.forEach(function (movie) {
                    console.log(movie.id);
                    let id = movie.id;
                    let title = movie.title;
                    let rating = movie.rating;

                    html += `<p>ID: ${id}</p>` +
                        `<p>Movie Title: ${title}</p>` +
                        `<p>Movie Rating: ${rating}</p>` +
                        `<button class="delete" ><i class="fas fa-trash-alt"></i></button>` +
                        `<span>Delete </span>` +
                        `<button class="edit"><i class="far fa-edit"></i></button>` +
                        `<span>Edit </span>`
                })

                $("#main-display").append(html);

            })
    });

    // Add Screen Functionality
    $("#add-movie-btn").click(function(e){
        e.preventDefault();

    })

    // Edit Screen Functionality
    $(".edit").click(function (e) {
        e.preventDefault();

    });

    // Delete Screen Functionality
    $(".delete").click(function (e) {
        e.preventDefault();

    });

    // Search Movie Functionality


    //Sort Movie Functionality



    function addMovie () {

    };

    function editMovie () {

    };

    function deleteMovie () {

    };

    function searchMovies () {

    };

    function sortMovies () {

    };

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


// GET RADIO BUTTON VALUE
// var radioValue = $("input[name='gender']:checked").val();