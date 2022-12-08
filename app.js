import { weatherApp } from "./scripts/weather_mod";
import imageObj from "./images/images.json" assert { type: "json" };
import { getImage } from "./scripts/helper_function";

// Intasiating app
const app = new weatherApp();

// OVER ALL WORKFLOW OF APP
async function get_weather_Report(placeName = "Samastipur") {
  app.location = placeName;

  if (navigator.onLine) {
    app
      .makeCall()
      .then((data) => {
        parseData(data);
      })
      .catch((err) => alert("Place not found, please try with a valid name!"));
  } else {
    alert(
      "It seems you're offline right now, So please check your internet connection and Try Again !"
    );
  }
}

// THIS FUNCTION PARSE DATA TO DOM
function parseData(cleanData) {
  const { today, future } = cleanData;
  for (const key in today) {
    const tempElement = document.querySelectorAll(`.value .${key}`);
    if (tempElement.length) {
      tempElement.forEach((element) => {
        element.innerText = today[key] || 0;
      });
    }
  }

  const forecastContainor = document.querySelector(".horizental-info");

  future.forEach((day) => {
    let img = "";
    if (day.id.includes("03") || day.id.includes("04")) {
      img = "0304";
    } else if (day.id.includes("09")) {
      img = "09";
    } else if (day.id.includes("13")) {
      img = "13";
    } else {
      img = day.id;
    }

    const htmlContent = `
    <div class="upcoming-day">
      <img src="./images/icons/${img}.png" alt="" class="icon">
      <h4>
        <span class="temp">${day.temp}</span>
        <span class="suffix">°C</span>
      </h4>
      <div class="status">
        <p class="weather-condition">${day.weatherStatus}</p>
        <p class="forecast">
          <span class="date">${day.time}</span>
          <span class="time">${day.date}</span>
        </p>
      </div>
    </div>
    `;

    forecastContainor.innerHTML += htmlContent;
  });

  const div = document.querySelector("div .background");
  div.style.backgroundImage = "";

  let image = getImage(imageObj, today.status, today.season);
  let imagePath = `url(./images/${image})`;

  div.style.backgroundImage = imagePath;
}

// ALL FUNCTION RUN WHEN WINDOW LOADS
window.addEventListener("load", () => {
  const formElement = document.querySelector("form");
  const input = formElement.querySelector("input");

  // Intasiating state of app for 1st opening
  input.value = "Samastipur";
  let place = input.value;
  get_weather_Report(place);
  formElement.addEventListener("submit", (event) => {
    event.preventDefault();
    let place = input.value;

    if (place) {
      get_weather_Report(place);
    }
  });
});
