import React, { useState, useEffect } from "react";
import { Provider as AlertProvider, useAlert } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import useWeatherAPI from "./customHooks/useWeatherAPI";
import { kelvinToCelsius } from "./Helpers/weatherHelper";
import weatherTranslations from "./Helpers/weatherTranslations";
import useCitySearch from "./customHooks/useCitySearch";

const WeatherApp = () => {
  const [city, setCity] = useState("");
  const alert = useAlert();
  const [weatherDescription, setWeatherDescription] = useState("");
  const { weatherData, fetchData, fetchWeatherByGeolocation } = useWeatherAPI();
  const { searchResults, searchCities, setSearchResults } = useCitySearch();

  const handleCityChange = (e) => {
    const { value } = e.target;
    setCity(value);
    if (value.trim()) {
      searchCities(value);
    } else {
      setSearchResults([]);
    }
  };

  const handleCitySelection = (selectedCity) => {
    setCity(selectedCity);
    setSearchResults([]);
    fetchData(selectedCity);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!city.trim()) {
      alert.error("¡Por favor, ingrese el nombre de una ciudad!");
      return;
    }
    fetchData(city);
  };

  useEffect(() => {
    fetchWeatherByGeolocation();
  }, []);

  useEffect(() => {
    if (weatherData && weatherData.weather) {
      const description = weatherData.weather[0].description;
      translateDescription(description);
    }
  }, [weatherData]);

  const translateDescription = (description) => {
    const translatedDescription =
      weatherTranslations[description.toLowerCase()] || description;
    setWeatherDescription(translatedDescription);
  };

  const filteredSearchResults = searchResults.filter((result) =>
    result.name.toLowerCase().includes(city.toLowerCase())
  );

  return (
    <>
      <div className="__weather d-flex flex-column justify-content-center align-items-center w-100 px-4">
        <div className="__container container m-0 p-0">
          <div className="row d-flex justify-content-center">
            <div className="col col-xs-10 col-sm-10 col-md-6 col-lg-8 col-xl-6 col-xxl-8 p-3 m-4">
              {weatherData && (
                <div className="align-item-center justify-content-center mt-2">
                  <h1 className="__city text-center fw-bold m-auto py-1">
                    {weatherData.name}
                  </h1>
                  <h2 className="__temperature text-center m-auto py-1">
                    Temperatura: {kelvinToCelsius(weatherData?.main?.temp)}°C{" "}
                  </h2>
                  <img
                    className="__img-weather d-flex m-auto py-0"
                    src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                    alt=""
                  />
                  <p className="__description text-center m-auto py-1">
                    Condición actual:{" "}
                    <span className="badge fw-bol text-bg-light">
                      {weatherDescription}
                    </span>
                  </p>
                </div>
              )}
              <form
                onSubmit={handleSubmit}
                className="d-flex flex-column flex-sm-column flex-md-row flex-lg-row flex-xl-row justify-content-center my-4"
              >
                <input
                  className="col p-2 my-2 my-md-auto mx-2 mx-sm-2 mx-md-2 mx-lg-3 mx-xl-2"
                  type="text"
                  name="city"
                  value={city}
                  onChange={handleCityChange}
                  placeholder="Ingrese una ciudad..."
                />
                <button
                  className="btn btn-md btn-block btn-primary px-3 py-auto mx-2 mx-sm-2 mx-md-2 mx-lg-2 mx-xl-1"
                  type="submit"
                >
                  Buscar
                </button>
              </form>
              {filteredSearchResults.length > 0 && city.trim() && (
                <div className="__container-list container col-5 d-flex justify-content-center mx-o px-0">
                  <ul className="__list col d-flex list-group px-0">
                    {filteredSearchResults.map((result) => (
                      <li
                        key={result.geonameId}
                        className="__option-list list-group-item my-1"
                        onClick={() => handleCitySelection(result.name)}
                      >
                        {result.name}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const App = () => {
  const options = {
    position: "bottom center",
    timeout: 3000,
    offset: "30px",
    transition: "scale",
  };

  return (
    <AlertProvider template={AlertTemplate} {...options}>
      <WeatherApp />
    </AlertProvider>
  );
};

export default App;
