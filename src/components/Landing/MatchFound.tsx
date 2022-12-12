import * as React from "react";
import styled from "styled-components";

// HARKE IF YOU ARE READING THIS, THIS IS THE FILE YOU MANIPULATE
export default function MatchFound(props: any) {
  // Red text at the center of the screen which counts down from 3 to 0
  var countdown = document.createElement('div');
  countdown.style.color = 'red';
  countdown.style.fontSize = '100px';
  countdown.style.textAlign = 'center';
  countdown.style.position = 'absolute';
  countdown.style.top = '50%';
  countdown.style.left = '50%';
  countdown.style.transform = 'translate(-50%, -50%)';
  document.body.appendChild(countdown);
  var count = 3;
  var countdownInterval = setInterval(function() {
    countdown.innerHTML = ""+count;
    count--;
    if (count < 0) {
      clearInterval(countdownInterval);
      countdown.innerHTML = '';
    }
  }, 1000);
 
  return <div></div>;

}

/*
import * as React from "react";
import styled from "styled-components";
import { useState } from "react";

import LandingCard from "./LandingCard";

export default function Landing(props: any) {
  let duoFound = false;
  let playerIconSrc = "/Images/Icons/Astra_icon.webp";
  const [findDuo, setFindDuo] = useState(false);

  function clickedFindDuo() {
    setFindDuo(true);
  }

  function clickedCancel() {
    setFindDuo(false);
  }

  return (
    <LandingPage>
      <Nav>
        <Logo>
          <h2 id="valorant">VALORANT</h2>
          <h1 id="duofinder">DUOFINDER</h1>
        </Logo>
        <User>
          <p id="username">{props.username}</p>
          <img id="profilePic" src={playerIconSrc} alt="Player Icon"></img>
        </User>
      </Nav>
      <LandingContent>
        <Container>
          <LandingCard
            findDuo={findDuo}
            duoFound={duoFound}
            imgSrc={playerIconSrc}
          ></LandingCard>
          {findDuo ? (
            <Cancel onClick={clickedCancel}>&#10005; CANCEL</Cancel>
          ) : (
            <FindDuo onClick={clickedFindDuo}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                id="magnifyingGlass"
              >
                <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352c79.5 0 144-64.5 144-144s-64.5-144-144-144S64 128.5 64 208s64.5 144 144 144z" />
              </svg>
              FIND DUO
            </FindDuo>
          )}
        </Container>
      </LandingContent>
    </LandingPage>
  );
}

const LandingPage = styled.div`
  background-color: #181818;
  margin: 0px;
  padding: 0px;
  min-height: 100vh;
  min-width: 100vw;
  box-sizing: border-box;

  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const Nav = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  position: relative;
  padding-top: 1rem;
  transition: all 0.25s ease-in-out;

  @media (max-width: 769px) {
    position: static;
    flex-direction: column;
    justify-content: center;
    padding-top: 1.5rem;
  }
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
    transition: all 0.5s ease-in-out;

    @media (max-width: 769px) {
      font-size: 1.35rem;
    }

    @media (max-width: 480px) {
      font-size: 1rem;
    }
  }

  & #duofinder {
    color: white;
    font-size: 3rem;
    margin: 0px;
    padding: 0px;
    font-weight: 200;
    transition: all 0.5s ease-in-out;

    @media (max-width: 769px) {
      font-size: 2rem;
    }
    @media (max-width: 480px) {
      font-size: 1.5rem;
    }
  }
  @media (max-width: 769px) {
    position: static;
    transform: translateX(0);
  }
`;

const User = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: auto;
  padding-right: 1rem;
  font-family: "Poppins", sans-serif;
  font-size: 1rem;
  font-weight: 300;
  transition: all 0.25s ease-in-out;

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
    background-color: #425852;

    @media (max-width: 769px) {
      height: 40px;
      width: 40px;
    }
  }

  @media (max-width: 769px) {
    font-size: 0.75rem;
    padding-right: 0;
    margin: 2.5% auto;
  }
`;

const LandingContent = styled.div`
  display: flex;
  flex: row;
  justify-content: center;
  height: 80vh;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

const FindDuo = styled.button`
  background-color: #66c2a9;
  border: none;
  border-radius: 8px;
  color: white;
  font-family: "Poppins", sans-serif;
  font-weight: 700;
  font-size: 1em;
  padding: 10px 20px;
  transition: 0.5s;

  display: flex;
  flex-direction: row;
  width: 150px;

  &:hover {
    box-shadow: 0 0 7.5px #66c2a9;
    cursor: pointer;
  }

  & #magnifyingGlass {
    fill: white;
    width: 16px;
    height: 16px;
    padding: 3px 10px 5px 0px;
  }

  @media (max-width: 769px) {
    margin: 5%;
  }
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

  width: 150px;

  &:hover {
    box-shadow: 0 0 7.5px #66c2a9;
    cursor: pointer;
  }
  @media (max-width: 769px) {
    margin: 5%;
  }
`;

 * */
