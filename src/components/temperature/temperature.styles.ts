import { css } from "lit";

export const styles = css`
    .current {
        display: flex;
        flex-direction:column;
        justify-content:center;
        align-items: center;
        padding: 0 1rem;
        border-radius: 1rem;
        background-color: var(--accent-bg-color);
    }
    .current .temperature {
        font-size: 8rem;
        color: var(--clock-color);
    }
`;