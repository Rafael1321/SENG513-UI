import * as React from "react";
import styled from "styled-components";
import ProfileCard from "./ProfileCard";
import ChatBox from "./ChatBox";
import { useState, useEffect } from "react";
import { alertClasses } from "@mui/material";
export default function ChatBody() {
  
  const [timer, setTimer] = useState(10)

  const interval = setInterval(() => {
    
    if(timer!==0){
        setTimer(timer-1)
        console.log(timer)  
    }else{
        console.log("you outta time bestie");
    }
  }, 60000);
  
    return (
    <Wrapper>
      <RightColContainer>
        <TopText> 🕐 You have {timer} minutes remaining!</TopText>
        <ChatBox chatTimer="10" />
        <ChatInput placeholder="Message">
  
        </ChatInput>
      </RightColContainer>
      <LeftColContainer>
        <TopText>You're chatting with:</TopText>
        <ProfileCard
          imgSrc="/assets/jettFurry.png"
          userName="IMNOTAFURRY"
          basicInfo="22F, US West"
          userType="Competitive"
          valRank="assets/d2.png"
          chatRank="/assets/ToxicWaste.png"
          aboutMe="I used to be Immortal but I got a bunch of dog water teammates and demoted to diamond. IF YOU’RE DOG WATER GO NEXT! DON’T WASTE MY TIME I’M GONNA BE PRO I DONT NEED LIL DOGGIES WITH THEIR TAILS BETWEEN THEIR LEGS DRAGGING ME DOWN!!!!grrr meow :3"
        />
        <Btn>GO NEXT</Btn>
      </LeftColContainer>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;
const LeftColContainer = styled.div`
  justify-content: center;
  text-align: center;
  font-size: min(5vw, 20px);
  @media all and (max-width: 1400px) {
    width: 90vw;
    height: 30vh;
    padding: 3vh;
    border-radius: 20px;
    background-color: #181818;
  }
`;
const RightColContainer = styled.div`
  margin-right: 30px;
  @media all and (max-width: 1400px) {
    order: 1;
    margin-right: 0;
  }
`;

const TopText = styled.p`
  justify-content: center;
  text-align: center;
  font-size: min(5vw, 20px);
  @media all and (max-width: 1400px){
    font-size: min(2vw, 15px);

  }
`;

const Btn = styled.div`
  background-color: #f94b4b;
  width: 8vw;
  height: 6vh;
  font-weight: 600;
  border-radius: 20px;
  align-items: center;
  justify-content: center;
  margin-left: auto;
  margin-right: auto;
  margin-top: 20px;
`;

const ChatInput = styled.input`
  background-color: #282828;
  width: 60vw;
  height: 6vh;
  margin-top: 20px;
  padding-left: 2.5vw;
  padding-right: 2.5vw;
  border-radius: 20px;
  color: #dedbdb;
  font-family: "Arimo", sans-serif;
  font-size: 20px;
  justify-content: center;
  margin: 0;
  display: block;
  outline: none;
  border: 0;
  @media all and (max-width: 1400px){
    width: 90vw;
    height: 1vh;
    padding: 3vh;

  }
`;
