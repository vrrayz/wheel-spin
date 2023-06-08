import { keyframes } from "styled-components"

export const spinAnimation = (rotateTo: number) =>{
    const rotate = keyframes`
    to{
        transform: rotate(${rotateTo}deg);
    }
    `
    return rotate;
}