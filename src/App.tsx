import React, { useCallback, useEffect, useState } from "react";
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
import { ErrorMessage } from "./components/styled";

export const App = () => {
  const { spinValues, arrObj } = useArrayToFill();
  const [canSpin, setCanSpin] = useState(true);
  const [isButtonsDisabled, setisButtonsDisabled] = useState(false);
  const [isRoundEnded, setIsRoundEnded] = useState(false);
  const [roundResult, setRoundResult] = useState<RoundResultType>();
  const [spinAnimationValues, setSpinAnimationValues] =
    useState<SpinAnimationProperties>({ ...spinValues });
  const [selectedMultiplier, setSelectedMultiplier] = useState<number>(0);
  const [errorExist, setErrorExist] = useState(false);
  const [userBalance, setUserBalance] = useState<number>(10000);
  const [currentPNL, setCurrentPNL] = useState<number>(0);
  const [winRate, setWinRate] = useState<string[]>([])
  const [winChances, setWinChances] = useState<string[]>([])

  const generateRotateNumber = useCallback(
    (stakeAmount: number) => {
      if (canSpin && selectedMultiplier > 0) {
        setCanSpin(false); // Dont allow the user to spin again while the current spin is running
        setisButtonsDisabled(true); // Dont allow the user to click on button multipliers while the current spin is running
        setUserBalance((prev) => prev - stakeAmount);

        const spinValues = {
          currentSpinTime: 1,
          currentKeyFrame: spinAnimation(360),
          animationCount: "infinite",
          animationTimingFunction: "linear",
        };
        setSpinAnimationValues({ ...spinValues });


        let rotateToIndex = Math.floor(Math.random() * arrObj.length);
        let rotateTo = arrObj[rotateToIndex].rotate;
       
        // check if win chances is empty - if it is. allow roll
        if(winChances.length > 0){
          // So this should reduce the win rate
          if(winChances[Math.floor(Math.random() * winChances.length)] === 'reduceChance' && selectedMultiplier === arrObj[rotateToIndex].colorIndex){
            if(rotateToIndex === 47) rotateToIndex -= 1
            else{
              rotateToIndex += 1
            }
            rotateTo = arrObj[rotateToIndex].rotate;
          }
        }

        console.log("Rotating to ", rotateToIndex, " index");
        console.log("Rotating to ", rotateTo, " degrees");
        console.log("Rotating to ", arrObj[rotateToIndex].color, " color");
        console.log("Selected ", selectedMultiplier);

        const announceResult = (index: number) => {
          setTimeout(() => {
            setIsRoundEnded(true);
            setRoundResult(
              selectedMultiplier === arrObj[index].colorIndex ? "won" : "lost"
            );
            setWinRate(prev => [...prev, selectedMultiplier === arrObj[index].colorIndex ? "won" : "lost"])
            setWinChances(prev => [...prev, selectedMultiplier === arrObj[index].colorIndex ? "reduceChance" : ""])
            const returns =
              selectedMultiplier === arrObj[index].colorIndex
                ? selectedMultiplier * stakeAmount
                : -stakeAmount;
            setCurrentPNL(returns);
            setUserBalance((prev) => prev + (returns > 0 ? returns : 0));
          }, 8500);
        };

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
        }, 5000);
        announceResult(rotateToIndex);
      }
      setErrorExist(selectedMultiplier === 0);
    },
    [arrObj, canSpin, selectedMultiplier, winChances]
  );

  const resetRound = () => {
    setCanSpin(true);
    setisButtonsDisabled(false); // user can click on button multipliers after the current spin is done
    setIsRoundEnded(false);
    setSpinAnimationValues({ ...spinValues });
    // setSelectedMultiplier(0);
  };

  useEffect(() => {
    const winPercentage = winRate.filter(x => x === 'won').length
    console.log('User has won ',winPercentage,' out of ',winRate.length,' games')
  },[winRate])
  return (
    <GameContainer>
      <Balance>{userBalance} WIN</Balance>
      <WheelContainer>
        <Pointer>
          <FontAwesomeIcon icon={faLocationPin} size="3x" />
        </Pointer>
        <Wheel spinAnimationValues={spinAnimationValues} innerBoxes={arrObj} />
        <SpinButton /*onClick={() => generateRotateNumber()}*/>
          <span style={{ margin: "0px auto" }}>Click</span>
          <SpinText>Wager</SpinText>
          <span style={{ margin: "0px auto" }}>To Spin</span>
        </SpinButton>
      </WheelContainer>
      {errorExist && (
        <ErrorMessage style={{ textAlign: "center" }}>
          You need to select a multiplier
        </ErrorMessage>
      )}
      <MultiplierButtons
        isButtonDisabled={isButtonsDisabled}
        setSelectedMultiplier={setSelectedMultiplier}
      />
      {isRoundEnded && (
        <RoundResult
          roundResult={roundResult}
          currentPNL={currentPNL}
          resetRound={resetRound}
        />
      )}
      <Wager
        stakeAndSpin={generateRotateNumber}
        isButtonDisabled={isButtonsDisabled}
      />
    </GameContainer>
  );
};

const GameContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  overflow-x:hidden;
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
  font-family: "Titillium Web", sans-serif;
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
const Balance = styled.p`
  text-align: right;
  padding-right: 12px;
  font-size: 16px;
  font-weight: 600;
  font-family: "Titillium Web", sans-serif;
`;
