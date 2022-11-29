export class weatherApp {
  constructor(locationInput) {
    this.apiKey = `5778ebef63827aa7fd5a136d866fd37d`;
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
    return data;
  }

  async makeForecastCall() {
    const requestURL = `https://api.openweathermap.org/data/2.5/forecast?q=${this.location}&appid=${this.apiKey}`;
    const data = await fetch(requestURL, { mode: "cors" }).then((res) =>
      res.json()
    );
    return data;
  }

  async makeCall() {
    try {
      const current = await this.makeCurrentCall();
      const forecast = await this.makeForecastCall();
      const data = await this.cleanData({ current, forecast });
      return data;
    } catch (err) {
      console.log(err.message);
    }
  }

  async cleanData({ current, forecast }) {
    function kelvinToCelcius(kelvinTemp) {
      return Math.round(kelvinTemp - 273.15) + " °C";
    }

    function formatDate(timestamp) {
      const dateObj = new Date(timestamp);
      return dateObj.getHours() + ":" + dateObj.getMinutes();
    }

    const today = {
      longitude: current.coord.lon,
      latitude: current.coord.lat,
      weatherCondition: current.weather[0].id,
      temp: kelvinToCelcius(current.main.temp),
      feels_like: kelvinToCelcius(current.main.feels_like),
      temp_min: kelvinToCelcius(current.main.temp_min),
      temp_max: kelvinToCelcius(current.main.temp_max),
      pressure: current.main.pressure + " hPa",
      humidity: current.main.humidity + "   %",
      sea_level: current.main.sea_level + " hPa",
      grnd_level: current.main.grnd_level + " hPa",
      visibility: Math.round(current.visibility / 100) + "  %",
      windSpeed: Math.round(current.wind.speed * 3.6) + " km/hr",
      cloudiness: current.clouds.all + "  %",
      cityName: current.name,
      country: current.sys.country,
      sunrise: formatDate(current.sys.sunrise),
      sunset: formatDate(current.sys.sunset),
    };

    const future = [];
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    forecast.list.forEach((entry) => {
      const dateObj = new Date(entry.dt * 1000);
      const theDate =
        dateObj.getUTCDate() + "-" + monthNames[dateObj.getUTCMonth() - 1];
      const time = dateObj.getHours() + ":" + dateObj.getMinutes();
      future.push({
        date: theDate,
        temp: kelvinToCelcius(entry.main.temp),
        weatherStatus: entry.weather[0].id,
        timeInText: time,
      });
    });

    return { today, future };
  }
}
