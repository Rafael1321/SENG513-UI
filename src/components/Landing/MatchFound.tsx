import * as React from "react";
import styled from "styled-components";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { LoggedUserContext } from "../../contexts/LoggedUserContext";
import { MatchedUserContext } from "../../contexts/MatchedUserContext";

export default function MatchFound() {
  // Contexts
  const loggedUserContext = useContext(LoggedUserContext);
  const matchedUserContext = useContext(MatchedUserContext);

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
      <MatchContainer>
        <MatchFoundText>Match Found</MatchFoundText>
        <FindDuoContainer>
          <ProfileDiv>
            <Teammate
              icon={loggedUserContext?.loggedUser?.avatarImage}
            ></Teammate>
            <p>
              {loggedUserContext?.loggedUser?.displayName ?? "<username 1>"}
            </p>
          </ProfileDiv>

          <CountDownText>{countdown}</CountDownText>
          <ProfileDiv>
            <Teammate
              icon={matchedUserContext?.matchedUser?.avatarImage}
            ></Teammate>
            <p>
              {matchedUserContext?.matchedUser?.displayName ?? "<username 2>"}
            </p>
          </ProfileDiv>
        </FindDuoContainer>
      </MatchContainer>
    </>
  );
}

const MatchContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProfileDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

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

const Teammate = styled.img<{ icon: string }>`
  min-width: 9rem;
  min-height: 9rem;

  background: url(${(props) => props.icon});

  background-size: contain;
  background-repeat: no-repeat;

  display: flex;
  flex-direction: column;
  justify-content: center;
  border-color: rgb(102, 194, 169, 0.5);
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
`;

const FindDuoContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  padding: 0 15%;

  @media (max-width: 1025px) {
    justify-content: space-between;
  }

  @media (max-width: 769px) {
    flex-direction: column;
    justify-content: space-evenly;
  }
`;
