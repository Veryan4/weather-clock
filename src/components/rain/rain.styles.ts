import { css } from "lit";

export const styles = css`

  @keyframes fall {
    0% {
      transform: translate(0, 0) rotate(-8deg);
    }
    100% {
      transform: translate(417px, 3000px);
    }
  }

  .droplet {
    position: absolute;
    top: -200px;
    width: 1px;
    height: 100px;
    background-color: white;
    border-radius: 5px;
    animation: fall 3s linear infinite;
  }
`;
