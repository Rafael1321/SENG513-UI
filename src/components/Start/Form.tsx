import * as React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthService, IAuthResponse } from '../../services/AuthService';
import { LoggedUserContext } from '../../contexts/LoggedUserContext';
import { CustomToast } from '../Shared/CustomToast';
import { IUser } from '../../models/AuthModels';

export enum FormType {
    Login = 0,
    Registration = 1,
}

type Props = {
    formType : FormType
}

export function Form(props : Props) : React.ReactElement<Props, any>{

    /* Logged User Context */
    const loggedUserContext = React.useContext(LoggedUserContext);

    /* Navigation */
    const navigate = useNavigate();

    /* Form State */

    const [displayName, setDisplayName] = React.useState('');
    const [gameName, setGameName] = React.useState('');
    const [tag, setTag] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');

    const [loading, setLoading] = React.useState<boolean>(false);

    /* Handlers */

    // Form
    const handleDisplayNameChange = (e : any) => { setDisplayName(e.target.value.toLowerCase()); }
    const handleGameNameChange = (e : any) => { setGameName(e.target.value); }
    const handleTagChange = (e : any) => { setTag(e.target.value.toUpperCase()); }

    const handleEmailChange = (e : any) => { setEmail(e.target.value.toLowerCase()); }
    const handlePasswordChange = (e : any) => { setPassword(e.target.value); }
    const handleConfirmPasswordChange = (e : any) => { setConfirmPassword(e.target.value); }

    // Button
    const handleButtonClick = async () : Promise<void> => {

        if(loading){ // avoid multiple requests sent to api
            toast.error("Please wait, your request is being processed.");
            return; 
        }

        // Email and password
        if(!email){
            toast.error("Please provide email.");
            return;
        }else if(!password){
            toast.error("Please provide a password.");
            return;
        }

        if(props.formType === FormType.Registration){

            // Password, GameName and Tag validation
            if(!gameName){
                toast.error("Please provide a game name");
                return;
            }else if(!tag){
                toast.error("Please provide a tag");
                return;
            }else if(!confirmPassword){
                toast.error("Please confirm your password.");
                return;
            }else if(password !== confirmPassword){
                toast.error("Confirm password does not match password");
                return;
            }
            
            setLoading(true);

            // Call API to attempt registration
            let newUser = { displayName: displayName, gameName : gameName, tagLine : tag,
                email : email, password : password, avatarImage : 'test.png'};
            const authResponse : IAuthResponse = await AuthService.register(newUser);

            if(authResponse.statusCode !== 201){ // Username already in use or Email already in use
                toast.error(authResponse.data as String);
                setLoading(false);
                return;
            }else{ 
                loggedUserContext.updateLoggedUser(authResponse.data as IUser);
                setLoading(false);
            }

        }else{

            setLoading(true);

            // Call API to attempt login
            const authResponse : IAuthResponse = await AuthService.login({email:email, password:password});

            if(authResponse.statusCode !== 200){  // Wrong email and password combination
                toast.error(authResponse.data as String);
                setLoading(false);
                return;
            }else{ 
                loggedUserContext.updateLoggedUser(authResponse.data as IUser);
                setLoading(false);
            }
        }
        navigate('../landing');
    }

    return (
        <>
            <CustomToast></CustomToast>
            <OuterForm>
                <InnerForm>
                    <Title>
                        <p id="title1">VALORANT</p>
                        <p id="title2">DUOFINDER</p>
                    </Title>
                    <Fields>
                        <p id="subtitle">{props.formType === FormType.Registration?'CREATE ACCOUNT':'LOGIN'}</p>
                        {props.formType === FormType.Registration?<input type='text' placeholder="DISPLAY NAME (optional)" onChange={handleDisplayNameChange}></input>:''}
                        {props.formType === FormType.Registration?<InputPair>
                            <input id='game-name' type='text' placeholder="GAME NAME" onChange={handleGameNameChange}></input>
                            <input id='tag' type='text' placeholder="TAG" onChange={handleTagChange}></input>
                        </InputPair>:''}
                        <input type='email' placeholder="EMAIL" onChange={handleEmailChange}></input>
                        <input type='password' placeholder="PASSWORD" onChange={handlePasswordChange}></input>
                        {props.formType === FormType.Registration?<input type='password' placeholder="CONFIRM PASSWORD" onChange={handleConfirmPasswordChange}></input>:''}
                        {props.formType === FormType.Registration?
                            <p className='question'>ALREADY HAVE AN ACCOUNT?<Link to='/login'> LOGIN</Link></p>:
                            <p className="question">DON'T HAVE AN ACCOUNT?<Link to='/register'> REGISTER</Link></p>}
                    </Fields>
                    <button onClick={handleButtonClick}>{props.formType === FormType.Registration?'SIGNUP':'START'}</button>
                </InnerForm>
            </OuterForm>
        </>
    );
}

const OuterForm = styled.div`
    width: 33vw;
    background-color: #181818;

    @media screen and (max-width: 950px) {
        border-radius: 10px;
        padding: 5vw 2vw;
        transform: scale(1.5);
        background-color: rgb(24, 24, 24, 0.8);
        box-shadow: 0 0 1.0rem 0.1rem rgb(74, 183, 190); 
    }

    @media screen and (max-width: 700px) {
        transform: scale(1.7);
    }

    @media screen and (max-width: 500px) {
        transform: scale(1.5);
    }
`;

const InnerForm = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;

    & button { 
        padding: 10px;
        background-color: #F94B4B;
        border: none;
        border-radius: 0.5vw;
        font-size: 1.3vw;
        color: white;
        width: auto;
        padding: 3%;
        transition: 0.2s ease-in-out;

        &:hover{
            cursor: pointer;
            background-color: #cb1e1e;
        }
    }
`;

const Title = styled.div`
    text-align: center;

    & p{
        margin: 0;
        display: block;
        font-family: 'valorant';
    }

    & #title1{
        font-size: 3.5vw;
    }

    & #title2{
        font-size: 4.5vw;
        color: #F94B4B;
    }
`;

const Fields = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: auto;
    margin: 15% 0;

    & #subtitle {
        font-size: 1.2vw;
    }

    & .question {
        font-size: 1.0vw;

        & a {
            color: #F94B4B;
            text-decoration: none;
            transition: 0.2s ease-in-out;

            &:hover{
                cursor: pointer;
                color: #cb1e1e;
            }
        }
    }

    & input{
        padding: 1vw;
        border: none;
        background-color: #e6e3e3;
        border-radius: 0.5vw;
        width: 15vw;
        height: 10px;
        margin: 5px;
        transition: 0.2s ease-in-out;

        &::placeholder{
            color: black;
            font-size: 0.8vw;
            opacity: 50%;
        }

        &:hover{
            cursor: default;
            background-color: #bcbaba; 
        }
    }
`;

const InputPair = styled.div`
    display: flex;
    flex-direction: row;

    & #game-name{
        width: 9.5vw;
    }

    & #tag{
        width: 3vw;
    }
`;