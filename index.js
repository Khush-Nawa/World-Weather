// API key and URL for weather data
const apiKey = "fe061b4a5550e92489ff98aa1b437bbf";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

// DOM elements
const SearchBox = document.querySelector(".search input");
const SearchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

// Function to check weather for a given city
async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    // Check if the response is a 404 error
    if (response.status === 404) {
        // Display error message and hide weather information
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    } else {
        // Parse the weather data from the response
        let data = await response.json();

        // Update the HTML with the weather information
        document.querySelector(".city").innerHTML = data.name; // Updating City Name
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C"; // Updating Temperature
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%"; // Updating Humidity
        document.querySelector(".wind").innerHTML = data.wind.speed + "km/hr"; // Updating Wind Speed

        // Update the weather icon based on weather conditions
        if (data.weather[0].main === "Clouds") {
            weatherIcon.src = "images/clouds.png";
        } else if (data.weather[0].main === "Clear") {
            weatherIcon.src = "images/clear.png";
        } else if (data.weather[0].main === "Rain") {
            weatherIcon.src = "images/rain.png";
        } else if (data.weather[0].main === "Drizzle") {
            weatherIcon.src = "images/drizzle.png";
        } else if (data.weather[0].main === "Mist") {
            weatherIcon.src = "images/mist.png";
        } else if (data.weather[0].main === "Snow") {
            weatherIcon.src = "images/snow.png";
        }

        // Display weather information and hide error message
        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
    }
}

// Event listener for the search button
SearchBtn.addEventListener("click", () => {
    // Call the checkWeather function with the value from the search input
    checkWeather(SearchBox.value);
});
