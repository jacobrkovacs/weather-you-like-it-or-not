let searchBtnEl = $('#search')

searchBtnEl.on('click', getWeatherApi)

function getWeatherApi() {
    let cityName = $('#cityName').val()

    if(!cityName){
        alert('Please enter a city name')
        return
    }

    let getCoordinates = 'http://api.openweathermap.org/geo/1.0/direct?q=' + cityName + '&appid=31f06f1bb77ed8f63489dacc79716341'

    fetch(getCoordinates)
        .then(function (response){
            return response.json();
        })
        .then(function (data) {
            let lat = data[0].lat
            let lon = data[0].lon

            let getWeather = 'https://api.openweathermap.org/data/2.5/forecast/?lat=' + lat + '&lon=' + lon + '&units=imperial&appid=31f06f1bb77ed8f63489dacc79716341'
        
            fetch(getWeather)
                .then(function (response){
                    return response.json();
                })
                .then(function(data) {
                    for(let i = 0; i < data.list.length; i += 8){
                        console.log(data.list[i].main.temp);
                    }
                })
        })


}
