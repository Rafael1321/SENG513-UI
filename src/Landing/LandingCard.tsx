import * as React from "react";
import styled from "styled-components";
import Profile from "./Profile";
import FindDuo from "./FindDuo";
import MatchFound from "./MatchFound";

export default function LandingCard(props: any) {
  const displayCard = () => {
    if (!props.findDuo) {
      return <Profile></Profile>;
    // TODO: UNCOMMENT WHEN YOU GET IT WORKING
    //} else if (props.findDuo && !props.matchFound) {
    //  return <FindDuo imgSrc={props.imgSrc}></FindDuo>;
    //} else if (props.findDuo && props.matchFound) {
    }else if (props.findDuo) {
      return <MatchFound></MatchFound>;
    }
  };

  return <Card>{displayCard()}</Card>;
}

const Card = styled.div`
  background-color: #282828;
  margin: 5%;
  width: 50vw;
  height: 55vh;

  border-radius: 46px;
  box-shadow: 0 0 7.5px #66c2a9;
  text-align: center;
  color: white;

  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (max-width: 1025px) {
    width: 75vw;
  }

  @media (max-width: 769px) {
    width: 80vw;
    height: 65vh;
  }
`;
