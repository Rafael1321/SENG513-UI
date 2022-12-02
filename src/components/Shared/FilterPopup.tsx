import * as React from 'react'
import 'react-toastify/dist/ReactToastify.css';
import styled from 'styled-components';
import { LoggedUserContext } from '../../contexts/LoggesUserContext';

type Props = {
    triggered : boolean;
    closeMe : () => void;
}

type PopupProps = {
    triggered : boolean;
}

export function FilterPopup(props : Props) : React.ReactElement<Props, any> {

    /* Logged user context */
    const loggedUserContext = React.useContext(LoggedUserContext);

    function handleSave(){

    }

    return (
        <Popup triggered={props.triggered}>
            <PopupContent>
                <div id='header'>
                    <p id='title'>CHAT FILTERS</p>
                    <p id='subtitle'>Choose who you want to match with</p>
                </div>
                <div id='body'>
                    <div id='left'>
                        <div className='row'>
                            <p>Sever Preferences:</p>
                            <select name="sever-preferences">
                                <option value="us-central">US Central</option>
                            </select>
                        </div>
                        <div className='row'>
                            <p>Game Mode:</p>
                            <div className='radio-group'>
                                <input type="radio"value="Competitive"></input>
                                <label>Competitive</label>
                            </div>
                            <div className='radio-group'>
                                <input type="radio" value="Casual"/>
                                <label>Casual</label>
                            </div>
                        </div>
                        <div className='row'>
                            <p>Rank Disparity:</p>
                        </div>
                    </div>
                    <div id='right'>
                        <div className='row'>
                            <p>Age Range:</p>
                        </div>
                        <div className='row'>
                            <p>Match me with:</p>
                        </div>
                    </div>
                </div>
                <div id='footer'>
                    <button id='cancel-btn' onClick={() => {props.closeMe()}}>CANCEL</button>
                    <button id='save-btn' onClick={handleSave}>SAVE</button>
                </div>
            </PopupContent>
        </Popup>
    );
}

const Popup = styled.div( (props : PopupProps) => `
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background-color: rgb(0,0,0,0.4);
    display: ${props.triggered?'flex':'none'};
    align-items: center;
    justify-content: center;
    z-index: 2;
`);

const PopupContent = styled.div`
    display:flex;
    flex-direction:column;
    width: 35vw;
    height: 30vw;
    background-color: #181818;
    border-radius: 10%;
    padding: 2vw;

    & #header{
        text-align: center;
        height: 25%;

        & #title{
            font-size: 2.5vw;
            font-weight: bold;
            margin: 0;
            padding: 0;
        }

        & #subtitle{
            font-size: 1.2vw;
            margin: 0;
            padding: 0;
        }
    }

    & #body{
        display: flex;
        flex-direction: row;
        height: 80%;

        & p {
            font-size: 1.0vw;
            font-weight: bold;
        }


        & #left, #right{
            padding: 3%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
        }

        & #left{
            width: 65%;

            & select {
                width: 40%;
                padding: 0.5vw;
                border-radius: 12px;
                background-color: #D9D9D9;
                font-size: 1.0vw;
            }

            & .row{
                height: 33.33%;
            }
        }

        & #right {
            width: 35%;

            & .row{
                height: 50%;
            }
        }
    }

    & #footer{
        height: 20%;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;

        & button{
            margin: 3%;
            padding: 2% 0;
            width: 7vw;
            font-size: 1.2vw;
            border-radius: 10px;
            color: white;
            border: none;
            font-weight: bold;

            &:hover{
                cursor: pointer;
            }
        }

        & #save-btn{
            background-color: #66C2A9;

            &:hover{
                background-color: #1cce9f;
            }
        }

        & #cancel-btn{
            background-color: #F94B4B;

            &:hover{
                background-color: #cb1e1e;
            }
        }
    }
`;