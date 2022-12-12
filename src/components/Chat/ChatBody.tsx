import * as React from "react";
import styled from "styled-components";
import ProfileCard from "./ProfileCard";
import MessageContainer from "./MessageContainer";
import { useState, useEffect } from "react";

export default function ChatBody() {
  const [timer, setTimer] = useState(10);

//   const interval = setInterval(() => {
//     if (timer !== 0) {
//       setTimer(timer - 1);
//       console.log(timer);
//     } else {
//       console.log("you outta time bestie");
//     }
//   }, 60000);

  return (
    <Wrapper>
      <LeftColContainer>
        <TopText> 🕐 You have {timer} minutes remaining!</TopText>
        <ChatBox>
          <MessageContainer
            msgType="received"
            senderImg="/assets/jettFurry.png"
            text="Yo 👋, yo 👋, yo 👋! 1-4-8-3 to the 3 ⭕ℹ🕘 to the 6 🕕 to the 9 💯. representin' the ABQ. What up ⬆, playa 😦🐶? Leave 🍃 at the tone 🍺."
          />
          <MessageContainer
            msgType="sent"
            senderImg="/assets/cypher.png"
            text="Bro what are you saying 😭"
          />
        </ChatBox>
        <ChatInputContainer>
          <ChatInput placeholder="Message"></ChatInput>
          <ChatBtn>SEND</ChatBtn>
        </ChatInputContainer>
      </LeftColContainer>
      <RightColContainer>
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
        <BtnContainer>
          <MobileTimer>🕐 You have {timer} minutes remaining!</MobileTimer>
          <Btn btnColor="#66c2a9">SHARE CONTACT</Btn>
          <Btn btnColor="#f94b4b">GO NEXT</Btn>
        </BtnContainer>
      </RightColContainer>
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
const RightColContainer = styled.div`
  justify-content: center;
  text-align: center;
  font-size: min(5vw, 20px);
  @media all and (max-width: 1400px) {
    width: 100vw;
    height: 30vh;
    padding: 0;
    border-radius: 20px;
    background-color: #181818;
  }
`;
const LeftColContainer = styled.div`
  margin-right: 30px;
  @media all and (max-width: 1400px) {
    order: 1;
    margin-right: 0;
    padding: 0;
    margin: 0;
  }
`;

const TopText = styled.p`
  justify-content: center;
  text-align: center;
  font-size: min(5vw, 20px);
  @media all and (max-width: 1400px) {
    font-size: min(2vw, 15px);
    display: none;
  }
`;

const MobileTimer = styled.p`
  justify-content: center;
  text-align: center;
  font-size: min(5vw, 20px);
  display: none;
  @media all and (max-width: 1400px) {
    font-size: min(1.5vh, 15px);
    max-width: 50vw;
    text-align: left;
    display: block;
  }
`;

const BtnContainer = styled.div`
  display: flex;
  justify-content: center;
  @media all and (max-width: 1400px) {
    margin: 20px;
  }
`;

const Btn = styled.div<{ btnColor: string }>`
  background-color: ${(props) => props.btnColor};
  width: 8vw;
  min-width: 150px;
  font-weight: 600;
  height: 6vh;
  font-size: min(3vw, 20px);
  border-radius: 20px;
  justify-content: center;
  margin: 20px;
  margin-top: 20px;
  cursor: pointer;
  transition: 0.3s;
  &:hover {
    transform: scale(1.1);
    filter: drop-shadow(0px 0px 10px ${(props) => props.btnColor});
  }
  @media all and (max-width: 1400px) {
    font-size: 60%;
    min-width: 60px;
    height: auto;
    padding: 5px;
    margin: 10px;
    border-radius: 10px;
  }
`;
const ChatInputContainer = styled.div`
  background-color: #182828;
  width: 55vw;
  padding-right: 10vh;
  height: 6vh;
  margin-top: 30px;
  border-radius: 20px;
  color: #dedbdb;
  display: flex;
  position: relative;
  
  @media all and (max-width: 1400px) {
    width: 90vw;
    height: 5vh;
    margin-top: 0;
    padding: 1vh;
  }
`;
const ChatInput = styled.input`
  background-color: #282828;
  position :relative;
  width: 100%;
  height: 100%;
//   padding-left: 5vh;
//   padding-right: 5vh;
  border-radius: 20px;
  color: #dedbdb;
  font-family: "Arimo", sans-serif;
  font-size: 20px;
  justify-content: center;
  display: block;
  outline: none;
  border: 0;
  position: absolute;
  &:placeholder {
    padding: 10px;
  }
  @media all and (max-width: 1400px) {
    width: 90vw;
    height: 5vh;
    margin-top: 0;
    padding: 1vh;
  }
`;

const ChatBtn = styled.div`
  text-align: center;

  color: #ffffff;
  font-family: "Arimo", sans-serif;
  font-size: 20px;
  flex-start: end;

  right: 1px;
  display: block;
  border: 0;
  position: absolute;
  cursor: pointer;
  @media all and (max-width: 1400px) {
    width: 90vw;
    height: 5vh;
    margin-top: 0;
    padding: 1vh;
  }
`;

const ChatBox = styled.div`
  background-color: #282828;
  border-radius: 44px;
  width: 55vw;
  height: 70vh;
  padding: 5vh;
  margin: 10px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: column;
  position: relative;
  justify-content: start;
  @media all and (max-width: 1400px) {
    width: 90vw;
    height: 55vh;
    padding: 1vh;
    order: 2;
    border-radius: 20px;
    background-color: #282828;
  }
`;
