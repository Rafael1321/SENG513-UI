import * as React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthService, IAuthResponse } from '../../services/AuthService';
import { LoggedUserContext } from '../../contexts/LoggesUserContext';
import { CustomToast } from '../Shared/CustomToast';

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

    const [userName, setUserName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');

    /* Handlers */

    // Form
    const handleUsernameChange = (e : any) => { setUserName(e.target.value); }
    const handleEmailChange = (e : any) => { setEmail(e.target.value); }
    const handlePasswordChange = (e : any) => { setPassword(e.target.value); }
    const handleConfirmPasswordChange = (e : any) => { setConfirmPassword(e.target.value); }

    React.useEffect(() => {
        if(localStorage.getItem("logged-in")){
            navigate('./landing');
        }
    }, []);

    // Button
    const handleButtonClick = async () : Promise<void> => {

        // Validating username and password
        if(userName === ''){
            toast.error("Please provide a user name.");
            return;
        }else if(password === ''){
            toast.error("Please provide a password.");
            return;
        }

        if(props.formType === FormType.Registration){

            // Validation email and password
            if(email === ''){
                toast.error("Please provide your email.");
                return;
            }else if(confirmPassword){
                toast.error("Please confirm your password.");
                return;
            }else if(password !== confirmPassword){
                toast.error("Confirm password does not match password");
                return;
            }
            
            // Call API to attempt registration
            const authResponse : IAuthResponse = await AuthService.register(userName, email, password);

            if(authResponse.statusCode !== 201){ // Username already in use or Email already in use
                toast.error(authResponse.data);
                return;
            }else{ 
                loggedUserContext.updateLoggedUser(authResponse.data);
                localStorage.setItem('logged-in', JSON.stringify(true));
            }
        }else{

            // Call API to attempt login
            const authResponse : IAuthResponse = await AuthService.login(userName, password);

            if(authResponse.statusCode !== 200){  // Wrong email and password combination
                toast.error(authResponse.data);
                return;
            }else{ 
                loggedUserContext.updateLoggedUser(authResponse.data);
                localStorage.setItem('logged-in', JSON.stringify(true));
            }
        }
        navigate('./landing');
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
                        <input type='text' placeholder="USERNAME" onChange={handleUsernameChange}></input>
                        {props.formType === FormType.Registration?<input type='email' placeholder="EMAIL" onChange={handleEmailChange}></input>:''}
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

    @media screen and (max-height: 400px) and (orientation:landscape){
        transform: scale(1.0)
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
        color: #F94B4B;
    }

    & #title2{
        font-size: 4.5vw;
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
        }

        &:hover{
            cursor: default;
            background-color: #bcbaba; 
        }
    }
`