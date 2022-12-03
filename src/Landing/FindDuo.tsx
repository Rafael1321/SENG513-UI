import * as React from "react";
import styled, { keyframes } from "styled-components";

export default function FindDuo(props: any) {
  return (
    <LandingContent>
      <Card>
        <img src={props.imgSrc} className="picture"></img>
        <Line></Line>
        <img src={props.imgSrc} className="picture" id="teammate"></img>
      </Card>
      <Cancel onClick={props.setFindDuo}>&#10005; CANCEL</Cancel>
    </LandingContent>
  );
}

const LandingContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Card = styled.div`
  background-color: #282828;
  margin: 7% 5% 5% 5%;
  width: 720px;
  height: 400px;

  border-radius: 46px;
  box-shadow: 0 0 7.5px #66c2a9;
  text-align: center;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  & .picture {
    border-radius: 50%;
    border: 5px solid #66c2a9;
    height: 9rem;
    width: 9rem;
    z-index: 4;
  }

  & #teammate {
    filter: brightness(45%);
  }
`;

const Bounce = keyframes`
    100%{
        transform: translateX(100%);
    }
    50%{
        transform:translate(0);
 
    }
    0%{
        transform: translateX(-100%);
        z-index: 2;
    }
`;

const Line = styled.span`
  border: none;
  border-top: 2.5px solid #66c2a9;
  box-shadow: 0 0 5px white;

  width: 20%;
  margin: 0;
  animation: ${Bounce} 2.5s ease-in-out infinite alternate;
`;

const Cancel = styled.button`
  background-color: #66c2a9;
  border: none;
  border-radius: 8px;
  color: white;
  font-family: "Poppins", sans-serif;
  font-weight: 700;
  font-size: 1em;
  padding: 10px 20px;
  transition: 0.5s;

  &:hover {
    box-shadow: 0 0 7.5px #66c2a9;
    cursor: pointer;
  }
`;
