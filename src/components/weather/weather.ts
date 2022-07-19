import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import * as XWeather from 'x-weather'
XWeather.defineCustomElements()

@customElement("app-weather")
class WeatherComponent extends LitElement {

  constructor() {
    super();
  }

  render() {
    return html`
      <x-weather
        style="color:var(---second-text-color);"
        appid=${import.meta.env.VITE_WEATHER_API_KEY as string}
        latitude="45.24"
        longitude="-72.65"
        placename="Lac-Brome, Quebec"
        >
        <x-current primaryscale="f"></x-current>
        <x-forecast days="4" primaryscale="f"></x-forecast>
      </x-weather>
    `;
  }
}
