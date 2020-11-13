$("body").click(function(event) {
    console.log("clicked: " + event.target.nodeName);
});



$(document).ready(function() {
    let test = false;
    // use school key inorder to get forecast data
    const apiKey = "166a433c57516f51dfab1f7edaed8413";
    let url = 'https://api.openweathermap.org/data/2.5/';
    let requestType = "";
    let query = "";
    //
    let getWeather = document.querySelector("#getWeather");
    let citySearch = document.querySelector("#city-search")

    citySearchPholder = ["San Luis Potosí", "Dallas", "Singapore", "Birmingham", "Jackson", "Richardson", "New York City"];

    for (let i = 0; i < 1; i++) {
        const pHolder = citySearchPholder[Math.floor(Math.random() * 7)];
        if (pHolder !== "") {
            citySearch.placeholder = "(i.e., " + pHolder + ")";

        };

    };

    getWeather.addEventListener('click', (event) => {
        event.preventDefault();
        let inputCity = event.target;
        let location = "";


        switch (inputCity.id) {
            case "getWeather":
                console.log('getWeather was clicked');
                location = citySearch.value.toUpperCase();
                break;
        }
        switch (inputCity.id) {
            case "getWeatherIcon":
                console.log('getWeatherIcon was clicked');
                location = citySearch.value.toUpperCase();
                break;
        }

        // should make this generic to use this on the area clicked
        // let location = $(this).val().trim().toUpperCase();
        if (test) { console.log('location:' + location); }
        if (location == "") return;

        updateCityStore(location);
        getCurWeather(location);
        getForecastWeather(location);

    });

    // pull current location
    let pastCities = document.querySelector('#past-cities');

    pastCities.addEventListener('click', (event) => {
        event.preventDefault();
        let targetCity = event.target;
        let location = "";

        switch (targetCity.id) {
            case 'cityButton0':
                console.log('cityButton0 was clicked');
                location = targetCity.textContent;
                break;
            case 'cityButton1':
                console.log('cityButton1 was clicked');
                location = targetCity.textContent;
                break;
            case 'cityButton2':
                console.log('cityButton2 was clicked');
                location = targetCity.textContent;
                break;
            case 'cityButton3':
                console.log('cityButton3 was clicked');
                location = targetCity.textContent;
                break;
            case 'cityButton4':
                console.log('cityButton4 was clicked');
                location = targetCity.textContent;
                break;
            case 'cityButton5':
                console.log('cityButton5 was clicked');
                location = targetCity.textContent;
                break;
            case 'cityButton6':
                console.log('cityButton6 was clicked');
                location = targetCity.textContent;
                break;
            case 'cityButton7':
                console.log('cityButton8 was clicked');
                location = targetCity.textContent;
                break;
            case 'cityButton8':
                console.log('cityButton9 was clicked');
                location = targetCity.textContent;
                break;
        }

        if (test) { console.log('location:' + location); }
        if (location == "") return;

        updateCityStore(location);
        getCurWeather(location);
        getForecastWeather(location);
    });

    // setInterval ***************

    function convertDate(epoch) {
        // function to convert unix epoch to local time
        // returns arr ["MM/DD/YYYY, HH:MM:SS AM", "MM/DD/YYYY", "HH:MM:SS AM"]
        if (test) { console.log(`convertData - epoch: ${epoch}`); }
        let readable = [];
        let myDate = new Date(epoch * 1000);

        // local time
        // returns string "MM/DD/YYYY, HH:MM:SS AM"
        readable[0] = (myDate.toLocaleString());
        readable[1] = ((myDate.toLocaleString().split(", "))[0]);
        readable[2] = ((myDate.toLocaleString().split(", "))[1]);

        if (test) { console.log(` readable[0]: ${readable[0]}`); }
        return readable;
    }

    function getCurLocation() {
        // This function is based on geoFindMe function found at
        //https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API
        //this function return an object with the lat and lon of current location
        if (test) { console.log("getCurLocation"); }

        let location = {};

        function success(position) {
            if (test) { console.log(" success"); }
            if (test) { console.log("  location", position); }

            location = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                success: true
            }
            if (test) { console.log(" success location", location); }
            getCurWeather(location);
            getForecastWeather(location);
        }

        function error() {
            location = { success: false }
            console.log('Could not get location');
            return location;
        }

        if (!navigator.geolocation) {
            console.log('Geolocation is not supported by your browser');
        } else {
            navigator.geolocation.getCurrentPosition(success, error);
        }
    };

    function getCurWeather(loc) {
        // function to get current weather
        // returns object of current weather data
        if (test) { console.log("getCurWeather - loc:", loc); }
        if (test) { console.log("getCurWeather - toloc:", typeof loc); }

        drawHistory();
        // clear search field
        $('#city-search').val("");

        if (typeof loc === "object") {
            city = `lat=${loc.latitude}&lon=${loc.longitude}`;
        } else {
            city = `q=${loc}`;
        }

        // set queryURL based on type of query
        requestType = 'weather';
        query = `?${city}&units=imperial&appid=${apiKey}`;
        queryURL = `${url}${requestType}${query}`;

        if (test) console.log(`cur queryURL: ${queryURL}`);
        // Create an AJAX call to retrieve data Log the data in console
        $.ajax({
            url: queryURL,
            method: 'GET'
        }).then(function(response) {
            if (test) console.log(response);

            weatherObj = {
                city: `${response.name}`,
                wind: response.wind.speed,
                humidity: response.main.humidity,
                temp: response.main.temp,
                date: (convertDate(response.dt))[1],
                icon: `http://openweathermap.org/img/w/${response.weather[0].icon}.png`,
                desc: response.weather[0].description
            }

            // calls function to draw results to page
            drawCurWeather(weatherObj);
            getUvIndex(response);
        });
    };

    function getForecastWeather(loc) {
        // function to get 5 day forecast data
        // returns array of daily weather objects
        if (test) { console.log("getForecastWeather - loc:", loc); }



        if (typeof loc === "object") {
            city = `lat=${loc.latitude}&lon=${loc.longitude}`;
        } else {
            city = `q=${loc}`;
        }

        // array to hold all the days of results
        let weatherArr = [];
        let weatherObj = {};

        // set queryURL based on type of query
        requestType = 'forecast/daily';
        query = `?${city}&cnt=6&units=imperial&appid=${apiKey}`;
        queryURL = `${url}${requestType}${query}`;

        // Create an AJAX call to retrieve data Log the data in console
        $.ajax({
            url: queryURL,
            method: 'GET'
        }).then(function(response) {
            if (test) console.log("getForecast response", response);

            for (let i = 1; i < response.list.length; i++) {
                let cur = response.list[i]
                    // TODO check for errors/no data
                weatherObj = {
                    weather: cur.weather[0].description,
                    icon: `http://openweathermap.org/img/w/${cur.weather[0].icon}.png`,
                    minTemp: cur.temp.min,
                    maxTemp: cur.temp.max,
                    humidity: cur.humidity,
                    date: (convertDate(cur.dt))[1]
                };

                weatherArr.push(weatherObj);
            }

            drawForecast(weatherArr);
        });
    };

    function drawCurWeather(cur) {
        // function to draw  weather all days
        // need logic to pick variables
        if (test) { console.log('drawCurWeather - cur:', cur); }

        $('#forecast').empty();
        $('#cityName').text(cur.city + " (" + cur.date + ")");
        $('#curWeathIcn').attr("src", cur.icon);
        $('#curTemp').text("Temp: " + cur.temp + " F");
        $('#curHum').text("Humidity: " + cur.humidity + "%");
        $('#curWind').text("Windspeed: " + cur.wind + " MPH");
    };

    function drawForecast(cur) {
        if (test) { console.log('drawForecast - cur:', cur); }

        for (let i = 0; i < cur.length; i++) {
            let $col12 = $('<div class="col-6 col-md-4 col-lg-2 noPad mb-1 mb-lg-0 ">')
                // let $roStar = $('<div class=')
            let $colmx1 = $('<div class="card noPad buttMargin rounded">');
            let $cardBody = $('<div class="card-body forecast-card noPad text-center lilPad">');
            let $cardTitle = $('<h5 class="card-title">');
            $cardTitle.text(cur[i].date);


            let $ul = $('<ul>');

            let $iconLi = $('<li>');
            let $iconI = $('<img>');
            $iconI.attr('src', cur[i].icon);

            // let $weathLi = $('<li>');
            // $weathLi.text(cur[i].weather);

            // let $tempMinLi = $('<li>');
            // $tempMinLi.text('Min Temp: ' + cur[i].minTemp + " F");

            let $tempMaxLi = $('<li style="font-size: 16px">');
            $tempMaxLi.text('Temp: ' + cur[i].maxTemp + " F");

            let $humLi = $('<li style="font-size: 16px">');
            $humLi.text('Humidity: ' + cur[i].humidity + "%");

            // assemble element
            $iconLi.append($iconI);

            $ul.append($iconLi);
            // $ul.append($weathLi);
            // $ul.append($tempMinLi);
            $ul.append($tempMaxLi);
            $ul.append($humLi);

            $cardTitle.append($ul);
            $cardBody.append($cardTitle);
            $colmx1.append($cardBody);
            $col12.append($colmx1);
            $('#forecast').append($col12);
        }
    };

    function getUvIndex(uvLoc) {
        if (test) { console.log('getUvIndex loc:', uvLoc); }
        // function to color uv index

        city = `lat=${parseInt(uvLoc.coord.lat)}&lon=${parseInt(uvLoc.coord.lon)}`;

        // set queryURL based on type of query
        requestType = 'uvi';
        query = `?${city}&appid=${apiKey}`;
        queryURL = `${url}${requestType}${query}`;

        // Create an AJAX call to retrieve data Log the data in console
        $.ajax({
            url: queryURL,
            method: 'GET'
        }).then(function(response) {
            let bkcolor = "violet";

            // if (test) response.value = 7.1234567;

            let uv = parseFloat(response.value);

            if (uv < 3) {
                bkcolor = 'limegreen';
            } else if (uv < 6) {
                bkcolor = 'yellow';
            } else if (uv < 8) {
                bkcolor = 'orange';
            } else if (uv < 11) {
                bkcolor = 'red';
            }

            let title = '<span>UV Index: </span>';
            let color = title + `<span style="background-color: ${bkcolor};  padding: 5px 7px 5px 7px; border-radius: 7px;">${response.value}</span>`;

            $('#curUv').html(color);
        });
    };

    function updateCityStore(city) {
        let cityList = JSON.parse(localStorage.getItem("cityList")) || [];
        cityList.push(city);
        cityList.sort();

        // removes dulicate cities
        for (let i = 1; i < cityList.length; i++) {
            if (cityList[i] === cityList[i - 1]) cityList.splice(i, 1);
        }

        //stores in local storage
        localStorage.setItem('cityList', JSON.stringify(cityList));
    };

    function drawHistory() {
        // function to pull city history from local memory
        if (test) console.log('getHistory');
        let cityList = JSON.parse(localStorage.getItem("cityList")) || [];

        $('#past-cities').empty();
        cityList.forEach(function(city, i) {
            let cityNameDiv = $(`<li class='list-group-item cityList' id='cityButton${i}' value='${city}'>${city}</li>`);


            $('#past-cities').append(cityNameDiv);
        });
    };

    // will get location when page initializes
    const location = getCurLocation();
});