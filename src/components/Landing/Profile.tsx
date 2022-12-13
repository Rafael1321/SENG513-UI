import React, {useState, useContext, useEffect} from "react";
import styled from "styled-components";
import { LoggedUserContext } from '../../contexts/LoggedUserContext';
import { GameMode, Gender, ServerPreference } from "../../models/FiltersModels";
import { AuthService, IAuthResponse } from "../../services/AuthService";

// Main User Homescreen
export default function Profile() : React.ReactElement {

  // Context
  const loggedUserContext = useContext(LoggedUserContext);

  // Used to set agent icon
  const [icon, setIcon] = useState("./images/icons/Astra_icon.webp");
  let agents: Array<string> = [
    "./images/icons/Astra_icon.webp",
    "./images/icons/Breach_icon.webp",
    "./images/icons/Brimstone_icon.webp",
    "./images/icons/Chamber_icon.webp",
    "./images/icons/Cypher_icon.webp",
    "./images/icons/Fade_icon.webp",
    "./images/icons/Harbor_icon.webp",
    "./images/icons/Jett_icon.webp",
    "./images/icons/KAYO_icon.webp",
    "./images/icons/Killjoy_icon.webp",
    "./images/icons/Neon_icon.webp",
    "./images/icons/Omen_icon.webp",
    "./images/icons/Phoenix_icon.webp",
    "./images/icons/Raze_icon.webp",
    "./images/icons/Reyna_icon.webp",
    "./images/icons/Sage_icon.webp",
    "./images/icons/Skye_icon.webp",
    "./images/icons/Sova_icon.webp",
    "./images/icons/Viper_icon.webp",
    "./images/icons/Yoru_icon.webp",
  ];

  // Set init bio
  const [userId, setUserId] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [age, setAge] = useState(0);
  const [gender, setGender] = useState(Gender.allGenders);
  const [playerType, setPlayerType] = useState(GameMode.competitive);
  const [aboutMe, setAboutMe] = useState("There's nothing here! Edit your profile to liven things up!");

  const [bio, setBio] = useState("There's nothing here! Edit your profile to liven things up!");
  // const [username, setUsername] = useState("Pee Man The OG");
  
  // To be used for editing user info, init false
  const [generalEdit, setGeneralEdit] = useState(false);

  // const handleEdit = async () => {
  //   const authResponse: IAuthResponse = await AuthService.update({
  //     userId: loggedUserContext?.loggedUser?._id,
  //     displayName: loggedUserContext?.loggedUser?.displayName,
  //     age: loggedUserContext?.loggedUser?.age,
  //     gender: loggedUserContext?.loggedUser?.gender,
  //     playerType: loggedUserContext?.loggedUser?.playerType,
  //     aboutMe: loggedUserContext?.loggedUser?.aboutMe,
  //   });
  // };

  const handleDisplayNameChange = (newDisplayName: string) => {
    setDisplayName(newDisplayName);
    // handleEdit();
  };

  // Enable edits through flipping the state
  const edit = () => {
    setGeneralEdit(!generalEdit);
  };

  // Pick a new (random) profile pic, only if editing is enabled
  const changePfp = () => {
    if (generalEdit) {
      loggedUserContext.updateLoggedUser({...loggedUserContext.loggedUser, avatarImage: agents[Math.floor(Math.random() * agents.length)]})
    }
  };

  // useEffect(() => {
  //   async function updateBackend() {
  //     const authResponse: IAuthResponse = await AuthService.update({
  //       userId: loggedUserContext?.loggedUser?._id,
  //       displayName: displayName,
  //       age: age,
  //       gender: gender,
  //       playerType: playerType,
  //       aboutMe: aboutMe,
  //     });
  //   }
  //   // You can do some fancy checks here if you'd like, lots of work though
    
  //   if (generalEdit === false){ // add some more conditions
  //     updateBackend();
  //   }
  // }, [generalEdit]);    // Depedencies: if this is changed then this useEffect will run.

  return (
    <GridContainer>
      <ProfileContainer>
      
        <Pfp genE={generalEdit} src={loggedUserContext?.loggedUser?.avatarImage} onClick={() => changePfp()}></Pfp>

        <div>
          <Input
            genE={generalEdit}
            placeholder={loggedUserContext?.loggedUser?.displayName ?? '<username>'}
            autoComplete={"off"}
            maxLength={15}
            disabled={!generalEdit}>
          </Input>

          <Edit genE={generalEdit} src="./images/general/edit.png" onClick={() => edit()}></Edit>
        </div>

        <div>
          <Drops genE={generalEdit} disabled={!generalEdit}>
            <option>Male</option>
            <option>Female</option>
            <option>NB</option>
            {/*CHANGE TO THIS <option value="M">Man</option> */}
          </Drops>

          <Age genE={generalEdit} disabled={!generalEdit} type="number" placeholder="18" min="18"></Age>
          {/* max="99" */}
          {/* <p>years old</p> */}

          <Drops genE={generalEdit} disabled={!generalEdit}>
            <option value={ServerPreference.na}>N. America</option>
            <option value={ServerPreference.eu}>Europe</option>
            <option value={ServerPreference.ap}>Asia Pacific</option>
            <option value={ServerPreference.kr}>Korea</option>
          </Drops>

          {/* <p>Competitive</p> */}
        </div>

        {/* <Drops genE={generalEdit} disabled={!generalEdit}>
          <option value={0}>Competitive</option>
          <option value={1}>Casual</option>
        </Drops> */}
        <p>Competitive</p>

      </ProfileContainer>

      <BioContainer>
        {/* <div> */}
        <AboutMeContainer>

        <Label>ABOUT ME</Label>
        <TextArea genE={generalEdit} autoComplete="off" placeholder={bio} disabled={!generalEdit} rows={6}></TextArea>
        </AboutMeContainer>

        {/* <RankContainer> */}
          <Ranks>
            <RankLabel>
            <RankImg imgSrc = "/images/reputation_ranks/ToxicWaste.png"></RankImg>
              REPUTATION
              </RankLabel>
            <RankLabel>
            <RankImg imgSrc={(loggedUserContext.loggedUser == null) ? "images/ranks/rank_1_1.webp" : "images/ranks/rank_"+loggedUserContext.loggedUser.rank[0]+"_"+loggedUserContext.loggedUser.rank[1]+".webp"}></RankImg>
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
  justify-content: center;
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