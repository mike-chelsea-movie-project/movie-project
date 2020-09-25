"use strict";
$(document).ready(function () {

    const url = "https://fearless-famous-glass.glitch.me/movies";

    //Loading Message when page loads and before the data/movies load in
    let msg = "<h1>Loading...</h1>";

    $('#loading-message').html(msg);

    $(window).load(function () {
        $('#loading-message').hide();
        loadMovies();
    });


// Add Screen Functionality Event Listener
    $(document).on("click", "#add-movie-btn", function (e) {
        e.preventDefault();
        let title = $('#movie-title-add').val();
        let rating = $("input[name='movie-rating-add']:checked").val();
        let genre = $("#movie-genre-add").val();

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
            .then(response => response.json())
            .then(data => {
                console.log(data);
                loadMovies()
            })
            .catch(error => console.error(error));


    });


// Edit Screen Functionality --> still working on popup screen

//EDIT SCREEN IS HIDDEN INITIALLY
    $("#edit-screen").hide();

//EDIT BUTTON FUNCTION Event Listener
    $(document).on("click", ".edit", function (e) {
        e.preventDefault();
        $("#edit-screen").slideToggle().css("display", "flex");
        let editID = $(this).data("id");
        editLoadMovie(editID);
    });


// Delete Screen Functionality --> This is working, however, we need it to add an alert box warning the user and to live update/refresh
    $(document).on("click", ".delete", function (e) {
        e.preventDefault();
        let deleteID = $(this).data("id");
        deleteMovie(deleteID);
        loadMovies();
    });

// Search Movie Functionality Event Listener


//Sort Movie Functionality Event Listener


/////////////// FUNCTIONS BELOW ////////////////////////////

    function loadMovies() {
        fetch(url).then(response => response.json())
            .then(data => {
                let html = "";

                //REFRESHING THE MAIN-DISPLAY ELEMENT BEFORE EACH ITERATION
                $("#main-display").empty();

                //ITERATION OF MOVIE INFORMATION
                data.forEach(function (movie) {
                    let id = movie.id;
                    let title = movie.title;
                    let rating = movie.rating;
                    let genre = movie.genre;
                    let ratingString = "";
                    for (let i = 0; i < rating; i++) {
                        ratingString += "<i class='fas fa-star'></i>";
                    }

                    html += `<div class="card" style="width: 18rem;">` +
                        `<div class="card-body">`+
                        `<h5 class="card-title">${title}</h5>` +
                        `<h6 class="card-subtitle mb-2 text-muted">${genre}</h6>` +
                        `<p class="card-text">Rating: ${ratingString}</p>` +
                        `<button class="delete btn btn-danger" data-id="${id}"><i class="fas fa-trash-alt"></i></button>` +
                        `<button class="edit btn btn-primary" data-id="${id}" ><i class="far fa-edit"></i></button>` +
                        `</div>` +
                        `</div>`
                })

                $("#main-display").append(html);
            });
    };


    function addMovie() {

    };

    function editLoadMovie(editID) {
        fetch(url).then(response => response.json())
            .then(data => {
                console.log(data);

                let selectedMovie = [];

                //ITERATION OF MOVIE INFORMATION
                data.forEach(function (movie) {
                    let id = movie.id;

                    if (editID === id) {
                        selectedMovie.push(movie);
                    }
                });

                selectedMovie.forEach(function (movie) {
                    let title = movie.title;
                    let rating = (movie.rating).toString();
                    let genre = movie.genre;
                    console.log(rating);

                    $("#movie-title-edit").val(title);
                    $("input:radio[name='movie-rating-edit'][value=" + rating + "]").prop("checked", true);
                    $("#movie-genre-edit").val(genre);

                });

                $(document).on("click", "#edit-movie-btn", function (e) {
                    e.preventDefault();
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
            .then(function (data) {
                console.log(data);
                loadMovies()
            })
            .catch(function (error) {
                console.log(error)
            });

    };

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
            .then(function (data) {
                console.log(data);
                loadMovies()
            })
            .catch(function (error) {
                console.log(error)
            });
    };

    function searchMovies() {

    };

    function sortMovies() {

    };
});


