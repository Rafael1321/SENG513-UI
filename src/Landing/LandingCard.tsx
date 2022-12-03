import * as React from "react";
import styled from "styled-components";
import Profile from "./Profile";
import FindDuo from "./FindDuo";
import MatchFound from "./MatchFound";

export default function LandingCard(props: any) {
  const displayCard = () => {
    if (!props.findDuo) {
      return <Profile></Profile>;
    } else if (props.findDuo && !props.matchFound) {
      return <FindDuo imgSrc={props.imgSrc}></FindDuo>;
    } else if (props.findDuo && props.matchFound) {
      return <MatchFound></MatchFound>;
    }
  };

  return <Card>{displayCard()}</Card>;
}

const Card = styled.div`
  background-color: #282828;
  margin: 5%;
  width: 720px;
  height: 400px;

  border-radius: 46px;
  box-shadow: 0 0 7.5px #66c2a9;
  text-align: center;
  color: white;
  transition: all 0.25s ease-in-out;

  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (max-width: 769px) {
    width: 400px;
    height: 500px;
  }
`;
