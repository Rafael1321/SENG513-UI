import * as React from "react";
import styled from "styled-components";
import { useState } from "react";
import Profile from "./Profile";
import FindDuo from "./FindDuo";
import MatchFound from "./MatchFound";

export default function Landing(props: any) {
  let matchFound = false;
  let playerIconSrc = "/Images/reyna.png";
  const [findDuo, setFindDuo] = useState(false);

  function clickedFindDuo() {
    setFindDuo(true);
  }

  function clickedCancel() {
    setFindDuo(false);
  }

  const displayCard = () => {
    if (!findDuo) {
      return <Profile setFindDuo={clickedFindDuo}></Profile>;
    } else if (findDuo && !matchFound) {
      return (
        <FindDuo setFindDuo={clickedCancel} imgSrc={playerIconSrc}></FindDuo>
      );
    } else if (findDuo && matchFound) {
      return <MatchFound></MatchFound>;
    }
  };

  return (
    <LandingPage>
      <Nav>
        <Logo>
          <h2 id="valorant">VALORANT</h2>
          <h1 id="duofinder">DUOFINDER</h1>
        </Logo>
        <User>
          <p id="username">{props.username}</p>
          <img
            id="profilePic"
            src={"/Images/reyna.png"}
            alt="Player Icon"
          ></img>
        </User>
      </Nav>
      <div>{displayCard()}</div>
    </LandingPage>
  );
}

const LandingPage = styled.div`
  background-color: #181818;
  margin: 0px;
  padding: 0px;
  height: 100vh;
  width: 100vw;
  box-sizing: border-box;
`;

const Nav = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  position: relative;
  padding-top: 1rem;
`;

const Logo = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  position: absolute;
  font-family: "valorant";

  left: 50%;
  transform: translateX(-50%);

  & #valorant {
    color: #f94b4b;
    font-size: 2rem;
    margin: 0px;
    padding-bottom: 5px;
    font-weight: 200;
  }

  & #duofinder {
    color: white;
    font-size: 3rem;
    margin: 0px;
    padding: 0px;
    font-weight: 200;
  }
`;

const User = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: auto;
  padding-right: 1rem;
  font-family: "Poppins", sans-serif;
  font-size: 1rem;
  font-weight: 100;

  & #username {
    color: white;
    padding-right: 0.5rem;
  }

  & #profilePic {
    background-color: white;
    border: none;
    border-radius: 50%;
    height: 50px;
    width: 50px;
  }
`;
