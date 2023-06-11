import { faDotCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { styled } from "styled-components";
import { useArrayToFill } from "../hooks/useArrayToFill";

interface ButtonMultiplier {
  multiple: number;
  color: string;
  isActive: boolean;
}
interface MultiplierButtonsProperties{
  isButtonDisabled: boolean
  setSelectedMultiplier: (multiplier:number) => void,
}
export const MultiplierButtons = ({isButtonDisabled, setSelectedMultiplier}:MultiplierButtonsProperties) => {
  const { multipliers } = useArrayToFill();
  const [buttonMultipliers, setButtonMultipliers] =
    useState<ButtonMultiplier[]>(multipliers);
  const toggleActiveButton = (index: number, multiplier: number) => {
    setButtonMultipliers(buttonMultipliers.map((buttonMultiplier, multiplierIndex) => {
      return {...buttonMultiplier, isActive: index === multiplierIndex}
    }))
    setSelectedMultiplier(multiplier)
  };
  return (
    <ButtonsContainer>
      {buttonMultipliers.map((buttonMultiplier, index) => (
        <Button onClick={() => toggleActiveButton(index, buttonMultiplier.multiple)} key={index} disabled={isButtonDisabled}>
          <TextContainerOverlay
            className={`${buttonMultiplier.isActive && "active"}`}
            $color={buttonMultiplier.color}
          ></TextContainerOverlay>
          <TextContainer className={`${buttonMultiplier.isActive && "active"}`}>
            <FontAwesomeIcon icon={faDotCircle} color={buttonMultiplier.color} /> {buttonMultiplier.multiple}x
          </TextContainer>
        </Button>
      ))}
    </ButtonsContainer>
  );
};
const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 2px;
`;
const Button = styled.button`
  background-color: #ddd;
  border: none;
  padding: 0px;
  position: relative;
  font-size: 14px;
  width: 50px;
  height: 30px;
  border-radius: 4px;
  overflow: hidden;
`;
const TextContainerOverlay = styled.span<{$color: string}>`
  display: block;
  position: absolute;
  top: 28px;
  width: 100%;
  height: 100%;
  background-color:  ${(props) => props.$color};
  border-radius: 6px;
  transition: 100ms top linear;

  &.active {
    top: 0px;
  }
`;
const TextContainer = styled.span`
  z-index: 1;
  position: relative;
  &.active {
    color: #fff;
  }
`;
