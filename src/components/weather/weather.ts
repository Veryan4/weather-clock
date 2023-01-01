import { LitElement, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import { WeatherController } from "../../controllers";
import { styles } from "./weather.styles";

import '../cloud/cloud';
import '../rain/rain';
import '../snow/snow';
import '../fog/fog';
import '../lightning/lightning';
import { SimpleWeather } from "/@/models";

@customElement("app-weather")
class WeatherComponent extends LitElement {
  static styles = [styles];

  private weather = new WeatherController(this)
  private timeOfDay: 'morning' | 'mid-day' |'evening' | 'night' = 'mid-day';

  render() {
    return html`
      <div class="main">
        ${this.weather.current ? this.weatherSwitch(this.weather.current) : ""}
        <slot></slot>
      </div>`;
  }

  weatherSwitch(currentWeather: SimpleWeather){
    const sunset = new Date(currentWeather.sunset! * 1000).getTime();
    const sunrise = new Date(currentWeather.sunrise! * 1000).getTime();
    const now = Date.now();
    const timeDistanceFromSunrise = sunrise - now;
    const hoursFromSunrise = timeDistanceFromSunrise / 60 / 60 / 1000;
    const timeDistanceFromSunset = sunset - now;
    const hoursFromSunset = timeDistanceFromSunset / 60 / 60 / 1000;
    if (hoursFromSunrise < 0 && hoursFromSunrise > -1) {
        this.timeOfDay = 'morning';
    } else if (hoursFromSunset > 0 && hoursFromSunset < 1) {
        this.timeOfDay = 'evening';
    } else if (sunset < now) {
      this.timeOfDay = 'night';
      return '';
    } else {
        this.timeOfDay = 'mid-day';
    }

    switch (this.weather.current.type) {
      case 'Rain':
        return html`${this.renderRain()}`
      case 'Drizzle':
        return html`${this.renderRain()}`
      case 'Thunderstorm':
        return html`${this.renderStorm()}`
      case 'Clouds':
        return html`${this.renderCloudy()}`
      case 'Snow':
        return html`${this.renderSnow()}`
      case 'Clear':
        return html`${this.renderClear()}`
      case 'Mist':
      case 'Haze':
      case 'Fog':
        return html`${this.renderFoggy()}`
      default:
        return ""
    }
  }

  renderClear() {
    
    return html`<div class="weather-container clear-day ${this.timeOfDay}">
      <div class="sun"></div>
    </div>`;
  }

  renderCloudy() {
    return html`<div class="weather-container cloudy">
      <app-cloud 
        .color=${'#9FA4AD'}
        .type=${1}
        .animationStart=${0}
        .animationSpeed=${10}
        .zIndex=${0}>
      </app-cloud>
      <app-cloud 
        .color=${'#8B8E98'}
        .type=${2}
        .top=${40}
        .animationStart=${3}
        .animationSpeed=${20}>
      </app-cloud>
      <app-cloud 
        .color=${'#7B7988'}
        .type=${3}
        .top=${80}
        .animationStart=${5}
        .animationSpeed=${30}>
      </app-cloud>
    </div>`
  }  

  renderFoggy() {
    return html`<div class="weather-container cloudy">
      <app-fog></app-fog>
    </div>`
  }  

  renderSnow(){
      return html`<div class="weather-container snow">
      <app-cloud 
        .color=${'#efedf7'}
        .type=${2}
        .top=${40}
        .animationStart=${3}
        .animationSpeed=${20}
        .zIndex=${1}>
      </app-cloud>
      <app-cloud 
        .color=${'white'}
        .type=${3}
        .top=${80}
        .animationStart=${5}
        .animationSpeed=${30}
        .zIndex=${2}>
      </app-cloud>
      <div class="snowflake-container">
          <app-snow .numberOfSnowflakes=${500}></app-snow>
      </div>
    </div>`
  }

  renderStorm(){
    return html`
      <div class="weather-container rain storm">
        <app-cloud 
          .color=${'#9FA4AD'}
          .type=${1}
          .animationStart=${0}
          .animationSpeed=${10}
          .zIndex=${0}>
        </app-cloud>
        <app-cloud 
          .color=${'#8B8E98'}
          .type=${2}
          .top=${40}
          .animationStart=${3}
          .animationSpeed=${20}>
        </app-cloud>
        <app-cloud 
          .color=${'#7B7988'}
          .type=${3}
          .top=${80}
          .animationStart=${5}
          .animationSpeed=${30}>
        </app-cloud>
        <div class="droplet-container">
            <app-rain .numberOfDroplets=${600} .dropletWidth=${2}></app-rain>
        </div>
        <app-lightning></app-lightning>
      </div>`
  }

  renderRain(){
    return html`<div class="weather-container rain">
      <app-cloud 
        .color=${'#efedf7'}
        .type=${2}
        .top=${40}
        .animationStart=${3}
        .animationSpeed=${20}
        .zIndex=${0}>
      </app-cloud>
      <app-cloud 
        .color=${'white'}
        .type=${3}
        .top=${80}
        .animationStart=${5}
        .animationSpeed=${30}>
      </app-cloud>
      <div class="droplet-container">
          <app-rain .numberOfDroplets=${600}></app-rain>
      </div>
    </div>`
  }

  renderDrizzle(){
    return html`<div class="weather-container rain">
      <app-cloud 
        .color=${'#efedf7'}
        .type=${2}
        .top=${40}
        .animationStart=${3}
        .animationSpeed=${20}
        .zIndex=${0}>
      </app-cloud>
      <app-cloud 
        .color=${'white'}
        .type=${3}
        .top=${80}
        .animationStart=${5}
        .animationSpeed=${30}>
      </app-cloud>
      <div class="droplet-container">
          <app-rain .numberOfDroplets=${200}></app-rain>
      </div>
    </div>`
  }
}
