import * as React from "react";
import styled from "styled-components";
import ProfileCard from "./ProfileCard";
import MessageContainer from "./MessageContainer";
import { useState, useEffect, useContext } from "react";
import { SocketContext } from "../../contexts/SocketContext";
import { LoggedUserContext } from '../../contexts/LoggedUserContext';
import { Link } from "react-router-dom";
import { LocalSee } from "@mui/icons-material";

 


export default function ChatBody() {
  //contexts
  const loggedUserContext = useContext(LoggedUserContext);
  const socket = useContext(SocketContext);

  // localStorage.setItem("loggedUser",loggedUserContext);
  // console.log(loggedUserContext)

  const [outgoingMsgText, setOutText] = useState("")
  const [incomingMsgText, setInMsg] = useState("")
  const [messages, setMessages] = useState([])

  const sendMsg = (userObject : object , text : string) => {
    socket.emit("send_msg", {
      text: text,
      user: userObject
    })
  }

  interface msg{
    text: string,
    user: object
  }

  useEffect( () => {
    socket.on("receive_msg", (msgData) => {
        setInMsg(msgData);
        // const newMsgs : msg = messages.push(msgData)
        // setMessages(newMsgs)
      })
    }, [socket]);

    useEffect(() => {
      console.log(messages);
    }, [messages])
    
  const [timer, setTimer] = useState(10);

  //   const interval = setInterval(() => {
  //     if (timer !== 0) {
  //       setTimer(timer - 1);
  //       console.log(timer);
  //     } else {
  //       console.log("you outta time bestie");
  //     }
  //   }, 60000);

  function handleClick(userObject : object , text : string){
    console.log("msg was sent")
    sendMsg(userObject,text)

  }

  return (
    <Wrapper>
      <Link to={"/landing"}>
      <Exit />
      </Link>
      <LeftColContainer>
        <Timer> 🕐 You have {timer} minutes remaining!</Timer>
        <ChatBox>
          <MessageContainer
            msgType="received"
            senderImg="/assets/jettFurry.png"
            text="Yo 👋, yo 👋, yo 👋! 1-4-8-3 to the 3 ⭕ℹ🕘 to the 6 🕕 to the 9 💯. representin' the ABQ. What up ⬆, playa 😦🐶? Leave 🍃 at the tone 🍺."
          />
          <MessageContainer
            msgType="recieved"
            senderImg="/assets/cypher.png"
            text={loggedUserContext.loggedUser.displayName} //pp 
          />

        </ChatBox>
        
        <ChatInputContainer>
          <ChatInput placeholder="Message" onChange={(e)=> setOutText((e.target as HTMLInputElement).value)}></ChatInput>
          <ChatBtn onClick={() => handleClick(loggedUserContext,outgoingMsgText)}>SEND</ChatBtn>
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
          <Btn btnColor="#66c2a9">
          <BtnIcon imgSrc="/Icons/share.png"/>

            SHARE CONTACT</Btn>
          <Btn btnColor="#f94b4b">
            <BtnIcon imgSrc="/Icons/gonext.png"/>
            GO NEXT
          </Btn>
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

const Exit = styled.img`
  content: url("Icons/x.png");
  width: 1vw;
  height: 1vw;
  min-width: 15px;
  min-height: 15px;
  position: absolute;
  right: 1px;
  padding: 1%;
  cursor: pointer;
  z-index: 1;
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
  align-items: center;
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
    font-size: min(5vw, 15px);
  }
`;
const Timer = styled.p`
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

const BtnIcon = styled.img<{ imgSrc: string }>`
  content: url(${(props) => props.imgSrc});
  width: 5vw;
  max-width: 30px;
  height: 5vw;
  max-height: 30px;
  justify-content: center;
  margin-left: auto;
  margin-right: auto;
`;

const Btn = styled.div<{ btnColor: string }>`
  background-color: ${(props) => props.btnColor};
  width: 8vw;
  min-width: 150px;
  font-weight: 600;
  height: 6vh;
  font-size: min(2vw, 15px);
  border-radius: 20px;
  justify-content: center;
  margin: 20px;
  padding: 0.5%;
  margin-top: 20px;
  cursor: pointer;
  transition: 0.3s;
  display: flex;
  flex-direction: column;
  &:hover {
    transform: scale(1.1);
    filter: drop-shadow(0px 0px 10px ${(props) => props.btnColor});
  }
  @media all and (max-width: 1400px) {
    font-size: 40%;
    min-width: 70px;
    height: auto;
    padding: 5px;
    margin: 10px;
    border-radius: 10px;
  }
`;
const ChatInputContainer = styled.div`
  background-color: #182828;
  width: 100%;
  height: 6vh;
  margin-top: 30px;
  border-radius: 20px;
  color: #dedbdb;
  display: flex;
  justify-content: center;
  align-items: center;
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
  position: relative;
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
  &::placeholder {
    padding: 2%;
  }
  @media all and (max-width: 1400px) {
    width: 90vw;
    height: 5vh;
    margin-top: 0;
    padding: 1vh;
  }
`;

const ChatBtn = styled.button.attrs({
  type: 'submit'
})`
  text-align: center;
  color: #ffffff;
  background: none;
  font-family: "Arimo", sans-serif;
  font-size: 20px;
  right: 20px;
  border: 0;
  position: absolute;
  cursor: pointer;
  transition: 0.3s;
  &:hover {
    filter: drop-shadow(0px 0px 5px #ffffff);
  }
  @media all and (max-width: 1400px) {
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
    background-color: #181818;
  }
`;
