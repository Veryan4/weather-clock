import { css } from "lit";

export const styles = css`
  .main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 98vh;
  }

  .clock-wrap {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 5rem;
  }
  .weather-wrap{
    width: 50rem;
  }

  .clock {
    min-height: 54em;
    min-width: 54em;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--main-bg-color);
    background-image: url("/clock.png");
    background-position: center center;
    background-size: cover;
    border-radius: 50%;
    border: 12px solid var(--main-bg-color);
    box-shadow: 0 -15px 15px rgba(255, 255, 255, 0.05),
      inset 0 -15px 15px rgba(255, 255, 255, 0.05), 0 15px 15px rgba(0, 0, 0, 0.3),
      inset 0 15px 15px rgba(0, 0, 0, 0.3);
    transition: all ease 0.2s;
  }
  .clock:before {
    content: "";
    height: 2.25rem;
    width: 2.25rem;
    background-color: var(--main-text-color);
    border: 6px solid var(--main-bg-color);
    position: absolute;
    border-radius: 50%;
    z-index: 1000;
    transition: all ease 0.2s;
  }
  .hour,
  .min,
  .sec {
    position: absolute;
    display: flex;
    justify-content: center;
    border-radius: 50%;
  }
  .hour {
    height: 30em;
    width: 30em;
  }
  .hour:before {
    content: "";
    position: absolute;
    height: 50%;
    width: 18px;
    background-color: var(--main-text-color);
    border-radius: 18px;
  }
  .min {
    height: 36em;
    width: 36em;
  }
  .min:before {
    content: "";
    height: 50%;
    width: 12px;
    background-color: var(--main-text-color);
    border-radius: 12px;
  }
  .sec {
    height: 39em;
    width: 39em;
  }
  .sec:before {
    content: "";
    height: 60%;
    width: 6px;
    background-color: #f00;
    border-radius: 6px;
  }

`;
