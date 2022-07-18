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
    <div class="face">
      <div class="hour" style=${styleMap(this.hourStyles)}></div>
      <div class="minute" style=${styleMap(this.minuteStyles)}></div>
      <div class="second" style=${styleMap(this.secondStyles)}></div>
      <div class="center"></div>
      <div class="time time-12-6"></div>
      <div class="time time-3-9"></div>
      <div class="time time-1-7"></div>
      <div class="time time-5-11"></div>
      <div class="time time-2-8"></div>
      <div class="time time-4-10"></div>          
    </div>`;
  }

  connectedCallback() {
    super.connectedCallback();

    this.interval = setInterval(() => {
      const seconds = new Date().getSeconds();
      const sdegree = seconds * 6;
      this.secondStyles = { transform: 'rotate('+ sdegree + 'deg)'};

      const mins = new Date().getMinutes();
      const mdegree = mins * 6;
      this.minuteStyles = { transform: 'rotate('+ mdegree + 'deg)'};

      const hours = new Date().getHours();   
      const hdegree = hours * 30 + (mins / 2);   
      this.hourStyles = { transform: 'rotate('+ hdegree + 'deg)'};
    }, 1000);
  }

  disconnectedCallback(): void {
    clearInterval(this.interval);
    super.disconnectedCallback();
  }
}
