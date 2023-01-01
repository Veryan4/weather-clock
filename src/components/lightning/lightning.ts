import { LitElement, html, svg } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { styles } from "./lightning.styles";

@customElement("app-lightning")
class LightningComponent extends LitElement {
  static styles = [styles];
  
  flashCounter = 0;
  flashesInterval = 0;
  flashOnHold = false;

  @property({ type: String })
  innerFlashColor = 'rgb(40,40,56)';

  @property({ type: String })
  outerFlashColor = 'rgb(59,59,64)';

  @property({ type: Number })
  maxFlashes = 2;

  @state()
  flash = false;

  @state()
  flicker = false;

  render() {
    const gen = this.generateLightningXY();
    return html`
      ${this.flashCounter <= this.maxFlashes ? this.createOuterFlashSVG(gen): ""}
      ${this.createInnerFlashSVG()}
    `;
  }

  async connectedCallback() {
    super.connectedCallback();
    this.flashesInterval = setInterval(()=> this.fireStorm(), 5000);
  }

  disconnectedCallback(): void {
    clearInterval(this.flashesInterval);
    super.disconnectedCallback();
  }

  prcnt(a:number,b:number) {
    return parseInt(String(a * b / 100), 10);
  }

  generateLightningXY() {
    const h = window.innerHeight;
    const w = window.innerWidth;
    const xMax = this.prcnt(16,w); 
    const yMin = this.prcnt(7,h);
    const yMax = this.prcnt(25,h);
    const x = [];
    const y = [];
    const xy = [];
    let step = 0;
    const a = w/2;
    const b = w/1.5;
    const e = b/2;
    const flashInitX = a + Math.random() * b-e|0;
    for (let i = 0; i < 50; i++) {
      const g = 20 + Math.random() * yMax|0;
      step += g;
      y[i] = step|0;
      if (step > h){break}
    }
    y.push(0);
    y.sort((a: number,b: number)  => { return a - b;});
    x[0] = flashInitX;
    y[0]= 0;
    for (let i = 0; i < y.length; i++) {
      if ((y[i+1] - y[i] < yMin)) {
        x[i+1] = x[i] + Math.floor(Math.random() * 10-5);
      } else {
        x[i+1] = x[i] + Math.floor(Math.random() * xMax - (xMax/2));
      }
      xy[i] = x[i]+','+y[i]+' ';
    }
    return xy
  }

  createOuterFlashSVG(gen: string[]) {
    const lightningWidth = Math.round(1 + Math.random() * 2)|0;
    return svg`<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" style="visibility:visible;-webkit-filter: drop-shadow( 0 0 20px ${this.outerFlashColor} );">
        <g filter="url(#scatter)">
          <path d="M ${gen}" fill="none" stroke="#fff" stroke-width="${lightningWidth}" filter="url(#glow)"/>
        </g>
      </svg>`;
  }

  fireStorm() {
    this.flashOnHold=false;this.flashCounter=0;this.runFlash();
  }

  runFlash() {
    if (!this.flashOnHold) {
      this.flicker = false;
      this.flash = true;
      const r = 30 + Math.random() * 700|0;
      setTimeout(() => this.runFlicker(), r);
    }
  }

  runFlicker() {
    if (!this.flashOnHold) {
      this.flicker = true;
      this.flash = false;
      const r = 16 + Math.random() * 300|0;
      if (this.flashCounter > this.maxFlashes) {
        this.flashOnHold = true;
        this.flash = false;
        this.flicker = false;
      }  
      else {
        this.flashCounter++;
        setTimeout(() => this.runFlash(), r); 
      }
    } 
  }

  createInnerFlashSVG() {
    return svg`
    <svg xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="scatter" width="2" height="2" y="-.5" x="-.5" color-interpolation-filters="sRGB">
          <feGaussianBlur stdDeviation="0.6" result="result1"/>
          <feBlend in2="result1" result="fbSourceGraphic" mode="multiply"/>
          <feTurbulence baseFrequency=".015" type="fractalNoise" numOctaves="6" result="result3"/>
          <feDisplacementMap in="fbSourceGraphic" xChannelSelector="R" yChannelSelector="G" scale="60" result="result2" in2="result3"/>
          <feMorphology radius="0" operator="dilate" result="result4"/>
          <feBlend mode="screen" in2="result2"/>
        </filter>
        <filter id="glow" color-interpolation-filters="sRGB">
          <feFlood flood-opacity="1" flood-color="${this.innerFlashColor}" result="flood"/>
          <feComposite in="flood" in2="SourceGraphic" operator="in" result="composite1"/>
          <feGaussianBlur in="composite1" stdDeviation="10" result="blur"/>
          <feOffset dx="0" dy="0" result="offset"/>
          <feComposite in="SourceGraphic" in2="offset" result="composite2"/>
        </filter>
      </defs>
    </svg>`
  }

}
