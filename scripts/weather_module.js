export class weatherApp {
  constructor() {
    this.apiKey = `5778ebef63827aa7fd5a136d866fd37d`;
    this._location = `Samastipur`;
  }

  get location() {
    return this._location;
  }

  set location(newLocation) {
    this._location = newLocation;
  }

  async _makeCurrentCall() {
    const requestURL = `https://api.openweathermap.org/data/2.5/weather?q=${this.location}&appid=${this.apiKey}`;
    return await fetch(requestURL).then((res) => res.json());
  }

  async _makeForecastCall() {
    const requestURL = `https://api.openweathermap.org/data/2.5/forecast?q=${this.location}&appid=${this.apiKey}`;
    return await fetch(requestURL).then((res) => res.json());
  }

  async makeCall() {
    try {
      const current = await this._makeCurrentCall();
      const forecast = await this._makeForecastCall();

      return { current, forecast };
    } catch (e) {
      return { error: e.message };
    }
  }
}
