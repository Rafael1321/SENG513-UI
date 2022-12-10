import React, { useEffect } from "react";
import styled from "styled-components";
import ProfilePicture from "../Shared/ProfilePicture";

type Props = {
    width: string;
    isMain: boolean;
    zIndex: string;
    username: string;
    message: string;
    url: string;
};

export default function HistoryCard(props: Props): React.ReactElement {
    return (
        <Wrapper isMain={props.isMain} width={props.width} zIndex={props.zIndex}>
            <UserInfoContainer>
                <ProfilePicture size={"100%"} url={props.url} showBorder={false} />
                <UsernameWrapper>
                    <Username>{props.username}</Username>
                </UsernameWrapper>
            </UserInfoContainer>
            <MessagesWrapper>
                <Messages>{props.message}</Messages>
            </MessagesWrapper>
        </Wrapper>
    );
}

const Wrapper = styled.div<{ isMain: boolean; width: string; zIndex: string }>`
    position: relative;
    aspect-ratio: 9/5;
    width: ${(props) => props.width};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: #282828;
    box-shadow: ${(props) => (props.isMain ? "0px 0px 15px #66c2a9" : "none")};
    border-radius: 10px;
    z-index: ${(props) => (props.zIndex)};
    opacity: ${(props) => (props.isMain ? "1.0" : 0.6)};
`;

const MessagesWrapper = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 0;
    width: 80%;
    height: 20%;
`;

const Messages = styled.span`
    position: relative;

    && {
        font-weight: 400;
        font-size: 20px;
        line-height: 23px;
        text-align: left;
    }
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    display: inline-block;
`;

const UsernameWrapper = styled.div`
    position: relative;
    width: 60%;
    margin-left: 5%;
`;

const UserInfoContainer = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;

    margin-bottom: 5%;
    width: 100%;
    height: 40%;
`;

const Username = styled.span`
    display: inline-block;
    height: 100%;
    width: 100%;
    text-align: center;
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    overflow: hidden;
`;
