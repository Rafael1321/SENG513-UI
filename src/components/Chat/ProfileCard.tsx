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
}

export default function ProfileCard(
  props: Props
): React.ReactElement<Props, any> {
  return (
    <>
      <Wrapper>
        <Icon imgSrc={props.imgSrc} />
        <Username>{props.userName}</Username>
        <BasicInfo>{props.basicInfo}</BasicInfo>
        <BasicInfo>{props.userType}</BasicInfo>
        <Ranks>
          <RankImg imgSrc={props.valRank} />
          <RankImg imgSrc={props.chatRank} />
        </Ranks>
        <Ranks>
          <Label style={{ textAlign: "center" }}>RANK</Label>
          <Label>REPUTATION</Label>
        </Ranks>
        <Label>ABOUT ME:</Label>
        <AboutMe>{props.aboutMe}</AboutMe>
      </Wrapper>
    </>
  );
}

const Wrapper = styled("div")`
  background-color: #282828;
  width: 27vw;
  max-width: 400px;
  height: 70vh;
  padding: 5vh;
  border-radius: 44px;
  filter: drop-shadow(0px 0px 10px #66c2a9);
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  @media all and (max-width: 900px){
    // flex-direction:row;
    width: 80vw;
    height:20vh;
    padding: 2vh;
   
    max-height: 200px;
    border-radius: 20px; 
  }
`;

const Icon = styled.img<{ imgSrc: string }>`
  content: url(${(props) => props.imgSrc});
  border-radius: 50%;
  width: 13vw;
  max-width: 200px;
  max-height: 200px;
  aspect-ratio: 1;
  margin-left: auto;
  margin-right: auto;
  display: block;
  @media all and (max-width: 900px){
    width: 5vw;
    height: 5vw;

  }
`;
const Username = styled.p`
  text-align: center;
  font-size: 2vw;
  font-weight: 600;
`;
const BasicInfo = styled.p`
  text-align: center;
  font-size: 1vw;
  font-weight: 400;
`;
const Ranks = styled.div`
  display: flex;
  width: 60%;
  margin-left: auto;
  margin-right: auto;
  justify-content: space-between;
`;
const RankImg = styled.img<{ imgSrc: string }>`
  content: url(${(props) => props.imgSrc});
  justify-content: center;
  width: 5vw;
  max-width: 54px;
  height: 5vw;
  max-height: 54px;
`;

const AboutMe = styled.p`
  text-align: left;
  font-size: 1vw;
  font-weight: 400;
  font-family: "Arimo", sans-serif;
`;
const Label = styled.p`
  text-align: left;
  font-size: 1.2vw;
  font-weight: 600;
`;
