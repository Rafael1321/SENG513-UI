import * as React from "react";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function MatchFound(props: any) {
  // State
  const [countdown, setCountdown] = useState(3);

  /* Navigation */
  const navigate = useNavigate();

  useEffect(() => {
    if (countdown > 0) {
      // Use setTimeout to schedule an update to the countdown state
      // every 1 second. When the countdown reaches 0, clear the
      // timeout so the interval stops.
      const timeout = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => {
        clearTimeout(timeout);
      };
    } else {
      setTimeout(() => {
        navigate("../chat");
      }, 1000);
    }
  }, [countdown]);

  return (
    <>
      <MatchFoundText>Match Found</MatchFoundText>
      <FindDuoContainer>
        <Teammate icon={props.imgSrc}>
          <p>{props.name}</p>
        </Teammate>
        <CountDownText>{countdown}</CountDownText>
        <Teammate icon={"Images/Icons/Astra_icon.webp"}>
          <p>Astra</p>
        </Teammate>
      </FindDuoContainer>
    </>
  );
}

const MatchFoundText = styled.p`
  font-family: "valorant";
  font-size: 2.8vw;
  margin: 0;
  padding: 0vw 0;
`;

const CountDownText = styled.p`
  color: #f94b4b;
  font-size: 5vw;
  width: 5vw;
  font-family: "valorant";
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
`;

const FindDuoContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
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

  @media (max-width: 1025px) {
    justify-content: space-between;
  }

  @media (max-width: 769px) {
    flex-direction: column;
    justify-content: space-evenly;
  }
`;
