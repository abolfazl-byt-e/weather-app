"use strict";
var searchButton = document.querySelector('button');
var searchCity = document.querySelector('#city');

var loadingText = document.querySelector('#load');
var weatherBox = document.querySelector('#weather');

var weatherCity = document.querySelector('#weatherCity');
var weatherDescription = document.querySelector('#weatherDescription');
var weatherTemperature = document.querySelector('#weatherTemperature');
var temp_min = document.querySelector('#temp_min')
var temp_max = document.querySelector('#temp_max')
var humidity = document.querySelector('#humidity')
// var wIcon = document.querySelector('img').src

searchButton.addEventListener('click', searchWeather);

function searchWeather() {
    loadingText.style.display = 'block';
    weatherBox.style.display = 'none';
    var cityName = searchCity.value;
    if (cityName.trim().length == 0) {
        return alert('Please enter a City Name');
    }
    var http = new XMLHttpRequest();
    var apiKey = '9583532257be6961a4501aefc6f17c10';
    var url = 'http://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&units=metric&appid=' + apiKey;
    var method = 'GET';

    http.open(method, url);
    http.onreadystatechange = function() {
        if (http.readyState == XMLHttpRequest.DONE && http.status === 200) {
            var data = JSON.parse(http.responseText);
            var iconCode = data.weather[0].icon;
            var weatherData = new Weather(data.name, data.weather[0].description , data.main.temp ,data.main.temp_min , data.main.temp_max , data.main.humidity ,  iconCode);
            if (data.weather[0].main == 'Clear') {
                document.querySelector('#weather').style.backgroundColor = 'white';           
            }else if (data.weather[0].main == 'Cloud') {
                document.querySelector('#weather').style.backgroundColor = 'rgb(83, 163, 216)';}

            updateWeather(weatherData);
        } else if (http.readyState === XMLHttpRequest.DONE) {
            alert('Something went wrong!');
        }
    };
    http.send();
}

function updateWeather(weatherData) {
    weatherCity.textContent = weatherData.cityName;
    weatherDescription.textContent = weatherData.description;
    weatherTemperature.textContent = weatherData.temp;
    temp_min.textContent = weatherData.temp_min;
    temp_max.textContent = weatherData.temp_max;
    humidity.textContent = weatherData.humidity;
    document.querySelector('img').src = 'http://openweathermap.org/img/wn/' + weatherData.iconCode +'@2x.png';
    
    
    loadingText.style.display = 'none';
    weatherBox.style.display = 'block';
}