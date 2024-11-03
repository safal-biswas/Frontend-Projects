const cityName = document.getElementById("cityName");
const apiKey = "3932de5c5b21890972e39aede4f5ad0f";

async function fetchData() {
    try {
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName.value.toLowerCase()}&appid=${apiKey}&units=metric`;
        const response = await fetch(apiUrl);

        const weather = document.querySelector(".weather");
        const error = document.querySelector(".error");

        if (!response.ok) {
            error.style.display = "block";
            weather.style.display = "none";

            throw new Error("Invalid city name");
        } else {
            const value = await response.json();

            error.style.display = "none";
            weather.style.display = "block";

            getWeatherDetail(value);
        }
    } catch (error) {
        console.error(error);
    }
}

function getWeatherDetail(value) {
    const weatherIcon = document.querySelector(".weather-icon");
    const temp = document.querySelector(".temp");
    const city = document.querySelector(".city");
    const weatherType = document.querySelector(".weather-type");
    const humidity = document.querySelector(".humidity");
    const wind = document.querySelector(".wind");

    weatherIcon.src = `./images/${value.weather[0].main.toLowerCase()}.png`;
    weatherType.innerHTML = `(${value.weather[0].main})`;
    city.innerHTML = value.name;
    temp.innerHTML = Math.round(value.main.temp) + "℃";
    humidity.innerHTML = value.main.humidity + "%";
    wind.innerHTML = value.wind.speed + " km/h";
}

function checkEnter(event) {
    if (event.key == "Enter") {
        fetchData();
    }
}
