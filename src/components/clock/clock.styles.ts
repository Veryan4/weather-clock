import { css } from "lit";

export const styles = css`
  .clock-wrap {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .clock-dial {
    position:absolute;
    max-height: 79vw;
    max-width: 79vw;
  }
  .clock-dial.wide {
    max-height: 79vh;
    max-width: 79vh;
  }
  .clock {
    width:80vw;
    height:80vw;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: transparent;
    background-position: center center;
    background-size: cover;
    border-radius: 50%;
    border: 12px solid var(--main-bg-color);
    box-shadow: 0 -15px 15px rgba(255, 255, 255, 0.05),
      inset 0 -15px 15px rgba(255, 255, 255, 0.05), 0 15px 15px rgba(0, 0, 0, 0.3),
      inset 0 15px 15px rgba(0, 0, 0, 0.3);
    transition: all ease 0.2s;
  }
  .clock.wide {
    width: 80vh;
    height: 80vh;
  }
  .clock:before {
    content: "";
    height: 5vw;
    width: 5vw;
    background-color: var(--main-text-color);
    border: 6px solid var(--main-bg-color);
    position: absolute;
    border-radius: 50%;
    z-index: 1000;
    transition: all ease 0.2s;
  }
  .wide.clock:before {
    height: 5vh;
    width: 5vh;
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
    height: 44vw;
    width: 44vw;
    z-index: 100;
  }
  .clock.wide .hour {
    height: 46vh;
    width: 46vh;
  }
  .hour:before {
    content: "";
    position: absolute;
    height: 50%;
    width: 18px;
    background-color: var(--clock-color);
    border-radius: 18px;
  }
  .min {
    height: 66vw;
    width: 62vw;
    z-index: 101;
  }
  .clock.wide .min {
    height: 66vh;
    width: 66vh;
  }
  .min:before {
    content: "";
    height: 50%;
    width: 12px;
    background-color: var(--clock-color);
    border-radius: 12px;
  }
  .sec {
    height: 74vw;
    width: 74vw;
    z-index: 102;
  }
  .clock.wide .sec {
    height: 74vh;
    width: 74vh;
  }
  .sec:before {
    content: "";
    height: 60%;
    width: 6px;
    background-color: #f00;
    border-radius: 6px;
  }
`;
