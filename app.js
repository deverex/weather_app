window.addEventListener("load", () => {
  let long;
  let lat;

  let temperatureDescription = document.querySelector(
    ".temperature-description"
  );
  let temperatureDegree = document.querySelector(".temperature-degree");
  let locationTimezone = document.querySelector(".location-timezone");
  let temperatureSection = document.querySelector(".temperature");
  const temperatureSpan = document.querySelector(".temperature span");

  if (navigator.geolocation) {
    
    navigator.geolocation.getCurrentPosition(position => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      const proxy = "https://cors-anywhere.herokuapp.com/";
      

      const api = `https://api.darksky.net/forecast/cb3d396ae400df8543bc76b2e10971e5/${lat},${long}`;
      
      fetch(api)
        .then(response => {
          return response.json();
        })
        .then(data => {
          
          const { temperature, summary, icon } = data.currently;
          //Set DOM elements from the API
          temperatureDegree.textContent = temperature;
          temperatureDescription.textContent = summary;
          locationTimezone.textContent = data.timezone;
          //Formula for celcius
          let celcius = (temperature - 32) * (5 / 9);
          //Set Icon
          setIcons(icon, document.querySelector(".icon"));

          //Change temperature to Celcius and Farenheit
          temperatureSection.addEventListener("click", () => {
            if (temperatureSpan.textContent === "F") {
              temperatureSpan.textContent = "C";
              temperatureDegree.textContent = Math.floor(celcius);
            } else {
              temperatureSpan.textContent = "F";
              temperatureDegree.textContent = temperature;
            }
          });
        });
    });
  }

  function setIcons(icon, iconID) {
    const skycons = new Skycons({ color: "#fff" });
    const currentIcon = icon.replace(/-/g, "_").toUpperCase();
    skycons.play();

    return skycons.set(iconID, Skycons[currentIcon]);
  }
});
