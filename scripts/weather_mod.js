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
      return { current, forecast };
    } catch (err) {
      console.log(err.message);
    }
  }
}
