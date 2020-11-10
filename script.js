function searchBandsInTown(artist) {

    // Querying the bandsintown api for the selected artist, the ?app_id parameter is required, but can equal anything
    var queryURL = "https://rest.bandsintown.com/artists/" + artist + "?app_id=codingbootcamp";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {

        // Printing the entire object to console
        console.log(response);

        // Constructing HTML containing the artist information
        var artistName = $("<h1>").text(response.name);
        var artistURL = $("<a>").attr("href", response.url).append(artistName);
        var artistImage = $("<img>").attr("src", response.thumb_url);
        var trackerCount = $("<h2>").text(response.tracker_count + " fans tracking this artist");
        var upcomingEvents = $("<h2>").text(response.upcoming_event_count + " upcoming events");
        var goToArtist = $("<a>").attr("href", response.url).text("See Tour Dates");

        // Empty the contents of the artist-div, append the new artist content
        $("#artist-div").empty();
        $("#artist-div").append(artistURL, artistImage, trackerCount, upcomingEvents, goToArtist);
    });
}

// Event handler for user clicking the select-artist button
$("#select-artist").on("click", function(event) {
    // Preventing the button from trying to submit the form
    event.preventDefault();
    // Storing the artist name
    var inputArtist = $("#artist-input").val().trim();

    // Running the searchBandsInTown function(passing in the artist as an argument)
    searchBandsInTown(inputArtist);
});


var APIKey = "471932e2e7d2cdf9459d4d9e9cdd9364";
// Here we are building the URL we need to query the database
var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=Bujumbura,Burundi&appid=" + APIKey;

$.ajax({
    url: queryURL,
    method: "GET"
}).then(function(response) {
    console.log(response);

    let cityData = document.querySelector(".city");
    let windData = document.querySelector(".wind");
    let humidityData = document.querySelector(".humidity");
    let tempData = document.querySelector(".temp");

    cityData.textContent = "City Name: Bujumbura";
    windData.textContent = "Wind Speed: " + response.wind.speed;
    humidityData.textContent = "Humidity: " + response.main.humidity + "%";
    tempData.textContent = "Temperature: " + ((response.main.temp - 273.15) * 1.80 + 32).toFixed(2) + "\u00B0";

    console.log(response.main.temp);

});

var movies = ["The Matrix", "The Notebook", "Mr. Nobody", "The Lion King"];

// Function for dumping the JSON content for each button into the div
function displayMovieInfo() {

    var movie = $(this).attr("data-name");
    var queryURL = "https://www.omdbapi.com/?t=" + movie + "&apikey=trilogy";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        $("#movies-view").text(JSON.stringify(response));
    });
}

// Function for displaying movie data
function renderButtons() {

    // Deleting the buttons prior to adding new movies
    // (this is necessary otherwise you will have repeat buttons)
    $("#buttons-view").empty();

    // Looping through the array of movies
    for (var i = 0; i < movies.length; i++) {

        // Then dynamically generating buttons for each movie in the array
        // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
        var a = $("<button>");
        // Adding a class of movie to our button
        a.addClass("movie");
        // Adding a data-attribute
        a.attr("data-name", movies[i]);
        // Providing the initial button text
        a.text(movies[i]);
        // Adding the button to the buttons-view div
        $("#buttons-view").append(a);
    }
}

// This function handles events where one button is clicked
$("#add-movie").on("click", function(event) {
    event.preventDefault();

    // This line grabs the input from the textbox
    var movie = $("#movie-input").val().trim();

    // Adding the movie from the textbox to our array
    movies.push(movie);
    console.log(movies);

    // Calling renderButtons which handles the processing of our movie array
    renderButtons();
});

// Function for displaying the movie info
// Using $(document).on instead of $(".movie").on to add event listeners to dynamically generated elements
$(document).on("click", ".movie", displayMovieInfo);

// Calling the renderButtons function to display the initial buttons
renderButtons();