import { WEATHERAPI_KEY } from "./const";
import WeatherContainer from "./WeatherContainer";
import { createNav } from "./navbar";
import "./styles.css"
const temp = document.createElement("div");
const foreCastElements = []; //1st element will always be today
let currData = undefined;
let nav = undefined;
const locationContainer = document.createElement("div");
const siteContent = document.createElement("div");
const currCity = document.createElement("p");
const currCountry = document.createElement("p");
const foreCastContainer = document.createElement("div");
foreCastContainer.classList.add("forecast-tile-container");
const currContainer = document.createElement("div");
currCity.id = "curr-city";
currCountry.id = "curr-country";
locationContainer.appendChild(currCity);
locationContainer.appendChild(currCountry);
locationContainer.classList.add("location-container");
siteContent.classList.add("site-content");


//TODO loading screen
//Default API call
fetch(`http://api.weatherapi.com/v1/forecast.json?key=${WEATHERAPI_KEY}&q=new york&days=3`).then(resp => resp.json()).then(data => {
    currData = data;
    data.forecast.forecastday.forEach((element, index) => {
        foreCastElements.push(new WeatherContainer(element));
        if (index === 0) {
            // currContainer.appendChild(foreCastElements[index].element.weatherContainer);
            siteContent.appendChild(foreCastElements[index].element.weatherContainer);
            foreCastElements[index].element.weatherContainer.classList.add("curr-container");
        }
        else {
            foreCastContainer.appendChild(foreCastElements[index].element.weatherContainer)
            foreCastElements[index].element.weatherContainer.classList.add("forecast-container");
        }
    });
    siteContent.appendChild(foreCastContainer);
    nav = createNav(currData, foreCastElements);
    // nav.insertBefore(locationContainer, nav.children[1]);
    document.body.insertBefore(locationContainer, document.body.children[2]);
    document.body.prepend(nav);
    currCity.textContent = data.location.name + ",";
    currCountry.textContent = data.location.country;
    document.body.appendChild(siteContent);
}).catch(err => console.log(err));


