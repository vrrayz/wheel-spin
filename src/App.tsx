import React, { useCallback, useState } from "react";
// import logo from "./logo.svg";
import glitter from "./assets/glitter.gif";
import "./App.css";
import { styled } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faLocationPin } from "@fortawesome/free-solid-svg-icons";
import { useArrayToFill } from "./hooks/useArrayToFill";
import { spinAnimation } from "./helpers/spinAnimation";
import { SpinAnimationProperties } from "./types";
import { Wheel } from "./components/Wheel";
import { MultiplierButtons } from "./components/MultiplierButtons";

type RoundResult = "won" | "lost";

export const App = () => {
  const { spinValues, arrObj } = useArrayToFill();
  const [canSpin, setCanSpin] = useState(true);
  const [isButtonsDisabled, setisButtonsDisabled] = useState(false);
  const [isRoundEnded, setIsRoundEnded] = useState(false);
  const [roundResult, setRoundResult] = useState<RoundResult>();
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
        <RoundResultOverlay>
          <RoundMessageContainer>
            <ResultMessage>You {roundResult}</ResultMessage>
            <ResultAmount className={roundResult}>1999</ResultAmount>
          </RoundMessageContainer>
          <CloseButton onClick={resetRound}>
            <FontAwesomeIcon icon={faClose} size="2x" />
          </CloseButton>
          {roundResult === 'won' && <img src={glitter} alt="Glitter" />}
        </RoundResultOverlay>
      )}
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
const RoundResultOverlay = styled.div`
  background-color: rgba(0, 0, 0, 0.9);
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  z-index: 100;
  font-family: "Lexend", sans-serif;
  text-align: center;
  color: #fff;
`;
const ResultMessage = styled.h3`
  font-size: 56px;
  margin-bottom: 8px;
`;
const ResultAmount = styled.p`
  font-size: 65px;
  margin-top: 8px;
  &.won {
    color: green;
  }
  &.lost {
    color: red;
  }
`;
const CloseButton = styled.button`
  background: transparent;
  border: none;
  color: #fff;
  position: absolute;
  top: 12px;
  right: 12px;
`;
const RoundMessageContainer = styled.div`
  // position: absolute;
  // margin-top: 20px;
`;
