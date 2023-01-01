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
.weather-container {
	position: absolute;
	width: 100vw;
	height: 100vh;
	overflow: hidden;
}
.snow {
	background-image: linear-gradient(to bottom, #b4d6fc 0%, #9caade 100%);
}
.snow .snowflake-container {
	position: relative;
	left: -10%;
	width: 120%;
	height: 100%;
}
.rain {
	background-image: linear-gradient(to bottom, #2daff6 0%, #75fae2 100%);
}
.rain.storm {
	background-image: linear-gradient(to bottom, #a9bcc7 0%, #5d6664 100%);
}
.clear-day.morning {
	background-image: linear-gradient(to bottom, #eb75d7 0%, #2daff6 100%);
}
.clear-day.mid-day {
	background-image: linear-gradient(to bottom, #2daff6 0%, #75fae2 100%);
}
.clear-day.evening  {
	background-image: linear-gradient(to bottom, #eb75d7 0%, #2daff6 100%);
}
.clear-day .sun {
	position: absolute;
	border-radius: 50%;
	width: 140px;
	height: 140px;
}
.clear-day.morning .sun {
	background-color: #e68f5a;
	bottom: -80px;
	left: 75%;
}
.clear-day.mid-day .sun {
	background-color: #fade62;
	top: -80px;
	left: 55%;
}
.clear-day.evening .sun {
	background-color: #e68f5a;
	bottom: -80px;
	left: 25%;
}
.partly-cloudy {
	background-image: linear-gradient(to bottom, #3ee0f7 0%, #5089f4 100%);
}
.cloudy {
	background-image: linear-gradient(to bottom, #a9aeb1 0%, #ebecec 100%);
}
`;