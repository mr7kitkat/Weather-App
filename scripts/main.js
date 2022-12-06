/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./app.js":
/*!****************!*\
  !*** ./app.js ***!
  \****************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _scripts_weather_mod__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./scripts/weather_mod */ \"./scripts/weather_mod.js\");\n\r\n\r\n// Intasiating app\r\nconst app = new _scripts_weather_mod__WEBPACK_IMPORTED_MODULE_0__.weatherApp(\"Samastipur\");\r\n\r\n// OVER ALL WORKFLOW OF APP\r\nasync function get_weather_Report(placeName = \"Samastipur\") {\r\n  app.location = placeName;\r\n  app\r\n    .makeCall()\r\n    .then((rawData) => {\r\n      if (rawData.today.cod == 404) {\r\n        throw new Error(rawData.current.message);\r\n      }\r\n      parseData(rawData);\r\n    })\r\n    .catch((err) => ErrorHandler(err));\r\n}\r\n// THIS FUNCTION HANDLES ERROR\r\nfunction ErrorHandler(err) {\r\n  if (err.message) {\r\n    alert(\"Please enter correct city name and TRY AGAIN!\");\r\n  } else {\r\n    alert(\"Something is not right, contact to developer\");\r\n  }\r\n}\r\n\r\n// THIS FUNCTION PARSE DATA TO DOM\r\nfunction parseData(cleanData) {\r\n  const { today, future } = cleanData;\r\n  for (const key in today) {\r\n    const tempElement = document.querySelectorAll(`.value.${key}`);\r\n    if (tempElement.length) {\r\n      tempElement.forEach((element) => {\r\n        element.innerText = today[key];\r\n      });\r\n    }\r\n  }\r\n\r\n  const forecastContainor = document.querySelector(\".horizental-info\");\r\n\r\n  future.forEach((day) => {\r\n    const htmlContent = `\r\n    <div class=\"upcoming-day\">\r\n      <span class=\"icon\"></span>\r\n      <h4>${day.temp}</h4>\r\n      <div class=\"status\">\r\n        <p class=\"weather-condition\">${day.weather}</p>\r\n        <p class=\"forecast date\">${day.date}</p>\r\n        <p class=\"forecast time\">${day.time}</p>\r\n      </div>\r\n    </div>\r\n    `;\r\n\r\n    forecastContainor.innerHTML += htmlContent;\r\n  });\r\n}\r\n\r\n// ALL FUNCTION RUN WHEN WINDOW LOADS\r\n// window.addEventListener(\"load\", () => {\r\n//   get_weather_Report(\"samastipur\");\r\n\r\n//   const formElement = document.querySelector(\"form\");\r\n\r\n//   formElement.addEventListener(\"submit\", (event) => {\r\n//     event.preventDefault();\r\n\r\n//     const input = formElement.querySelector(\"input\").value.trim();\r\n//     if (input) {\r\n//       get_weather_Report(input);\r\n//     }\r\n//   });\r\n// });\r\n\n\n//# sourceURL=webpack://weather-app/./app.js?");

/***/ }),

/***/ "./scripts/weather_mod.js":
/*!********************************!*\
  !*** ./scripts/weather_mod.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"weatherApp\": () => (/* binding */ weatherApp)\n/* harmony export */ });\nclass weatherApp {\r\n  constructor(locationInput) {\r\n    this.apiKey = `5778ebef63827aa7fd5a136d866fd37d`;\r\n    this._location = locationInput;\r\n  }\r\n\r\n  get location() {\r\n    return this._location;\r\n  }\r\n\r\n  set location(newname) {\r\n    this._location = newname;\r\n  }\r\n\r\n  async makeCurrentCall() {\r\n    const requestURL = `https://api.openweathermap.org/data/2.5/weather?q=${this.location}&appid=${this.apiKey}`;\r\n    const data = await fetch(requestURL, { mode: \"cors\" }).then((res) =>\r\n      res.json()\r\n    );\r\n    return data;\r\n  }\r\n\r\n  async makeForecastCall() {\r\n    const requestURL = `https://api.openweathermap.org/data/2.5/forecast?q=${this.location}&appid=${this.apiKey}`;\r\n    const data = await fetch(requestURL, { mode: \"cors\" }).then((res) =>\r\n      res.json()\r\n    );\r\n    return data;\r\n  }\r\n\r\n  async makeCall() {\r\n    try {\r\n      const current = await this.makeCurrentCall();\r\n      const forecast = await this.makeForecastCall();\r\n      const data = await this.cleanData({ current, forecast });\r\n      return data;\r\n    } catch (err) {\r\n      console.log(err.message);\r\n    }\r\n  }\r\n\r\n  async cleanData({ current, forecast }) {\r\n    function kelvinToCelcius(kelvinTemp) {\r\n      return Math.round(kelvinTemp - 273.15) + \" °C\";\r\n    }\r\n\r\n    function formatTime(timestamp) {\r\n      const dateObj = new Date(timestamp);\r\n      return dateObj.getHours() + \":\" + dateObj.getMinutes();\r\n    }\r\n\r\n    function formatDate(timestamp) {\r\n      const dateObj = new Date(timestamp);\r\n      const monthNames = [\r\n        \"Jan\",\r\n        \"Feb\",\r\n        \"Mar\",\r\n        \"Apr\",\r\n        \"May\",\r\n        \"Jun\",\r\n        \"Jul\",\r\n        \"Aug\",\r\n        \"Sep\",\r\n        \"Oct\",\r\n        \"Nov\",\r\n        \"Dec\",\r\n      ];\r\n      return dateObj.getDate() + \" \" + monthNames[dateObj.getMonth()];\r\n    }\r\n\r\n    const today = {\r\n      longitude: current.coord.lon,\r\n      latitude: current.coord.lat,\r\n      weather: current.weather[0].id,\r\n      temp: kelvinToCelcius(current.main.temp),\r\n      feels_like: kelvinToCelcius(current.main.feels_like),\r\n      temp_min: kelvinToCelcius(current.main.temp_min),\r\n      temp_max: kelvinToCelcius(current.main.temp_max),\r\n      pressure: current.main.pressure + \" hPa\",\r\n      humidity: current.main.humidity + \" %\",\r\n      sea_level: current.main.sea_level + \" hPa\",\r\n      grnd_level: current.main.grnd_level + \" hPa\",\r\n      visibility: Math.round(current.visibility / 100) + \" %\",\r\n      windSpeed: Math.round(current.wind.speed * 3.6) + \" km/hr\",\r\n      cloudiness: current.clouds.all + \" %\",\r\n      cityName: current.name,\r\n      country: current.sys.country,\r\n      sunrise: formatTime(current.sys.sunrise * 1000),\r\n      sunset: formatTime(current.sys.sunset * 1000),\r\n    };\r\n\r\n    const future = [];\r\n    forecast.list.forEach((entry) => {\r\n      const targetDate = Date.parse(entry.dt_txt);\r\n      const theDate = formatDate(targetDate);\r\n      const theTime = formatTime(targetDate) + \"0\";\r\n      future.push({\r\n        date: theDate,\r\n        temp: kelvinToCelcius(entry.main.temp),\r\n        weather: entry.weather[0].id,\r\n        time: theTime,\r\n      });\r\n    });\r\n\r\n    return { today, future };\r\n  }\r\n}\r\n\n\n//# sourceURL=webpack://weather-app/./scripts/weather_mod.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./app.js");
/******/ 	
/******/ })()
;