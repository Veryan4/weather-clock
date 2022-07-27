import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { SimpleWeather } from "../../models";
import { styles } from "./weather.styles";

@customElement("app-weather")
class WeatherComponent extends LitElement {
  static styles = [styles];

  @property({type: Object})
  current: SimpleWeather;

  @property({type: Array})
  forecast: SimpleWeather[];

  constructor() {
    super();
  }

  render() {
    return this.current && this.forecast ? html`
    <div class="weather-wrap">
      <div class="current">
        <div class="temperature">
          ${this.current.temp}°
        </div>
        <div class="humidity">
          h: ${this.current.humidity}%
        </div>
        <div class="wind">
          wp: ${this.current.windSpeed.toFixed(0)} kph
        </div>
      </div>
      <div class="clock-wrap">
        <slot></slot>
      </div>
      <div class="forecast">
        ${this.forecast.map(weather => 
          html`
          <div class="forecast-item">
            <img src=${`http://openweathermap.org/img/wn/${weather.icon}@2x.png`}>
            <p class="forecast-text">${weather.temp}°</p>
          </div>`
        )}
      </div>
    </div>
    ` : "";
  }

}
