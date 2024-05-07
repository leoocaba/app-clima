import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import WeatherApp from "./WeatherApp";
import { HeaderComponent } from "./HeaderComponent";
import { FooterComponent } from "./FooterComponent";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <>
      <HeaderComponent />
      <WeatherApp />
      <FooterComponent />
    </>
  </React.StrictMode>
);
