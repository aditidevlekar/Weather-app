document.addEventListener('DOMContentLoaded', () => {
    const apiKey = '77be6ae7123422148ef1377b5c04ba01';
    const weatherInfo = document.getElementById('weatherInfo');
    const locationInput = document.getElementById('location');
    const getWeatherButton = document.getElementById('getWeather');

    async function fetchWeather(location) {
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`);
            const data = await response.json();
            console.log(data); // Log data to check for errors
            
            if (data.cod === 200) {
                displayWeather(data);
            } else {
                weatherInfo.innerHTML = `<p class="error">Error: ${data.message}</p>`;
            }
        } catch (error) {
            weatherInfo.innerHTML = `<p class="error">Network error: ${error.message}</p>`;
        }
    }

    function displayWeather(data) {
        weatherInfo.innerHTML = `
            <h2>${data.name}</h2>
            <p class="temp">${Math.round(data.main.temp)} &deg;C</p>
            <p class="description">${data.weather[0].description}</p>
            <p>Humidity: ${data.main.humidity}%</p>
            <p>Wind Speed: ${data.wind.speed} m/s</p>
        `;
    }

    getWeatherButton.addEventListener('click', () => {
        const location = locationInput.value.trim();
        if (location) {
            fetchWeather(location);
        } else {
            weatherInfo.innerHTML = '<p class="error">Please enter a location.</p>';
        }
    });
});
