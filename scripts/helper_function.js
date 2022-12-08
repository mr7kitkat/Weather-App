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

export function dayStatus(text) {
  if (text.includes("d")) {
    return "day";
  } else {
    return "night";
  }
}

export function getImage(imageObj, status = "day", season) {
  function randomItem(ary) {
    const idx = Math.floor(Math.random() * ary.length);
    return ary[idx];
  }

  const check = Array.isArray(imageObj[`${season}`]);
  if (check) {
    return randomItem(imageObj[`${season}`]);
  } else {
    return randomItem(imageObj[`${season}`][`${status}`]);
  }
}
