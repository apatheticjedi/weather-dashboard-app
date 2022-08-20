/* PSEUDOCODE:
1. When city name is entered and submitted with "search" button, city's current weather populates "current-weather" div:
- city name, current date, weather icon
- current temp
- wind
- current humidity
- UV index 
2. City information is saved to LocalStorage
3. Then daily forecasts for 5 days populate 5-day row:
- date
- weather icon
- temp
- wind
- humidity
5. Searched cities in LocalStorage populate buttons in "search-history" div.
6. Click buttons in "search-history" to display weather conditions for those cities
 */

// get durrent and 5 future dates
const currentDay = moment().format('MM/D/YYYY');
const dayOne = moment().add(1, 'days').format('MM/D/YYYY');
const dayTwo = moment().add(2, 'days').format('MM/D/YYYY');
const dayThree = moment().add(3, 'days').format('MM/D/YYYY');
const dayFour = moment().add(4, 'days').format('MM/D/YYYY');
const dayFive = moment().add(5, 'days').format('MM/D/YYYY');

var citySearchEl = document.querySelector("#search");
var cityNameEl = document.querySelector("#city-name");
var currentWeatherEl = document.querySelector("#current-weather");

var formSubmitHandler = function(event) {
    event.preventDefault();
    console.log(event);
}

var getWeatherNow = function(id) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?id=${id}&units=imperial&appid=b703055832e00b15d0222758c80b06ce`).then(function(response) {
        response.json().then(function(data){
            console.log(data);
            // currentWeatherEl.textContent = "";
            var name = data.name
            var temp = data.main.temp;
            var wind = data.wind.speed;
            var humidity = data.main.humidity;

            console.log(name, temp, wind, humidity);
        })
    })
};

var getForecast = function(id) {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?id=${id}&exclude=hourly&units=imperial&appid=b703055832e00b15d0222758c80b06ce`).then(function(response) {
        response.json().then(function(data){
            console.log(data);
        })
    })
};

getForecast("5746545");
getWeatherNow("5746545");
citySearchEl.addEventListener("submit", formSubmitHandler);