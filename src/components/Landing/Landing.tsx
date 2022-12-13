import * as React from "react";
import styled from "styled-components";
import { useState, useEffect, useContext } from "react";

import LandingCard from "./LandingCard";
import { LoggedUserContext } from '../../contexts/LoggedUserContext';
import { SocketContext } from '../../contexts/SocketContext';
import { EnvConfig } from '../../util/EnvConfig';
import { IMatchingResponse, MatchingService } from "../../services/MatchingService";
import { FilterContext } from '../../contexts/FilterContext';
import { MatchedUserContext } from '../../contexts/MatchedUserContext';
import { toast } from "react-toastify";
import { IUser } from "../../models/AuthModels";
import { AuthService, IAuthResponse } from '../../services/AuthService';
import { CustomToast } from "../Shared/CustomToast";
import { Micellaneous } from "../../util/Micellaneous";

export default function Landing() {
  
  // Constants
  const playerIconSrc = "/Images/Icons/Astra_icon.webp";

  // State 
  const [duoFound, setDuoFound] = useState<boolean>(false);
  const [findDuo, setFindDuo] = useState<boolean>(false);

  // Refs
  const pollingInterval = React.useRef<NodeJS.Timer>(null);
  const pollingTimeout = React.useRef<NodeJS.Timeout>(null);

  // Contexts
  const loggedUserContext = useContext(LoggedUserContext);
  const matchedUserContext = useContext(MatchedUserContext);
  const filterContext = useContext(FilterContext);
  const socketContext = useContext(SocketContext);

  // Callback to poll api for a match
  const pollFindMatch = React.useCallback(async () => {
    const matchingResponse : IMatchingResponse = await MatchingService.findMatch({userId:loggedUserContext?.loggedUser?._id, filters:filterContext?.filters});
    if(matchingResponse && matchingResponse.statusCode === 200){
      matchedUserContext.updateMatchedUser(matchingResponse.data as IUser);
    }
  }, []);

  // Use Effects 

  useEffect(() => {
    socketContext.emit('user_connected', loggedUserContext?.loggedUser?._id);

    // Messages from server
    socketContext.on('error_user_connected', handleSuccessOrError);
    socketContext.on('success_user_connected', handleSuccessOrError);
    socketContext.on('error_find_matching', handleSuccessOrError);
    socketContext.on('success_find_matching', handleSuccessOrError);
    socketContext.on('error_stop_matching', handleSuccessOrError);
    socketContext.on('success_stop_matching', handleSuccessOrError);
    socketContext.on('match_found', handleMatchFound);

    return () => {
      if(pollingTimeout) clearTimeout(pollingTimeout.current);
      if(pollingInterval) clearInterval(pollingInterval.current);
    }
  }, []);
  
  React.useEffect(() => {
    if(matchedUserContext.matchedUser){
      // Notify other user of the match
      socketContext.emit('match_found', loggedUserContext?.loggedUser?._id, matchedUserContext?.matchedUser?._id);

      // set match found 
      setDuoFound(true);
    }
  }, [matchedUserContext]);

  /* Handlers */

  function handleSuccessOrError(res : any) : void{
    if(EnvConfig.DEBUG) console.log(res);
  }

  async function handleMatchFound(res : any) : Promise<void>{

    if(matchedUserContext) return;

    const matchedWithId : string = res.matchedWithId;

    // Request a info of specified user from api 
    const authResponse : IAuthResponse = await AuthService.find(matchedWithId);
    
    if(authResponse.statusCode !== 200){
      toast.error(authResponse.data as string)
      setFindDuo(false);
      socketContext.emit('stop_matching', loggedUserContext?.loggedUser?._id);
      return;
    }

    // Store matched user in context
    matchedUserContext.updateMatchedUser(authResponse.data as IUser);

    // Stop polling and timeout
    if(pollingTimeout) clearTimeout(pollingTimeout.current);
    if(pollingInterval) clearInterval(pollingInterval.current);
    
    setDuoFound(true);
  }

  async function clickedFindDuo() : Promise<void> {
    setFindDuo(true);
    
    // Sets user online 
    socketContext.emit('find_matching', loggedUserContext?.loggedUser?._id);

    // Attemp to find a match every second
    pollingInterval.current = setInterval(pollFindMatch, 1000);

    // Set a timeout of five minutes 
    pollingTimeout.current = setTimeout(() => {            
      toast.error("Could not find a match. Please try again later!");
      setFindDuo(false);
      socketContext.emit('stop_matching', loggedUserContext?.loggedUser?._id);
      clearInterval(pollingInterval.current);
    }, 300000); // 5 mins
  }

  function clickedCancel() : void {
    setFindDuo(false);
    if(pollingTimeout) clearTimeout(pollingTimeout.current);
    if(pollingInterval) clearInterval(pollingInterval.current);
    socketContext.emit('stop_matching', loggedUserContext?.loggedUser?._id);
  }

  /* Helper Functions */

  function getButton() : any{
    return findDuo ? <Cancel onClick={clickedCancel}>&#10005; CANCEL</Cancel> : (
      <FindDuo onClick={clickedFindDuo}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" id="magnifyingGlass">
          <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352c79.5 0 144-64.5 144-144s-64.5-144-144-144S64 128.5 64 208s64.5 144 144 144z" />
        </svg>
        FIND DUO
      </FindDuo>
    );
  }

  return (<>
    <CustomToast></CustomToast>
    <LandingPage>
      <Nav>
        <Logo>
          <h2 id="valorant">VALORANT</h2>
          <h1 id="duofinder">DUOFINDER</h1>
        </Logo>
        <User>
          <p id="username">{Micellaneous.toTitleCase(loggedUserContext?.loggedUser?.displayName) ?? "<username>"}</p>
          <img id="profilePic" src={playerIconSrc} alt="Player Icon"></img>
        </User>
      </Nav>
      <LandingContent>
        <Container>
          <LandingCard findDuo={findDuo} duoFound={duoFound} imgSrc={playerIconSrc}/>
          {getButton()}
        </Container>
      </LandingContent>
    </LandingPage>
  </>);
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
