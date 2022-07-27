import { ReactiveControllerHost } from "lit";
import { SimpleWeather } from "../models";
import { weatherService } from "../services";

export class WeatherController {
  private host: ReactiveControllerHost;
  current: SimpleWeather;
  forecast: SimpleWeather[];

  _changeWeather = (e: CustomEvent) => {
    if (e.detail.current !== this.current || e.detail.forecast !== this.forecast) {
      this.current = e.detail.current;
      this.forecast = e.detail.forecast;
      this.host.requestUpdate();
    }
  };

  constructor(host: ReactiveControllerHost) {
    this.host = host;
    host.addController(this);
  }

  hostConnected(): void {
    window.addEventListener(weatherService.WEATHER_EVENT, this._changeWeather as EventListener);
  }

  hostDisconnected(): void {
    window.removeEventListener(
      weatherService.WEATHER_EVENT,
      this._changeWeather as EventListener
    );
  }
}
