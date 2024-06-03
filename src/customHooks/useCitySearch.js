import { useState } from "react";

const useCitySearch = () => {
  const [searchResults, setSearchResults] = useState([]);

  const searchCities = async (query) => {
    try {
      const response = await fetch(
        `https://secure.geonames.org/searchJSON?q=${query}&maxRows=5&username=leoocaba`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setSearchResults(data.geonames);
    } catch (error) {
      console.error("Error searching cities:", error);
      setSearchResults([]);
    }
  };

  return { searchResults, setSearchResults, searchCities };
};

export default useCitySearch;
