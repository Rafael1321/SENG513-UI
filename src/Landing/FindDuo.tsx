import * as React from "react";
import styled from "styled-components";

export default function FindDuo(props: any) {
  let findDuo = false;
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
      <div className="landingBody"></div>
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
    font-size: 3rem;
    margin: 0px;
    padding: 0px;
    font-weight: 200;
  }

  & #duofinder {
    color: white;
    font-size: 4rem;
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
  font-family: "Poppins";

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
