import * as React from "react";
import styled from "styled-components";

interface Props {
  chatTimer: string;
}

export default function ChatBox(props: Props): React.ReactElement<Props, any> {
  return (
    <Wrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  background-color: #282828;
  border-radius: 44px;
  width: 65vw;
  height: 80vh;
  margin: 10px;
  margin-left: auto;
  margin-right: auto;
  @media all and (max-width: 1400px) {
    width: 90vw;
    height: 30vh;
    padding: 3vh;
    order:2;
    border-radius: 20px;
    // background-color: #181818;
  }
`;

