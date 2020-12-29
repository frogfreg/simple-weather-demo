import React, { useEffect, useState } from "react";
import axios from "axios";
import "bulma/css/bulma.min.css";
import { Helmet } from "react-helmet";
import ClimateCard from "./climate-card";
import "./app.css";

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
          // new api http://api.openweathermap.org/data/2.5/forecast?lat=19.6281019&lon=-99.2453128&appid=41192770b11fd28f630776e9b1491112&units=metric
          const {
            data: [{ woeid }],
          } = await axios.get(
            `https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/search/?lattlong=${latitude},${longitude}`
          );
          const { data: newWeatherInfo } = await axios.get(
            `https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/${woeid}`
          );

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
            Weather in {weatherInfo?.title}
          </h1>
          <div className="columns is-centered">
            <div className="column is-half">
              <ClimateCard
                weatherReport={weatherInfo?.consolidated_weather[0]}
              />
            </div>
          </div>
          <div className="columns is-mobile is-multiline ">
            <div className="column is-half-mobile is-one-quarter-desktop">
              <ClimateCard
                weatherReport={weatherInfo?.consolidated_weather[1]}
              />
            </div>
            <div className="column is-half-mobile is-one-quarter-desktop">
              <ClimateCard
                weatherReport={weatherInfo?.consolidated_weather[2]}
              />
            </div>
            <div className="column is-half-mobile is-one-quarter-desktop">
              <ClimateCard
                weatherReport={weatherInfo?.consolidated_weather[3]}
              />
            </div>
            <div className="column is-half-mobile is-one-quarter-desktop">
              <ClimateCard
                weatherReport={weatherInfo?.consolidated_weather[4]}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="progress">
          {error ? (
            <h2 className="title is-2 has-text-centered">{error}</h2>
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
