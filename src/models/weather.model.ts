class WeatherDetail {
    dt: number;
    main: {
        temp: number;
        feels_like: number;
        temp_min: number;
        temp_max: number;
        pressure: number;
        humidity: number;
    };
    wind: {
        speed: number;
        deg: number;
        gust: number;
    };
    weather: WeatherSummary[];
}

export class CurrentWeather extends WeatherDetail {
    sys: {
        sunrise: number;
        sunset: number
    };

    constructor() {
        super();
    }
}

export class ForecastWeather {
    list: WeatherDetail[]
}

export class SimpleWeather {
    icon: string;
    temp: string;
    humidity: number;
    windSpeed: number;
    sunrise?: number;
    sunset?: number
}


class WeatherSummary {
    id: number;
    main: string;
    description: string;
    icon: string;
}