import * as React from 'react'
import styled from 'styled-components';
import { LoggedUserContext } from '../../contexts/LoggesUserContext';
import { GenderPicker } from './GenderPicker';
import { RankSlider } from './RankSlider';

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

    /* Age Range Height */
    const [ageRangeHeight, setAgeRangeHeight] = React.useState<number>(0);
    const serverPrefDiv = React.useRef(null);
    const gameModeTitle = React.useRef(null);

    React.useEffect(() => {
        let serverPrefDivHeight = serverPrefDiv?.current?.clientHeight ?? 0
        let gameModeTitleHeight = gameModeTitle?.current?.clientHeight ?? 0
        setAgeRangeHeight(serverPrefDivHeight + gameModeTitleHeight);
        function handleWindowResize() {
            let serverPrefDivHeight = serverPrefDiv?.current?.clientHeight ?? 0
            let gameModeTitleHeight = gameModeTitle?.current?.clientHeight ?? 0    
            setAgeRangeHeight(serverPrefDivHeight + gameModeTitleHeight);
        }
        window.addEventListener('resize', handleWindowResize);
    }, []);

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
                        <div style={{height: '25%'}} id='server-pref' className='row' ref={serverPrefDiv}>
                            <p>Sever Preferences:</p>
                            <div className='selects'>
                                <select className="sever-preferences">
                                    <option value="us-central">US Central</option>
                                </select>
                            </div>
                        </div>
                        <div style={{height: '25%'}} id='game-mode' className='row'>
                            <p ref={gameModeTitle}>Game Mode:</p>
                            <div className="radios">
                                <div className='radio-group'> 
                                    <input type="radio"value="Competitive"></input>
                                    <label>Competitive</label> 
                                </div> 
                                <div className='radio-group'>
                                    <input type="radio" value="Casual"/>
                                    <label>Casual</label>
                                </div> 
                            </div>
                        </div>
                        <div style={{height: '50%'}} id='rank-disparity' className='row'>
                            <p>Rank Disparity:</p>
                            <div className="ranks">
                                <RankSlider/>
                            </div>
                        </div>
                    </div>
                    <div id='right'>
                        <div id='age-range' style={{height: `calc(100% - (100% - ${ageRangeHeight}px))`}} className='row'>
                            <p>Age Range:</p>
                            <div className='ages'>
                                <input type='text' placeholder='Min' maxLength={2}></input>
                                <p>to</p>
                                <input type='text' placeholder='Max' maxLength={2}></input>
                            </div>
                        </div>
                        <div id='match-me-with' style={{height: `calc(100% - ${ageRangeHeight}px)`}} className='row'>
                            <p>Match me with:</p>
                            <div className='genders'>
                                <GenderPicker></GenderPicker>
                            </div>
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
    transition: all 0.25s ease-in-out;

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
        height: 60%;
        overflow: hidden;

        & p {
            font-size: 1.0vw;
            font-weight: bold;
            margin: 0;
            padding: 0;
        }

        & #left, #right{
            display: flex;
            flex-direction: column;
            justify-content: space-between;
        }

        & .row{
            display: flex;
            flex-direction: column;
        }

        & #left{
            width: 70%;

            & .row{                
                height: 33.33%;
            }

            /* Server Preferences */
            & #server-pref{
   
                .selects{
                    display: flex;
                    align-items: center;
                    height: 100%;
                    width: 100%;

                    & select {
                        width: auto;
                        height: auto;
                        padding: 0.5vw;
                        border-radius: 12px;
                        background-color: #D9D9D9;
                        font-size: 0.7vw;
                        justify-content: left;

                        @media screen and (max-width: 950px) and (orientation: portrait){
                            width: auto;
                            height: auto;
                            font-size: 2.0vw;
                            transform: translate(-25%,0) scale(0.5);
                        }
                    }
                }
            }

            /* Game Mode */
            & #game-mode{

                & .radios{

                    display: flex;
                    flex-direction: row;
                    justify-content: left;
                    align-items: center;
                    width: 100%;
                    height: 100%;

                    & .radio-group{
                        display: flex;
                        flex-direction: row;
                        justify-content: left;
                        align-items: center;
                        background-color: #D9D9D9; 
                        padding: 0.2vw 0;
                        padding-right: 1vw;
                        border-radius: 10px;
                        color: black; 
                        width: auto;
                        height: 1.5vw;
                        font-size: 0.8vw; 
                        margin-right: 2%;
                    
                        & input{
                            accent-color: black;
                            height: 1vw;
                            width: 1vw;
                            margin-top: auto;
                            margin-bottom: auto;
                            min-width: 3px;
                            min-height: 3px;

                            &:hover{
                                cursor: pointer;
                            }

                            &:focus{
                                outline: none;
                            }
                        }

                        & label{
                            margin-left: 0.1vw;
                            font-size: 100%;
                        }
                    }
                }
            }

            /* Rank Disparity */
            & #rank-disparity{
                width: 100%;

                & .ranks{
                    display: flex;
                    height: 100%;
                    width: 100%;
                    justify-content: left;
                    margin-top: 3%;
                    /* align-items: center; */

                    & input{
                        width: 85%;
                        height: 10%;
                    }
                }
            }
        }

        & #right {
            width: 30%;

            & .row{
                height: 50%;
            }

            /* Age Range */
            & #age-range{
                display: flex;

                & .ages{
                    display: flex;
                    flex-direction: row;
                    justify-content: left;
                    width: 100%;
                    height: 100%;
                    align-items: center;
                
                    & input{
                        width: 20%;
                        height: auto;
                        padding: 0.6vw;
                        border-radius: 35%;
                        background-color: #D9D9D9;
                        font-size: 0.8vw;
                        border: none;

                        &::placeholder{
                            text-align: center;
                            color: black;
                        }

                        &:focus{
                            outline: none;
                        }
                    }

                    & p{
                        font-size: 1.0vw;
                        font-weight: normal;
                        margin: 0 5%;
                    }
                }
            }
            
            /* Match Me With */
            & #match-me-with{

                & .genders{
                    display: flex;
                    flex-direction: row;
                    justify-content: left;
                    width: 100%;
                    height: 100%;
                    margin-top: 7%;
                }
            }
        }
    }

    & #footer{
        height: 15%;
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

    @media screen and (max-width: 950px) and (orientation: portrait){
        transform: scale(2.0);
    } 
`;