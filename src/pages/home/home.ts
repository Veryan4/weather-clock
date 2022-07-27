import { LitElement, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import { styleMap } from 'lit/directives/style-map.js';
import { themeService, weatherService } from "../../services";
import { styles } from "./home.styles";

import "../../components/weather/weather"


@customElement("clock-home")
class HomeComponent extends LitElement {
  static styles = [styles];

  private timeInterval = 0;
  private weatherInterval = 0;
  private nextHorizon = 0;

  private themeSet = false;
  
  constructor() {
    super();
  }

  @state()
  hourStyles = {};

  @state()
  minuteStyles = {};

  @state()
  secondStyles = {};

  render() {
  return html`
    <div class="main">
      <app-weather>
        <div class="clock-wrap" @click=${this.requestFullscreen}>
          <div class="clock">
            <div class="hour" style=${styleMap(this.hourStyles)}></div>
            <div class="min" style=${styleMap(this.minuteStyles)}></div>
            <div class="sec" style=${styleMap(this.secondStyles)}></div>
          </div>
        </div>
      </app-weather>
    </div>`;
  }

  async connectedCallback() {
    super.connectedCallback();

    const deg = 6;

    this.timeInterval = setInterval(() => {
      const day = new Date();
      const hh = day.getHours() * 30;
      const mm = day.getMinutes() * deg;
      const ss = day.getSeconds() * deg;

      this.hourStyles = { transform: `rotateZ(${hh + mm / 12}deg)`};
      this.minuteStyles = { transform: `rotateZ(${mm}deg)`};
      this.secondStyles = { transform: `rotateZ(${ss}deg)`};
    }, 1000);

    this.setWeather();
    this.weatherInterval = setInterval(this.setWeather, 900000);
  }

  async setWeather() {
    const [current, _] = await weatherService.getWeather();

    const sunset = new Date(current.sunset * 1000).getTime();
    const sunrise = new Date(current.sunrise * 1000).getTime();
    const now = Date.now()
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

  disconnectedCallback(): void {
    clearInterval(this.timeInterval);
    clearInterval(this.weatherInterval);
    clearTimeout(this.nextHorizon);
    super.disconnectedCallback();
  }
}
