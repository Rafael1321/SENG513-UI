import * as React from "react";
import styled from "styled-components";
import ProfileCard from "./ProfileCard";
import ChatBox from "./ChatBox";

export default function ChatBody() {
  return (
    <>
      <Wrapper>
        <ChatBox chatTimer="10"/>
        <ProfileCard
          imgSrc="/assets/jettFurry.png"
          userName="IMNOTAFURRY"
          basicInfo="22F, US West"
          userType="Competitive"
          valRank="assets/d2.png"
          chatRank="/assets/ToxicWaste.png"
          aboutMe="I used to be Immortal but I got a bunch of dog water teammates and demoted to diamond. IF YOU’RE DOG WATER GO NEXT! DON’T WASTE MY TIME I’M GONNA BE PRO I DONT NEED LIL DOGGIES WITH THEIR TAILS BETWEEN THEIR LEGS DRAGGING ME DOWN!!!!grrr meow :3"
        />
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  margin: 20px;
  justify-content: center;
`;
