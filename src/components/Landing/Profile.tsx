import React, {useState, useContext, useEffect} from "react";
import styled from "styled-components";
import { LoggedUserContext } from '../../contexts/LoggedUserContext';
import { Gender } from "../../models/FiltersModels";
import { AuthService, IAuthResponse } from "../../services/AuthService";
import { Micellaneous } from '../../util/Micellaneous';

// Main User Homescreen
export default function Profile() : React.ReactElement {

  // Context
  const loggedUserContext = useContext(LoggedUserContext);

  // State
  const [generalEdit, setGeneralEdit] = useState(false);

  const [displayName, setDisplayName] = useState(loggedUserContext?.loggedUser?.displayName);
  const [age, setAge] = useState(loggedUserContext?.loggedUser?.age);
  const [gender, setGender] = useState(loggedUserContext?.loggedUser?.gender);
  const [playerType, setPlayerType] = useState(loggedUserContext?.loggedUser?.playerType);
  const [aboutMe, setAboutMe] = useState(loggedUserContext?.loggedUser?.aboutMe);
  const [profilePic , setProfilePic] = useState(loggedUserContext?.loggedUser?.avatarImage);

  // Handlers
  const edit = () => {
    setGeneralEdit(!generalEdit);
  };

  // Pick a new (random) profile pic, only if editing is enabled
  const changePfp = () => {
    if(generalEdit) setProfilePic(Micellaneous.getAgentIcon(0, true));
  };

  const handleDisplayNameChange = (e : any) => {
    if(generalEdit) setDisplayName(e.target.value);
  }

  const handleGenderChange = (e : any) => {
    if(generalEdit) setGender(e.target.value);
  }

  const handleAgeChange = (e : any) => {
    if(generalEdit) setAge(e.target.value);
  }

  const handlePlayerTypeChange = (e : any) => {
    if(generalEdit) setPlayerType(e.target.value);
  }

  const handleAboutMeChange = (e : any) => {
    if(generalEdit) setAboutMe(e.target.value);
  }

  useEffect(() => {

    const newValues = {
     
      displayName: displayName,
      age: age,
      gender: gender,
      playerType: playerType,
      aboutMe: aboutMe,
    }

    async function updateBackend() {
      const authResponse: IAuthResponse = await AuthService.update({
        userId: loggedUserContext?.loggedUser?._id,
        ...newValues
      });
    }
    // You can do some fancy checks here if you'd like, lots of work though
    
    if (generalEdit === false){ // add some more conditions
      updateBackend();
      loggedUserContext.updateLoggedUser({...loggedUserContext?.loggedUser, ...newValues});
    }
  }, [generalEdit]);    // Depedencies: if this is changed then this useEffect will run.

  return (
    <GridContainer>
      <ProfileContainer>
      
        <Pfp genE={generalEdit} src={profilePic} onClick={() => changePfp()}></Pfp>

        <div>
          <Input
            genE={generalEdit}
            placeholder={displayName ?? ''}
            autoComplete={"off"}
            maxLength={15}
            disabled={!generalEdit}
            onChange={handleDisplayNameChange}>
          </Input>
          <Edit genE={generalEdit} src="./images/general/edit.png" onClick={() => edit()}></Edit>
        </div>

        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
          <Drops value={gender} genE={generalEdit} disabled={!generalEdit} onChange={handleGenderChange}>
            <option value={Gender.unknown}>{'---'}</option>
            <option value={Gender.woman}>{Micellaneous.genderToString(Gender.woman, generalEdit)}</option>
            <option value={Gender.man}>{Micellaneous.genderToString(Gender.man, generalEdit)}</option>
            <option value={Gender.nonBinary}>{Micellaneous.genderToString(Gender.nonBinary, generalEdit)}</option>
          </Drops>

          <Age genE={generalEdit} disabled={!generalEdit} type="number" placeholder="18" min="18" max="99" onChange={handleAgeChange}></Age>

          <span>{Micellaneous.serverPreferenceToString(loggedUserContext?.loggedUser?.region)}</span>
        </div>

        <p>{Micellaneous.playerTypeToString(playerType) ?? '<unknown>'}</p>

      </ProfileContainer>

      <BioContainer>
        {/* <div> */}
        <AboutMeContainer>

        <Label>ABOUT ME</Label>
        <TextArea onChange={handleAboutMeChange} genE={generalEdit} autoComplete="off" placeholder={aboutMe} disabled={!generalEdit} rows={6}></TextArea>
        </AboutMeContainer>

        {/* <RankContainer> */}
          <Ranks>
            <RankLabel>
            <RankImg imgSrc = "/images/reputation_ranks/ToxicWaste.png"></RankImg>
              REPUTATION
              </RankLabel>
            <RankLabel>
            {/* <RankImg imgSrc={"images/ranks/rank_1_1.webp"}></RankImg> */}
            <RankImg imgSrc={(loggedUserContext?.loggedUser == null) ? "images/ranks/rank_1_1.webp" : "images/ranks/rank_"+loggedUserContext?.loggedUser?.rank[0]+"_"+loggedUserContext?.loggedUser?.rank[1]+".webp"}></RankImg>
              RANK
            </RankLabel>
          </Ranks>
        {/* </RankContainer> */}
        {/* </div> */}
      </BioContainer>
    </GridContainer>
  );
}

const GridContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  /* padding-bottom: 8%; */
`;

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 40%;
  /* margin: 5%; */
`;

const BioContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 60%;
`;

const RankContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  /* padding: 0% 0%; */
  /* margin-right: 10%; */
`;

const Drops = styled.select<{ genE: boolean }>`
  background-color: ${(props) => (props.genE ? "#181818" : "#282828")};
  /* -webkit-appearance: ${(props) => (props.genE ? "" : "none")}; */
  /* -moz-appearance: ${(props) => (props.genE ? "" : "none")}; */
  border: 0px;
  border-radius: 3px;
  color: white;
  text-align: center;
  height: 80%;
  /* width: 10%; */
  margin-top: 2%;
`;

const Age = styled.input<{ genE: boolean }>`
  background-color: ${(props) => (props.genE ? "#181818" : "#282828")};
  border: 0px;
  border-radius: 3px;
  color: white;
  font-family: Arial;
  text-align: center;
  width: 15%;
  margin: 0% 2% 0% 2%;
  height: 70%;
  font-size: 100%;
  ::placeholder {
    color: white;
  }
`;

const Input = styled.input<{ genE: boolean }>`
  background-color: ${(props) => (props.genE ? "#181818" : "#282828")};
  color: white;
  text-align: center;
  text-overflow: ellipsis;
  font-family: Arial, Helvetica, sans-serif;
  height: 100%;
  width: 70%;
  font-size: 200%;
  border: 0px;
  border-radius: 7px;
  /* margin-bottom: 5%; */
  ::placeholder {
    color: white;
  }
`;

const TextArea = styled.textarea<{ genE: boolean }>`
  background-color: ${(props) => (props.genE ? "#181818" : "#282828")};
  color: white;
  // width: 80%;
  // height: 50%;
  font-family: Arial, Helvetica, sans-serif;
  resize: none;
  overflow: hidden;
  border: 0px;
  border-radius: 20px;
  padding: 10px;
  font-size: 140%;
  /* ::placeholder {
    color: white;
  } */
`;

const Display = styled.p`
  background-color: #282828;
`;

const Edit = styled.img<{ genE: boolean }>`
  filter: ${(props) => (props.genE ? "drop-shadow(2px 2px 10px red) invert()" : "invert()")};
  width: 6%;
  margin-left: 5px;
  :hover {
    filter: drop-shadow(2px 2px 10px red) invert();
    cursor: pointer;
  }
`;

const Pfp = styled.img<{ genE: boolean }>`
  filter: ${(props) => (props.genE ? "drop-shadow(1px 1px 8px #66c2a9) brightness(150%)" : "")};
  width: 50%;
  border: 7px solid #66c2a9;
  border-radius: 50%;
  background-color: #266152;
  margin-bottom: 8%;
`;

const Label = styled.p`
padding-left: 15px;
text-align: left;
font-size: min(20px, 1.2vw);
font-weight: 600;
  @media all and (max-width: 1400px) {
    // visibility: hidden;
    margin: 0;
  }
`;

const RankLabel = styled(Label)`
padding-left:0px;
text-align: center;
font-size: 80%;
display: flex;
flex-direction: column;

`

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

const AboutMeContainer = styled.div`


`