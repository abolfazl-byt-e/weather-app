"use strict";

function Weather(cityName , description , temp , temp_min , temp_max , humidity ,  iconCode) {
    this.cityName = cityName;
    this.description = description;
    this.temp = temp;
    this.temp_min = temp_min;
    this.temp_max = temp_max;
    this.humidity = humidity;
    this.iconCode = iconCode;
}