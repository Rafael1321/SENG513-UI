import React, { createContext, useEffect, useState } from "react";
import Button from "../Shared/Button";
import styled from "styled-components/macro";
import { EmblaCarousel } from "./EmblaCarousel";
import ProfileCardUpdated from "./ProfileCardUpdated";
import { Slider } from "@mui/material";
import { getValue } from "@mui/system";

type Props = {};

const SLIDE_COUNT = 5;
const slides = Array.from(Array(SLIDE_COUNT).keys());
console.log(slides);

export type Chat = {
  key: number;
  username: string;
  profile_url: string;
  last_message: string;
};

export const WidthContext = createContext<number>(1500);

const history = [
  {
    key: 0,
    username: "VividEradicator",
    profile_url: "images/icons/Astra_icon.webp",
    last_message: "Suggondeez",
  },
  {
    key: 1,
    username: "IAMNOTAFURRY",
    profile_url: "images/icons/Chamber_icon.webp",
    last_message: "Bro what are you even saying man?", //Overflow
  },
  {
    key: 2,
    username: "ArcticFox",
    profile_url: "images/icons/Omen_icon.webp",
    last_message: "I love chamber so much!",
  },
  {
    key: 3,
    username: "Malder",
    profile_url: "images/icons/Breach_icon.webp",
    last_message: "Wtf is this carousel",
  },
];

function ChatHistory(props: Props): React.ReactElement {
  const [width, setWidth] = useState(window.innerWidth);
  const breakpoint = 1000;

  const [rateState, setRateState] = useState(0);
  const [rating, setRating] = useState(5);

  function newRating() {
    setRateState(0);
  }

  function startRating() {
    setRateState(1);
  }

  function doneRating() {
    setRateState(2);
  }

  function handleRating(event: Event) {
    let newRating = (event.target as HTMLInputElement).value;
    setRating(+newRating);
    console.log(rating);
  }

  function commend() {
    console.log("Last new rating:" + rating);
    doneRating();
  }

  function displayRating() {
    if (rateState == 0) {
      return <RateButton onClick={startRating}>RATE PLAYER</RateButton>;
    } else if (rateState == 1) {
      return (
        <RatingSlider>
          <label htmlFor="rating">RATE PLAYER</label>
          <Slider
            size="small"
            defaultValue={5}
            min={0}
            max={10}
            step={1}
            valueLabelDisplay="auto"
            onChange={(e: Event) => {
              handleRating(e);
            }}
          />
          <Commend type="button" onClick={commend}>
            COMMEND
          </Commend>
        </RatingSlider>
      );
    } else if (rateState == 2) {
      return <h4>Rating Recorded!</h4>;
    }
  }

  useEffect(() => {
    const handleResizeWindow = () => setWidth(window.innerWidth);

    window.addEventListener("resize", handleResizeWindow);

    return () => {
      window.removeEventListener("resize", handleResizeWindow);
    };
  });

  return (
    <>
      <WidthContext.Provider value={width}>
        <MainWrapper>
          <MainContainer>
            <HistorySection>
              <Menu>
                {width > breakpoint && (
                  <Button
                    img_url={"images/general/back.png"}
                    text={"BACK"}
                    width={"160px"}
                    height={"70px"}
                  />
                )}
                {width > breakpoint && (
                  <SearchContainer>
                    <SearchIconWrapper>
                      <SearchIcon url={"images/general/search.png"} />
                    </SearchIconWrapper>
                    <SearchInput placeholder="Search Message History" />
                  </SearchContainer>
                )}
              </Menu>

              <PlayerCardsWrapper>
                <EmblaCarousel
                  slides={[...slides]}
                  history={history}
                  ClickHandler={newRating}
                />
                {width < breakpoint && (
                  <RatePlayerWrapper>
                    <Button
                      fontSize="2em"
                      text={"RATE"}
                      width={"100%"}
                      height={"100%"}
                    />
                  </RatePlayerWrapper>
                )}
              </PlayerCardsWrapper>

              <ChatContainer>Future Chat Goes Here</ChatContainer>
            </HistorySection>

            {width > breakpoint && (
              <InfoCardSection>
                <RatePlayerWrapper>{displayRating()}</RatePlayerWrapper>
                <ProfileCardWrapper>
                  <ProfileCardUpdated
                    imgSrc="images/icons/Neon_icon.webp"
                    userName="IAMNOTAFURRY"
                    chatRank="images/reputation_ranks/ToxicWaste.png"
                    userType="gamer"
                    valRank="images/ranks/rank_7_3.webp"
                    basicInfo="I am basic info"
                    aboutMe="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
                  ></ProfileCardUpdated>
                </ProfileCardWrapper>
              </InfoCardSection>
            )}
          </MainContainer>
        </MainWrapper>
      </WidthContext.Provider>
    </>
  );
}

const RateButton = styled.button`
  color: white;
  background-color: #68c9ac;
  border: none;
  border-radius: 10px;
  width: 160px;
  height: 70px;
  font-size: 16px;
  transition: 0.5s all;
  cursor: pointer;

  &:hover {
    box-shadow: 0 0 10px #68c9ac;
    cursor: pointer;
  }
`;

const Commend = styled.button`
  color: white;
  background-color: #68c9ac;
  border: none;
  border-radius: 2px;

  &:hover {
    cursor: pointer;
  }
`;

const RatingSlider = styled.div`
  display: flex;
  flex-direction: column;
`;

const MainWrapper = styled.div`
  // applies it to all the children
  * {
    box-sizing: border-box;
    font-family: "Arimo";
  }
  font-weight: 200;
  font-size: 15px;
  display: flex;
  justify-content: center;

  height: 100vh;
  width: 100vw;
`;

const MainContainer = styled.main`
  position: inherit;
  max-width: 1500px;
  width: 100%;

  padding: 2%;

  display: flex;
  justify-content: space-between;
  align-items: center;
  @media all and (max-width: 1000px) {
    flex-direction: column-reverse;
    padding: 5%;
  }
`;

const HistorySection = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 60%;
  height: 100%;

  @media all and (max-width: 1000px) {
    height: 100%;
    width: 100%;
  }
`;

const InfoCardSection = styled.aside`
  position: relative;
  width: 37%;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const ProfileCardWrapper = styled.div`
  position: inherit;
  height: 85%;
`;

const Menu = styled.nav`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
`;

const RatePlayerWrapper = styled.div`
  position: relative;

  display: flex;
  justify-content: center;
  align-items: start;

  width: 100%;
  margin-bottom: 4%;

  @media all and (max-width: 500px) {
    position: relative;
    width: 20%;
    height: 20%;
  }
`;

const PlayerCardsWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;
  height: 30%;

  // Split screen
  @media all and (max-width: 1000px) {
    height: 40%;
    flex-direction: column;
  }

  // Mobile
  @media all and (max-width: 500px) {
    height: 30%;
    flex-direction: column;
  }
`;

const ChatContainer = styled.div`
  position: relative;
  width: 100%;
  height: 70%;

  padding: 5%;
  outline: 1px red;

  background-color: #282828;
  border-radius: 44px;

  display: flex;
  justify-content: center;
  /* border: red solid 1px; */

  @media all and (max-width: 500px) {
    height: 80%;
    flex-direction: column;
  }
`;

const SearchContainer = styled.div`
  position: absolute;
  width: 40%;
  height: 40px;

  top: 1px;
  right: 1px;

  display: flex;
  align-items: center;

  background: #282828;

  border-radius: 44px;
`;

const SearchInput = styled.input`
  position: relative;
  background: none;
  flex-grow: 1;
  border: none;

  color: white;

  // increase specificity
  && {
    font-family: "Arimo";
    font-style: normal;
    font-weight: 400;
    font-size: 19px;
    line-height: 22px;
    text-decoration-color: blue;
    text-align: left;
  }

  && :focus,
  :focus {
    outline: none;
  }

  /* identical to box height */
`;

const SearchIconWrapper = styled.div`
  position: relative;
  aspect-ratio: 1;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const SearchIcon = styled.img<{ url: string }>`
  position: relative;
  height: 50%;
  font-style: normal;
  & * {
    font-weight: 700;
    font-size: 26px;
    line-height: 30px;
    text-align: center;

    color: #ffffff;
  }
  aspect-ratio: 1;

  content: url(${(props) => props.url});
`;

export default ChatHistory;
