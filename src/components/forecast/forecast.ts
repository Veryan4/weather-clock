import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import { classMap } from "lit-html/directives/class-map.js";
import { DeviceController } from "../../controllers";
import { WeatherController } from "../../controllers";
import { styles } from "./forecast.styles";

@customElement("app-forecast")
class ForecastComponent extends LitElement {
  static styles = [styles];

  private weather = new WeatherController(this);
  private device = new DeviceController(this);

  render() {
    const classes = { wide: this.device.isWiderThanTall };
    return this.weather.forecast ? html`
      <div class="forecast ${classMap(classes)}">
        ${this.weather.forecast.map(weather => 
          html`
          <div class="forecast-item">
            <img src=${`/weather-icons/${weather.icon}.png`}>
            <p class="forecast-text">${weather.temp}°</p>
          </div>`
        )}
      </div>
    ` : "";
  }

}
