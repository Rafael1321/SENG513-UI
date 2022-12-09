import * as React from 'react'
import styled from 'styled-components';

export function RankSlider() : React.ReactElement{
    return (<>
        <OuterContainer>
            <input type="range" min="1" max="9" value="1"></input> 
            <RankIcons>
                <Icon><img src={require('../../assets/images/ranks/rank_1.png')} alt="rank 1"></img></Icon>
                <Icon><img src={require('../../assets/images/ranks/rank_2.png')} alt="rank 2"></img></Icon>
                <Icon><img src={require('../../assets/images/ranks/rank_3.png')} alt="rank 3"></img></Icon>
                <Icon><img src={require('../../assets/images/ranks/rank_4.png')} alt="rank 4"></img></Icon>
                <Icon><img src={require('../../assets/images/ranks/rank_5.png')} alt="rank 5"></img></Icon>
                <Icon><img src={require('../../assets/images/ranks/rank_6.png')} alt="rank 6"></img></Icon>
                <Icon><img src={require('../../assets/images/ranks/rank_7.png')} alt="rank 7"></img></Icon>
                <Icon><img src={require('../../assets/images/ranks/rank_8.png')} alt="rank 8"></img></Icon>
                <Icon><img src={require('../../assets/images/ranks/rank_9.png')} alt="rank 9"></img></Icon>
            </RankIcons>
        </OuterContainer>
    </>)
}

const OuterContainer = styled.div`
    width: 90%;
    /* background-color: red; */

    & input{
        margin-left: 3%;
        width: 93%!important;
        appearance: none;
        outline: none; 
        background: #D9D9D9;
        overflow: hidden;

        &::-ms-track{
            box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
            border: 1px solid #000000;
            height: 1px;
            width: 16px;
            border-radius: 3px;
            background: #ffffff;
            cursor: pointer;
        }  
    }

`;

const RankIcons = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    height: auto;
`;

const Icon = styled.div`
    width: calc(100% / 9);
    display: flex;
    justify-content: center;
    align-items: center;

    & img{
        height: 1.5vw;;
    }
`;