import { css } from "lit";

export const styles = css`
  .main {
    display: flex;
    justify-content: center;
    height: 98vh;
    align-items: center;
  }

  .face {
    position: relative;
    margin: 0 auto;
    background: linen;
    border: 16px solid goldenrod;  
    border-radius: 50%;
    width: 256px;
    height: 256px;  
    z-index: 2;
    padding:6px;
  }

  .time {
    position: absolute;
    left: 50%;  
    color: #666;
    width: 4px;
    margin-left: -2px;
    height: 258px;  
  }

  .time-1-7 {
    transform: rotate(30deg);
    -webkit-transform: rotate(30deg) translate3d(0, 0, 0);  
  }

  .time-2-8 {
    transform: rotate(60deg);
    -webkit-transform: rotate(60deg) translate3d(0, 0, 0);
  }

  .time-3-9 {  
    transform: rotate(90deg);
    -webkit-transform: rotate(90deg) translate3d(0, 0, 0);  
  }

  .time-4-10 {
    transform: rotate(-60deg);
    -webkit-transform: rotate(-60deg) translate3d(0, 0, 0);  
  }

  .time-5-11 {
    transform: rotate(-30deg);
    -webkit-transform: rotate(-30deg) translate3d(0, 0, 0);  
  }

  .time::before {
    content:'XII';
    font-size: 24px;
    position: absolute;
    left:-14px;
    top:-6px;	
  }

  .time::after {
    content:'VI';
    font-size: 24px;
    position: absolute;
    left:-6px;
    bottom:-6px;
    -webkit-transform: rotate(180deg) translate3d(0, 0, 0);
    transform: rotate(180deg) translate3d(0, 0, 0);
    -webkit-transform-origin: 50%  51%;  	  	
  }

  .time-1-7::before {
    content:'I';	
    left:-2px;
  }

  .time-1-7::after {
    content:'VII';	
    left:-14px;
  }

  .time-2-8::before {
    content:'II';
    left:-6px;
  }

  .time-2-8::after {
    content:'VIII';
    left:-18px;
  }

  .time-3-9::before {
    content:'III';	
    left:-10px;
  }

  .time-3-9::after {
    content:'IX';	
    left:-10px;
  }

  .time-4-10::before {
    content:'X';	
    left:-6px;	
  }

  .time-4-10::after {
    content:'IV';
    left:-10px;
  }

  .time-5-11::before {
    content:'XI';	
    left:-10px;
  }

  .time-5-11::after {
    content:'V';	
    left:-6px;
  }

  .hour {
    position: absolute;
    top: 56px;
    left: 50%;
    margin-left: -8px; 
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;	
    border-bottom: 80px solid #333;
    transform-origin: bottom;
    -webkit-transform-origin: bottom;			
    z-index: 5;
  }

  .minute {
    position: absolute;
    top: 36px;
    left: 50%;
    margin-left: -8px; 
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;	
    border-bottom: 100px solid #333;
    transform-origin: bottom;
    -webkit-transform-origin: bottom; 
    z-index: 3;
  }

  .second {
    position: absolute;
    top: 36px;
    left: 50%;
    margin-left: -4px;
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;	
    border-bottom: 100px solid black;
    transform-origin: bottom;
    -webkit-transform-origin: bottom;	
    z-index: 5;
  }

  .center {
    position: absolute;
    top: 50%;
    margin-top: -12px;
    left: 50%;
    margin-left: -12px;
    border-radius: 50%;
    background: black;
    width: 24px;
    height: 24px;
    z-index: 20;		
  }


  @media only screen and (max-width: 752px) {
    .main {
    }
  }
`;
