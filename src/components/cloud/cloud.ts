import { LitElement, html, svg } from "lit";
import { customElement, property } from "lit/decorators.js";
import { styles } from "./cloud.styles";

@customElement("app-cloud")
class CloudsComponent extends LitElement {
  static styles = [styles];

  colors = ['#9FA4AD', '#8B8E98', '#7B7988'];

  @property({ type: String })
  color = this.colors[Math.floor(Math.random() * 3)];

  @property({ type: String })
  zIndex = '1';

  @property({ type: Number })
  type = Math.floor(Math.random() * 3) + 1;

  @property({ type: Number })
  top = 0;

  @property({ type: Number })
  animationSpeed = Math.max(Math.floor(Math.random() * 30) + 1, 10);

  @property({ type: Number })
  animationStart = Math.floor(Math.random() * 5) + 1;

  render() {
    return html`
      <div class="cloud" style="z-index:${this.zIndex};animation: move ${this.animationSpeed}s linear ${this.animationStart}s infinite;">
        ${svg`
        <svg fill="${this.color}" width="200vw" viewBox="0 ${this.top} 2400 2800">
            ${this.cloudType()}
          </svg>
        `}
      </div>`
  }

  cloudType(){
    if (this.type == 1) {
      return svg`<path d="M-1440,0C-1440,0,1440,0,1440,0C2400,53.33333333333333,2400,106.66666666666666,1440,160C960,194.8645280692338,480,194.8645280692338,0,160C-480,194.8645280692338,-960,194.8645280692338,-1440,160C-2400,106.66666666666666,-2400,53.33333333333333,-1440,0"></path>`        
    } else if (this.type == 2) {
      return svg`<path d="M-1440,0C-1440,0,1440,0,1440,0C2400,43.33333333333333,2400,86.66666666666666,1440,130C960,178.37700112383635,480,178.37700112383635,0,130C-480,178.37700112383635,-960,178.37700112383635,-1440,130C-2400,86.66666666666666,-2400,43.33333333333333,-1440,0"></path>` 
    } else {
      return svg`<path d="M-1440,0C-1440,0,1440,0,1440,0C2400,33.33333333333333,2400,66.66666666666666,1440,100C960,166.5640150821394,480,166.5640150821394,0,100C-480,166.5640150821394,-960,166.5640150821394,-1440,100C-2400,66.66666666666666,-2400,33.33333333333333,-1440,0"></path>` 
    }
  }

}
