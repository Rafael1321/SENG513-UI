import { style } from "@mui/system";
import * as React from "react";
import styled from "styled-components";

interface Props {
    imgSrc: string;
    userName: string;
    valRank?: string;
    chatRank: string;
    basicInfo?: string;
    userType: string;
    aboutMe?: string;
    isMain?: boolean;
}

export default function ProfileCardUpdated(props: Props): React.ReactElement<Props, any> {
    return (
        <Wrapper isMain={props.isMain}>
            <UserImageContainer>
                <UserIcon imgSrc={props.imgSrc} />
                <div>
                    <UsernameText>{props.userName}</UsernameText>
                </div>
                <RanksContainer>
                    <RankLabel>
                        <RankImg imgSrc={props.valRank} />
                        RANK
                    </RankLabel>
                    <RankLabel style={{ textAlign: "center" }}>
                        <RankImg imgSrc={props.chatRank} />
                        REPUTATION
                    </RankLabel>
                </RanksContainer>
            </UserImageContainer>

            <AboutMeContainer>
                <AboutMeLabel>ABOUT ME:</AboutMeLabel>
                <AboutMeWrapper>
                    <AboutMeText>{props.aboutMe}</AboutMeText>
                </AboutMeWrapper>
            </AboutMeContainer>
        </Wrapper>
    );
}

const Wrapper = styled("div")<{ isMain?: boolean }>`
    position: relative;
    background-color: #282828;
    border-radius: 44px;
    filter: drop-shadow(0px 0px 10px #66c2a9);

    font-weight: 200;
    font-size: 15px;
    text-align: center;

    aspect-ratio: 44/79;

    padding: 5%;

    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;

    overflow: hidden;

    p {
        margin: 0;
    }

    @media all and (max-width: 1000px) {
        height: 100%;
        width: 100%;

        border-radius: 20px;

        margin-left: auto;
        margin-right: auto;
        padding: 2%;

        order: 1;
        flex-wrap: wrap;

        filter: ${(props) => (props.isMain ? "drop-shadow(0px 0px 5px #66c2a9)" : "none")};
    }
`;

const UserImageContainer = styled.div`
    position: inherit;

    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;

    height: 40%;
`

const UserIcon = styled.img<{ imgSrc: string }>`
    content: url(${(props) => props.imgSrc});
    aspect-ratio: 1;

    width: 10vw;
    max-width: 200px;

    max-height: 200px;

    border-radius: 50%;
    display: block;

    margin-bottom: 5px;
    margin-left: auto;
    margin-right: auto;

    @media all and(max-height: 1000px) {
        width: 10%;
        height: 10%;
    }
`;

const UsernameText = styled.p`
    font-size: 2rem;

    && {
        margin-bottom: 5%;
    }
`;

const BasicInfoText = styled.p`
    text-align: center;
    font-size: 1rem;
    font-weight: 1rem;

    @media all and (max-width: 1000px) {
        display: none;
    }
`;

const RanksContainer = styled.div`
    position: relative;

    display: flex;
    justify-content: center;
    gap: 10%;

    width: 100%;

    margin-bottom: 5%;

    @media all and (max-width: 1000px) {
        width: 10%;
    }
`;
const RankImg = styled.img<{ imgSrc: string }>`
    content: url(${(props) => props.imgSrc});
    justify-content: center;
    margin-left: auto;
    margin-right: auto;
    width: 5vw;
    max-width: 54px;
    height: 5vw;
    max-height: 54px;
    @media all and(max-height: 1000px) {
        height: 10%;
        max-height: 10%;
    }
`;

const AboutMeContainer = styled.div`
    height: 40%;
    @media all and (max-width: 1000px) {
        width: 40%;
        height: 90%;
    }
`;

const AboutMeLabel = styled.p`
    text-align: left;
    font-size: 1.5rem;
    font-weight: 600;
    @media all and (max-width: 1000px) {
        // visibility: hidden;
    }
`;

const AboutMeWrapper = styled.div`
    height: 90%;
    overflow-y: scroll;

`;

const AboutMeText = styled.p`
    position: relative;
    padding: 2%;
    
    text-align: left;
    font-size: 1rem;
    font-weight: 400;
    font-family: "Arimo", sans-serif;
`;

const RankLabel = styled(AboutMeLabel)`
    text-align: center;
    font-size: min(20px, 1.5vw);
    display: flex;
    flex-direction: column;
    @media all and (max-width: 1000px) {
        // visibility: hidden;
    }
`;
