import * as React from "react";
import styled from "styled-components";
import ProfileCard from "./ProfileCard";
import MessageContainer from "./MessageContainer";
import { useState, useEffect, useContext } from "react";
import { SocketContext } from "../../contexts/SocketContext";
import { LoggedUserContext } from "../../contexts/LoggedUserContext";
import { Link } from "react-router-dom";
import { IUser } from "../../models/AuthModels";
import { MatchedUserContext } from "../../contexts/MatchedUserContext";
import { RankType, GameMode } from "../../models/FiltersModels";
interface Message {
  type: string;
  text: string;
  userIcon: string;
}

// interface User {
//   _id: string,
//   riotId: string,
//   displayName: string,
//   gameName: string,
//   tagLine: string,
//   avatarImage: string
// }

export default function ChatBody() {
  console.log(MatchedUserContext);
  //contexts
  const loggedUserContext = useContext(LoggedUserContext);
  const matchedUser = useContext(MatchedUserContext)
  const socket = useContext(SocketContext);

  // localStorage.setItem("loggedUser",loggedUserContext);
  // console.log(loggedUserContext)

  const [outgoingMsgText, setOutText] = useState("");
  const [incomingMsgText, setInMsg] = useState("");
  const [messages, setMessages] = useState([]);

  function updateMessages(msg: Message, type: string) {
    const newMsgs = [
      ...messages,
      { type: type, text: msg.text, userIcon: msg.userIcon },
    ];
    setMessages(newMsgs);
  }

  const sendMsg = (userIcon: string, text: string) => {
    const msg = {
      type: "sent",
      text: text,
      userIcon: userIcon,
    };
    updateMessages(msg, "sent");
    socket.emit("send_msg", msg);
    // console.log(msg)
  };

  useEffect(() => {
    socket.on("receive_msg", (msgData) => {
      setInMsg(msgData);
      updateMessages(msgData, "received");
    });
  }, [socket, messages]);

  // useEffect(() => {
  //   console.log(messages);
  // }, [messages])

  const [timer, setTimer] = useState(10);

  //   const interval = setInterval(() => {
  //     if (timer !== 0) {
  //       setTimer(timer - 1);
  //       console.log(timer);
  //     } else {
  //       console.log("you outta time bestie");
  //     }
  //   }, 60000);

  function handleClick(userIcon: string, text: string) {
    console.log("msg was sent");
    console.log(userIcon);
    sendMsg(userIcon, text);
  }

  function sendContactInfo(user: IUser) {
    const contactMsg =
      "You wanna play? Let's play! Add me on Valorant! " +
      user.gameName +
      "#" +
      user.tagLine;
    sendMsg(user.avatarImage, contactMsg);
  }

  return (
    <Wrapper>
      <Link to={"/landing"}>
        <Exit />
      </Link>
      <LeftColContainer>
        <Timer> 🕐 You have {timer} minutes remaining!</Timer>
        <ChatBox>
          {messages.map((msg: Message) => (
            <MessageContainer
              msgType={msg.type}
              senderImg={"/images/icons/" + msg.userIcon}
              text={msg.text}
            />
          ))}
        </ChatBox>

        <ChatInputContainer>
          <ChatInput
            placeholder="Message"
            onChange={(e) => setOutText((e.target as HTMLInputElement).value)}
          ></ChatInput>
          <ChatBtn
            onClick={() =>
              handleClick(
                loggedUserContext.loggedUser.avatarImage,
                outgoingMsgText
              )
            }
          >
            SEND
          </ChatBtn>
        </ChatInputContainer>
      </LeftColContainer>
      <RightColContainer>
        <TopText>You're chatting with:</TopText>
        <ProfileCard
          imgSrc="/images/icons/Jett_icon.webp"
          userName={(matchedUser.matchedUser == null) ? "HectorSalamanca" : matchedUser.matchedUser.displayName}
          basicInfo={(matchedUser.matchedUser == null) ? "22F, US West" : matchedUser.matchedUser.age+" "+matchedUser.matchedUser.gender}
          userType={(matchedUser.matchedUser == null) ? 0 : matchedUser.matchedUser.playerType}

          valRank={(matchedUser.matchedUser == null) ? 3 : matchedUser.matchedUser.rank[0]}
          valRankLvl={(matchedUser.matchedUser == null) ? 1 : matchedUser.matchedUser.rank[1]}
          chatRank="/images/reputation_ranks/ToxicWaste.png"
          aboutMe= {(matchedUser.matchedUser == null) ? "This is the about me section." : matchedUser.matchedUser.aboutMe}

        />
        <BtnContainer>
          <MobileTimer>🕐 You have {timer} minutes remaining!</MobileTimer>
          <Btn
            onClick={() => sendContactInfo(loggedUserContext.loggedUser)}
            btnColor="#66c2a9"
          >
            <BtnIcon imgSrc="/images/chat/share.png" />
            SHARE CONTACT
          </Btn>
          <Btn btnColor="#f94b4b">
            <BtnIcon imgSrc="/images/chat/gonext.png" />
            GO NEXT
          </Btn>
        </BtnContainer>
      </RightColContainer>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  // height: 100vh;
  width: 100vw;
  display: flex;
  paddint: 5px;
  flex-wrap: wrap;
  justify-content: center;
`;

const Exit = styled.img`
  content: url("images/chat/x.png");
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
  width: 4vw;
  max-width: 20px;
  height: 4vw;
  max-height: 20px;
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
  margin-top: 20px;
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
  type: "submit",
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
    font-size: 80%;
  }
`;

const ChatBox = styled.div`
  background-color: #282828;
  border-radius: 44px;
  overflow-y: scroll;
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
    height: 50vh;
    padding: 1vh;
    order: 2;
    padding: 0;
    border-radius: 20px;
    background: none;
  }
`;
