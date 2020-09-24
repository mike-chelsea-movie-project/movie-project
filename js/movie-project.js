"use strict";
$(document).ready(function () {

    const url = "https://fearless-famous-glass.glitch.me/movies";

    let msg = "<h1>Loading...</h1>";

    $('#loading-message').html(msg);

    $(window).load(function () {
        $('#loading-message').hide();
        fetch(url).then(response => response.json())
            .then(data => {
                // console.log(data);
                let html = "";

                //REFRESHING THE MAIN-DISPLAY ELEMENT BEFORE EACH ITERATION
                $("#main-display").empty();

                //ITERATION OF MOVIE INFORMATION
                data.forEach(function (movie) {
                    let id = movie.id;
                    let title = movie.title;
                    let rating = movie.rating;
                    let genre = movie.genre;

                    html += `<p>ID: ${id}</p>` +
                        `<p>Movie Title: ${title}</p>` +
                        `<p>Movie Rating: ${rating}</p>` +
                        `<p>Movie Genre: ${genre}</p>` +
                        `<button class="delete" data-id="${id}"><i class="fas fa-trash-alt"></i></button>` +
                        `<span>Delete </span>` +
                        `<button class="edit" data-id="${id}" ><i class="far fa-edit"></i></button>` +
                        `<span>Edit </span>`
                })

                $("#main-display").append(html);

            })
    });


    // Add Screen Functionality
    $("#add-movie-btn").click(function (e) {
        e.preventDefault();
        let title = $('#movie-title-add').val();
        let rating = $("input[name='movie-rating-add']:checked").val();
        let genre = $("#movie-genre-add").val();
        ;
        // POST DATA TO MOVIE API
        const movieRating = {
            title: title,
            rating: rating,
            genre: genre
        };
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(movieRating),
        };
        fetch(url, options)
            .then(response => console.log(response))
            .catch(error => console.error(error));
    });

    // Edit Screen Functionality --> Still working on this, we need to have it come up as popup and live/update/refresh the page

    //EDIT SCREEN IS HIDDEN INITIALLY -->Still working on this
    $("#edit-screen").hide();

    //EDIT BUTTON FUNCTION
    $(document).on("click", ".edit", function (e) {
        e.preventDefault();
        $("#edit-screen").slideToggle().css("display", "flex");
        let editID = $(this).data("id");
        console.log(editID);
        editLoadMovie(editID);

        // $("#edit-screen").css("display", "block");

    });

    //EDIT MOVIE INFO BUTTON FUNCTIONALITY
    // $(document).on("click", "#edit-movie-btn", function (e) {
    //     e.preventDefault();
    //     let editID = $().data("id");
    //     editMovie(editID);
    // });


    // Delete Screen Functionality --> This is working, however, we need it to add an alert box warning the user and to live update/refresh
    $(document).on("click", ".delete", function (e) {
        e.preventDefault();
        let deleteID = $(this).data("id");
        deleteMovie(deleteID);
    });

    // Search Movie Functionality


    //Sort Movie Functionality


    function addMovie() {

    };

    function editLoadMovie(editID) {
        fetch(url).then(response => response.json())
            .then(data => {
                console.log(data);
                console.log(editID);

                let selectedMovie = [];

                //REFRESHING THE EDIT-DISPLAY ELEMENT BEFORE EACH ITERATION
                // $("#edit-screen").empty();

                //ITERATION OF MOVIE INFORMATION
                data.forEach(function (movie) {
                    let id = movie.id;

                    if(editID === id) {
                        selectedMovie.push(movie);
                    }

                    //PRELOADING THE DATA INTO THE EDIT FORM
                    // $("#edit-screen").load(function () {
                    //     $("#movie-title-edit").val(title);
                    //     $("#movie-rating-edit").val(rating);
                    // });
                });

                selectedMovie.forEach(function (movie) {
                    let title = movie.title;
                    let rating = movie.rating;
                    let genre = movie.genre;

                    $("#movie-title-edit").val(title);
                    $("#movie-rating-edit").val(rating);
                    $("#movie-genre-edit").val(genre);

                });
                $(document).on("click", "#edit-movie-btn", function (e) {
                    e.preventDefault();
                    console.log(editID);

                    // let editID = $().data("id");
                    editMovie(editID);
                });

            });
    };

    function editMovie(editID) {
        console.log(editID);

        let editTitle = $("#movie-title-edit").val().trim();
        let editRating = $("input[name='movie-rating-edit']:checked").val();
        let editGenre = $("#movie-genre-edit").val();

        //ADDING THE EDIT INFORMATION
        let putURL = `${url}/${editID}`;

        const editObj = {
            "title": editTitle,
            "rating": editRating,
            "genre": editGenre
        };
        const options = {
            "method": "PUT",
            "headers": {
                "Content-Type": "application/json"
            },
            "body": JSON.stringify(editObj),
        };

        fetch(putURL, options)
            .then(function (response) {
                response.json()
            })
            .then(function(data){console.log(data)})
            .catch(function (error) {
                console.log(error)
            });

    };

    // let putURL = `${url}/${editID}`;
    //
    // const editObj = {
    //     "movieTitle": editTitle,
    //     "movieRating": editRating,
    //     "movieGenre": editGenre
    // };
    // const options = {
    //     "method": "PUT",
    //     "headers": {
    //         "Content-Type": "application/json"
    //     },
    //     "body": JSON.stringify(editObj),
    // };
    //
    // fetch(putURL, options)
    //     .then(function(response){response.json()})
    //     .then(function(data){console.log(data)})
    //     .catch(function(error){console.log(error)});


function deleteMovie(deleteID) {
    const deleteMethod = {
        "method": "DELETE",
        "headers": {
            "Content-Type": "application/json"
        },
        //Doesn't need to have a body since nothing is being sent to the server
    };
    const deleteURL = `${url}/${deleteID}`;

    fetch(deleteURL, deleteMethod)
        .then(function (response) {
            response.json()
        })
        // .then(function(data){console.log(data)})
        .catch(function (error) {
            console.log(error)
        });
};

function searchMovies() {

};

function sortMovies() {

};

});
