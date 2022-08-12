// request API key

var API_KEY = "6d3b8741d864862cbcbd38685f847354";
var formEl = $("#city-form");
var cityInput = $('input[name="city"]');

const history = JSON.parse(localStorage.getItem("history")) || [];
renderSearchHistory();

// first try to make an API call with code (you're going to give the values that are needed)

// fetch for current weather
function apiCall(city) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${API_KEY}`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);

      // check if data.name is in the history array already. If not, add it
      if (!history.includes(data.name)) {
        history.push(data.name);
        localStorage.setItem("history", JSON.stringify(history));
      }

      renderSearchHistory();

      $("#date").text(
        new Date(data.dt * 1000).toLocaleString("en-US", {
          weekday: "long",
          month: "long",
          day: "numeric",
          year: "numeric",
        })
      );
      $("#displayboxtitle").text(data.name);
      $("#temp").text(`Temp: ${data.main.temp}`);
      $("#wind").text(`Wind: ${data.wind.speed}`);
      $("#humidity").text(`Humidity: ${data.main.humidity}`);
      // if we need data from a previous API call we have to WAIT for that data to be returned to
      oneCall(data.coord.lat, data.coord.lon);
    });
}

function oneCall(lat, lon) {
  fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${API_KEY}`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);

      $("#uvi").text(`UV Index: ${data.current.uvi}`);

      for (let index = 1; index <= 5; index++) {
        const element = data.daily[index];
        console.log(element);

        let card = document.createElement("div");
        card.classList.add("card", "col", "m-1");
        card.innerHTML = `
          <div class="card-body">
          <p class="card-title">${new Date(element.dt * 1000).toLocaleString(
            "en-US",
            { weekday: "long" }
          )}</p>
          <p class="card-text">Temp ${element.temp.day}</p>
          <p class="card-text">Wind ${element.wind_speed}</p>
          <p class="card-text">Humidity ${element.humidity}</p>
          </div
        `;
        document.getElementById("5-day").append(card);
      }
      // $("#displayboxtitle").text(city);
      // $("#temp").text(`Temp: ${data.main.temp}`);
      // $("#wind").text(`Wind: ${data.wind.speed}`);
      // $("#humidity").text(`Humidity: ${data.main.humidity}`);

      // if we need data from a previous API call we have to WAIT for that data to be returned to us
    });
}

function handleFormSubmit(event) {
  event.preventDefault();
  var cityName = cityInput.val();
  // console.log(cityName);
  apiCall(cityName);
  // fiveDayApiCall(cityName);
}

formEl.on("submit", handleFormSubmit);

// Call 5 day forecast, add info to cards,
// Add search history with active buttons
// Find UVI with color changing button thingy
// Add weather indicator symbol

function renderSearchHistory() {
  //do the rendering
  document.querySelector(".history-container").innerHTML = "";
  for (let index = 0; index < history.length; index++) {
    var button = document.createElement("button");
    button.classList.add("btn-block", "btn-primary", "btn");
    button.addEventListener("click", function () {
      apiCall(history[index]);
    });
    button.textContent = history[index];
    document.querySelector(".history-container").append(button);
  }
}
