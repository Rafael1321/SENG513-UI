import * as React from "react";
import styled from "styled-components";

interface Props {
  chatTimer: string;
}

export default function ChatBox(props: Props): React.ReactElement<Props, any> {
  return (
    <Wrapper>
      <Timer> 🕐 You have {props.chatTimer} minutes remaining!</Timer>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  background-color: #282828;
  border-radius: 44px;
  width: 65vw;
  height: 80vh;
  margin: 10px;
`;
const Timer = styled.p`
  text-align: center;
  font-size: 1vw;
`;
