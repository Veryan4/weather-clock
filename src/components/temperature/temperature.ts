import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import { WeatherController } from "../../controllers";
import { styles } from "./temperature.styles";

@customElement("app-temperature")
class TemperatureComponent extends LitElement {
  static styles = [styles];

  private weather = new WeatherController(this);

  render() {
    return this.weather.current ? html`
    <div class="current">
        <div class="temperature">
          ${this.weather.current.temp}°
        </div>
    </div>
    ` : "";
  }
}
