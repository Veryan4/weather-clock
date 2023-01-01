import { css } from "lit";

export const styles = css`
    .forecast-item {
        display: flex;
        flex-direction:column;
        justify-content:center;
        align-items: center;
    }
    .forecast {
        display: flex;
        justify-content: center;
        padding: 1rem 0;
        border-radius: 1rem;
        background-color: var(--accent-bg-color);
    }
    .forecast.wide {
        flex-direction: column;
    }
    .current .temperature {
        font-size: 8rem;
    }
    .forecast-text {
        margin: 0;
        color: var(--clock-color);
    }
`;