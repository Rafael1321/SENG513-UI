import styled from "styled-components";
import * as React from "react";

interface Props {
  msgType: string; //recieved or sent
  text: string;
  senderImg: string;
}

export default function MessageContainer(props: Props) {
  return (
    <Wrapper>
      <Icon imgSrc={props.senderImg} />
      <ChatBubble msgType={props.msgType}>{props.text}</ChatBubble>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  margin: 10px;
`;

const ChatBubble = styled.div<{ msgType: string }>`
  background-color: ${(props) =>
    props.msgType === "received" ? "#66c2a9" : "#FFFFFF"};
  width: 40vw;
  max-width: 500px;
  padding: 1vw;
  border-radius: 37px;
  color: black;
  font-family: "Arimo", sans-serif;
  font-size: min(2vw, 20px);
  box-shadow: 0px 5px 6px #546466;
`;

const Icon = styled.img<{ imgSrc: string }>`
  content: url(${(props) => props.imgSrc});
  border-radius: 50%;
  width: 3vw;
  height: 3vw;
  max-width: 200px;
  max-height: 200px;
  aspect-ratio: 1;
  @media all and(max-height: 1000px) {
    width: 10%;
    height: 10%;
  }
`;
