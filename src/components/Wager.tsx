import React from "react";
import { styled } from "styled-components";

export const Wager = () => {
  return (
    <WagerSection>
      <WagerInput type="number" placeholder="Wager Amount" />
      <ButtonStakeContainer>
        <WagerButton>
            Wager
        </WagerButton>
        <ApproveButton>
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
  width: 335px;
  margin: auto;
  font-size: 14px;
  height: 35px;
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
`