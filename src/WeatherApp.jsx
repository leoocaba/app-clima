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

  const handleCitySelection = async (selectedCity) => {
    setCity(selectedCity);
    setSearchResults([]);
    try {
      await fetchData(selectedCity);
    } catch (error) {
      alert.error(
        "Error al obtener los datos del clima. Intente con otra ciudad."
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!city.trim()) {
      alert.error("¡Por favor, ingrese una ciudad!");
      return;
    }
    const cityExists = searchResults.some(
      (result) => result.name.toLowerCase() === city.toLowerCase()
    );
    if (!cityExists) {
      alert.error("La ciudad no existe en la base de datos.");
      return;
    }
    try {
      await fetchData(city);
    } catch (error) {
      alert.error(
        "Error al obtener los datos del clima. Intente con otra ciudad."
      );
    }
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
      <div className="__weather d-flex flex-column justify-content-center align-items-center w-100 px-4 py-0">
        <div className="__container container m-0 p-0">
          <div className="row d-flex justify-content-center p-0">
            <div className="col col-xs-10 col-sm-10 col-md-6 col-lg-6 col-xl-6 col-xxl-8 p-3 m-4">
              {weatherData && weatherData.weather ? (
                <div className="align-item-center justify-content-center">
                  <h1 className="__city text-center fw-bold m-auto py-1">
                    {weatherData.name}
                  </h1>
                  <h2 className="__temperature text-center m-auto py-1">
                    Temperatura: {kelvinToCelsius(weatherData.main.temp)}°C{" "}
                  </h2>
                  <img
                    className="__img-weather d-flex m-auto py-0"
                    src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                    alt=""
                  />
                  <p className="__description text-center m-auto py-1">
                    Condición actual:{" "}
                    <span className="badge fw-bold text-bg-light">
                      {weatherDescription}
                    </span>
                  </p>
                </div>
              ) : (
                <div className="container my-2">
                  <p className="text-center my-0">
                    No se encontraron datos de clima.{" "}
                    <span className="badge fs-6 text-bg-danger m-0 p-1">
                      Ingrese una ciudad.
                    </span>
                  </p>
                </div>
              )}
              <form
                onSubmit={handleSubmit}
                className="d-flex flex-column flex-sm-column flex-md-row flex-lg-row flex-xl-row justify-content-center my-4"
              >
                <input
                  className="col col-sm-12 col-md-10 col-lg-8 col-xl-8 border-0 border-3 border-bottom border-primary p-2 my-2 my-md-auto mx-2 mx-sm-2 mx-md-2 mx-lg-3 mx-xl-2"
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
                <div className="position-relative w-100 d-flex justify-content-center mx-auto">
                  <div className="container w-100 d-flex justify-content-center mx-auto">
                    <ul className="__list list-group col-12 col-md-10 p-0 m-0 position-absolute top-100 start-50 translate-middle-x overflow-y-auto">
                      {filteredSearchResults.map((result) => (
                        <li
                          key={result.geonameId}
                          className="list-group-item __option-list fs-6 border-none py-2 my-2"
                          onClick={() => handleCitySelection(result.name)}
                        >
                          {result.name}
                        </li>
                      ))}
                    </ul>
                  </div>
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
    position: "bottom right",
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
