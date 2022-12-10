import { Slider } from '@mui/material';
import * as React from 'react'
import styled from 'styled-components';

export enum RankType{
    iron = 1,
    bronze = 2,
    silver = 3,
    gold = 4,
    platinum = 5,
    diamond = 6,
    ascendent = 7,
    immortal = 8,
    radiant = 9
}

export enum RankLevel{
    one = 1,
    two = 2,
    three = 3
}

// Represents a rank composed of two parts:
// Rank Type and Rank Level 
export interface IRank{
    rankType : RankType
    rankLevel : RankLevel
}

export function RankSlider() : React.ReactElement{
    
    /* Constants */
    const marks = [{value: 0.8, label: ''}, {value: 1,label: ''},{value: 1.2,label: ''},{value: 1.8,label: ''},
                   {value: 2,label: ''},{value: 2.2,label: ''},{value: 2.8,label: ''},{value: 3,label: ''},
                   {value: 3.2,label: ''},{value: 3.8,label: ''},{value: 4,label: ''},{value: 4.2,label: ''},
                   {value: 4.8,label: ''},{value: 5,label: ''},{value: 5.2,label: ''},{value: 5.8,label: ''},
                   {value: 6,label: ''},{value: 6.2,label: ''},{value: 6.8,label: ''},{value: 7,label: ''},
                   {value: 7.2,label: ''},{value: 7.8,label: ''},{value: 8,label: ''},{value: 8.2,label: ''},
                   {value: 9,label: ''}];

    const [value, setValue] = React.useState<number[]>([5, 6]);

      /* Handlers */

    const handleChange = (event: Event, newValue: number | number[], activeThumb: number) : void => {
        if (!Array.isArray(newValue) || !inCorrectRange(newValue[0]) || !inCorrectRange(newValue[1])) {
            return;
        }
        let minSeparation = (value[1] === 9.0?0.8:0.6);

        if (activeThumb === 0) {
            setValue([Math.min(newValue[0], value[1] - minSeparation), value[1]]);
        } else {
            setValue([value[0], Math.max(newValue[1], value[0] + minSeparation)]);
        }
    };

    /* Helper Functions */

    const inCorrectRange = (value : number) : boolean => {
        let result : boolean = (value === 0.8 || value === 1 || value === 1.2);
        result  ||= (value === 1.8 || value === 2 || value === 2.2);
        result  ||= (value === 2.8 || value === 3 || value === 3.2);
        result  ||= (value === 3.8 || value === 4 || value === 4.2);
        result  ||= (value === 4.8 || value === 5 || value === 5.2);
        result  ||= (value === 5.8 || value === 6 || value === 6.2);
        result  ||= (value === 6.8 || value === 7 || value === 7.2);
        result  ||= (value === 7.8 || value === 8 || value === 8.2);
        result  ||= value === 9.0;
        return result;   
    }

    function toSliderRank() : number {
        return 0;
    }

    function toRank() : IRank {
        return {rankLevel:1, rankType:1};
    }

    return (<>
        <OuterContainer>
            <CustomSlider value={value} onChange={handleChange} valueLabelDisplay="off"
                          disableSwap min={0.6} max={9.2} step={0.1} marks={marks}/>
            <RankIcons>
                <img style={{marginLeft:'2.7%'}} src={require('../../assets/images/ranks/rank_1.png')} alt="rank 1"></img>
                <img style={{marginLeft:'6.6%'}} src={require('../../assets/images/ranks/rank_2.png')} alt="rank 2"></img>
                <img style={{marginLeft:'6.5%'}} src={require('../../assets/images/ranks/rank_3.png')} alt="rank 3"></img>
                <img style={{marginLeft:'5.8%'}} src={require('../../assets/images/ranks/rank_4.png')} alt="rank 4"></img>
                <img style={{marginLeft:'5.6%'}} src={require('../../assets/images/ranks/rank_5.png')} alt="rank 5"></img>
                <img style={{marginLeft:'5.8%'}} src={require('../../assets/images/ranks/rank_6.png')} alt="rank 6"></img>
                <img style={{marginLeft:'5.4%'}} src={require('../../assets/images/ranks/rank_7.png')} alt="rank 7"></img>
                <img style={{marginLeft:'5.4%'}} src={require('../../assets/images/ranks/rank_8.png')} alt="rank 8"></img>
                <img style={{marginLeft:'6.0%'}} src={require('../../assets/images/ranks/rank_9.png')} alt="rank 9"></img>
            </RankIcons>
        </OuterContainer>
    </>)
}

const OuterContainer = styled.div`
    display: flex;
    flex-direction: column;
    /* width: 90%; */
    /* width: 22vw; */
    width: 90%;
    height: 4vw;
    /* height: auto; */
`;

const CustomSlider = styled(Slider)`
    margin-left: 0.2vw;
    margin-bottom: 6%;
    height: 0.1vw!important;
    padding: 0!important;


    & .MuiSlider-thumb {
      background-color: #BD3944;
      height: 0.8vw;
      width: 0.3vw;
      border-radius: 0;
    }

    & .MuiSlider-rail {
      color: #D9D9D9;
      height: 0.2vw;
      opacity: 100%;
      border-radius: 0;
    }

    & .MuiSlider-track{
        color: #BD3944;
    }

    & .MuiSlider-mark{
        color: white;
        height: 0.5vw;
        width: 0.15vw;
        margin-top: 4%;
    }
`;

const RankIcons = styled.div`
    display: flex;
    flex-direction: row;
    height: auto;
    width: auto;

    & img{
        height: 1.5vw;
        width: auto;
        padding: 0.4vw 0 0 0;
    }
`;

const Icon = styled.div`
    display: flex; 
    align-items: center; 
    justify-content: center;
    background-color: blue;
    width: auto;
    /* width: 7.5%;   */
    
 
`;

// const Separator = styled.div`
//     background-color: red;
//     width: calc(32.5%/8);  
// `;