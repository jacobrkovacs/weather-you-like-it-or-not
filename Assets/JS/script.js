let searchBtnEl = $('#search');
let previousSearches = $('#previousSearches');
let forecast = $('#forecast').children();

$(function () {
searchBtnEl.on('click', getWeatherApi)

function getWeatherApi() {
    let cityName = $('#cityName').val()

    if(!cityName){
        alert('Please enter a city name')
        return
    }

    let newListItem = $('<li>')
    let savedSearch = $('<button>')
    savedSearch.addClass('dropdown-item')
    savedSearch.attr('type', 'submit')
    savedSearch[0].innerHTML = cityName
    newListItem.append(savedSearch)
    previousSearches.append(newListItem)

    let getCoordinates =
    'https://api.openweathermap.org/geo/1.0/direct?q=' +
    cityName +
    '&appid=31f06f1bb77ed8f63489dacc79716341'

    fetch(getCoordinates)
        .then(function (response){
            return response.json();
        })
        .then(function (data) {
            let lat = data[0].lat
            let lon = data[0].lon

            let getWeather =
            'https://api.openweathermap.org/data/2.5/forecast/?lat=' +
            lat +
            '&lon=' +
            lon +
            '&units=imperial&appid=31f06f1bb77ed8f63489dacc79716341'
        
            fetch(getWeather)
                .then(function (response){
                    return response.json();
                })
                .then(function(data) {
                    console.log(data)
                    let today = dayjs()
                    let currentDate = $('#currentDate')
                    let currentWeather = $('#currentWeather').children()
                    let iconsource = 'https://openweathermap.org/img/w/' + data.list[0].weather[0].icon + '.png'
                    $('#icon').attr("src", iconsource)
                    
                    currentDate[0].innerHTML = today.format('MMMM D, YYYY')

                    currentWeather[0].innerHTML = "Temperature: " + data.list[0].main.temp + ' \xB0' + 'F';
                    currentWeather[1].innerHTML = "Wind Speed: " + data.list[0].wind.speed + ' MPH';
                    currentWeather[2].innerHTML = "Humidity: " + data.list[0].main.humidity + '%';
                    
                    for(let i = 8; i < data.list.length; i += 8){
                        forecast.each(function(j){
                            forecast.eq(j).find('h2 > button')[j].innerHTML = dayjs.unix(data.list[i].dt).format('MMMM D, YYYY');
                            forecast.eq(j).find('ul > *')[0].innerHTML = "Temperature: " + data.list[i].main.temp + ' \xB0' + 'F';
                            forecast.eq(j).find('ul > *')[1].innerHTML = "Wind Speed: " + data.list[i].wind.speed + ' MPH';
                            forecast.eq(j).find('ul > *')[2].innerHTML = "Humidity: " + data.list[i].main.humidity + '%';
                        })
                    }
                })
        })
}
previousSearches.children('li').on('click', function() {
    console.log("this will run fetch for named city")
    let cityName = this.textContent

    let getCoordinates =
    'https://api.openweathermap.org/geo/1.0/direct?q=' +
    cityName +
    '&appid=31f06f1bb77ed8f63489dacc79716341'

    fetch(getCoordinates)
        .then(function (response){
            return response.json();
        })
        .then(function (data) {
            let lat = data[0].lat
            let lon = data[0].lon

            let getWeather =
            'https://api.openweathermap.org/data/2.5/forecast/?lat=' +
            lat +
            '&lon=' +
            lon +
            '&units=imperial&appid=31f06f1bb77ed8f63489dacc79716341'
        
            fetch(getWeather)
                .then(function (response){
                    return response.json();
                })
                .then(function(data) {
                    console.log(data)
                    let today = dayjs()
                    let currentDate = $('#currentDate')
                    let currentWeather = $('#currentWeather').children()
                    let iconsource = 'https://openweathermap.org/img/w/' + data.list[0].weather[0].icon + '.png'
                    $('#icon').attr("src", iconsource)
                    
                    currentDate[0].innerHTML = today.format('MMMM D, YYYY')

                    currentWeather[0].innerHTML = "Temperature: " + data.list[0].main.temp + ' \xB0' + 'F';
                    currentWeather[1].innerHTML = "Wind Speed: " + data.list[0].wind.speed + ' MPH';
                    currentWeather[2].innerHTML = "Humidity: " + data.list[0].main.humidity + '%';
                    
                    for(let i = 8; i < data.list.length; i += 8){
                        forecast.each(function(j){
                            forecast.eq(j).find('h2 > button')[j].innerHTML = dayjs.unix(data.list[i].dt).format('MMMM D, YYYY');
                            forecast.eq(j).find('ul > *')[0].innerHTML = "Temperature: " + data.list[i].main.temp + ' \xB0' + 'F';
                            forecast.eq(j).find('ul > *')[1].innerHTML = "Wind Speed: " + data.list[i].wind.speed + ' MPH';
                            forecast.eq(j).find('ul > *')[2].innerHTML = "Humidity: " + data.list[i].main.humidity + '%';
                        })
                    }
                })
        })
})

})