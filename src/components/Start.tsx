import * as React from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export enum FormType {
    Login = 0,
    Registration = 1,
}

type Props = {
    formType : FormType
}

export default function Start(props : Props) : React.ReactElement{
        
    return (
        <StartPage>
            <Agents></Agents>
            <Form formType={props.formType}></Form>
        </StartPage>
    );
}

const StartPage = styled.div`
    display: flex;
    flex-direction: row;
    background-color: black;
    height: 100vh;
    width: 100vw;

    @media (max-width: 1200px) {
        display: flex;
        flex-direction: column-reverse;
        align-items: center;
        justify-content: space-around;
        overflow-y: auto;
        overflow-x: hidden;
    }
`;

/* =============================================================== */ 

function Form(props : Props) : React.ReactElement<Props, any>{

    return (
        <OuterForm>
            <InnerForm>
                <Title>
                    <p id="title1">VALORANT</p>
                    <p id="title2">DUOFINDER</p>
                </Title>
                <Fields>
                    <p id="subtitle">{props.formType === FormType.Registration?'CREATE ACCOUNT':'LOGIN'}</p>
                    <input type='text' placeholder="USERNAME"></input>
                    {props.formType === FormType.Registration?<input type='email' placeholder="EMAIL"></input>:''}
                    <input type='password' placeholder="PASSWORD"></input>
                    {props.formType === FormType.Registration?<input type='password' placeholder="CONFIRM PASSWORD"></input>:''}
                    {props.formType === FormType.Registration?
                        <p className='question'>ALREADY HAVE AN ACCOUNT?<Link to='/login'> LOGIN</Link></p>:
                        <p className="question">DON'T HAVE AN ACCOUNT?<Link to='/register'> REGISTER</Link></p>}
                </Fields>
                <button>{props.formType === FormType.Registration?'SIGNUP':'START'}</button>
            </InnerForm>
        </OuterForm>
    );
}

const OuterForm = styled.div`
    width: 33vw;
    background-color: #181818;

    @media screen and (max-width: 1200px) {
        border-radius: 10px;
        padding: 5vw 2vw;
        transform: scale(1.5);
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
        }

        &:hover{
            cursor: default;
            background-color: #bcbaba; 
        }
    }
`

/* =============================================================== */ 

function Agents() : React.ReactElement{

    const { innerWidth: width, innerHeight: height } = window;
    const [imgHeight, setImgHeight] = React.useState(0);
    const imgRef = React.useRef(null);

    React.useEffect(() => {

        function handleWindowResize() {
            setImgHeight(imgRef.current?.clientHeight);
        }
        window.addEventListener('resize', handleWindowResize);

    }, []);

    return (
        <AgentContainer>    
            <div className='text-container' style={{height: (imgHeight === 0 || (window.matchMedia("(orientation: landscape)").matches && (width <= 900 || height <= 700)))?'10%':`calc(100% - ${imgHeight}px)`}}>
                <p>Find teammates to play Valorant with! Climb up the ranks with like-minded players and make long lasting friendships.</p>
            </div>
            <img ref={imgRef} src={require('../assets/images/agents_5.png')} alt="Group of Agents"></img>
        </AgentContainer>
    );
}

const AgentContainer = styled.div`
    width: 67%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative; 

    & div{
        display: flex;
        align-items: center; 
        justify-content: center;
        width: 100%;
        padding: 5% 0;

        & p {
            color: white;
            font-size: 2.2vh;
            text-align: center;
            padding: 0 10%;

         
        }
    }

    & img{
        display: block;
        width: 100%;
        height: auto; 
        margin: auto;
        content:url("../assets/images/agents_5.png");
    }

    @media (max-width: 1200px) {
        display: none;
    }
`