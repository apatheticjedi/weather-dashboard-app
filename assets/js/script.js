/* PSEUDOCODE:
1. When city name is entered and submitted with "search" button, city's current weather populates "current-weather" div:
- city name, current date, temp icon
- current temp
- wind
- current humidity
- UV index 
2. City information is saved to LocalStorage
3. Then daily forecasts for 5 days populate 5-day row:
- date
- temp icon
- temp
- wind
- humidity
5. Searched cities in LocalStorage populate buttons in "search-history" div.
6. Click buttons in "search-history" to display weather conditions for those cities
 */


var getWeather = function() {
    fetch("https://api.openweathermap.org/data/2.5/onecall?lat=45.5152&lon=122.6784&appid=b703055832e00b15d0222758c80b06ce").then(function(response) {
        response.json().then(function(data){
            console.log(data);
        })
    })
};

getWeather();