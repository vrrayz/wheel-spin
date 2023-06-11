import React, { useState } from "react";
import { styled } from "styled-components";
import { ErrorMessage } from "./styled";

interface WagerProperties {
    stakeAndSpin: (stakeAmount: number) => void;
}

export const Wager = ({stakeAndSpin}:WagerProperties) => {
    const [amount, setAmount] = useState<number>()
    const [errorExist, setErrorExist] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const verifyAndWager = () => {
        // console.log("Here")
        if(!amount || amount <= 0){
            setErrorExist(true)
            setErrorMessage("Minimum stake is 1 WIN")
        }else{
            setErrorExist(false)
            setErrorMessage("")
            stakeAndSpin(amount)
        }
    }
  return (
    <WagerSection>
        {errorExist && <ErrorMessage>{errorMessage}</ErrorMessage>}
      <WagerInput type="number" placeholder="Wager Amount" className={errorExist ? 'error':''} value={amount} onChange={(e) => setAmount(Number(e.target.value))}/>
      <ButtonStakeContainer>
        <WagerButton onClick={verifyAndWager}>
            Wager
        </WagerButton>
        <ApproveButton disabled>
            Approve
        </ApproveButton>
      </ButtonStakeContainer>
    </WagerSection>
  );
};
const WagerSection = styled.section`
margin: 16px;
`;
const WagerInput = styled.input`
// padding-left: 8px;
  width: 350px;
  margin: auto;
  font-size: 14px;
  height: 35px;
  border: 1px solid #aaa;
  transition: 100ms border linear;
  &.error{
    border: 1px solid red;
}
`;
const ButtonStakeContainer = styled.div`
display: flex;
justify-content: space-between;
margin: 12px 0px;
`
const Button = styled.button`
color: #fff;
    padding: 12px 16px;
    font-size: 14px;
    width: 150px;
    border: none;
    border-radius: 3px;
    text-transform: uppercase;
    font-family: 'Titillium Web',sans-serif;
    font-weight: 600;
`
const WagerButton = styled(Button)`
background: #406e25;
`
const ApproveButton = styled(Button)`
background: dodgerblue;

&:disabled{
background: rgba(30,144,255,.6);
}
`