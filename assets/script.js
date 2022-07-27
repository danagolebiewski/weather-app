// request API key

var APIKEY = "6d3b8741d864862cbcbd38685f847354";

// first try to make an API call with code (you're going to give the values that are needed)

fetch(`http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid={API key`)

// Make function for fetch current weather 
fetch(`https://api.openweathermap.org/data/2.5/forecast?q=Boulder&limit=1&appid=${APIKEY}`)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    // console.log(data);
  });

// fetch for current weather
function apiCall() {
  fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude={part}&appid=${APIKEY}`
  )
    .then()
    .then(function (data) {
      console.log(data);
      console.log(data[0])

      // if we need data from a previous API call we have to WAIT for that data to be returned to us
    });

  console.log(" I am running");
}

// test our FORM
// can we capture hte user input?

// take input and GEOCODE it

// ASYNCHRONOUS OPERATION

// know how to dig into an OBJECT and grab the important parts
