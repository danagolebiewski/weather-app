// request API key

var API_KEY = "6d3b8741d864862cbcbd38685f847354";
var formEl = $("#city-form");
var cityInput = $('input[name="city"]');

// first try to make an API call with code (you're going to give the values that are needed)

// fetch for current weather
function apiCall(city) {
  console.log("hello");
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${API_KEY}`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      $("#date").text(new Date(data.dt*1000).toLocaleString('en-US', {weekday: 'long', month: 'long', day: 'numeric', year: 'numeric'}));
      $("#displayboxtitle").text(city);
      $("#temp").text(`Temp: ${data.main.temp}`);
      $("#wind").text(`Wind: ${data.wind.speed}`);
      $("#humidity").text(`Humidity: ${data.main.humidity}`);

      // if we need data from a previous API call we have to WAIT for that data to be returned to us
    });
}

function fiveDayApiCall(city) {
  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${API_KEY}`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // console.log(data.list);
      for (let index = 6; index < data.list.length; index += 8) {
        const element = data.list[index];
        console.log(element);

        let card = document.createElement("div");
        card.classList.add("card", "col", "m-1");
        card.innerHTML = `
          <div class="card-body">
          <p class="card-title">${new Date(element.dt*1000).toLocaleString('en-US', {weekday: 'long'})}</p>
          <p class="card-text">Temp ${element.main.temp}</p>
          <p class="card-text">Wind ${element.wind.speed}</p>
          <p class="card-text">Humidity ${element.main.humidity}</p>
          </div
        `;
        document.getElementById('5-day').append(card)
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
  console.log(cityName);
  apiCall(cityName);
  fiveDayApiCall(cityName);
}

formEl.on("submit", handleFormSubmit);

// Call 5 day forecast, add info to cards,
// Add search history with active buttons
// Find UVI with color changing button thingy
// Add weather indicator symbol
