import axios from 'axios';

let now = new Date();
let li = document.querySelector("li");

let hours = now.getHours();
let minutes = now.getMinutes();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[now.getDay()];

li.innerHTML = `${day} ${hours}:${minutes}`;

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-text-input");
  let h1 = document.querySelector("h1");
  let apiKey = "ad1eb86b4bf84c8a3613c41e159cef2b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showWeather);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

function handlePosition(position) {
  console.log(position.coords.latitude);
  console.log(position.coords.longitude);
  let apiKey = "ad1eb86b4bf84c8a3613c41e159cef2b";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showWeather);
}

function showWeather(response) {
  let h1 = document.querySelector("h1");
  let temperature = Math.round(response.data.main.temp);
  let latitude = response.data.coord.lat;
  let longitude = response.data.coord.lon;
  h1.innerHTML = `It is currently ${temperature}°in ${response.data.name}.`;
}

let button = document.querySelector("button");
button.addEventListener("click", function() {
  navigator.geolocation.getCurrentPosition(handlePosition);
});
navigator.geolocation.getCurrentPosition(handlePosition);
