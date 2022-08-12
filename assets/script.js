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
      if (data.name && !history.includes(data.name)) {
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
      var className;
    //  1-2 Low         (1 - 2.99999)   Green
    //  3-5 Moderate    (3 - 5.99999)   Yellow 
    //  6-7 High        (6 - 7.99999)   Orange
    //  8-10 Very High  (8 - 10.9999)   Red
    //  11+ Extreme     (11+ )          Purple
      if (data.current.uvi < 3) { 
        className = "green";
      } else if (data.current.uvi < 6) {
        className = "yellow";
      } else if (data.current.uvi < 8) {
        className = "orange";
      } else if (data.current.uvi < 11) {
        className = "red";
      } else {
        className = "purple";
      }
      $("#uvi").addClass(className);
      $("#uvi").text(`UV Index: ${data.current.uvi}`);

      for (let index = 1; index <= 5; index++) {
        event.preventDefault();
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

// Add weather indicator symbol

function renderSearchHistory() {
  //do the rendering
  document.querySelector(".history-container").innerHTML = "";
  for (let index = 0; index < history.length; index++) {
    var button = document.createElement("button");
    button.classList.add("btn-block", "btn-secondary", "btn");
    button.addEventListener("click", function () {
      apiCall(history[index]);
    });
    button.textContent = history[index];
    document.querySelector(".history-container").append(button);
  }
}
