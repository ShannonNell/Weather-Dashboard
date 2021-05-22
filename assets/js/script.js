//Variables
var cityDivEl = document.querySelector('#cityCurrentWeather');
var citySearchInputEl = document.querySelector('#searched-city');
var currentWeatherEl = document.querySelector('#current-weather');

//fetch city weather from API 
function getCityWeather(city) {
    var apiKey = '83bfc16ec7111348deb193634d24e4ad';
    var apiURL = `http://api.openweathermap.org/data/2.5/weather?q=London&units=metric&appid=${apiKey}`
    
    fetch(apiURL)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            // console.log(data);
            displayWeather(data, city);
        });
};

//weather = data from above
function displayWeather(weather, city) {
    //clear any old contentl
    citySearchInputEl.textContent = "City value to come"; //city.value;
    //date element
    var currentDay = document.createElement('span');
    currentDay.textContent = " (" + moment().format("DD MMM, YYYY") + ")";
    citySearchInputEl.appendChild(currentDay);

    //image el for weather conditions
    // var weatherImg = document.createElement("img");
    // weatherImg.setAttribute("src", );
    // citySearchInputEl.appendChild(weatherImg);

    //span el for temp data
    var temperature = document.createElement('span');
    temperature.textContent = "Temperature: " + weather.main.temp + " °C";
    temperature.classList = "list-group-item"
    currentWeatherEl.appendChild(temperature);
    
    //span el for humidity
    var humidity = document.createElement('span');
    humidity.textContent = "Humidity: " + weather.main.humidity + "%";
    humidity.classList = "list-group-item"
    currentWeatherEl.appendChild(humidity);
    
    //span el for wind speed
    var windSpeed = document.createElement('span');
    windSpeed.textContent = "Wind Speed: " + weather.wind.speed + " KM/H";
    windSpeed.classList = "list-group-item"
    currentWeatherEl.appendChild(windSpeed);


}

getCityWeather(city);


//fetch UV index


//fetch future conditions



