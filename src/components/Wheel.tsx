import React from 'react'
import { styled } from "styled-components";
import { InnerBoxProperties, SpinAnimationProperties, WheelIndexProperties } from '../types';

interface WheelProperties{
    spinAnimationValues: SpinAnimationProperties,
    innerBoxes: WheelIndexProperties[],
}

export const Wheel = ({spinAnimationValues, innerBoxes}: WheelProperties) => {
let rotate = 0;
  return (
    <WheelBox $animationProps={{ ...spinAnimationValues }}>
        <InnerBoxContainer>
          {innerBoxes.map((x, index) => {
            if (index > 0) {
              rotate -= 7.49999999;
            }
            return (
              <InnerBox
                key={index}
                $measures={{
                  rotate: rotate * -1,
                  zindex: index === 0 ? 1 : 0,
                  color: x.color,
                }}
              />
            );
          })}
        </InnerBoxContainer>
      </WheelBox>
  )
}

const WheelBox = styled.div<{ $animationProps: SpinAnimationProperties }>`
  width: 336px;
  height: 336px;
  margin: auto;
  border-radius: 50%;
  background-color: #1e1c25;
  position: relative;
  overflow: hidden;
  transform: rotate(0deg);
  animation: ${(props) => props.$animationProps.currentKeyFrame}
    ${(props) => props.$animationProps.animationCount}
    ${(props) => props.$animationProps.currentSpinTime}s;
  animation-timing-function: ${(props) =>
    props.$animationProps.animationTimingFunction};
  animation-fill-mode: forwards;
`;
const InnerBoxContainer = styled.div`
  position: relative;
  margin: auto;
  width: 336px;
  height: 336px;
`;
const InnerBox = styled.div<{ $measures: InnerBoxProperties }>`
  width: 7px;
  top: 0px;
  left: ${(props) => (props.$measures.left ? props.$measures.left : 157)}px;
  transform-origin: bottom;
  transform: rotate(${(props) => props.$measures.rotate}deg);
  position: absolute;
  border-top: 168px solid ${(props) => props.$measures.color};
  // border-left: 5px solid transparent;
  border-right: 15px solid ${(props) => props.$measures.color};
  height: 0;
`;