const kelvinToCelsius = (temp) => Math.round(temp - 273.15);

const getWeatherDescription = (data) =>
  data.weather && data.weather.length > 0 ? data.weather[0].description : "";

export { kelvinToCelsius, getWeatherDescription };
