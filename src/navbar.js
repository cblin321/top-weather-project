import { WEATHERAPI_KEY, SITE_LOGO } from "./const";
import logoSVG from "../media/weather-partly-cloudy-day-svgrepo-com.svg";
import magnifyingGlassSVG from "../media/magnifying-glass-svgrepo-com.svg";
function createNav(dataRef, domElements) {
    console.log(dataRef, domElements)
    const navContainer = document.createElement("nav");
    const logo = document.createElement("img");
    logo.src = logoSVG;
    logo.classList.add("logo");
    navContainer.classList.add("nav-container");
    navContainer.appendChild(logo);
    navContainer.appendChild(createSearchbar(dataRef, domElements));

    return navContainer;
}

function createSearchbar(dataRef, domElements) {
    const searchContainer = document.createElement("div");
    const searchbar = document.createElement("input");
    searchbar.placeholder = "ZIP or city name";
    const searchBtn = document.createElement("img");
    // searchBtn.textContent = "Search";
    searchBtn.src = magnifyingGlassSVG;
    searchBtn.classList.add("search-icon");
    searchbar.addEventListener("keydown", (e) => {
        if (e.key === "Enter")
            getWeatherData(searchbar.value).catch(err => alert(err)).then((data) => {
                dataRef = data;
                domElements.forEach((i, index) => i.updateElement = dataRef.forecast.forecastday[index]);
        }); 
    });

    searchBtn.addEventListener("click", () => {
        getWeatherData(searchbar.value).catch(err => alert(err)).then(data => {
            dataRef = data;
            domElements.forEach((i, index) => i.updateElement = dataRef.forecast.forecastday[index]);
        }); 
    });

    searchContainer.appendChild(searchbar);
    searchContainer.appendChild(searchBtn);
    searchContainer.classList.add("search-container");
    return searchContainer; 
}

async function getWeatherData(city) {
    const data = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${WEATHERAPI_KEY}&q=${city}&days=3`).catch(err => err);
    if (data instanceof Error)
        throw data;
    const json = await data.json();
    document.querySelector("#curr-city").textContent = json.location.name;
    document.querySelector("#curr-country").textContent = json.location.country;
    return json;
}

export {createNav};
