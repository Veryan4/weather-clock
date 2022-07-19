import { LitElement, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import { styleMap } from 'lit/directives/style-map.js';
import { themeService } from "../../services";
import { styles } from "./home.styles";

import "../../components/weather/weather";

@customElement("clock-home")
class HomeComponent extends LitElement {
  static styles = [styles];

  private secondInterval = 0;
  private minuteInterval = 0;

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
      <div class="clock-wrap" @click=${this.requestFullscreen}>
        <div class="clock">
          <div class="hour" style=${styleMap(this.hourStyles)}></div>
          <div class="min" style=${styleMap(this.minuteStyles)}></div>
          <div class="sec" style=${styleMap(this.secondStyles)}></div>
        </div>
      </div>
      <div class="weather-wrap">
        <app-weather></app-weather>
      </div>
    </div>`;
  }

  connectedCallback() {
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

    this.selectTheme();
    this.minuteInterval = setInterval(this.selectTheme, 60000)
  }

  selectTheme() {
    const hour = new Date().getHours();
    if (6 < hour && hour < 18) {
      themeService.changeTheme("light")
    } else {
      themeService.changeTheme("dark")
    }
  }

  disconnectedCallback(): void {
    clearInterval(this.secondInterval);
    clearInterval(this.minuteInterval);
    super.disconnectedCallback();
  }
}
