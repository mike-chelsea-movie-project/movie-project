"USE STRICT";
$(document).ready(function() {

    const url = "https://fearless-famous-glass.glitch.me/movies";

    // GET DATA FROM MOVIE API
    fetch(url).then(response => response.json()).then(data => console.log(data));

    // POST DATA TO MOVIE API
    const movieRating = {
        title: "Lost Highway",
        rating: 5
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