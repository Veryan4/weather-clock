import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { routerService, translateService } from "./services";
import { RouteController, ToastController } from "./controllers";

@customElement("my-app")
class Clock extends LitElement {

  private router = new RouteController(this);
  private toaster = new ToastController(this);

  @property({ type: Boolean })
  hasLoadedTranslations: boolean;

  constructor() {
    super();
  }

  render() {
    return html`
      ${this.router.navigation()}
      ${this.toaster.wait()}
    `;
  }

  shouldUpdate(
    changedProperties: Map<string | number | symbol, unknown>
  ): boolean {
    return this.hasLoadedTranslations && super.shouldUpdate(changedProperties);
  }

  async connectedCallback() {
    super.connectedCallback();

    window.dispatchEvent(new CustomEvent(routerService.ROUTE_EVENT));
    window.onpopstate = () => {
      window.dispatchEvent(new CustomEvent(routerService.ROUTE_EVENT));
    };

    !this.hasLoadedTranslations &&
      (await translateService.initTranslateLanguage());
    this.hasLoadedTranslations = true;
  }
}
