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

var citySearchEl = document.querySelector("#submit");
var cityNameEl = document.querySelector("#city-name");
var currentWeatherEl = document.querySelector("#current-weather");

var formSubmitHandler = function (event) {
    event.preventDefault();
    let cityName = document.getElementById('city-name').value.toLowerCase();
    getWeatherNow(cityName);
    // saveName();
}

// set dates on each div
var setDates = function () {
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
var getWeatherNow = function (cityName) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=imperial&appid=b703055832e00b15d0222758c80b06ce`).then(function (response) {
        response.json().then(function (data) {

            var weather = data.weather[0].id;
            var currentIconEl = document.querySelector('#current-icon');

            document.getElementById('current-city').innerHTML = data.name;
            document.getElementById('current-temp').innerHTML = Math.round(data.main.temp);
            document.getElementById('current-wind').innerHTML = data.wind.speed;
            document.getElementById('current-humidity').innerHTML = data.main.humidity;

            // add current weather icon
            if (weather >= 200 && weather <= 232) {
                currentIconEl.setAttribute('src', 'http://openweathermap.org/img/wn/11d@2x.png');
            } else if (weather >= 300 && weather <= 321) {
                currentIconEl.setAttribute('src', 'http://openweathermap.org/img/wn/09d@2x.png');
            } else if (weather >= 500 && weather <= 504) {
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
            getForecast(data.id)

        })
    })
};

// get 5-day forecast
var getForecast = function (id) {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?id=${id}&units=imperial&appid=b703055832e00b15d0222758c80b06ce`).then(response => response.json()).then(data => {
        let index = 1
        for (let i = 0; i <= data.list.length; i+=8) {
            console.log(data.list[i]);
            // document.getElementById(`date${index}`).innerHTML = data.list[i].dt_txt.split(" ")[0];
            var iconEl = document.getElementById(`icon${index}`);
            var weatherId = data.list[i].weather[0].id;

            document.getElementById(`temp${index}`).innerHTML = Math.round(data.list[i].main.temp);
            document.getElementById(`wind${index}`).innerHTML = data.list[i].wind.speed;
            document.getElementById(`humid${index}`).innerHTML = data.list[i].main.humidity;

            // add weather icon for each day
            if (weatherId >= 200 && weatherId <= 232) {
                iconEl.innerHTML = "<img src='http://openweathermap.org/img/wn/11d@2x.png'></img>";
            } else if (weatherId >= 300 && weatherId <= 321) {
                iconEl.innerHTML = "<img src='http://openweathermap.org/img/wn/09d@2x.png'></img>";
            } else if (weatherId >= 500 && weatherId <= 504) {
                iconEl.innerHTML = "<img src='http://openweathermap.org/img/wn/10d@2x.png'></img>";
            } else if (weatherId === 511) {
                iconEl.innerHTML = "<img src='http://openweathermap.org/img/wn/13d@2x.png'></img>";
            } else if (weatherId >= 520 && weatherId <= 531) {
                iconEl.innerHTML = "<img src='http://openweathermap.org/img/wn/09d@2x.png'></img>";
            } else if (weatherId >= 600 && weatherId <= 622) {
                iconEl.innerHTML = "<img src='http://openweathermap.org/img/wn/13d@2x.png'></img>";
            } else if (weatherId >= 700 && weatherId <= 781) {
                iconEl.innerHTML = "<img src='http://openweathermap.org/img/wn/50d@2x.png'></img>";
            } else if (weatherId === 800) {
                iconEl.innerHTML = "<img src='http://openweathermap.org/img/wn/01d@2x.png'></img>";
            } else {
                iconEl.innerHTML = "<img src='http://openweathermap.org/img/wn/02d@2x.png'></img>";
            }
            index++;
        }
    })
};

setDates();

citySearchEl.addEventListener("click", formSubmitHandler);