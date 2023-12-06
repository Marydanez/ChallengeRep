function search(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#search-input");
  let cityElement = document.querySelector("#current-city");
  cityElement.innerHTML = searchInputElement.value;

  let apiKey = "fbef01f4et1b02o0d25c27210a43ef3f";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${searchInputElement.value}&key=${apiKey}`;

  axios.get(apiUrl).then(function (response) {
    let conditionElement = document.querySelector("#condition");
    conditionElement.innerHTML = `${response.data.condition.description}`;
    let humidityElement = document.querySelector("#humidity");
    humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
    let windElement = document.querySelector("#wind");
    windElement.innerHTML = `${response.data.wind.speed} km/h`;
    let iconElement = document.querySelector("#icon");
    iconElement.innerHTML = `<img
          src="${response.data.condition.icon_url}"
          class="current-temperature-icon"
        />`;
    let temperature = Math.round(response.data.temperature.current);
    let temperatureElement = document.querySelector(
      "#current-temperature-value"
    );
    temperatureElement.innerHTML = `${temperature}`;
  });
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let day = date.getDay();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let formattedDay = days[day];
  return `${formattedDay} ${hours}:${minutes}`;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

let currentDateELement = document.querySelector("#current-date");
let currentDate = new Date();

currentDateELement.innerHTML = formatDate(currentDate);

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");
  let forecastHtml = "";
  let days = ["Tue", "Wed", "Thu", "Fri", "Sat"];
  days.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      `<div class="class-row">
          <div class="col-2">
            <div class="weather-forecast-date">${day}</div>
            <img
              src="https://cdn-icons-png.flaticon.com/512/4052/4052984.png"
              alt="icon-image"
              width="36px"
            />
            <br />
            <div class="weather-forecast-values">
              <span class="maximum-value">18°</span>
              <span class="minimum-value">12°</span>
            </div>
          </div>
        </div>`;
  });

  forecastElement.innerHTML = forecastHtml;
}
displayForecast();
