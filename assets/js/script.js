//Variables
// Search vars
var form = document.querySelector('#city-search-form')
//Current Conditions var's
var cityDivEl = document.querySelector('#cityCurrentWeather');
var citySearchInputEl = document.querySelector('#searched-city');
var currentWeatherEl = document.querySelector('#current-weather');

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
    currentDay.textContent = " (" + moment().format("DD MMM, YYYY") + ")";
    citySearchInputEl.appendChild(currentDay);

    // image el for weather conditions
    var weatherImg = document.createElement("img");
    weatherImg.setAttribute("src", `https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`); //can add @2x before png to make bigger
    citySearchInputEl.appendChild(weatherImg);

    //span el for temp data
    var temperature = document.createElement('span');
    temperature.textContent = "Temperature: " + weather.main.temp + " °C";
    temperature.classList = "list-group-item";
    currentWeatherEl.appendChild(temperature);
    
    //span el for humidity
    var humidity = document.createElement('span');
    humidity.textContent = "Humidity: " + weather.main.humidity + "%";
    humidity.classList = "list-group-item";
    currentWeatherEl.appendChild(humidity);
    
    //span el for wind speed
    var windSpeed = document.createElement('span');
    windSpeed.textContent = "Wind Speed: " + weather.wind.speed + "m/s";
    windSpeed.classList = "list-group-item";
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
    uvIndex.textContent = "UV Index: ";
    uvIndex.classList = "list-group-item";

    uviValue = document.createElement('span');
    uviValue.textContent = onecall.current.uvi;
    console.log(onecall.current.uvi);

    uvIndex.appendChild(uviValue);

    currentWeatherEl.appendChild(uvIndex);
}
//fetch future conditions


//Listen for search click
form.addEventListener('submit', function (event) {
    event.preventDefault(); 
    var city = document.querySelector('#city').value;
    getCityWeather(city);
});



