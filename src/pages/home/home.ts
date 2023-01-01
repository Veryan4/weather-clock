import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import { classMap } from "lit-html/directives/class-map.js";
import { themeService, weatherService } from "../../services";
import { DeviceController } from "../../controllers";
import { styles } from "./home.styles";

import "../../components/forecast/forecast";
import "../../components/temperature/temperature";
import "../../components/weather/weather";
import "../../components/clock/clock";

@customElement("clock-home")
class HomeComponent extends LitElement {
  static styles = [styles];

  private device = new DeviceController(this);

  private weatherInterval = 0;
  private nextHorizon = 0;
  private themeSet = false;

  latitude = "45.24"; // defaults to Lac-Brome
  longitude = "-72.65"; // defaults to Lac-Brome

  render() {
  return html`
    <div class="main" @click=${this.requestFullscreen}>
      <app-weather>
        <div class="content-wrap ${classMap({ wide: this.device.isWiderThanTall })}">
          <app-temperature></app-temperature>
            <app-clock></app-clock>
          <app-forecast></app-forecast>
        </div>
      </app-weather>
    </div>`;
  }

  async connectedCallback() {
    super.connectedCallback();
    this.getLocation();
    this.weatherInterval = setInterval(this.setWeather, 900000);
  }

  async setWeather() {
    const [current, _] = await weatherService.getWeather(this.latitude, this.longitude);

    const sunset = new Date(current.sunset * 1000).getTime();
    const sunrise = new Date(current.sunrise * 1000).getTime();
    const now = Date.now();
    if (sunrise >= now) {
      const timeUntil = sunrise - now;
      const timeUntilInHours = timeUntil / 60 / 60 / 1000;
      if (timeUntilInHours <= 1) {
        clearTimeout(this.nextHorizon);
        this.nextHorizon = setTimeout(() => themeService.changeTheme("light"), timeUntil);
      }
    } else if (sunset >= now) {
      const timeUntil = sunset - now;
      const timeUntilInHours = timeUntil / 60 / 60 / 1000;
      if (timeUntilInHours <= 1) {
        clearTimeout(this.nextHorizon);
        this.nextHorizon = setTimeout(() => themeService.changeTheme("dark"), timeUntil);
      }
    }

    if(!this.themeSet) {
      if (sunrise < now && now < sunset) {
        themeService.changeTheme("light")
      } else {
        themeService.changeTheme("dark")
      }
      this.themeSet = true;
    }
  }

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.latitude = this.formatCoordinate(position.coords.latitude);
          this.longitude = this.formatCoordinate(position.coords.longitude);
          this.setWeather();
        },
        () => this.setWeather()
      );
    } else {
      this.setWeather()
    }
  }

  formatCoordinate(value: number){
    return String(value.toFixed(2));
  }

  disconnectedCallback(): void {
    clearInterval(this.weatherInterval);
    clearTimeout(this.nextHorizon);
    super.disconnectedCallback();
  }
}
