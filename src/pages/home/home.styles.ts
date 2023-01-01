import { css } from "lit";

export const styles = css`
  .main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    cursor:none;
  }
  .content-wrap {
    width: 50rem;
    display: flex;
    flex-direction:column;
    justify-content:center;
    gap: 5rem;
    align-items: center;
    z-index: 1;
  }
  .content-wrap.wide {
    flex-direction: row;
  }
`;
