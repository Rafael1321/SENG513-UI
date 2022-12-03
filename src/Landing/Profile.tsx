import * as React from "react";
import styled from "styled-components";

// RICHARD IF YOU ARE READING THIS, THIS IS THE FILE YOU MANIPULATE
export default function Profile(props: any) {
  return (
    <LandingContent>
      <Card>On Profile Component</Card>
      <FindDuo onClick={props.setFindDuo}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          id="magnifyingGlass"
        >
          <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352c79.5 0 144-64.5 144-144s-64.5-144-144-144S64 128.5 64 208s64.5 144 144 144z" />
        </svg>
        FIND DUO
      </FindDuo>
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
`;
