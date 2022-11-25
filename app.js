import { weatherApp } from "./scripts/weather_mod";

// Intasiating app
const app = new weatherApp("samastipur");
async function get_weather_Report(placeName = "samastipur") {
  app.location = placeName;
  app
    .makeCall()
    .then((rawData) => {
      if (rawData.current.cod == 404) {
        throw new Error(rawData.current.message);
      }
      const cleandata = cleanData(rawData);
      parseData(cleandata);
    })
    .catch((err) => ErrorHandler(err));
}

function cleanData(data) {
  const current = {
    longitude: data.current.coord.lon,
    latitude: data.current.coord.lat,
    weatherCondition: data.current.weather[0].description,
    temp: data.current.main.temp,
    feels_like: data.current.main.feels_like,
    temp_min: data.current.main.temp_min,
    temp_max: data.current.main.temp_max,
    pressure: data.current.main.pressure,
    humidity: data.current.main.humidity,
    sea_level: data.current.main.sea_level,
    grnd_level: data.current.main.grnd_level,
    visibility: data.current.visibility,
    windSpeed: data.current.wind.speed,
    timezone: data.current.timezone,
    cityName: data.current.name,
    country: data.current.sys.country,
    sunrise: data.current.sys.sunrise,
    sunset: data.current.sys.sunset,
  };
  return current;
}

function parseData(cleanData) {
  for (const key in cleanData) {
    const tempElement = document.querySelectorAll(`.value.${key}`);
    if (tempElement.length) {
      tempElement.forEach((element) => {
        element.innerText = cleanData[key];
      });
    }
  }
}

function ErrorHandler(err) {
  if (err.message) {
    alert("Please enter correct city name and TRY AGAIN!");
  } else {
    alert("Something is not right, contact to developer");
  }
}

window.addEventListener("load", () => {
  get_weather_Report("samastipur");

  const formElement = document.querySelector("form");

  formElement.addEventListener("submit", (event) => {
    event.preventDefault();

    const input = formElement.querySelector("input").value.trim();
    if (input) {
      get_weather_Report(input);
    }
  });
});
