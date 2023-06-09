import React, { useCallback, useState } from "react";
// import logo from "./logo.svg";
import "./App.css";
import { styled } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationPin } from "@fortawesome/free-solid-svg-icons";
import { useArrayToFill } from "./hooks/useArrayToFill";
import { spinAnimation } from "./helpers/spinAnimation";
import { SpinAnimationProperties } from "./types";
import { Wheel } from "./components/Wheel";
import { MultiplierButtons } from "./components/MultiplierButtons";

export const App = () => {
  const { spinValues, arrObj } = useArrayToFill();
  const [spinAnimationValues, setSpinAnimationValues] =
    useState<SpinAnimationProperties>({ ...spinValues });

  console.log(arrObj);
  const setSpinValues = useCallback((animationValues: SpinAnimationProperties) => {
    setSpinAnimationValues({...animationValues})
  },[]);
  const generateRotateNumber = useCallback(() => {
    const spinValues = {
      currentSpinTime: 1,
      currentKeyFrame: spinAnimation(360),
      animationCount: "infinite",
      animationTimingFunction: "linear",
    };
    setSpinValues(spinValues);

    const rotateToIndex = Math.floor(Math.random() * arrObj.length);
    const rotateTo = arrObj[rotateToIndex].rotate;

    console.log("Rotating to ", rotateToIndex, " index");
    console.log("Rotating to ", rotateTo, " degrees");
    console.log("Rotating to ", arrObj[rotateToIndex].color, " color");
    setTimeout(() => {
      const spinValues = {
        currentSpinTime: 3,
        currentKeyFrame: spinAnimation(rotateTo),
        animationCount: "1",
        animationTimingFunction: "ease-out",
      };
    setSpinValues(spinValues);
    }, 5000);
  }, [arrObj, setSpinValues]);
  return (
    <>
    <Container>
      <Pointer>
        <FontAwesomeIcon icon={faLocationPin} size="3x" />
      </Pointer>
      <Wheel spinAnimationValues={spinAnimationValues} innerBoxes={arrObj} />
      <SpinButton onClick={() => generateRotateNumber()}>
        <span style={{ margin: "0px auto" }}>Click</span>
        <SpinText>WINOVA</SpinText>
        <span style={{ margin: "0px auto" }}>To Spin</span>
      </SpinButton>
    </Container>
    <MultiplierButtons />
    </>
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
const SpinButton = styled.div`
  width: 180px;
  height: 180px;
  background: white;
  z-index: 2;
  position: absolute;
  display: flex;
  justify-content: center;
  flex-direction: column;
  // font-size: 2em;
  left: 87.5px;
  top: 87.5px;
  border-radius: 50%;
  font-family: "Palette Mosaic", cursive;
`;
const SpinText = styled.span`
  text-align: center;
  font-size: 32px;
  // animation: zoomInText infinite 0.5s;
`;
const Pointer = styled.div`
  position: absolute;
  text-align: center;
  z-index: 50;
  top: -25px;
  left: 153px;
`;