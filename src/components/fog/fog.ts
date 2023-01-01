import { LitElement, html} from "lit";
import { customElement, property } from "lit/decorators.js";
import { styles } from "./fog.styles";

@customElement("app-fog")
class FogComponent extends LitElement {
  static styles = [styles];

  render() {
    return html`
        <div id="foglayer_01" class="fog">
            <div class="image01"></div>
            <div class="image02"></div>
        </div>
        <div id="foglayer_02" class="fog">
            <div class="image01"></div>
            <div class="image02"></div>
        </div>
        <div id="foglayer_03" class="fog">
            <div class="image01"></div>
            <div class="image02"></div>
        </div>
    `;
  }
}