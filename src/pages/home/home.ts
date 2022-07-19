import { LitElement, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import { styleMap } from 'lit/directives/style-map.js';
import { styles } from "./home.styles";

@customElement("clock-home")
class HomeComponent extends LitElement {
  static styles = [styles];

  private interval = 0;

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
      <div class="main" @click=${this.requestFullscreen}>
        <div class="clock">
          <div class="hour" style=${styleMap(this.hourStyles)}></div>
          <div class="min" style=${styleMap(this.minuteStyles)}></div>
          <div class="sec" style=${styleMap(this.secondStyles)}></div>
        </div>
      </div>`;
    }

  connectedCallback() {
    super.connectedCallback();

    const deg = 6;

    this.interval = setInterval(() => {
      const day = new Date();
      const hh = day.getHours() * 30;
      const mm = day.getMinutes() * deg;
      const ss = day.getSeconds() * deg;

      this.hourStyles = { transform: `rotateZ(${hh + mm / 12}deg)`};
      this.minuteStyles = { transform: `rotateZ(${mm}deg)`};
      this.secondStyles = { transform: `rotateZ(${ss}deg)`};
    }, 1000);
  }

  disconnectedCallback(): void {
    clearInterval(this.interval);
    super.disconnectedCallback();
  }
}
