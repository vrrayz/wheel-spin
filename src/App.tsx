import React, { useCallback, useState } from "react";
// import logo from "./logo.svg";
import "./App.css";
import { styled } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationPin } from "@fortawesome/free-solid-svg-icons";
import { useArrayToFill } from "./hooks/useArrayToFill";
import { Keyframes } from "styled-components/dist/types";
import { spinAnimation } from "./helpers/spinAnimation";

interface InnerBoxProperties {
  rotate: number;
  zindex?: number;
  color: string;
}

export const App = () => {
  const arrayToFill = useArrayToFill();
  const [currentKeyFrame, setCurrentKeyFrame] = useState<Keyframes>(spinAnimation(360))
  const [spinTime, setSpinTime] = useState(10)
  const [animationCount, setAnimationCount] = useState('infinite');


  let rotate = 0;

  const generateRotateNumber = useCallback(() =>{
    setSpinTime(1);
    const rotateTo = Math.floor(Math.random() * 361);
    console.log("Rotating to ",rotateTo,' degrees')
    setTimeout(()=>{
      setCurrentKeyFrame(spinAnimation(rotateTo))
      setSpinTime(3)
      setAnimationCount('1')
    }, 5000)
  },[])

  return (
    <Container>
      <Pointer>
        <FontAwesomeIcon icon={faLocationPin} size="3x" />
      </Pointer>
      <WheelBox $currentSpinTime={spinTime} $currentKeyFrame={currentKeyFrame} $animationCount={animationCount}>
        {arrayToFill.map((x, index) => {
          if(index > 0){
            rotate += 7.5
          }
          return  <InnerBox
          key={index}
          $measures={{
            rotate: rotate,
            zindex: index === 0 ? 1:0,
            color: x,
          }}
        />;
        })}
      </WheelBox>
      <SpinButton onClick={()=>generateRotateNumber()}>
          <span style={{margin: '0px auto'}}>Click</span>
          <SpinText>WINOVA</SpinText>
          <span style={{margin: '0px auto'}}>To Spin</span>
        </SpinButton>
    </Container>
  );
};

const Container = styled.section`
position: relative;
width: 355px;
height: 355px;
margin: auto;
display: flex;
flex-direction: column;
justify-content: center;
margin-top: 120px;
border-top: 4px solid black;
border-radius: 50%;
`;

const WheelBox = styled.div<{$currentSpinTime: number, $currentKeyFrame: Keyframes, $animationCount: string}>`
  width: 336px;
  height: 336px;
  margin: auto;
  border-radius: 50%;
  background-color: #1e1c25;
  position: relative;
  overflow: hidden;
  // transform: rotate(360deg);
  animation: ${(props) => props.$currentKeyFrame} ${(props) => props.$animationCount} ${(props) => props.$currentSpinTime}s linear;
  animation-fill-mode: forwards;
`;
const InnerBox = styled.div<{ $measures: InnerBoxProperties }>`
  width: 15px;
  top: 0px;
  left: 160.5px;
  transform-origin: bottom;
  transform: rotate(${(props) => props.$measures.rotate}deg);
  position: absolute;
  border-top: 180px solid ${(props) => props.$measures.color};
      border-left: 5px solid transparent;
      border-right: 5px solid transparent;
      height: 0;
`;
const SpinButton = styled.div`
width: 180px;
height: 180px;
background: white;
z-index: 2;
position:absolute;
display:flex;
justify-content:center;
flex-direction:column;
// font-size: 2em;
left: 87.5px;
top: 87.5px;
border-radius: 50%;
font-family: 'Palette Mosaic', cursive;
`
const SpinText = styled.span`
text-align:center;
font-size: 32px;
// animation: zoomInText infinite 0.5s;
`
const Pointer = styled.div`
position: absolute;
text-align:center;
z-index: 50;
top:-22px;
left:159.5px;
`