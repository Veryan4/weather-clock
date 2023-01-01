import { css } from "lit";

export const styles = css`

  @keyframes snowfalling {
    0% {
      top: -20%;
    }
    100% {
      top: 120%;
    }
  }
  @keyframes snowdrifting {
    0% {
      transform: translateX(0);
    }
    50% {
      transform: translateX(40px);
    }
    100% {
      transform: translateX(0);
    }
  }
  .snowflake {
    position: absolute;
    top: -30px;
    height: 20px;
    width: 20px;
    background-color: white;
    border-radius: 50%;
    z-index: 1;
    animation: snowfalling 10s linear infinite, snowdrifting 4s ease-in-out infinite;
  }
`;
