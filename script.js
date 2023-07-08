const API_KEY = 'd075f0f811e44288b29160159230507';
const FORECAST_DAYS = 7;

const locationInput = document.getElementById('locationInput');
const searchButton = document.getElementById('searchButton');
const currentWeatherDiv = document.getElementById('currentWeather');
const forecastChartCanvas = document.getElementById('forecastChart');
const forecastDiv = document.getElementById('forecast');
const forecastHeading=document.getElementById('forecastheading')

searchButton.addEventListener('click', () => {
  const location = locationInput.value;
  fetchWeatherForecast(location);
});



function fetchWeatherForecast(location) {
  forecastDiv.innerHTML = ''; // Clear previous forecast

  fetch(`https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${location}&days=${FORECAST_DAYS}`)
    .then(response => response.json())
    .then(data => {
      const currentWeather = data.current;
      const currentTempC = currentWeather.temp_c;
      const currentWindKph = currentWeather.wind_kph;
      const currentHumidity = currentWeather.humidity;
      const currentWeatherDesc = currentWeather.condition.text;
      
      const weatherDiv=document.createElement('div')
      weatherDiv.classList.add('weatherDiv')
      currentWeatherDiv.appendChild(weatherDiv)

      weatherDiv.innerHTML = `
        <h2>Current Weather</h2>
        <p>Temperature: ${currentTempC}°C</p>
        <p>Wind Speed: ${currentWindKph} km/h</p>
        <p>Humidity: ${currentHumidity}%</p>
        <p>Weather: ${currentWeatherDesc}</p>
      `;

      const forecastLabels = [];
      const forecastTemps = [];
      const forecastWindSpeeds = [];
      const forecastHumidities = [];

      
      
     

      for (let i = 0; i < FORECAST_DAYS; i++) {
        const forecast = data.forecast.forecastday[i];
        const date = forecast.date;
        const tempC = forecast.day.avgtemp_c;
        const windKph = forecast.day.maxwind_kph;
        const humidity = forecast.day.avghumidity;

        forecastLabels.push(date);
        forecastTemps.push(tempC);
        forecastWindSpeeds.push(windKph);
        forecastHumidities.push(humidity);

        
        const forecastItem = document.createElement('div');
        forecastItem.classList.add('forecast-item');
        
        forecastItem.innerHTML = `
          <h2>${date}</h2>
          <p>Temperature: ${tempC}°C</p>
          <p>Wind Speed: ${windKph} km/h</p>
          <p>Humidity: ${humidity}%</p>
        `;
        
        forecastDiv.appendChild(forecastItem);
        
      }

     
    })
    .catch(error => {
      console.error('Error:', error);
    });
}



locationInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
      e.preventDefault();
      searchButton.click();
  }
})


const inputElement = document.getElementById('locationInput');

function clearForecastAndResults() {
  forecastDiv.innerHTML = ''; // Clear forecast chart
  currentWeatherDiv.innerHTML = ''; // Clear weather results
}

inputElement.addEventListener('input', () => {
  clearForecastAndResults();
});

