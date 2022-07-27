import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import { WeatherController } from "../../controllers";
import { styles } from "./weather.styles";

@customElement("app-weather")
class WeatherComponent extends LitElement {
  static styles = [styles];

  private weather = new WeatherController(this)

  constructor() {
    super();
  }

  render() {
    return this.weather.current && this.weather.current ? html`
    <div class="weather-wrap">
      <div class="current">
        <div class="temperature">
          ${this.weather.current.temp}°
        </div>
        <div class="humidity">
          h: ${this.weather.current.humidity}%
        </div>
        <div class="wind">
          wp: ${this.weather.current.windSpeed.toFixed(0)} kph
        </div>
      </div>
      <div class="clock-wrap">
        <slot></slot>
      </div>
      <div class="forecast">
        ${this.weather.forecast.map(weather => 
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
