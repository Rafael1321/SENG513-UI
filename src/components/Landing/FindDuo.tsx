import * as React from "react";
import styled, { keyframes } from "styled-components";
import { useState, useEffect } from "react";

export default function FindDuo(props: any) {
  let agents: Array<string> = [
    "/Images/Icons/Astra_icon.webp",
    "Images/Icons/Breach_icon.webp",
    "Images/Icons/Brimstone_icon.webp",
    "Images/Icons/Chamber_icon.webp",
    "Images/Icons/Cypher_icon.webp",
    "Images/Icons/Fade_icon.webp",
    "Images/Icons/Harbor_icon.webp",
    "Images/Icons/Jett_icon.webp",
    "Images/Icons/KAYO_icon.webp",
    "Images/Icons/Killjoy_icon.webp",
    "Images/Icons/Neon_icon.webp",
    "Images/Icons/Omen_icon.webp",
    "Images/Icons/Phoenix_icon.webp",
    "Images/Icons/Raze_icon.webp",
    "Images/Icons/Reyna_icon.webp",
    "Images/Icons/Sage_icon.webp",
    "Images/Icons/Skye_icon.webp",
    "Images/Icons/Sova_icon.webp",
    "Images/Icons/Viper_icon.webp",
    "Images/Icons/Yoru_icon.webp",
  ];

  const [index, setIndex] = useState(0);

  function changeAgent() {
    index + 1 > 19 ? setIndex(0) : setIndex(index + 1);
  }

  useEffect(() => {
    setTimeout(changeAgent, 750);
  });

  return (
    <FindDuoContainer>
      <img src={props.imgSrc} alt="My Icon"></img>
      <Line></Line>
      <Teammate icon={agents[index]}>
        <p id="question-mark">&#63;</p>
      </Teammate>
    </FindDuoContainer>
  );
}

const FindDuoContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  padding: 0 15%;

  & img,
  div {
    border-radius: 50%;
    border: 5px solid #66c2a9;
    height: 9rem;
    width: 9rem;
    z-index: 4;
    transition: all 0.5s ease-in-out;
    background-color: #266152;

    @media (max-width: 1025px) {
      height: 8rem;
      width: 8rem;
    }

    @media (max-width: 480px) {
      height: 7rem;
      width: 7rem;
    }
  }

  @media (max-width: 769px) {
    flex-direction: column;
  }
`;

const Teammate = styled.div<{ icon: string }>`
  min-width: 9rem;
  min-height: 9rem;

  background: linear-gradient(rgba(0, 0, 0, 1), rgba(8, 71, 50, 0.2)),
    url(${(props) => props.icon});

  background-size: contain;
  background-repeat: no-repeat;

  display: flex;
  flex-direction: column;
  justify-content: center;
  border-color: rgb(102, 194, 169, 0.5);

  & #question-mark {
    font-size: 5rem;
    font-weight: 600;

    color: #c3c3c3;
    z-index: 6;
  }
  @media (max-width: 1025px) {
    min-height: 8rem;
    min-width: 8rem;
  }
  @media (max-width: 480px) {
    min-height: 7rem;
    min-width: 7rem;
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
