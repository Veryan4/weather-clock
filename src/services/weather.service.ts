import { CurrentWeather, ForecastWeather } from "../models";

const host = "https://api.openweathermap.org/data/2.5/"
const appid = import.meta.env.VITE_WEATHER_API_KEY as string
const WEATHER_EVENT = "weather-update";

export const weatherService = {
    getWeather,
    WEATHER_EVENT
}

async function getWeather(latitude: string, longitude: string) {
    const [currentWeather, forecastWeather] = await Promise.all([
        getCurrent(latitude, longitude),
        getForecast(latitude, longitude)
    ]);
    const current = {
        temp: currentWeather.main.temp.toFixed(0),
        icon: currentWeather.weather[0].icon,
        type: currentWeather.weather[0].main,
        humidity: currentWeather.main.humidity,
        windSpeed: currentWeather.wind.speed,
        sunset: currentWeather.sys.sunset,
        sunrise: currentWeather.sys.sunrise
    }

    const forecastIntervals = [2,4,6,8];
    const forecast = forecastIntervals.map(index => {
        const weatherHour = forecastWeather.list[index]
        return {
            temp: weatherHour.main.temp.toFixed(0),
            icon: weatherHour.weather[0].icon,
            type: weatherHour.weather[0].main,
            humidity: weatherHour.main.humidity,
            windSpeed: weatherHour.wind.speed
        }
    })
    window.dispatchEvent(new CustomEvent(WEATHER_EVENT, { detail: {current, forecast} }));
    return [current, forecast] as const
}

async function getCurrent(latitude: string, longitude: string) {
    const url = `${host}weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${appid}`
    const weather = await fetch(url).then(res => res.json()) as CurrentWeather;
    return weather
}

async function getForecast(latitude: string, longitude: string) {
    const url = `${host}forecast?lat=${latitude}&lon=${longitude}&units=metric&cnt=9&appid=${appid}`
    const weather = await fetch(url).then(res => res.json()) as ForecastWeather;
    return weather
}