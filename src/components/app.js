import React, { useEffect, useState } from "react";
import axios from "axios";
import "bulma/css/bulma.min.css";
import { Helmet } from "react-helmet";
import ClimateCard from "./climate-card";
import "./app.css";
import { countryCodes } from "../utils/country-codes";

function App() {
  const [weatherInfo, setWeatherInfo] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const {
          coords: { latitude, longitude },
        } = position;

        try {
          const weatherPromise = axios.get(
            `https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=41192770b11fd28f630776e9b1491112&units=metric`
          );
          const cityPromise = axios.get(
            `https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=41192770b11fd28f630776e9b1491112&units=metric`
          );
          const [
            { data: newWeatherInfo },
            { data: newCityInfo },
          ] = await Promise.all([weatherPromise, cityPromise]);
          newWeatherInfo.city = newCityInfo.city;
          setWeatherInfo(newWeatherInfo);
        } catch (err) {
          setError(err);
          console.log(err);
        }
      },
      (error) => {
        setError(error.message);
      }
    );
  }, []);

  return (
    <>
      <Helmet>
        <title>Weather Demo</title>
      </Helmet>
      {weatherInfo ? (
        <div className="container">
          <h1 className="title is-1 has-text-centered">
            Weather in {weatherInfo?.city.name}
            {`, ${countryCodes[weatherInfo?.city.country]}`}
          </h1>
          <div className="columns is-centered">
            <div className="column is-half">
              <ClimateCard weatherReport={weatherInfo?.current} />
            </div>
          </div>
          <div className="columns is-mobile is-multiline ">
            {weatherInfo.daily
              .filter((weatherReport, index) => index <= 4 && index > 0)
              .map((weatherReport) => {
                weatherReport.feels_like = null;
                return (
                  <div
                    key={weatherReport?.dt}
                    className="column is-half-mobile is-one-quarter-desktop"
                  >
                    <ClimateCard weatherReport={weatherReport} />
                  </div>
                );
              })}
          </div>
        </div>
      ) : (
        <div className="progress">
          {error ? (
            <h2 className="title is-2 has-text-centered">{error.message}</h2>
          ) : (
            <h2 className="title is-2 has-text-centered">
              Loading the weather info, please wait
            </h2>
          )}
          {error ? null : (
            <progress className="progress is-medium is-dark" max="100">
              45%
            </progress>
          )}
        </div>
      )}
    </>
  );
}

export default App;
