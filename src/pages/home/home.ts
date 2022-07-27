import { LitElement, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import { styleMap } from 'lit/directives/style-map.js';
import { themeService, weatherService } from "../../services";
import { SimpleWeather } from "../..//models";
import { styles } from "./home.styles";

import "../../components/weather/weather"


@customElement("clock-home")
class HomeComponent extends LitElement {
  static styles = [styles];

  private secondInterval = 0;
  private hourInterval = 0;
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

  @state()
  weatherObject: {current: SimpleWeather, forecast: SimpleWeather[]};

  render() {
  return html`
    <div class="main">
      <app-weather .current=${this.weatherObject?.current} .forecast=${this.weatherObject?.forecast}>
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

    this.secondInterval = setInterval(() => {
      const day = new Date();
      const hh = day.getHours() * 30;
      const mm = day.getMinutes() * deg;
      const ss = day.getSeconds() * deg;

      this.hourStyles = { transform: `rotateZ(${hh + mm / 12}deg)`};
      this.minuteStyles = { transform: `rotateZ(${mm}deg)`};
      this.secondStyles = { transform: `rotateZ(${ss}deg)`};
    }, 1000);

    this.setWeather();
    this.hourInterval = setInterval(this.setWeather, 3600000);
  }

  async setWeather() {
    const [current, forecast] = await weatherService.getWeather();
    this.weatherObject = {current, forecast};

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
    clearInterval(this.secondInterval);
    clearInterval(this.hourInterval);
    clearTimeout(this.nextHorizon);
    super.disconnectedCallback();
  }
}
