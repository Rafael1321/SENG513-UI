import * as React from "react";
import styled from "styled-components";
import { useState, useEffect } from "react";


export default function MatchFound(props: any) {
  const [countdown, setCountdown] = React.useState(3);

  React.useEffect(() => {
    if (countdown > 0) {
      // Use setTimeout to schedule an update to the countdown state
      // every 2 seconds. When the countdown reaches 0, clear the
      // timeout so the interval stops.
      const timeout = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 2000);
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [countdown]);

  return (
    <div>
      {countdown > 0 ? (
        countdown === 3 ? (
          <div
            style={{
              color: 'white',
              fontSize: '2.5vw',
              textAlign: 'center',
              position: 'absolute',
              top: '30%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '10vw',
              height: '5vh',
            }}
          >
            Match Found!
          </div>
        ) : (
          <div
            style={{
              color: 'red',
              fontSize: '10vw',
              textAlign: 'center',
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '50vw',
              height: '50vh',
            }}
          >
            {countdown}
          </div>
        )
      ) : (
        countdown === 0 ? (
          <div
            style={{
              color: 'white',
              fontSize: '3vw',
              textAlign: 'center',
              position: 'absolute',
              top: '30%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '10vw',
              height: '10vh',
            }}
          >
            Match has started!
          </div>
        ) : (
          <div />
        )
      )}
      <FindDuoContainer>
        <Teammate icon={props.imgSrc}>
          <p>{props.name}</p>
        </Teammate>
        <Teammate icon={"Images/Icons/Astra_icon.webp"}>
          <p>Astra</p>
        </Teammate>
    </FindDuoContainer>
  </div>
);
}

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
