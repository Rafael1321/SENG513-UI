import * as React from 'react'
import styled from 'styled-components';
import { FilterContext } from '../../contexts/FilterContext';

export enum Gender{
    allGenders = 0,
    woman = 1,
    man = 2,
    nonBinary = 3    
}

interface IPos{
    left : number;
    top : number;
}

export function GenderPicker() : React.ReactElement{

    /* Filter context */
    const filterContex = React.useContext(FilterContext);

    const allGendersInput = React.useRef(null);
    const [horizontalLinePos, setHorizontalLinePos] = React.useState<IPos>({left:0,top:0});

    React.useEffect(() => {

        setHorizontalLinePos({
            left: allGendersInput?.current?.offsetLeft ?? 0,
            top: allGendersInput?.current?.offsetTop + 1 ?? 0
        });
        function handleWindowResize() {
            setHorizontalLinePos({
                left: allGendersInput?.current?.offsetLeft ?? 0,
                top: allGendersInput?.current?.offsetTop + 1 ?? 0
            });
        }
        window.addEventListener('resize', handleWindowResize);

    }, []);

    /* Handlers */

    function handleGenderChange(){
        // Update filter context here
    }

    /* Helpers */ 

    // Add a function to load things based on filters

    return (
        <PickerContainer>
            <div className='checkbox-row'>
                <input type="checkbox" ref={allGendersInput}></input>
                <label>All Genders</label>
            </div>
            <div className='checkbox-row indent'>
                <input type="checkbox"></input>
                <label>Woman</label>
            </div>
            <div className='checkbox-row indent'>
                <input type="checkbox"></input>
                <label>Man</label>
            </div>
            <div className='checkbox-row indent'>
                <input type="checkbox"></input>
                <label>NB</label>
            </div>
            <div className='vertical-line' style={{top:horizontalLinePos.top, left:horizontalLinePos.left}}></div>
            <div id='horizontal1' className='horizontal-line' style={{top:horizontalLinePos.top, left:horizontalLinePos.left}}></div>
            <div id='horizontal2' className='horizontal-line' style={{top:horizontalLinePos.top, left:horizontalLinePos.left}}></div>
            <div id='horizontal3' className='horizontal-line' style={{top:horizontalLinePos.top, left:horizontalLinePos.left}}></div>
        </PickerContainer>
    );
}

const PickerContainer = styled.div`
    height: auto;
    width: 100%;
    position: relative;

    & input{
        height: 1.0vw;
        width: 1.0vw;
        margin-top: auto;
        margin-bottom: auto;
        z-index: 2;
        min-width: 5px;
        min-height: 5px;
    }

    & label{
        font-size: 1.0vw;
        margin-left: 5%;
    }

    & .checkbox-row{
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: left;
        width: auto;
        margin-bottom: 4%;
    }

    & .indent{
        margin-left: 15%;
    }

    & .vertical-line{
        position: absolute;
        width: 0.45vw;
        height: 5.65vw;
        border-right: 1px solid #66C2A9;
        z-index: 0;
    }

    & .horizontal-line{
        position: absolute;
        border-bottom: 1px solid #66C2A9;
        width: 1vw;
        margin-left: 5.5%;
        z-index: 0;      
    }

    & #horizontal1{
        height: 2.2vw;

        @media screen and (max-width: 950px) {
            height: 2.0vw;
        }
    }

    & #horizontal2{
        height: 3.85vw;

        @media screen and (max-width: 950px) {
            height: 3.65vw;
        }
    }

    & #horizontal3{
        height: 5.6vw;

        @media screen and (max-width: 950px) {
            height: 5.4vw;
        }
    }
`;