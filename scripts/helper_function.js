export function kelvinToCelcius(kelvinTemp) {
  return Math.round(kelvinTemp - 273.15);
}

export function formatTime(timestamp) {
  const dateObj = new Date(timestamp);
  const hours =
    dateObj.getHours() < 10 ? "0" + dateObj.getHours() : dateObj.getHours();

  const minutes =
    dateObj.getMinutes() < 10
      ? "0" + dateObj.getMinutes()
      : dateObj.getMinutes();
  return hours + ":" + minutes;
}

export function formatDate(timestamp) {
  const dateObj = new Date(timestamp);
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
  return dateObj.getDate() + " " + monthNames[dateObj.getMonth()];
}

export function randomChoice(ary) {
  return ary[Math.floor(Math.random() * ary.length)];
}

export const season = {
  winter: [],
  summer: [],
  spring: [],
  rain: [],
  thunderstorm: [],
  snow: [],
  volcano: [],
  tornado: [],
  mist: [],
  cloudy: [],
};
