import { indexWeekMapping, iconCodeMapping, iconURLMapping } from "./const";
class WeatherContainer {
    constructor(data){
        const weatherContainer = document.createElement("div");
        const dow = document.createElement("p"); //day of week
        const rainChance = document.createElement("p");
        const avgTemp = document.createElement("p");
        const high = document.createElement("p");
        const low = document.createElement("p");
        const highLow = document.createElement("div");
        const tempContainer = document.createElement("div");
        const condition = document.createElement("p");
        const conditionIcon = document.createElement("img"); 
        const separator = document.createElement("span");

        // separator.textContent = " | ";
        separator.classList.add("separator");

        highLow.appendChild(high);
        highLow.appendChild(separator);
        highLow.appendChild(low);

        weatherContainer.appendChild(dow);
        weatherContainer.appendChild(condition);
        weatherContainer.appendChild(conditionIcon);
        tempContainer.appendChild(avgTemp);
        tempContainer.appendChild(highLow);
        weatherContainer.appendChild(tempContainer);


        tempContainer.appendChild(rainChance);

        this.element = {
            weatherContainer, 
            dow,
            condition,
            rainChance,
            avgTemp,
            high,
            low,
            highLow,
            tempContainer,
            conditionIcon
        };
        const date = new Date(data.date);
        this.element.dow.textContent = indexWeekMapping[date.getDay()];
        this.element.rainChance.textContent = `${data.day.daily_chance_of_rain}% chance of rain`;
        this.element.condition.textContent = data.day.condition.text; 
        this.element.conditionIcon.src = data.day.condition.icon;
        let conditionIconSRC = undefined;
        console.log(typeof Object.entries(iconCodeMapping))
        for (let [key, value] of Object.entries(iconCodeMapping)) {
            if (value.includes(data.day.condition.code))
                conditionIconSRC = iconURLMapping[key]
        }
        this.element.conditionIcon.src = conditionIconSRC;
        this.element.avgTemp.textContent = `${data.day.avgtemp_f}`;
        this.element.avgTemp = WeatherContainer.formatTemp(this.element.avgTemp);
        this.element.high.textContent = `${data.day.maxtemp_f}`;
        this.element.high = WeatherContainer.formatTemp(this.element.high);
        this.element.low.textContent = `${data.day.mintemp_f}`;
        this.element.low = WeatherContainer.formatTemp(this.element.low);
        this.weatherContainer = weatherContainer;

        this.element.dow.classList.add("dow");

        avgTemp.classList.add("avg-temp");
        highLow.classList.add("hl-container");
        high.classList.add("high-temp");

        low.classList.add("low-temp");

        weatherContainer.classList.add("weather-container");

        tempContainer.classList.add("temp-container");

        condition.classList.add("condition");
        
        conditionIcon.classList.add("condition-icon");
    }

    static formatTemp(pEle) {
        const deg = document.createElement("sup");
        deg.textContent = "o";
        pEle.appendChild(deg);
        return pEle;
    }

    set updateElement(data) {
        const date = new Date(data.date);
        console.log(data);
        this.element.dow.textContent = indexWeekMapping[date.getDay()];
        this.element.rainChance.textContent = `${data.day.daily_chance_of_rain}% chance of rain`;
        this.element.condition.textContent = data.day.condition.text; 

        this.element.avgTemp.textContent = `${data.day.avgtemp_f}`;
        this.element.avgTemp = WeatherContainer.formatTemp(this.element.avgTemp);
        this.element.high.textContent = `${data.day.maxtemp_f}`;
        this.element.high = WeatherContainer.formatTemp(this.element.high);
        this.element.low.textContent = `${data.day.mintemp_f}`;
        this.element.low = WeatherContainer.formatTemp(this.element.low);
    }

}

export default WeatherContainer;