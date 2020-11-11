# Weather-Dashboard
Weather Dashboard - Server Side API's and Javascript.

# 06 Server-Side APIs: Weather Dashboard

Developers are often tasked with retrieving data from another application's API and using it in the context of their own. Third-party APIs allow developers to access their data and functionality by making requests with specific parameters to a URL. Your challenge is to build a weather dashboard that will run in the browser and feature dynamically updated HTML and CSS.

Use the [OpenWeather API](https://openweathermap.org/api) to retrieve weather data for cities. The documentation includes a section called "How to start" that will provide basic setup and usage instructions. Use `localStorage` to store any persistent data.

## User Story

```
AS A traveler
I WANT to see the weather outlook for multiple cities
SO THAT I can plan a trip accordingly
```

## Acceptance Criteria

```
GIVEN a weather dashboard with form inputs
WHEN I search for a city
THEN I am presented with current and future conditions for that city and that city is added to the search history
WHEN I view current weather conditions for that city
THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
WHEN I view the UV index
THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
WHEN I view future weather conditions for that city
THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity
WHEN I click on a city in the search history
THEN I am again presented with current and future conditions for that city
WHEN I open the weather dashboard
THEN I am presented with the last searched city forecast
```

The following image demonstrates the application functionality:

![weather dashboard demo](./Assets/06-server-side-apis-homework-demo.png)

## Review

You are required to submit the following for review:

* The URL of the deployed application.

* The URL of the GitHub repository. Give the repository a unique name and include a README describing the project.

- - -
© 2019 Trilogy Education Services, a 2U, Inc. brand. All Rights Reserved.


 <h1>Movie Search</h1>
    
        <!-- Rendered Buttons will get Dumped Here  -->
        <div id="buttons-view"></div>
    
        <form id="movie-form">
          <label for="movie-input">Add a Movie, Yo!</label>
          <input type="text" id="movie-input"><br>
    
          <!-- Button triggers new movie to be added -->
          <input id="add-movie" type="submit" value="Add a Movie, Yo!">
        </form>
    
        <!-- Movies will Get Dumped Here -->
        <div id="movies-view"></div>
    

    
        
        <script src="https://code.jquery.com

  <div class="row">
            <div class="col-12"><h1>Weather Dashboard</h1></div>
            
        </div>
        <div class="row">
            <div class="col"></div>
            <div class="col"></div>
        </div>
        <!-- Retrieved data will be dumped here -->
        <div class="city"></div>
        <div class="wind"></div>
        <div class="humidity"></div>
        <div class="temp"></div>

        <!-- Add extra div for the bonus Fahrenheit temp -->
        <div class="tempF"></div>
