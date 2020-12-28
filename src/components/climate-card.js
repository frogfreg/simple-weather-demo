import React from "react";

function ClimateCard({ weatherReport }) {
  function getDateString(dateString) {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const dateArr = dateString.split("-");
    const currDate = new Date(dateArr[0], dateArr[1] - 1, dateArr[2]);

    return `${days[currDate.getDay()]} ${currDate.getDate()}`;
  }

  return (
    <div className="card has-text-centered p-4">
      <p className="title has-text-centered">
        {Math.round(weatherReport?.the_temp, 0)}°C
      </p>
      <p className="title has-text-centered">
        {weatherReport?.weather_state_name}
      </p>
      <figure className="image is-128x128 is-inline-block">
        <img
          src={`https://www.metaweather.com/static/img/weather/${weatherReport?.weather_state_abbr}.svg`}
        />
      </figure>
      <p className="subtitle">
        {getDateString(weatherReport?.applicable_date)}
      </p>
      <p className="subtitle">{weatherReport?.applicable_date}</p>
    </div>
  );
}

export default ClimateCard;
