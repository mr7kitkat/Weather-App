import { weatherApp } from "./scripts/weather_mod";

// Intasiating app
const app = new weatherApp("samastipur");

// OVER ALL WORKFLOW OF APP
async function get_weather_Report(placeName = "samastipur") {
  app.location = placeName;
  app
    .makeCall()
    .then((rawData) => {
      if (rawData.today.cod == 404) {
        throw new Error(rawData.current.message);
      }
      console.log(rawData);
      parseData(rawData);
    })
    .catch((err) => ErrorHandler(err));
}
// THIS FUNCTION HANDLES ERROR
function ErrorHandler(err) {
  if (err.message) {
    alert("Please enter correct city name and TRY AGAIN!");
  } else {
    alert("Something is not right, contact to developer");
  }
}

// THIS FUNCTION PARSE DATA TO DOM
function parseData(cleanData) {
  const { today, future } = cleanData;
  for (const key in today) {
    const tempElement = document.querySelectorAll(`.value.${key}`);
    if (tempElement.length) {
      tempElement.forEach((element) => {
        element.innerText = today[key];
      });
    }
  }

  const forecastContainor = document.querySelector(".horizental-info");

  future.forEach((day) => {
    const htmlContent = `
    <div class="upcoming-day">
      <span class="icon"></span>
      <h4>${day.temp}</h4>
      <div class="status">
        <p class="weather-condition">${day.weatherStatus}</p>
        <p class="forecast date">${day.dateInText}</p>
        <p class="forecast time">${day.timeInText}</p>
      </div>
    </div>
    `;

    forecastContainor.innerHTML += htmlContent;
  });
}

// ALL FUNCTION RUN WHEN WINDOW LOADS
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
