/* global axios */
// @ts-check @ignore axios

const apiUrl =
  'https://api.apixu.com/v1/current.json?key=9a5fe910c4104e7eb2d11925172205&q=';
const outputTemp = document.getElementById('weather-temperature');
const outputWeather = document.getElementById('weather');
const outputWeatherCondition = document.getElementById('weather-condition');
const outputLocation = document.getElementById('location');
const outputUnit = document.getElementById('unit');
const outputOpposite = document.getElementById('opposite');
const outputSymbol = document.getElementById('symbol');
const changeUnit = document.getElementById('change-unit');
let changeUnitClass = document.getElementsByClassName('change-unit');
let loc;
let target;
let unit;
let unitTemp = '';
let tempUnit = '';
let fahrenheitTemp;
let celsiusTemp;
let getWeather;
let changeTemperatureUnit;
let whatsTheWeather;

const getUserLocation = (unit) => {
  axios.get('https://ipinfo.io').then((location) => {
    loc = location.data.ip;
    getWeather(unit, loc);

    outputLocation.innerHTML = location.data.city;
  }, 'jsonp');
};
getUserLocation('metric');

getWeather = (unit, loc) => {
  whatsTheWeather = apiUrl + loc;

  axios.get(whatsTheWeather).then((weather) => {
    if (unit !== 'metric') {
      unitTemp = '°F';
      tempUnit = weather.data.current.feelslike_f;
    } else {
      unitTemp = '°C';
      tempUnit = weather.data.current.feelslike_c;
    }
    outputTemp.innerHTML = `${tempUnit} ${unitTemp}`;
    outputWeather.setAttribute('src', weather.data.current.condition.icon);
    outputWeatherCondition.innerHTML = weather.data.current.condition.text;
    changeTemperatureUnit(weather);
  });
};

changeTemperatureUnit = (weather) => {
  fahrenheitTemp = weather.data.current.feelslike_f;
  celsiusTemp = weather.data.current.feelslike_c;

  changeUnit.addEventListener('click', (event) => {
    event.preventDefault();

    target = event.target;

    changeUnitClass = [...changeUnitClass];
    changeUnitClass.forEach((item) => {
      item.classList.remove('active');
    });

    target.classList.add('active');

    unit = target.dataset.unit;

    if (unit !== 'metric') {
      outputUnit.innerHTML = 'imperial system (in Fahrenheit)';
      outputOpposite.innerHTML = 'metric system (Celsius)';
      outputSymbol.innerHTML = '°C';
      outputTemp.innerHTML = `${fahrenheitTemp} °F`;
    } else {
      outputUnit.innerHTML = 'metric system (in Celsius)';
      outputOpposite.innerHTML = 'imperial system (Fahrenheit)';
      outputSymbol.innerHTML = '°F';
      outputTemp.innerHTML = `${celsiusTemp} °C`;
    }
  });
};
