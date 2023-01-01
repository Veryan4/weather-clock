import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { styles } from "./snow.styles";

@customElement("app-snow")
class SnowComponent extends LitElement {
  static styles = [styles];

  @property({ type: Number })
  numberOfSnowflakes = 500;

  render() {
    return [...Array(this.numberOfSnowflakes).keys()].map((i) => {
      const left = (parseInt(String(Math.random() * 100))) + '%';
      const size = Math.floor(Math.random() * 11 + 5) + 'px';
      const delay = (Number(Math.random().toFixed(3)) * 10)+ 's';
      const snowFallDuration = Math.floor(Math.random() * 5 + 10);
      const snowDriftDuration = Math.floor(Math.random() * 4 + 4);
      const duration = snowFallDuration + 's, ' + snowDriftDuration + 's';
      const opacity = Number(Math.random().toFixed(2)) * 0.7;

      return html`<div class="snowflake" style="left:${left};width:${size};height:${size};animation-delay:${delay};animation-duration:${duration};opacity:${opacity}"></div>`
    })
  }


}
