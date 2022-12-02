import * as React from "react";
import styled from "styled-components";

// HARKE IF YOU ARE READING THIS, THIS IS THE FILE YOU MANIPULATE
export default function MatchFound(props: any) {
  return (
    <LandingContent>
      <Card></Card>
    </LandingContent>
  );
}

const LandingContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Card = styled.div`
  background-color: #282828;
  margin: 7% 5% 5% 5%;
  width: 720px;
  height: 400px;

  border-radius: 46px;
  box-shadow: 0 0 7.5px #66c2a9;
  text-align: center;
  color: white;
`;
