import * as React from "react";
import styled from "styled-components";
import { useState } from "react";

export default function Landing(props: any) {
  const [findDuo, setFindDuo] = useState(false);

  return (
    <LandingPage>
      <Nav>
        <Logo>
          <h2 id="valorant">VALORANT</h2>
          <h1 id="duofinder">DUOFINDER</h1>
        </Logo>
        <User>
          <p id="username">{props.username}</p>
          <button disabled id="profilePic"></button>
        </User>
      </Nav>
      <LandingContent>
        <div id="card">PP POOPOO</div>
        <button id="findDuo">FIND DUO</button>
      </LandingContent>
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

const LandingContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & #card {
    background-color: #282828;
    margin: 7% 5% 5% 5%;
    width: 760px;
    height: 400px;

    border-radius: 46px;
    box-shadow: 0 0 7.5px #66c2a9;
    text-align: center;
    color: white;
  }

  & #findDuo {
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
    }
  }
`;
