import * as React from "react";
import styled, { keyframes } from "styled-components";

export default function FindDuo(props: any) {
  return (
    <FindDuoContainer>
      <Picture src={props.imgSrc}></Picture>
      <Line></Line>
      <Picture src={props.imgSrc} id="matchedPerson"></Picture>
    </FindDuoContainer>
  );
}

const FindDuoContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0 17.5%;
`;

const Picture = styled.img`
  border-radius: 50%;
  border: 5px solid #66c2a9;
  height: 9rem;
  width: 9rem;
  z-index: 4;

  & #matchedPerson {
    filter: brightness(45%);
  }
`;

const Bounce = keyframes`
    100%{
        transform: translateX(110%);
        z-index: 2;
    }

    0%{
        transform: translateX(-110%);
        z-index: 2;
    }
`;

const Line = styled.span`
  border: none;
  border-top: 2.5px solid #66c2a9;
  box-shadow: 0 0 5px white;
  width: 30%;
  animation: ${Bounce} 2.5s ease-in-out infinite alternate;
`;
