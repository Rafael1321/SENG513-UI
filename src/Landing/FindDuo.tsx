import * as React from "react";
import styled, { keyframes } from "styled-components";

export default function FindDuo(props: any) {
  return (
    <FindDuoContainer>
      <img src={props.imgSrc}></img>
      <Line></Line>
      <img src={props.imgSrc} id="matchedPerson"></img>
    </FindDuoContainer>
  );
}

const FindDuoContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  padding: 0 15%;

  & img {
    border-radius: 50%;
    border: 5px solid #66c2a9;
    height: 9rem;
    width: 9rem;
    z-index: 4;
    transition: all 0.5s ease-in-out;

    @media (max-width: 1025px) {
      height: 8rem;
      width: 8rem;
    }
  }

  & #matchedPerson {
    filter: brightness(45%);
  }

  @media (max-width: 769px) {
    flex-direction: column;
  }
`;

const Bounce = keyframes`
    100%{
        transform: translateX(100%);
        z-index: 2;
    }
    0%{
        transform: translateX(-100%);
        z-index: 2;
    }
`;

const Bounce1025 = keyframes`
    100%{
        transform: translateX(120%);
        z-index: 2;
    }
    0%{
        transform: translateX(-120%);
        z-index: 2;
    }
`;

const Bounce769 = keyframes`
    100%{
        transform: translateY(115%);
        z-index: 2;
    }
    0%{
      transform: translateY(-115%);
        z-index: 2;
    }
`;

const Line = styled.span`
  border: 2.5px solid #66c2a9;
  border-radius: 10px;
  background-color: #66c2a9;

  width: 30%;
  animation: ${Bounce} 2.5s ease-in-out infinite alternate;

  @media (max-width: 1025px) {
    width: 25%;
    animation: ${Bounce1025} 2.5s ease-in-out infinite alternate;
  }
  @media (max-width: 769px) {
    width: 1px;
    height: 100px;
    border: 2.5px solid #66c2a9;
    animation: ${Bounce769} 2.5s ease-in-out infinite alternate;
  }
`;
