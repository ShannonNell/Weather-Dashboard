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
            cityWeather(data);
        });
};

function cityWeather(data) {
    //clear any old content
    //date element
    //image el for weather conditions
    //span el for temp data
    //span el for humidity
    //span el for wind speed

    //append to city Div
}



//fetch UV index


//fetch future conditions



