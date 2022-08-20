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

// get current and 5 future dates
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

// set dates on each div
var setDates = function() {
    var dateNowEl = document.querySelector('#date-now');
    var dateOneEl = document.querySelector('#date1');
    var dateTwoEl = document.querySelector('#date2');
    var dateThreeEl = document.querySelector('#date3');
    var dateFourEl = document.querySelector('#date4');
    var dateFiveEl = document.querySelector('#date5');

    dateNowEl.textContent = currentDay;
    dateOneEl.textContent = dayOne;
    dateTwoEl.textContent = dayTwo;
    dateThreeEl.textContent = dayThree;
    dateFourEl.textContent = dayFour;
    dateFiveEl.textContent = dayFive;
}

// get current weather
var getWeatherNow = function(id) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?id=${id}&units=imperial&appid=b703055832e00b15d0222758c80b06ce`).then(function(response) {
        response.json().then(function(data){
            var name = data.name
            var temp = Math.round(data.main.temp);
            var wind = data.wind.speed;
            var humidity = data.main.humidity;
            var weather = data.weather[0].id;

            var currentCityEl = document.querySelector('#current-city');
            var currentTempEl = document.querySelector('#current-temp');
            var currentWindEl = document.querySelector('#current-wind');
            var currentHumidEl = document.querySelector('#current-humidity');
            var currentIconEl = document.querySelector('#current-icon');

            currentCityEl.textContent = name;
            currentTempEl.textContent = temp;
            currentWindEl.textContent = wind;
            currentHumidEl.textContent = humidity;

            // add current weather icon
            if (weather >= 200 && weather < 300) {
                currentIconEl.setAttribute('src', 'http://openweathermap.org/img/wn/11d@2x.png');
            } else if (weather >= 00 && weather < 400){
                currentIconEl.setAttribute('src', 'http://openweathermap.org/img/wn/09d@2x.png');
            } else if (weather >= 500 && weather <= 504){
                currentIconEl.setAttribute('src', 'http://openweathermap.org/img/wn/10d@2x.png');
            } else if (weather === 511) {
                currentIconEl.setAttribute('src', 'http://openweathermap.org/img/wn/13d@2x.png');
            } else if (weather >= 520 && weather <= 531) {
                currentIconEl.setAttribute('src', 'http://openweathermap.org/img/wn/09d@2x.png');
            } else if (weather >= 600 && weather <= 622) {
                currentIconEl.setAttribute('src', 'http://openweathermap.org/img/wn/13d@2x.png');
            } else if (weather >= 700 && weather <= 781) {
                currentIconEl.setAttribute('src', 'http://openweathermap.org/img/wn/50d@2x.png');
            } else if (weather === 800) {
                currentIconEl.setAttribute('src', 'http://openweathermap.org/img/wn/01d@2x.png'); 
            } else {
                currentIconEl.setAttribute('src', 'http://openweathermap.org/img/wn/02d@2x.png');
            }
        })
    })
};

// get 5-day forecast
var getForecast = function(id) {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?id=${id}&units=imperial&appid=b703055832e00b15d0222758c80b06ce`).then(function(response) {
        response.json().then(function(data){
            console.log(data);


        })
    })
};

citySearchEl.addEventListener("submit", formSubmitHandler);

getForecast("5746545");
getWeatherNow("5746545");
setDates();