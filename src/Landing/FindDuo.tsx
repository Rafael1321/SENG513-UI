import * as React from "react";
import styled from "styled-components";

export default function FindDuo(props: any) {
  return (
    <LandingContent>
      <Card>On Find Duo Component</Card>
      <Cancel onClick={props.setFindDuo}>&#10005; CANCEL</Cancel>
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

  &:hover {
    box-shadow: 0 0 7.5px #66c2a9;
  }
`;
