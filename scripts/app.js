class weatherApp {
  constructor() {
    // this.fromElement = fromElement;
    this.apiKey = `5778ebef63827aa7fd5a136d866fd37d`;
    this.location = `Samastipur`;
  }

  async makeCurrentCall() {
    const requestURL = `https://api.openweathermap.org/data/2.5/weather?q=${this.location}&appid=${this.apiKey}`;
    const data = await fetch(requestURL, {
      method: "POST",
    }).then((responce) => responce.json());

    return data;
  }

  async makeForecastCall() {
    const requestURL = `https://api.openweathermap.org/daa/2.5/orecast?q=${this.location}&appid=${this.apiKey}`;
    const data = await fetch(requestURL, {
      method: "POST",
    }).then((responce) => responce.json());

    return data;
  }

  domRender() {}
  imageModifier() {}
  handleErrors(error) {
    console.log(error);
  }
}

const app = new weatherApp();
