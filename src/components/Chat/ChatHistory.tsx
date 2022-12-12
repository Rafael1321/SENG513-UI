import React, { useEffect } from "react";
import Button from "../Shared/Button";
import HistoryCard from "./HistoryCard";
import styled from "styled-components";
import { EmblaCarousel } from "./EmblaCarousel";
import ProfileCard from "./ProfileCard";

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
    return (
        <Wrapper>
            <HistorySection>
                <Menu>
                    <Button url={"Images/back.png"} text={"BACK"} width={"160px"} height={"70px"} />
                    <SearchContainer>
                        <SearchIconWrapper>
                            <SearchIcon url={"Icons/search.png"} />
                        </SearchIconWrapper>
                        <SearchInput placeholder="Search Message History" />
                    </SearchContainer>
                </Menu>

                <HistoryContainer>
                    <EmblaCarousel slides={[...slides]} history={history} />
                </HistoryContainer>

                <ChatContainer>.</ChatContainer>
            </HistorySection>

            <InfoCardSection>
                <Button text={"RATE PLAYER"} width={"160px"} height={"70px"} />

                <ProfileCard imgSrc="Images/astra.webp" userName="IAMNOTAFURRY" chatRank="30" userType="gamer" aboutMe="test"></ProfileCard>
            </InfoCardSection>

        </Wrapper>
    );
}

const Menu = styled.nav`
    position: relative;
    height: 10%;
    width: 100%;
`;

const HistorySection = styled.section`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    max-width: 70%;
    height: 100%;
    flex: 1;
    * {
        box-sizing: border-box;
    }
`;

const InfoCardSection = styled.aside`
    position: relative;
    width: 25%;
    height: 100%;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
`;

const HistoryContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    width: 100%;
    height: 30%;

    /* border: red solid 1px; */
`;

const ChatContainer = styled.div`
    position: relative;
    width: 100%;
    height: 50%;

    padding: 5%;
    outline: 1px red;

    background-color: #282828;
    border-radius: 44px;

    display: flex;
    justify-content: center;
    /* border: red solid 1px; */
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
    aspect-ratio: 1;

    content: url(${(props) => props.url});
`;

const Wrapper = styled.main`
    position: relative;
    width: 100vw;
    height: 100vh;
    padding: 2%;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;

    & * {
        font-family: "Arimo";
        font-style: normal;
        font-weight: 700;
        font-size: 26px;
        line-height: 30px;
        text-align: center;

        color: #ffffff;
    }
`;

export default ChatHistory;
