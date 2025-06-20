const input_box = document.querySelector(".input-box");
const search_btn = document.querySelector("#search-btn");
const weather_img = document.querySelector(".weather-img");
const temp = document.querySelector(".temp");
const description = document.querySelector(".description");
const humidity = document.querySelector("#humidity");
const wind_speed = document.querySelector("#wind-speed");
const location_not_found = document.querySelector(".location-not-found");
const weather_body = document.querySelector(".weather-body");


async function checkWeather(city) {
    const api_key = "2cbc0de8b87b2fdd2fdedcba551091c8";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;

    const weather_data = await fetch(`${url}`).then(responce => responce.json());

    // for error handling
    if (weather_data.cod === `404`) {
           location_not_found.style.display = "flex";
           weather_body.style.display = "none";
           console.log("Error");
           return;
    }
    weather_body.style.display = "flex";
    location_not_found.style.display = "none";

    

    temp.innerHTML = `${Math.round(weather_data.main.temp - 273.15)}<sup>°C</sup>`;
    description.innerHTML = `${weather_data.weather[0].description}`;
    humidity.innerHTML = `${weather_data.main.humidity}%`;
    wind_speed.innerHTML = `${Math.round(weather_data.wind.speed)} km/h`;



    switch (weather_data.weather[0].main) {
        case `Clouds`:
            weather_img.src = "cloud.png";
            break;
        case `Clear`:
            weather_img.src = "clear.png";
            break;
        case `Rain`:
            weather_img.src = "rain.png";
            break;
        case `Mist`:
            weather_img.src = "mist.png";
            break;
        case `Snow`:
            weather_img.src = "snow.png";
            break;

    }

    console.log(weather_data);

}

search_btn.addEventListener("click", () => {
    checkWeather(input_box.value);
})