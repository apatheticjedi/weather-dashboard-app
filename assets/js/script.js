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

var citySearchEl = document.querySelector("#submit");
let cityNameArr = JSON.parse(localStorage.getItem('cityNames')) || [];

var formSubmitHandler = function (event) {
    event.preventDefault();
    let cityName = document.getElementById('city-name').value.toLowerCase();

    getWeatherNow(cityName);
};

// get current weather
var getWeatherNow = function (e) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${e}&units=imperial&appid=b703055832e00b15d0222758c80b06ce`).then(function (response) {
        response.json().then(function (data) {

            let weather = data.weather[0].id;
            let currentIconEl = document.querySelector('#current-icon');

            document.getElementById('current-city').innerHTML = data.name;
            document.getElementById('date-now').innerHTML = ` (${moment().format('MM/D/YYYY')})`;
            document.getElementById('current-temp').innerHTML = `${Math.round(data.main.temp)}&deg;F`;
            document.getElementById('current-wind').innerHTML = `${data.wind.speed} MPH`;
            document.getElementById('current-humidity').innerHTML = `${data.main.humidity}%`;

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
            } else if (weather >= 803 && weather <= 804) {
                currentIconEl.setAttribute('src', 'http://openweathermap.org/img/wn/03d@2x.png');
            } else {
                currentIconEl.setAttribute('src', 'http://openweathermap.org/img/wn/02d@2x.png');
            }

            getForecast(data.id);
            saveName();
            document.querySelector('#city-name').value = "";
        })
    })
};

// get 5-day forecast
var getForecast = function (id) {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?id=${id}&units=imperial&appid=b703055832e00b15d0222758c80b06ce`).then(response => response.json()).then(data => {
        let index = 1
        for (let i = 0; i < data.list.length; i += 8) {
            let iconEl = document.getElementById(`icon${index}`);
            let weatherId = data.list[i].weather[0].id;

            document.getElementById(`date${index}`).innerHTML = `${moment().add(index, 'days').format('MM/D/YYYY')}:`;
            document.getElementById(`temp${index}`).innerHTML = `${Math.round(data.list[i].main.temp)}&deg;F`;
            document.getElementById(`wind${index}`).innerHTML = `${data.list[i].wind.speed} MPH`;
            document.getElementById(`humid${index}`).innerHTML = `${data.list[i].main.humidity}%`;

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
            } else if (weatherId >= 803 && weatherId <= 804) {
                iconEl.innerHTML = "<img src='http://openweathermap.org/img/wn/03d@2x.png'></img>";
            } else {
                iconEl.innerHTML = "<img src='http://openweathermap.org/img/wn/02d@2x.png'></img>";
            }
            index++;
        }
    })
};

// save city name to local storage and create button
var saveName = function () {
    let cityName = document.getElementById('current-city').innerHTML;

    if (!cityNameArr.includes(cityName)) {
        let history = document.getElementById('search-history');
        let savedBtn = document.createElement('button');

        cityNameArr.push(cityName)
        localStorage.setItem('cityNames', JSON.stringify(cityNameArr));
        savedBtn.textContent = cityName;
        savedBtn.className = "btn btn-secondary btn-block";
        history.appendChild(savedBtn);

        let historyBtns = document.querySelectorAll('#search-history button');
        historyBtns.forEach(btn => {
            btn.addEventListener('click', function () {
                getWeatherNow(btn.textContent);
            })
        })
    }
};

// get city names from local storage and create buttons
var getName = function () {
    let history = document.getElementById('search-history');

    for (let i = 0; i < cityNameArr.length; i++) {
        let savedBtn = document.createElement('button');

        savedBtn.textContent = cityNameArr[i];
        savedBtn.className = "btn btn-secondary btn-block";
        history.appendChild(savedBtn);
    }
    let historyBtns = document.querySelectorAll('#search-history button');
    historyBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            getWeatherNow(btn.textContent);
        })
    })
};

getName();
citySearchEl.addEventListener("click", formSubmitHandler);