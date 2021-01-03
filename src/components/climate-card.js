import React from "react";

function ClimateCard({ weatherReport }) {
  function getDateString(seconds) {
    const currDate = new Date(seconds * 1000);
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const dateString = currDate
      .toDateString()
      .split(" ")
      .reduce((acc, curr, index) => {
        if (index === 0) {
          return acc;
        } else {
          return (acc += `${curr} `);
        }
      }, "");
    return [
      `${days[currDate.getDay()]} ${currDate.getDate()}`,
      dateString.trim(),
    ];
  }

  return (
    <div className="card has-text-centered p-4">
      <p className="title has-text-centered">
        {weatherReport.temp.eve
          ? Math.round(weatherReport?.temp.eve, 0)
          : Math.round(weatherReport?.temp, 0)}
        °C
      </p>
      <p className="subtitle has-text-centered">
        {weatherReport.feels_like.eve
          ? `feels like ${Math.round(weatherReport?.feels_like.eve, 0)}°C`
          : `feels like ${Math.round(weatherReport?.feels_like, 0)}°C`}
      </p>
      <p className="title has-text-centered">
        {weatherReport?.weather[0].description}
      </p>
      <figure className="image is-128x128 is-inline-block">
        <img
          alt="current weather"
          src={`http://openweathermap.org/img/wn/${weatherReport.weather[0].icon}@2x.png`}
        />
      </figure>
      <p className="subtitle">{getDateString(weatherReport?.dt)[0]}</p>
      <p className="subtitle">{getDateString(weatherReport?.dt)[1]}</p>
    </div>
  );
}

export default ClimateCard;
