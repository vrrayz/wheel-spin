import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { styled } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationPin } from "@fortawesome/free-solid-svg-icons";

interface InnerBoxProperties {
  rotate: number;
  zindex?: number;
  color: string;
}

export const App = () => {
  const arrayToFill = [];
  const colorIndex = [
    48, 2, 3, 2, 6, 2, 3, 2, 3, 2, 6, 2, 6, 2, 3, 2, 3, 2, 3, 2, 6, 2, 3, 2, 3, 2,
    6, 2, 6, 2, 3, 2, 3, 2, 3, 2, 6, 2, 3, 2, 3, 2, 3, 2, 6, 2, 3, 2,
  ];
  let rotate = 0;
  // 2 is slateblue
  // 3 is dogerblue
  // 6 is darkkhaki
  // 48 is salmon
  for (let index = 0; index <= colorIndex.length; index++) {
    if (colorIndex[index] === 48) arrayToFill.push("salmon");
    if (colorIndex[index] === 6) arrayToFill.push("darkkhaki");
    if (colorIndex[index] === 3) arrayToFill.push("dodgerblue");
    if (colorIndex[index] === 2) arrayToFill.push("slateblue");
  }
  return (
    <Container>
      <Pointer>
        <FontAwesomeIcon icon={faLocationPin} size="3x" />
      </Pointer>
      <WheelBox>
        {arrayToFill.map((x, index) => {
          if(index > 0){
            rotate += 7.5
          }
          return  <InnerBox
          measures={{
            rotate: rotate,
            zindex: index === 0 ? 1:0,
            color: x,
          }}
        />;
        })}
      </WheelBox>
      <SpinButton>
          <SpinText>WINOVA</SpinText>
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

const WheelBox = styled.div`
  width: 336px;
  height: 336px;
  margin: auto;
  border-radius: 50%;
  background-color: #1e1c25;
  position: relative;
  overflow: hidden;
  // transform: rotate(90deg);
  animation: App-logo-spin infinite 10s linear;
`;
const InnerBox = styled.div<{ measures: InnerBoxProperties }>`
  width: 15px;
  top: 0px;
  left: 160.5px;
  transform-origin: bottom;
  transform: rotate(${(props) => props.measures.rotate}deg);
  position: absolute;
  border-top: 180px solid ${(props) => props.measures.color};
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
// width:20px;
// height: 50px;
z-index: 50;
top:-22px;
left:159.5px;
`