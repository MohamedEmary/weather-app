let forecast;
const dayNames = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function toggleVisibility(shown) {
  let hidden = shown === "main" ? ".contact-main" : "main";

  $(hidden).addClass("d-none");
  $(shown).removeClass("d-none");
}
function toggleActive(activated) {
  let inActive = activated === "#contact-nav" ? "#home-nav" : "#contact-nav";

  $(activated).addClass("active");
  $(inActive).removeClass("active");
}

function handleNavigation(targetVisibility, targetActive) {
  toggleVisibility(targetVisibility);
  toggleActive(targetActive);
}

$("#contact-nav").on("click", () => {
  handleNavigation(".contact-main", "#contact-nav");
});

$("#home-nav").on("click", () => {
  handleNavigation("main", "#home-nav");
});

$("#return-home").on("click", () => {
  handleNavigation("main", "#home-nav");
});

function getWindDir(wind_degree) {
  if (wind_degree > 337.5) return "Northerly";
  if (wind_degree > 292.5) return "North Westerly";
  if (wind_degree > 247.5) return "Westerly";
  if (wind_degree > 202.5) return "South Westerly";
  if (wind_degree > 157.5) return "Southerly";
  if (wind_degree > 122.5) return "South Easterly";
  if (wind_degree > 67.5) return "Easterly";
  if (wind_degree > 22.5) {
    return "North Easterly";
  }
  return "Northerly";
}

async function apiCall() {
  forecast = await fetch(
    "http://api.weatherapi.com/v1/forecast.json?key=095f6f84e65b44ba9c735801242407&q=cairo&days=3"
  ).then((res) => res.json());

  getNeededValues();
}

function getDay(date) {
  const dateObj = new Date(date);
  return dateObj.getDay(); //returns the index of the day in the week starting from sunday
}

// Removes unwanted values from the JSON response
function getNeededValues() {
  let values = {};

  // Handeling Location Part of JSON Obj
  values.address = `${forecast.location.name}, ${forecast.location.region}, ${forecast.location.country}`;

  // Handeling Current Part of JSON Obj
  let current = {};
  current.temp = forecast.current.temp_c;
  current.condition = forecast.current.condition.text;
  current.icon = forecast.current.condition.icon;
  current.humidity = forecast.current.humidity;
  current.wind_dir = getWindDir(forecast.current.wind_deg);
  current.wind_speed = forecast.current.wind_kph;

  let todayIndex = getDay(forecast.forecast.forecastday[0].date);
  current.day = dayNames[todayIndex];

  values.current = current;

  // Handeling Forecast Part of JSON Obj
  const days = forecast.forecast.forecastday.slice(1);
  let daysForecast = [];
  for (let i = 0; i < days.length; i++) {
    // daysForecast.push(days[i].day);
    let myDay = {};
    myDay.max_temp = days[i].day.maxtemp_c;
    myDay.min_temp = days[i].day.mintemp_c;
    myDay.date = dayNames[getDay(days[i].date)];
    myDay.condition = days[i].day.condition.text;
    myDay.icon = days[i].day.condition.icon;
    daysForecast.push(myDay);
  }

  values.forecast = daysForecast;

  console.log(values);
}

async function main() {
  await apiCall();
}

main();
