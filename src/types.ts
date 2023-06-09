import { Keyframes } from "styled-components/dist/types";

export interface SpinAnimationProperties {
    currentSpinTime: number;
    currentKeyFrame: Keyframes;
    animationCount: string;
    animationTimingFunction: string;
  }
export interface WheelIndexProperties{
    colorIndex: number;
    color: string;
    rotate: number;
}
export interface InnerBoxProperties {
    rotate: number;
    zindex?: number;
    left?: number;
    color: string;
  }