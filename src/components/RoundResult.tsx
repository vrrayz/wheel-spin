import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import { styled } from 'styled-components';
import glitter from '../assets/glitter.gif';
import { RoundResultType } from '../types';

interface RoundResultProperties{
    roundResult: RoundResultType;
    resetRound: () => void;
    currentPNL: number
}

export const RoundResult = ({roundResult, resetRound, currentPNL}: RoundResultProperties) => {
  return (
    <RoundResultOverlay>
          <RoundMessageContainer>
            <ResultMessage>You {roundResult}</ResultMessage>
            <ResultAmount className={roundResult}>{currentPNL}</ResultAmount>
          </RoundMessageContainer>
          <CloseButton onClick={resetRound}>
            <FontAwesomeIcon icon={faClose} size="2x" />
          </CloseButton>
          {roundResult === 'won' && <img src={glitter} alt="Glitter" />}
        </RoundResultOverlay>
  )
}
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
const RoundMessageContainer = styled.div`
  // position: absolute;
  // margin-top: 20px;
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