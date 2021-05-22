//Variables
var cityDivEl = document.querySelector('#cityDiv');
var citySearchInputEl = document.querySelector('#searched-city');

//fetch city weather from API 
function getCity(city) {
    var apiKey = '83bfc16ec7111348deb193634d24e4ad';
    var apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
    
    fetch(apiURL)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            // console.log(data);
            cityWeather(data, city);
        });
};

function cityWeather(weather, searchCity) {
    //clear any old content
    //date element
    var currentDay = document.createElement('span');
    currentDay.textContent = " (" + moment().format("DD MMM, YYYY") + ")";
    citySearchInputEl.appendChild(currentDay);
    //image el for weather conditions
    //span el for temp data
    //span el for humidity
    //span el for wind speed

    //append to city Div
}

cityWeather();


//fetch UV index


//fetch future conditions



