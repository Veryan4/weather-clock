import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { styles } from "./rain.styles";

@customElement("app-rain")
class RainComponent extends LitElement {
  static styles = [styles];

  @property({ type: Number })
  numberOfDroplets = 600;

  @property({ type: Number })
  dropletWidth = 1;

  render() {
    return [...Array(this.numberOfDroplets).keys()].map((i) => {
      const left = (parseInt(String(Math.random() * 100))) + '%';
      const delay = (Number(Math.random().toFixed(3)) * 3 ) + 's';
      const opacity = Number(Math.random().toFixed(2)) * 0.5;

      return html`<div class="droplet" style="left:${left };animation-delay:${delay};opacity:${opacity};width:${this.dropletWidth}px;"></div>`
    })
  }

}
