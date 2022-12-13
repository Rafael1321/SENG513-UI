// Imports
import React, {useState} from "react";
// import * as React from "react";
import styled from "styled-components";
// import "./styles.css";
import Grid from "@mui/material/Grid";
// import TextField from "@mui/material/TextField";
import {LoggedUserContext} from '../../contexts/LoggedUserContext';

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
  const [bio, setBio] = useState("There's nothing here! Edit your profile to liven things up!");
  
  // To be used for editing user info, init false
  const [generalEdit, setGeneralEdit] = useState(false);

  // Enable edits through flipping the state
  const edit = () => {
    setGeneralEdit(!generalEdit);
  }

  // Pick a new (random) profile pic, only if editing is enabled
  const changePfp = () => {
    if (generalEdit) {
      setIcon(agents[Math.floor(Math.random() * agents.length)]);
    }
  }


  return (
    <Grid columns={2}>
      
      <Pfp genE={generalEdit} src={icon} onClick={() => changePfp()}></Pfp>
      
      <Input 
        id="user"
        genE={generalEdit}
        placeholder={generalEdit 
          ? "" 
          : "Pee Man 4"
        }
        // maxLength={15};
        // minLength={1};
        disabled={!generalEdit}>
      </Input>
      
      <Edit genE={generalEdit} src="./images/general/edit.png" onClick={() => edit()}></Edit>
      
      <h2>Bio</h2>
      {generalEdit
        ? <TextArea onChange={(e:any) => setBio(e.target.value)}/> 
        : <Display>{bio}</Display>
      }

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
  background-color: ${(props) => props.genE ? "#181818" : "#282828"};
  -webkit-appearance: ${(props) => props.genE ? "" : "none"};
  -moz-appearance: ${(props) => props.genE ? "" : "none"};
  border: 0px;
  color: white;
  text-align: center;
`
// const Age = styled.input<{ genE: boolean }>`

// `

const Input = styled.input<{ genE: boolean }>`
  background-color: ${(props) => props.genE ? "#181818" : "#282828"};
  color: white;
  text-align: center;
  text-overflow: ellipsis;
  height: 10%;
  width: 30%;
  font-size: 200%;
`

const TextArea = styled.textarea`
  background-color: #181818;
  color: white;
  width: 40%;
  resize: none;
  overflow: auto;
  border: 0px;
`

const Display = styled.p`
  background-color: #282828;
`

const Edit = styled.img<{ genE: boolean}>`
  filter: ${(props) => props.genE ? "drop-shadow(2px 2px 10px red) invert()" : "invert()"};
  width: 5%;
`

// border: ${(props) => props.generalEdit ? "2px solid red" : ""};

const Pfp = styled.img<{ genE: boolean }>`
  filter: ${(props) => props.genE ? "drop-shadow(1px 1px 8px #66c2a9) brightness(150%)" : ""};
  width: 20%;
  border: 5px solid #66c2a9;
  border-radius: 50%;
  background-color: #266152;
`

// const Edit = styled.p<{ generalEdit: boolean}>`
//   value: ${(props) => props.generalEdit ? "Save" : "Edit"};
// `

// const Reminder = styled.p<{ generalEdit: boolean }>`
//   display: ${(props) => props.generalEdit ? "none" : "none"};
// `