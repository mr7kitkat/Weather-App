import apikey from "../apikey.json" assert { type: "json" };
import {
  kelvinToCelcius,
  formatTime,
  formatDate,
  dayStatus,
} from "./helper_function";

export class weatherApp {
  constructor(locationInput) {
    this.apiKey = apikey["key"];
    this._location = locationInput;
  }

  get location() {
    return this._location;
  }

  set location(newname) {
    this._location = newname;
  }

  async makeCurrentCall() {
    const requestURL = `https://api.openweathermap.org/data/2.5/weather?q=${this.location}&appid=${this.apiKey}`;
    const data = await fetch(requestURL, { mode: "cors" }).then((res) =>
      res.json()
    );

    if (data.cod == 404) {
      throw new Error("Not Found");
    }

    return data;
  }

  async makeForecastCall() {
    const requestURL = `https://api.openweathermap.org/data/2.5/forecast?q=${this.location}&appid=${this.apiKey}`;
    const data = await fetch(requestURL, { mode: "cors" }).then((res) =>
      res.json()
    );
    if (data.cod == 404) {
      throw new Error("Not Found");
    }
    return data;
  }

  async makeCall() {
    const rawData = await Promise.all([
      this.makeCurrentCall(),
      this.makeForecastCall(),
    ]);
    const data = await this.cleanData(rawData);
    return data;
  }

  async cleanData([current, forecast]) {
    // get season name
    function getSeason(temp, id, code = 0) {
      if (id.startsWith("01")) {
        if (temp < 25) {
          return "winter";
        } else if (((temp) => 26) && temp < 35) {
          return "spring";
        } else {
          return "summer";
        }
      } else if (id.startsWith("09") || id.startsWith("10")) {
        return "rain";
      } else if (id.startsWith("11")) {
        return "thunderstorm";
      } else if (id.startsWith("13")) {
        return "snow";
      } else if (id.startsWith("50")) {
        if (code == 762 || code == 771) {
          return "volcano";
        } else if (code == 781) {
          return "tornado";
        }
        return "mist";
      } else if (
        id.startsWith("02") ||
        id.startsWith("03") ||
        id.startsWith("04")
      ) {
        return "cloudy";
      }
    }

    // keys -> longitute, latitude, id, temp, feels_like, temp_min, temp_max, pressure,
    // humidity, sea_level, grnd_level,visibility, windspeed, cloiudiness, cityName, country,
    // sunrise, sunset, season,
    const today = {
      longitude: current.coord.lon,
      latitude: current.coord.lat,
      id: current.weather[0].icon,
      temp: kelvinToCelcius(current.main.temp),
      feels_like: kelvinToCelcius(current.main.feels_like),
      temp_min: kelvinToCelcius(current.main.temp_min),
      temp_max: kelvinToCelcius(current.main.temp_max),
      pressure: current.main.pressure,
      humidity: current.main.humidity,
      sea_level: current.main.sea_level,
      grnd_level: current.main.grnd_level,
      visibility: Math.round(current.visibility / 100),
      windSpeed: Math.round(current.wind.speed * 3.6),
      cloudiness: current.clouds.all,
      cityName: current.name,
      country: current.sys.country,
      sunrise: formatTime(current.sys.sunrise * 1000),
      sunset: formatTime(current.sys.sunset * 1000),
      season: getSeason(
        kelvinToCelcius(current.main.temp),
        current.weather[0].icon,
        current.weather[0].id
      ),
      status: dayStatus(current.weather[0].icon),
    };

    const future = [];
    forecast.list.forEach((entry) => {
      const targetDate = Date.parse(entry.dt_txt);
      const theDate = formatDate(targetDate);
      const theTime = formatTime(targetDate);
      // key -> date, temp, weather, season, id, time, weatherStatus
      future.push({
        date: theDate,
        temp: kelvinToCelcius(entry.main.temp),
        weather: entry.weather[0].id,
        season: getSeason(
          kelvinToCelcius(entry.main.temp),
          entry.weather[0].icon,
          entry.weather[0].id
        ),
        id: entry.weather[0].icon,
        time: theTime,
        weatherStatus: entry.weather[0].description,
        status: dayStatus(entry.weather[0].icon),
      });
    });

    return { today, future };
  }
}
