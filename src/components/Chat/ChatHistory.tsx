import React, { createContext, useEffect, useState } from "react";
import Button from "../Shared/Button";
import HistoryCard from "./HistoryCard";
import styled, { AnyStyledComponent } from "styled-components";
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
    profile_url: "Images/astra.webp",
    last_message: "Suggondeez",
  },
  {
    key: 1,
    username: "IAMNOTAFURRY",
    profile_url: "Images/chamber.webp",
    last_message: "Bro what are you even saying man?", //Overflow
  },
  {
    key: 2,
    username: "ArcticFox",
    profile_url: "Images/chamber.webp",
    last_message: "I love chamber so much!",
  },
  {
    key: 3,
    username: "Malder",
    profile_url: "Images/chamber.webp",
    last_message: "Wtf is this carousel",
  },
];

function ChatHistory(props: Props): React.ReactElement {
  const [width, setWidth] = useState(window.innerWidth);
  const breakpoint = 1400;

  const [rateClicked, setRateClicked] = useState(false);
  const [rating, setRating] = useState(5);

  function handleRateClicked() {
    setRateClicked(true);
  }

  function handleRating(event: Event) {
    let newRating = (event.target as HTMLInputElement).value;
    setRating(+newRating);
    console.log(rating);
  }

  function commend() {
    console.log("Last new rating:" + rating);
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
        <Wrapper>
          <HistorySection>
            <Menu>
              {width > breakpoint && (
                <Button
                  url={"Images/back.png"}
                  text={"BACK"}
                  width={"160px"}
                  height={"70px"}
                />
              )}
              {/* <SearchContainer>
                            <SearchIconWrapper>
                            <SearchIcon url={"Icons/search.png"} />
                            </SearchIconWrapper>
                            <SearchInput placeholder="Search Message History" />
                        </SearchContainer> */}
            </Menu>

            <HistoryContainer>
              <EmblaCarousel slides={[...slides]} history={history} />
              {/* {width < breakpoint && (
                                <RatePlayerWrapper>
                                    <Button text={"RATE PLAYER"} width={"100%"} height={"100%"} />
                                </RatePlayerWrapper>
                            )} */}
            </HistoryContainer>

            <ChatContainer>.</ChatContainer>
          </HistorySection>

          {width > breakpoint && (
            <InfoCardSection>
              <RatePlayerWrapper>
                {rateClicked ? (
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
                    <Submit type="button" onClick={commend}>
                      COMMEND
                    </Submit>
                  </RatingSlider>
                ) : (
                  <RateButton onClick={handleRateClicked}>
                    RATE PLAYER
                  </RateButton>
                )}
              </RatePlayerWrapper>

              <ProfileCardWrapper>
                <ProfileCardUpdated
                  imgSrc="Images/astra.webp"
                  userName="IAMNOTAFURRY"
                  chatRank="Images/chamber.webp"
                  userType="gamer"
                  valRank="Images/chamber.webp"
                  basicInfo="I am basic info"
                  aboutMe="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
                ></ProfileCardUpdated>
              </ProfileCardWrapper>
            </InfoCardSection>
          )}
        </Wrapper>
      </WidthContext.Provider>
    </>
  );
}

const RatingSlider = styled.form`
  display: flex;
  flex-direction: column;
  text-align: center;
`;

const Submit = styled.button`
  border: none;
  border-radius: 4px;
  color: white;
  background: #4fa397;
`;

const RateButton = styled.button`
  width: 160px;
  height: 70px;
  color: white;
  border-radius: 10px;
  border: none;
  font-size: 1rem;
  background-color: #66c2a9;
  transition: 0.5s all;

  &:hover {
    cursor: pointer;
    box-shadow: 0 0 10px #66cfb3;
  }
`;

const Menu = styled.nav`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
`;

const RatePlayerWrapper = styled.div`
  position: absolute;

  top: 0;

  @media all and (max-width: 1400px) {
    position: relative;
    width: 20%;
    height: 10%;
  }
`;

const ProfileCardWrapper = styled.div`
  max-width: 500px;
`;

const HistorySection = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 70%;
  height: 100%;
  flex: 1;

  width: 100%;

  @media all and (max-width: 1400px) {
    height: 50%;
    width: 100%;
  }
`;

const InfoCardSection = styled.aside`
  position: relative;
  width: 25%;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  padding: 2%;
`;

const HistoryContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;
  height: 30%;

  @media all and (max-width: 1400px) {
    height: 40%;
    flex-direction: column;
  }

  @media all and (max-width: 500px) {
    height: 20%;
    flex-direction: column;
  }

  /* border: red solid 1px; */
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
  width: 425px;
  height: 53px;

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

const Wrapper = styled.main`
  * {
    box-sizing: border-box;
  }

  position: relative;
  width: 100vw;
  height: 100vh;
  padding: 2%;
  box-sizing: border-box;

  display: flex;
  justify-content: space-between;
  align-items: center;
  @media all and (max-width: 1400px) {
    flex-direction: column-reverse;
    padding: 5%;
  }

  font-family: "Arimo";
`;

export default ChatHistory;
