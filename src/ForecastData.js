class ForecastData {
    constructor(city) {
        this.city = city;
    }

    get data() {
        getWeatherData(city).then((json) => {
            return json();
        })
        throw new Error("City not recognized");
    } 

    async getWeatherData(city) {
        const data = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${WEATHERAPI_KEY}`).catch();
        if (data instanceof Error)
            throw data;
        const json = await data.json();
        return json();
        //TODO
    }
    
}