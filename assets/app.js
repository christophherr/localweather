/* global axios */

var outputTemp = document.getElementById('weather-temperature'),
    outputWeather = document.getElementById('weather'),
    outputWeatherCondition = document.getElementById('weather-condition'),
    outputLocation = document.getElementById('location'),
    outputUnit = document.getElementById('unit'),
    outputOpposite = document.getElementById('opposite'),
    outputSymbol = document.getElementById('symbol'),
    changeUnit = document.getElementById('change-unit'),
    changeUnitClass = document.getElementsByClassName('change-unit'),
    target,
    unit,
    apiUrl =
        'https://api.apixu.com/v1/current.json?key=' +
        ' Add Your Own API Key here ' +
        '&q=',
    unitTemp = '',
    tempUnit = '',
    getUserLocation,
    getWeather,
    whatsTheWeather;

getUserLocation = function(unit) {
    axios.get('https://ipinfo.io').then(function(location) {
        var loc = location.data.ip;
        getWeather(unit, loc);

        outputLocation.innerHTML = location.data.city;
    }, 'jsonp');
};
getUserLocation('metric');

getWeather = function(unit, loc) {
    whatsTheWeather = apiUrl + loc;

    axios.get(whatsTheWeather).then(function(weather) {
        if (unit !== 'metric') {
            unitTemp = 'F';
            tempUnit = weather.data.current.feelslike_f;
        } else {
            unitTemp = '°C';
            tempUnit = weather.data.current.feelslike_c;
        }

        outputTemp.innerHTML = tempUnit + ' ' + unitTemp;
        outputWeather.setAttribute('src', weather.data.current.condition.icon);
        outputWeatherCondition.innerHTML = weather.data.current.condition.text;
    });
};

changeUnit.addEventListener('click', function(event) {
    event.preventDefault();

    target = event.target;

    changeUnitClass = [...changeUnitClass];
    changeUnitClass.forEach(function(item) {
        item.classList.remove('active');
    });

    target.classList.add('active');

    unit = target.dataset.unit;

    if (unit !== 'metric') {
        outputUnit.innerHTML = 'imperial system (in Fahrenheit)';
        outputOpposite.innerHTML = 'metric system (Celsius)';
        outputSymbol.innerHTML = '°C';
    } else {
        outputUnit.innerHTML = 'metric system (in Celsius)';
        outputOpposite.innerHTML = 'imperial system (Fahrenheit)';
        outputSymbol.innerHTML = '°F';
    }

    getUserLocation(unit);
});
