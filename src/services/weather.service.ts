import { CurrentWeather, ForecastWeather } from "../models";

const host = "https://api.openweathermap.org/data/2.5/"
const appid = import.meta.env.VITE_WEATHER_API_KEY as string
const latitude = "45.24";
const longitude= "-72.65";

export const weatherService = {
    getWeather
}

async function getWeather() {
    const [currentWeather, forecastWeather] = await Promise.all([getCurrent(), getForecast()]);
    const current = {
        temp: currentWeather.main.temp.toFixed(1),
        icon: currentWeather.weather[0].icon,
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
            humidity: weatherHour.main.humidity,
            windSpeed: weatherHour.wind.speed
        }
    })
    return [current, forecast] as const
}

async function getCurrent () {
    const url = `${host}weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${appid}`
    const weather = await fetch(url).then(res => res.json()) as CurrentWeather;
    return weather
}

async function getForecast () {
    const url = `${host}forecast?lat=${latitude}&lon=${longitude}&units=metric&cnt=9&appid=${appid}`
    const weather = await fetch(url).then(res => res.json()) as ForecastWeather;
    return weather
}