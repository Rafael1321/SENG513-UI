import * as React from 'react'
import styled from 'styled-components';
import { Agents } from './Agents';
import { Form, FormType } from './Form';


type Props = {
    formType : FormType
}

export default function Start(props : Props) : React.ReactElement{
        
    return (
        <StartPage>
            <Agents formType={props.formType}></Agents>
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
    position: relative;

    @media (max-width: 950px) {
        display: flex;
        flex-direction: column-reverse;
        align-items: center;
        justify-content: space-around;
    }

    @media (max-width: 950px) and (orientation: landscape){
        height: 100vw;
        width: 100vw;
    }
`;