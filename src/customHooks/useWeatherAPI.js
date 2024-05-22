import { useState } from "react";

const useWeatherAPI = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState("");

  const fetchData = async (city) => {
    const URL_BASE = "https://api.openweathermap.org/data/2.5/weather";
    const API_KEY = "1cde00afd70bcf3efc2d222053a146b7";
    try {
      const response = await fetch(
        `${URL_BASE}?q=${city}&appid=${API_KEY}&units=metric&lang=es`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      console.error("Ha ocurrido el siguiente problema: ", error);
      setWeatherData(null);
      setError("Error al obtener los datos meteorológicos");
    }
  };

  const fetchWeatherByCoordinates = async (latitude, longitude) => {
    const URL_BASE = "https://api.openweathermap.org/data/2.5/weather";
    const API_KEY = "1cde00afd70bcf3efc2d222053a146b7";
    try {
      const response = await fetch(
        `${URL_BASE}?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric&lang=es`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      console.error("Error fetching weather by coordinates:", error);
      setWeatherData(null);
      setError("Error al obtener los datos meteorológicos");
    }
  };

  const fetchWeatherByGeolocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeatherByCoordinates(latitude, longitude);
        },
        (error) => {
          console.error("Geolocation error:", error);
          setError("No se pudo obtener la ubicación del usuario");
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      setError("Geolocalización no compatible con este navegador");
    }
  };

  return { weatherData, error, fetchData, fetchWeatherByGeolocation };
};

export default useWeatherAPI;
