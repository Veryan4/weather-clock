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
      </div>
      <div class="clock-wrap">
        <slot></slot>
      </div>
      <div class="forecast">
        ${this.weather.forecast.map(weather => 
          html`
          <div class="forecast-item">
            <img src=${`/weather-icons/${weather.icon}.png`}>
            <p class="forecast-text">${weather.temp}°</p>
          </div>`
        )}
      </div>
    </div>
    ` : "";
  }

}
