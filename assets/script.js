// request API key

var API_KEY = "6d3b8741d864862cbcbd38685f847354";
var formEl = $("#city-form");
var cityInput = $('input[name="city"]');

// first try to make an API call with code (you're going to give the values that are needed)

fetch(
  `https://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid=${API_KEY}`
);

// // Make function for fetch current weather
// fetch(`https://api.openweathermap.org/data/2.5/forecast?q=Boulder&limit=1&appid=${API_KEY}`)
//   .then(function (response) {
//     return response.json();
//   })
//   .then(function (data) {
//     // console.log(data);
//   });

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
      $("#displayboxtitle").text(city);
      $("#temp").text(`Temp: ${data.main.temp}`);
      $("#wind").text(`Wind: ${data.wind.speed}`);
      $("#humidity").text(`Humidity: ${data.main.humidity}`);

      // if we need data from a previous API call we have to WAIT for that data to be returned to us
    });

}

function fiveDayApiCall(city) {
  console.log("hello");
  fetch(
    `https://api.openweathermap.org/forecast/2.5/weather?q=${city}&units=imperial&appid=${API_KEY}`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
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
  fiveDayApiCall();
}

formEl.on('submit', handleFormSubmit);



// Call 5 day forecast, add info to cards, 
// Add search history with active buttons 
// Find UVI with color changing button thingy
// Add weather indicator symbol 
