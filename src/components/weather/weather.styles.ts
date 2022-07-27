import { css } from "lit";

export const styles = css`
    .weather-wrap{
        width: 50rem;
    }
    .weather-wrap, .forecast-item, .current {
        display: flex;
        flex-direction:column;
        justify-content:center;
        align-items: center;
    }
    .clock-wrap {
        margin: 5rem 0;
    }
    .current, .forecast {
        display: flex;
        justify-content: center;
    }
    .current .temperature {
        font-size: 5rem;
    }
    .forecast-text {
        margin: 0;
    }
`;