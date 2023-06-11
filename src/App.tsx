import React, { useCallback, useState } from "react";
// import logo from "./logo.svg";
import "./App.css";
import { styled } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationPin } from "@fortawesome/free-solid-svg-icons";
import { useArrayToFill } from "./hooks/useArrayToFill";
import { spinAnimation } from "./helpers/spinAnimation";
import { RoundResultType, SpinAnimationProperties } from "./types";
import { Wheel } from "./components/Wheel";
import { MultiplierButtons } from "./components/MultiplierButtons";
import { RoundResult } from "./components/RoundResult";
import { Wager } from "./components/Wager";


export const App = () => {
  const { spinValues, arrObj } = useArrayToFill();
  const [canSpin, setCanSpin] = useState(true);
  const [isButtonsDisabled, setisButtonsDisabled] = useState(false);
  const [isRoundEnded, setIsRoundEnded] = useState(false);
  const [roundResult, setRoundResult] = useState<RoundResultType>();
  const [spinAnimationValues, setSpinAnimationValues] =
    useState<SpinAnimationProperties>({ ...spinValues });
  const [selectedMultiplier, setSelectedMultiplier] = useState<number>(0);


  const generateRotateNumber = useCallback(() => {
    if (canSpin && selectedMultiplier > 0) {
      setCanSpin(false); // Dont allow the user to spin again while the current spin is running
      setisButtonsDisabled(true); // Dont allow the user to click on button multipliers while the current spin is running

      const spinValues = {
        currentSpinTime: 1,
        currentKeyFrame: spinAnimation(360),
        animationCount: "infinite",
        animationTimingFunction: "linear",
      };
      setSpinAnimationValues({ ...spinValues });

      const rotateToIndex = Math.floor(Math.random() * arrObj.length);
      const rotateTo = arrObj[rotateToIndex].rotate;

      console.log("Rotating to ", rotateToIndex, " index");
      console.log("Rotating to ", rotateTo, " degrees");
      console.log("Rotating to ", arrObj[rotateToIndex].color, " color");
      console.log("Selected ", selectedMultiplier);

      const announceResult = (index: number) => {
        setTimeout(() => {
        setIsRoundEnded(true);
          setRoundResult(
            selectedMultiplier === arrObj[index].colorIndex
              ? "won"
              : "lost"
          );
        },8500)
      }

      setTimeout(() => {
        console.log(
          "The actual result is ",
          selectedMultiplier === arrObj[rotateToIndex].colorIndex
        );
        const spinValues = {
          currentSpinTime: 3,
          currentKeyFrame: spinAnimation(rotateTo),
          animationCount: "1",
          animationTimingFunction: "ease-out",
        };
        setSpinAnimationValues({ ...spinValues });
        // setCanSpin(true)
        // setisButtonsDisabled(false);// user can click on button multipliers after the current spin is done
      }, 5000);
      announceResult(rotateToIndex)
    }
  }, [arrObj, canSpin, selectedMultiplier]);

  const resetRound = useCallback(() => {
    setCanSpin(true)
    setisButtonsDisabled(false);// user can click on button multipliers after the current spin is done
    setIsRoundEnded(false);
    setSpinAnimationValues({...spinValues})
  },[spinValues])
  return (
    <GameContainer>
      <Balance>1000 SCROLL</Balance>
      <WheelContainer>
        <Pointer>
          <FontAwesomeIcon icon={faLocationPin} size="3x" />
        </Pointer>
        <Wheel spinAnimationValues={spinAnimationValues} innerBoxes={arrObj} />
        <SpinButton onClick={() => generateRotateNumber()}>
          <span style={{ margin: "0px auto" }}>Click</span>
          <SpinText>WINOVA</SpinText>
          <span style={{ margin: "0px auto" }}>To Spin</span>
        </SpinButton>
      </WheelContainer>
      <MultiplierButtons
        isButtonDisabled={isButtonsDisabled}
        setSelectedMultiplier={setSelectedMultiplier}
      />
      {isRoundEnded && (
        <RoundResult roundResult={roundResult} resetRound={resetRound} />
      )}
      <Wager />
    </GameContainer>
  );
};

const GameContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;
const WheelContainer = styled.section`
  position: relative;
  width: 355px;
  height: 355px;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 42px;
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
  left: 87.5px;
  top: 87.5px;
  border-radius: 50%;
  font-family: "Palette Mosaic", cursive;
`;
const SpinText = styled.span`
  text-align: center;
  font-size: 32px;
`;
const Pointer = styled.div`
  position: absolute;
  text-align: center;
  z-index: 50;
  top: -25px;
  left: 153px;
`;
const Balance= styled.p`
text-align: right;
padding-right: 12px;
font-size: 18px;
font-weight: 400;
font-family: 'Titillium Web',sans-serif;
`