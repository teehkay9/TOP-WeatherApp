console.log("Hello SWE");

const ApiKey = "Q8YKZGWZ88VHZ983BJZ8VH9F8";
const WEATHER_UNIT = "metric";

function buildEndpoint(location) {
  return `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=${WEATHER_UNIT}&key=${ApiKey}`;
}

function displayWeatherData(weatherInfo) {
  const container = document.createElement("div");
  container.classList.add("day");

  const city = document.createElement("h2");
  city.classList.add("city");
  city.textContent = weatherInfo.city;

  const date = document.createElement("p");
  date.classList.add("date");
  date.textContent = weatherInfo.date;

  const maxTemp = document.createElement("p");
  maxTemp.classList.add("temp-max");
  maxTemp.textContent = weatherInfo.max_temp;

  const minTemp = document.createElement("p");
  minTemp.classList.add("temp-min");
  minTemp.textContent = weatherInfo.min_temp;

  const icon = document.createElement("p");
  icon.classList.add("icon");
  icon.textContent = weatherInfo.icon;

  const outerContainer = document.querySelector(".container");

  container.appendChild(city);
  container.appendChild(date);
  container.appendChild(maxTemp);
  container.appendChild(minTemp);
  container.appendChild(icon);

  outerContainer.appendChild(container);
}

async function fetchData(URL) {
  try {
    const response = await fetch(URL);
    if (!response.ok) throw new Error("Error fetching data");
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error:", error);
  }
}

async function getWeatherData(location) {
  try {
    const ApiEndpoint = buildEndpoint(location);
    const weatherData = await fetchData(ApiEndpoint);
    return weatherData;
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
}

async function main(location) {
  const weatherResponse = await getWeatherData(location);
  console.log(weatherResponse);

  const today = new WeatherToday(weatherResponse);
  console.log(today);

  displayWeatherData(today);
}

function WeatherToday(response) {
  this.city = response.address;
  this.date = response.days[0].datetime;
  this.max_temp = response.days[0].tempmax;
  this.min_temp = response.days[0].tempmin;
  this.icon = response.days[0].icon;
}

// form that lets user submit a location
const form = document.querySelector("form");
const input = document.querySelector("#location");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const location = input.value.trim();

  if (!location) {
    alert("You must enter something");
    return;
  }
  main(location);

  input.value = "";
});
