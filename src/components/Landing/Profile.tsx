import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { LoggedUserContext } from "../../contexts/LoggedUserContext";
import { Gender } from "../../models/FiltersModels";
import { AuthService, IAuthResponse } from "../../services/AuthService";
import { Micellaneous } from "../../util/Micellaneous";

// Main User Homescreen
export default function Profile(): React.ReactElement {
  // Context
  const loggedUserContext = useContext(LoggedUserContext);

  // State
  const [generalEdit, setGeneralEdit] = useState(false);

  const [displayName, setDisplayName] = useState(
    loggedUserContext?.loggedUser?.displayName
  );
  const [age, setAge] = useState(loggedUserContext?.loggedUser?.age);
  const [gender, setGender] = useState(loggedUserContext?.loggedUser?.gender);
  const [playerType, setPlayerType] = useState(
    loggedUserContext?.loggedUser?.playerType
  );
  const [aboutMe, setAboutMe] = useState(
    loggedUserContext?.loggedUser?.aboutMe
  );
  const [profilePic, setProfilePic] = useState(
    loggedUserContext?.loggedUser?.avatarImage
  );
  const [charRemaining, setCharRemaining] = useState(150);

  // Handlers
  const edit = () => {
    setGeneralEdit(!generalEdit);
  };

  // Pick a new (random) profile pic, only if editing is enabled
  const changePfp = () => {
    if (generalEdit) setProfilePic(Micellaneous.getAgentIcon(0, true));
  };

  const handleDisplayNameChange = (e: any) => {
    if (generalEdit) setDisplayName(e.target.value);
  };

  const handleGenderChange = (e: any) => {
    if (generalEdit) setGender(e.target.value);
  };

  const handleAgeChange = (e: any) => {
    if (generalEdit) setAge(e.target.value);
  };

  const handlePlayerTypeChange = (e: any) => {
    if (generalEdit) setPlayerType(e.target.value);
  };

  const handleAboutMeChange = (e: any) => {
    if (generalEdit) setAboutMe(e.target.value);
    let charRemaining = 150 - e.target.value.length;
    setCharRemaining(charRemaining);
  };

  useEffect(() => {
    const newValues = {
      displayName: displayName,
      age: age,
      gender: gender,
      playerType: playerType,
      aboutMe: aboutMe,
    };

    async function updateBackend() {
      const authResponse: IAuthResponse = await AuthService.update({
        userId: loggedUserContext?.loggedUser?._id,
        ...newValues,
      });
    }
    // You can do some fancy checks here if you'd like, lots of work though

    if (generalEdit === false) {
      // add some more conditions
      updateBackend();
      loggedUserContext.updateLoggedUser({
        ...loggedUserContext?.loggedUser,
        ...newValues,
      });
    }
  }, [generalEdit]); // Depedencies: if this is changed then this useEffect will run.

  return (
    <GridContainer>
      <ProfileContainer>
        <Pfp
          genE={generalEdit}
          src={profilePic}
          onClick={() => changePfp()}
        ></Pfp>
        <PersonInfo>
          <UsernameDiv>
            <Input
              genE={generalEdit}
              placeholder={displayName ?? ""}
              autoComplete={"off"}
              maxLength={15}
              disabled={!generalEdit}
              onChange={handleDisplayNameChange}
              defaultValue="Username"
            ></Input>
            <Edit
              genE={generalEdit}
              src="./images/general/edit.png"
              onClick={() => edit()}
            ></Edit>
          </UsernameDiv>

          <div>
            <Age
              genE={generalEdit}
              disabled={!generalEdit}
              type="number"
              placeholder="Age"
              min="18"
              max="99"
              onChange={handleAgeChange}
            ></Age>
            <Drops
              value={gender}
              genE={generalEdit}
              disabled={!generalEdit}
              onChange={handleGenderChange}
            >
              <option value={Gender.unknown}>{"Gender"}</option>
              <option value={Gender.woman}>
                {Micellaneous.genderToString(Gender.woman, generalEdit)}
              </option>
              <option value={Gender.man}>
                {Micellaneous.genderToString(Gender.man, generalEdit)}
              </option>
              <option value={Gender.nonBinary}>
                {Micellaneous.genderToString(Gender.nonBinary, generalEdit)}
              </option>
            </Drops>

            <span>
              {Micellaneous.serverPreferenceToString(
                loggedUserContext?.loggedUser?.region
              )}
            </span>
            <PlayerType>
              {Micellaneous.playerTypeToString(playerType) ?? "<unknown>"}
            </PlayerType>
          </div>
        </PersonInfo>
      </ProfileContainer>

      <DetailsContainer>
        {/* <div> */}
        <BioContainer>
          <Label>ABOUT ME</Label>
          <TextArea
            onChange={handleAboutMeChange}
            genE={generalEdit}
            autoComplete="off"
            placeholder="There's nothing here! Edit your profile to liven things up!"
            disabled={!generalEdit}
            rows={6}
            maxLength={150}
          ></TextArea>
          <CharRemaining genE={generalEdit}>{charRemaining}/150</CharRemaining>
        </BioContainer>

        {/* <RankContainer> */}
        <RankInfo>
          <Ranks>
            <RankLabel>
              <Heading>REPUTATION</Heading>
              <RankImg imgSrc="/images/reputation_ranks/ToxicWaste.png"></RankImg>
            </RankLabel>
          </Ranks>
          <Ranks>
            <RankLabel>
              <Heading>RANK</Heading>
              <RankImg imgSrc={"images/ranks/rank_1_1.webp"}></RankImg>
              {/* <RankImg imgSrc={(loggedUserContext?.loggedUser == null) ? "images/ranks/rank_1_1.webp" : "images/ranks/rank_"+loggedUserContext?.loggedUser?.rank[0]+"_"+loggedUserContext?.loggedUser?.rank[1]+".webp"}></RankImg> */}
            </RankLabel>
          </Ranks>
        </RankInfo>
        {/* </RankContainer> */}
        {/* </div> */}
      </DetailsContainer>
    </GridContainer>
  );
}

const UsernameDiv = styled.div`
  display: flex;
`;

const CharRemaining = styled.p<{ genE: boolean }>`
  color: ${(props) => (props.genE ? "#4a4a4a" : "#282828")};
  font-size: 0.75rem;
  font-weight: 300;
  margin: 0 15% 0 auto;
`;

const Heading = styled.p`
  margin-top: 0%;
  margin-bottom: 10%;
`;

const PlayerType = styled.p`
  margin: 0;
  font-size: 0.75rem;
  font-weight: 200;
`;

const GridContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  /* padding-bottom: 8%; */
`;

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  width: 50%;
  /* margin: 5%; */
`;

const PersonInfo = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 10%;
`;

const DetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  width: 50%;
`;

const BioContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  text-align: left;
`;

const RankInfo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-right: 35%;
`;

const Drops = styled.select<{ genE: boolean }>`
  background-color: ${(props) => (props.genE ? "#383838" : "#282828")};
  -webkit-appearance: ${(props) => (props.genE ? "" : "none")};
  -moz-appearance: ${(props) => (props.genE ? "" : "none")};
  border: 0px;
  border-radius: 3px;
  color: white;
  text-align: center;
  height: 30px;
  width: ${(props) => (props.genE ? "75px" : "40px")};
  transition: 0.5s all;
  font-size: 0.75rem;
  margin-top: 2%;
  :focus {
    box-shadow: 0 0 5px #60d6b5;
    border: none;
    outline: none;
  }
`;

const Age = styled.input<{ genE: boolean }>`
  background-color: ${(props) => (props.genE ? "#383838" : "#282828")};
  border: 0px;
  border-radius: 3px;
  color: white;
  font-family: Arial;
  text-align: center;
  width: 40px;
  margin: 0% 2%;
  height: 28px;
  font-size: 0.75rem;
  font-weight: 200;
  transition: 0.5s all;
  ::placeholder {
    color: white;
  }
  :focus {
    box-shadow: 0 0 5px #60d6b5;
    border: none;
    outline: none;
  }
`;

const Input = styled.input<{ genE: boolean }>`
  background-color: ${(props) => (props.genE ? "#383838" : "#282828")};
  color: white;
  text-align: center;
  text-overflow: ellipsis;
  margin: 0;
  margin-left: 5%;
  font-family: Arial, Helvetica, sans-serif;
  height: 30px;
  width: 200px;
  font-size: 1.5rem;
  border: none;
  border-radius: 3px;
  transition: 0.5s all;
  /* margin-bottom: 5%; */
  ::placeholder {
    color: white;
  }
  :focus {
    box-shadow: 0 0 5px #60d6b5;
    border: none;
    outline: none;
  }
`;

const TextArea = styled.textarea<{ genE: boolean }>`
  background-color: ${(props) => (props.genE ? "#383838" : "#282828")};
  color: white;
  width: inherit;
  margin-right: 15%;
  font-family: "Poppins", sans-serif;
  resize: none;
  overflow: hidden;
  border: 0px;
  border-radius: 3px;
  transition: 0.5s all;
  font-size: 1rem;
  font-weight: 200;
  height: 70%;
  :focus {
    box-shadow: 0 0 5px #60d6b5;
    border: none;
    outline: none;
  }
`;

const Edit = styled.img<{ genE: boolean }>`
  filter: ${(props) =>
    props.genE ? "drop-shadow(2px 2px 10px red) invert()" : "invert()"};
  width: 20px;
  height: 20px;

  :hover {
    filter: drop-shadow(2px 2px 10px red) invert();
    cursor: pointer;
  }
`;

const Pfp = styled.img<{ genE: boolean }>`
  filter: ${(props) =>
    props.genE ? "drop-shadow(1px 1px 8px #66c2a9) brightness(100%)" : ""};
  aspect-ratio: 1/1;
  height: 9rem;
  width: 9rem;
  border: 5px solid #66c2a9;
  border-radius: 50%;
  background-color: #266152;
  transition: 0.5s all;
`;

const Label = styled.p`
  font-size: min(20px, 1.2vw);
  font-weight: 600;
  margin: 0;
`;

const RankLabel = styled(Label)`
  padding-left: 0px;
  text-align: center;
  font-size: min(20px, 1.2vw);
  display: flex;
  flex-direction: column;
`;

const Ranks = styled.div`
  margin-top: 5%;
  margin-left: 0;
`;

const RankImg = styled.img<{ imgSrc: string }>`
  content: url(${(props) => props.imgSrc});
  justify-content: center;
  margin-left: auto;
  margin-right: auto;
  width: 5vw;
  max-width: 50px;
  height: 5vw;
  max-height: 50px;
  @media all and(max-height: 1000px) {
    height: 10%;
    max-height: 10%;
  }
`;
