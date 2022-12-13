// Imports
import React, { useState, useContext, useEffect } from "react";
// import * as React from "react";
import styled from "styled-components";
// import "./styles.css";
import Grid from "@mui/material/Grid";
// import TextField from "@mui/material/TextField";
import { LoggedUserContext } from "../../contexts/LoggedUserContext";

import { AuthService, IAuthResponse } from "../../services/AuthService";
import { Gender, GameMode } from "../../models/FiltersModels";

// To-do:
// useState() in order to toggle b/w editing and being finished
// grab current user's data from context
// store values captured during edit as permanent somewhere (context)
// send updated info to server
// watch the colour picker vid to see how to lay out agent icons
// send all data to context

// Main User Homescreen
function Profile() {
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

  // To be used for editing user info, init false
  const [generalEdit, setGeneralEdit] = useState(false);

  const loggedUserContext = useContext(LoggedUserContext);

  const handleEdit = async () => {
    console.log("Edit Request");

    console.log(loggedUserContext);

    const authResponse: IAuthResponse = await AuthService.update({
      userId: loggedUserContext.loggedUser._id,
      displayName: displayName,
      age: age,
      gender: gender,
      playerType: playerType,
      aboutMe: aboutMe,
    });

    console.log(authResponse);
  };

  const handleDisplayNameChange = (newDisplayName: string) => {
    setDisplayName(newDisplayName);
    handleEdit();
  };

  // Enable edits through flipping the state
  const edit = () => {
    setGeneralEdit(!generalEdit);
  };

  // Pick a new (random) profile pic, only if editing is enabled
  const changePfp = () => {
    if (generalEdit) {
      setIcon(agents[Math.floor(Math.random() * agents.length)]);
    }
  };

  useEffect(() => {
    setUserId(loggedUserContext.loggedUser._id);
    setDisplayName(loggedUserContext.loggedUser.displayName);
    setAge(loggedUserContext.loggedUser.age);
    setGender(loggedUserContext.loggedUser.gender);
    setPlayerType(loggedUserContext.loggedUser.playerType);
    setAboutMe(loggedUserContext.loggedUser.aboutMe);
  }, [
    loggedUserContext.loggedUser._id,
    loggedUserContext.loggedUser.displayName,
    loggedUserContext.loggedUser.age,
    loggedUserContext.loggedUser.gender,
    loggedUserContext.loggedUser.playerType,
    loggedUserContext.loggedUser.aboutMe,
  ]);

  useEffect(() => {
    async function updateBackend() {
      const authResponse: IAuthResponse = await AuthService.update({
        userId: loggedUserContext.loggedUser._id,
        displayName: displayName,
        age: age,
        gender: gender,
        playerType: playerType,
        aboutMe: aboutMe,
      });
    }
    // You can do some fancy checks here if you'd like, lots of work though

    updateBackend();

  }, [displayName]);

  return (
    <Grid columns={2}>
      <Pfp genE={generalEdit} src={icon} onClick={() => changePfp()}></Pfp>

      <Input
        id="user"
        genE={generalEdit}
        placeholder={generalEdit ? displayName : displayName}
        // maxLength={15};
        // minLength={1};
        onBlur={(e: React.FormEvent<HTMLInputElement>) => {
          setDisplayName(e.currentTarget.value);
        }}
        disabled={!generalEdit}
      ></Input>

      <Edit genE={generalEdit} src="./images/general/edit.png" onClick={() => edit()}></Edit>

      <h2>Bio</h2>
      {generalEdit ? <TextArea onChange={(e: any) => setAboutMe(e.target.value)} /> : <Display>{aboutMe}</Display>}

      <Drops genE={generalEdit} disabled={!generalEdit}>
        <option>Woman</option>
        <option>Man</option>
        <option>Non-Binary</option>
      </Drops>

      <Input genE={generalEdit} disabled={!generalEdit}></Input>

      <Drops genE={generalEdit} disabled={!generalEdit}>
        <option value={0}>North America</option>
        <option value={1}>Europe</option>
        <option value={2}>Asia Pacific</option>
        <option value={3}>Korea</option>
      </Drops>

      <div>
        <h2>Reputation</h2>
        <img src="./images/ranks/rank_1.png"></img>
      </div>
      <div>
        <h2>Rank</h2>
        <img src="./images/ranks/rank_7.png"></img>
      </div>
    </Grid>
  );
}

export default Profile;

// STYLING
const Drops = styled.select<{ genE: boolean }>`
  background-color: ${(props) => (props.genE ? "#181818" : "#282828")};
  -webkit-appearance: ${(props) => (props.genE ? "" : "none")};
  -moz-appearance: ${(props) => (props.genE ? "" : "none")};
  border: 0px;
  color: white;
  text-align: center;
`;
// const Age = styled.input<{ genE: boolean }>`

// `

const Input = styled.input<{ genE: boolean }>`
  background-color: ${(props) => (props.genE ? "#181818" : "#282828")};
  color: white;
  text-align: center;
  text-overflow: ellipsis;
  height: 10%;
  width: 30%;
  font-size: 200%;
`;

const TextArea = styled.textarea`
  background-color: #181818;
  color: white;
  width: 40%;
  resize: none;
  overflow: auto;
  border: 0px;
`;

const Display = styled.p`
  background-color: #282828;
`;

const Edit = styled.img<{ genE: boolean }>`
  filter: ${(props) => (props.genE ? "drop-shadow(2px 2px 10px red) invert()" : "invert()")};
  width: 5%;
`;

// border: ${(props) => props.generalEdit ? "2px solid red" : ""};

const Pfp = styled.img<{ genE: boolean }>`
  filter: ${(props) => (props.genE ? "drop-shadow(1px 1px 8px #66c2a9) brightness(150%)" : "")};
  width: 20%;
  border: 5px solid #66c2a9;
  border-radius: 50%;
  background-color: #266152;
`;

// const Edit = styled.p<{ generalEdit: boolean}>`
//   value: ${(props) => props.generalEdit ? "Save" : "Edit"};
// `

// const Reminder = styled.p<{ generalEdit: boolean }>`
//   display: ${(props) => props.generalEdit ? "none" : "none"};
// `
