import * as React from "react";
import styled from "styled-components";
import { useState, useEffect, useContext } from "react";
import LandingCard from "./LandingCard";
import { LoggedUserContext } from "../../contexts/LoggedUserContext";
import { SocketContext } from "../../contexts/SocketContext";
import { EnvConfig } from "../../util/EnvConfig";
import { MatchedUserContext } from "../../contexts/MatchedUserContext";
import { Micellaneous } from "../../util/Micellaneous";
import { CustomToast } from "../Shared/CustomToast";
import { FilterContext } from "../../contexts/FilterContext";
import { toast } from "react-toastify";
import { Link, useLocation } from "react-router-dom";
import { FilterPopup } from "../Shared/FilterPopup";

export default function Landing() {
  const backgroundAgents: Array<string> = [
    "/images/Astra.png",
    "/images/Breach.png",
    "/images/Brimstone.png",
    "/images/Chamber.png",
    "/images/Cypher.png",
    "/images/Fade.png",
    "/images/Harbor.png",
    "/images/Jett.png",
    "/images/KAYO.png",
    "/images/Killjoy.png",
    "/images/Neon.png",
    "/images/Omen.png",
    "/images/Phoenix.png",
    "/images/Raze.png",
    "/images/Reyna.png",
    "/images/Sage.png",
    "/images/Skye.png",
    "/images/Sova.png",
    "/images/Viper.png",
    "/images/Yoru.png",
  ];

  let playerIconIndex: number = 17;
  const {state} = useLocation();
  
  // State
  const [duoFound, setDuoFound] = useState<boolean>(false);
  const [findDuo, setFindDuo] = useState<boolean>(false);
  const [triggered, setTriggered] = React.useState(false);
  const [agentIndex, setAgentIndex] = useState(0);

  // Refs
  const pollingTimeout = React.useRef<NodeJS.Timeout>(null);

  // Contexts
  const loggedUserContext = useContext(LoggedUserContext);
  const matchedUserContext = useContext(MatchedUserContext);
  const filterContext = useContext(FilterContext);
  const socketContext = useContext(SocketContext);

  // Use Effects

  useEffect(() => {
    // Display a toast if we came from registration screen 
    if(state?.justRegistered){
      toast.warning("Please edit your gender and age to be able to be better matched!")
    }
  }, []);

  useEffect(() => {
    socketContext.emit("user_connected", loggedUserContext?.loggedUser?._id);

    // Messages from server
    socketContext.on("error_user_connected", handleSuccessOrError);
    socketContext.on("success_user_connected", handleSuccessOrError);
    socketContext.on("error_find_matching", handleSuccessOrError);
    socketContext.on("success_find_matching", handleSuccessOrError);
    socketContext.on("error_stop_matching", handleSuccessOrError);
    socketContext.on("success_stop_matching", handleSuccessOrError);
    socketContext.on("match_found", handleMatchFound);

    return () => {
      if (pollingTimeout) clearTimeout(pollingTimeout.current);
    };
  }, []);

  useEffect(() => {
    let index: number = playerIconIndex;
    while (playerIconIndex === index) {
      index = Math.floor(Math.random() * 20);
    }
    setAgentIndex(index);
  }, []);

  /* Handlers */

  function handleCloseMe() {
    setTriggered(false);
  }

  function handleSuccessOrError(res: any): void {
    if (EnvConfig.DEBUG) console.log(res);
  }

  async function handleMatchFound(res: any): Promise<void> {
    // Store matched user in context
    matchedUserContext.updateMatchedUser(res.user);

    // Stop timeout
    if (pollingTimeout) clearTimeout(pollingTimeout.current);

    setDuoFound(true);
  }

  async function clickedFindDuo(): Promise<void> {
    setFindDuo(true);

    socketContext.emit("find_matching", {
      userId: loggedUserContext?.loggedUser?._id,
      filters: filterContext.filters,
    } as any);

    pollingTimeout.current = setTimeout(() => {
      toast.error("Could not find a match. Please try again later!");
      setFindDuo(false);
      socketContext.emit("stop_matching", loggedUserContext?.loggedUser?._id);
    }, 300000); // 5 mins
  }

  function clickedCancel(): void {
    setFindDuo(false);
    if (pollingTimeout) clearTimeout(pollingTimeout.current);
    socketContext.emit("stop_matching", loggedUserContext?.loggedUser?._id);
  }

  /* Helper Functions */

  function getButton(): any {
    return findDuo ? (
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
    );
  }

  return (
    <>
      <CustomToast></CustomToast>
      <LandingPage>
        <FilterPopup
          closeMe={handleCloseMe}
          triggered={triggered}
        ></FilterPopup>
        <Nav>
          <Logo>
            <h2 id="valorant">VALORANT</h2>
            <h1 id="duofinder">DUOFINDER</h1>
          </Logo>
          <User>
            <p id="username">
              {Micellaneous.toTitleCase(
                loggedUserContext?.loggedUser?.displayName
              ) ?? "<username>"}
            </p>
            <img
              id="profilePic"
              src={loggedUserContext?.loggedUser?.avatarImage}
              alt="Player Icon"
            ></img>
          </User>
        </Nav>
        <LandingContent>
          <Agent src={backgroundAgents[playerIconIndex]}></Agent>
          <Container>
            <LandingCard
              findDuo={findDuo}
              duoFound={duoFound}
              imgSrc={loggedUserContext?.loggedUser?.avatarImage}
            />
            <ButtonContainer>
              <div>
                <ButtonImages src="./images/general/filter.png"></ButtonImages>
                <Button onClick={() => setTriggered(true)}>CHAT FILTERS</Button>
              </div>
              <div>
                <ButtonImages src="./images/general/history.png"></ButtonImages>
                <Link
                  style={{
                    color: "#ffffff",
                    textDecoration: "none",
                    fontWeight: "600",
                  }}
                  to={"/history"}
                >
                  CHAT HISTORY
                </Link>
              </div>
            </ButtonContainer>
            {getButton()}
          </Container>
          <Agent src={backgroundAgents[agentIndex]}></Agent>
        </LandingContent>
      </LandingPage>
    </>
  );
}

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 0%;
  width: 100%;
`;

const ButtonImages = styled.img`
  /* height: 100%; */
  filter: invert();
  width: 2%;
`;

const Button = styled.button`
  font-weight: bold;
  font-size: 16px;
  /* height: 100%; */
  /* margin: 5%; */
  background: none;
  padding: 0% 10% 5% 10%;
  /* background: none; */
  color: white;
  border: 0px;
  :hover {
    cursor: pointer;
  }
`;

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
  justify-content: space-evenly;
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

const HistoryButtonWrapper = styled.div`
  margin-left: 15px;
`;

const Agent = styled.img`
  filter: brightness(35%) drop-shadow(0 0 7.5px #66c2aa6c);
  width: 20vw;
  height: 80vh;
  object-fit: cover;

  @media (max-width: 1024px) {
    visibility: hidden;
    opacity: 0;
    transition: visibility 1.5s, opacity 1.5s;
  }
`;
