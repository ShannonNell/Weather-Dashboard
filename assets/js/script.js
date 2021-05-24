//Variables
// Search vars
var form = document.querySelector('#city-search-form')
//Current Conditions var's
var cityDivEl = document.querySelector('#cityCurrentWeather');
var citySearchInputEl = document.querySelector('#searched-city');
var currentWeatherEl = document.querySelector('#current-weather');
//forecast var's
// var forecastContainer = document.querySelector('#five-day-forecast');
var forecastTitle = document.querySelector('#forecast');
var forecastDivEl = document.querySelector('#five-day-div');


//fetch city weather from API 
function getCityWeather(city) {
    var apiKey = '83bfc16ec7111348deb193634d24e4ad';
    var apiURL = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
    
    fetch(apiURL)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            // console.log(data);
            displayWeather(data);
        });
};

//weather = data from above
function displayWeather(weather) {
    //clear any old content
    currentWeatherEl.textContent = "";
    citySearchInputEl.textContent = city.value; 

    //date element
    var currentDay = document.createElement('span');
    currentDay.textContent = " (" + moment(weather.dt.value).format("DD MMM, YYYY") + ")"; //can use .dt.value OR sys.dt_txt
    citySearchInputEl.appendChild(currentDay);

    // image el for weather conditions
    var weatherImg = document.createElement("img");
    weatherImg.setAttribute("src", `https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`); //can add @2x before png to make bigger
    citySearchInputEl.appendChild(weatherImg);

    //span el for temp data
    var temperature = document.createElement('span');
    temperature.textContent = "Temperature: " + weather.main.temp + " °C";
    temperature.classList = "list-item";
    currentWeatherEl.appendChild(temperature);
    
    //span el for humidity
    var humidity = document.createElement('span');
    humidity.textContent = "Humidity: " + weather.main.humidity + "%";
    humidity.classList = "list-item";
    currentWeatherEl.appendChild(humidity);
    
    //span el for wind speed
    var windSpeed = document.createElement('span');
    windSpeed.textContent = "Wind Speed: " + weather.wind.speed + "m/s";
    windSpeed.classList = "list-item";
    currentWeatherEl.appendChild(windSpeed);

    //get UV data with lat and lon
    var lat = weather.coord.lat;
    var lon = weather.coord.lon;
    getUVIndex(lat,lon);
};

//fetch UV index
function getUVIndex(lat,lon) {
    var apiKey = '83bfc16ec7111348deb193634d24e4ad';
    var apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}`;
    
    fetch(apiURL)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            displayUVIndex(data);
            // console.log(data);
        });
    // console.log(lat);
    // console.log(lon);
};

//display UV index
function displayUVIndex(onecall) {
    var uvIndex = document.createElement('div');
    var uvi = onecall.current.uvi;
    uvIndex.textContent = "UV Index: ";
    uvIndex.classList = "list-item";
    
    uviValue = document.createElement('span');
    uviValue.textContent = uvi;
    // console.log(onecall.current.uvi);
    
    uvIndex.appendChild(uviValue);
    
    currentWeatherEl.appendChild(uvIndex);
    
    //color change based on UV index
    if (uvi <=2) {
        // console.log('low');
        uviValue.classList = "low";
    } else if (uvi >2 && uvi <=5) {
        // console.log('medium');
        uviValue.classList = "medium";
    } else if (uvi >5 && uvi <=7) {
        // console.log('high');
        uviValue.classList = "high";
    } else if (uvi >7) {
        // console.log('very high');
        uviValue.classList = "very-high";
    }
};

//fetch future conditions
function get5Day(city) {
    var apiKey = '83bfc16ec7111348deb193634d24e4ad';
    var apiURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;
    
    fetch(apiURL)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            display5Day(data);
            // console.log(data);
        });
};

//display future conditions
function display5Day(forecast) {
    //empty forecast container
    forecastDivEl.textContent = "";
    forecastTitle.textContent = "5-Day Forecast:";

    //loop over 5 days of forecast data
    var forecast = forecast.list;
    // console.log(forecast);
    for(var i = 5; i < forecast.length; i=i+8) {
        var forecastDay = forecast[i];

        //create div with classList bootstrap card
        var forecastEl = document.createElement('div');
        forecastEl.classList = "bg-primary text-light m-2 card";

        //date element
        var forecastDate = document.createElement('h3');
        forecastDate.classList = "card-header";
        //get unix timestamp dt and format it
        forecastDate.textContent = moment.unix(forecastDay.dt).format("DD/MM/YYYY");
        forecastEl.appendChild(forecastDate);

        //weather icon
        var weatherIcon = document.createElement('img');
        weatherIcon.setAttribute('src', `https://openweathermap.org/img/wn/${forecastDay.weather[0].icon}.png`);
        weatherIcon.classList = "card-body text-center";
        forecastEl.appendChild(weatherIcon);

        //temperature span
        var tempForecast = document.createElement('span');
        tempForecast.classList = "card-body text center";
        tempForecast.textContent = "Temp: " + forecastDay.main.temp + " °C";
        forecastEl.appendChild(tempForecast);
        
        //wind span
        var windForecast = document.createElement('span');
        windForecast.classList = "card-body text center";
        windForecast.textContent = "Wind: " + forecastDay.wind.speed + " m/s";
        forecastEl.appendChild(windForecast);
        
        //humidity span
        var humidityForecast = document.createElement('span');
        humidityForecast.classList = "card-body text center";
        humidityForecast.textContent = "Humidity: " + forecastDay.main.humidity + "%";
        forecastEl.appendChild(humidityForecast);

        //append forecastEl to page
        forecastDivEl.appendChild(forecastEl);
    }
};

//Listen for search click
form.addEventListener('submit', function (event) {
    event.preventDefault(); 
    var city = document.querySelector('#city').value;
    getCityWeather(city);
    get5Day(city);
});



