// Selecting form elements
const key  = 'd50a6669007f4df695b75622221504';
const form = document.querySelector('form');
const textInput = document.querySelector('input[type="text"]');
const submitBtn = document.querySelector('input[type="submit"]');
const section = document.querySelector('.sec');

const img = document.querySelector('#daymood');
const locationName = document.querySelector('#name');
const countryName = document.querySelector('#country');
const celcius = document.querySelector('#c');
const fahrenheite = document.querySelector('#f');
const humidityValue = document.querySelector('#h');
const time = document.querySelector('#time');

form.addEventListener('submit',function(e) {
    e.preventDefault();

    if (!textInput.value) {
        alert('Please enter a city name in location search');
        return;
    }

    const req = new XMLHttpRequest();
    req.addEventListener('load', function(){

        const data = JSON.parse(this.responseText);

        if(this.status === 200) {
            const {
                current,
                location
            } = data;

            const {
                feelslike_c,
                feelslike_f,
                humidity,
                last_updated,
            } = current;

            const image = current.condition.icon;
            
            const {
                name,
                country,
            } = location;

            img.setAttribute('src', image);
            locationName.innerText = name;
            countryName.innerText = country;
            celcius.innerText = feelslike_c;
            fahrenheite.innerText = feelslike_f;
            humidityValue.innerText = `${humidity}%`;
            time.innerText = last_updated;
            section.classList.add('display');
        }
        else {
            alert('Something is wrong!!');
        }     
    })

    req.addEventListener('error', function(error){
        alert('Something is wrong!!');
    })

    req.open('GET', `http://api.weatherapi.com/v1/current.json?key=${key}&q=${textInput.value}`)
    req.send();
    
});


textInput.value = '';
// current:
//     cloud: 0
//     condition: {text: 'Sunny', icon: '//cdn.weatherapi.com/weather/64x64/day/113.png', code: 1000}
//     feelslike_c: 49.9
//     feelslike_f: 121.8
//     gust_kph: 33.8
//     gust_mph: 21
//     humidity: 6
//     is_day: 1
//     last_updated: "2022-04-15 16:15"
//     last_updated_epoch: 1650019500
//     precip_in: 0
//     precip_mm: 0
//     pressure_in: 29.43
//     pressure_mb: 997
//     temp_c: 46.1
//     temp_f: 115
//     uv: 11
//     vis_km: 10
//     vis_miles: 6
//     wind_degree: 282
//     wind_dir: "WNW"
//     wind_kph: 29.5
//     wind_mph: 18.3
// [[Prototype]]: Object
// location:
//     country: "India"
//     lat: 25.85
//     localtime: "2022-04-15 16:28"
//     localtime_epoch: 1650020305
//     lon: 85.78
//     name: "Samastipur"
//     region: "Bihar"
//     tz_id: "Asia/Kolkata"