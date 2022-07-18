import { ReactiveControllerHost, noChange, html } from "lit";
import {
  ChildPart,
  DirectiveParameters,
  directive,
  DirectiveResult,
} from "lit/directive.js";
import { AsyncDirective } from "lit/async-directive.js";
import { Route } from "../models";
import { routerService } from "../services";
import "../components/loader/loader";

class RouteDirective extends AsyncDirective {
  private currentRoute: string;

  update(part: ChildPart, [route]: DirectiveParameters<this>) {
    // target element can be accessed from part
    return this.render(route);
  }

  render(route: Route) {
    if (this.currentRoute === route.name) {
      return noChange;
    }
    this.currentRoute = route.name;
    route.component().then((resolvedValue) => {
      // Rendered asynchronously:
      this.setValue(resolvedValue);
    });
    return html`<app-loader></app-loader>`;
  }
}
const routeDirective = directive(RouteDirective);

export class RouteController {
  private host: ReactiveControllerHost;

  routes: Route[] = [
    {
      name: "home",
      pattern: "",
      component: () =>
        import("../pages/home/home").then(() => html`<clock-home></clock-home>`),
    }
  ];

  activeRoute: Route = this.routes[0];

  navigation(): DirectiveResult<typeof RouteDirective> {
    return routeDirective(this.activeRoute);
  }

  _changeRoute = (e: CustomEvent) => {
    const uri = decodeURI(window.location.pathname);
    let nextRoute = this.routes.find(
      (route) =>
        route.pattern !== "*" && routerService.testRoute(uri, route.pattern)
    );
    if (nextRoute) {
      if (nextRoute.name !== this.activeRoute.name) {
        this.activeRoute = nextRoute;
        this.host.requestUpdate();
      }
    } else {
      nextRoute = this.routes.find((route) => route.pattern === "*");
      if (nextRoute) {
        this.activeRoute = nextRoute;
        this.host.requestUpdate();
      }
    }
  };

  constructor(host: ReactiveControllerHost) {
    this.host = host;
    const homeRoute = this.routes.find((route) => route.pattern === "");
    if (homeRoute) {
      this.activeRoute = homeRoute;
    }

    const urlSearchParams = new URLSearchParams(location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    if (params && params.game) {
      sessionStorage.setItem("game", params.game);
    }

    host.addController(this);
  }

  hostConnected(): void {
    window.addEventListener(
      routerService.ROUTE_EVENT,
      this._changeRoute as EventListener
    );
  }

  hostDisconnected(): void {
    window.removeEventListener(
      routerService.ROUTE_EVENT,
      this._changeRoute as EventListener
    );
  }
}
