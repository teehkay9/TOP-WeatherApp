console.log("Hello SWE");

const ApiKey = "Q8YKZGWZ88VHZ983BJZ8VH9F8";
const myLocation = "London";
const WEATHER_UNIT = "metric";

const ApiEndpoint = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${myLocation}?unitGroup=${WEATHER_UNIT}&key=${ApiKey}`;

async function fetchData(URL) {
  try {
    const response = await fetch(URL);
    if (!response.ok) throw new Error("Error fetching data");
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log("Error:", error);
  }
}

async function getWeatherData() {
  try {
    const weatherData = await fetchData(ApiEndpoint);
    console.log("Here is the Weather Data:");
    console.log(weatherData);
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
}

getWeatherData();
