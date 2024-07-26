const weatherContainer = document.createElement("div");
const dow = document.createElement("p"); //day of week
const rainChance = document.createElement("p");
const avgTemp = document.createElement("p");
const high = document.createElement("p");
const low = document.createElement("p");
const tempContainer = document.createElement("div");

weatherContainer.appendChild(dow);
avgTemp.appendChild(avgTemp);

tempContainer.appendChild(high);
tempContainer.appendChild(low);

weatherContainer.appendChild(tempContainer);
weatherContainer.appendChild(rainChance);
function createContainer() {
    return weatherContainer;
}

//expects a forecastDay json object 
function updateElement(data) {
    
}