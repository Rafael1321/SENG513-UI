import React from "react";
import styled from "styled-components";

type Props = {
    text: string;
    width?: string;
    height?: string;
    url?: string;
};

function Button(props: Props): React.ReactElement {
    return (
        <Wrapper height={props.height} width={props.width}>
            {props.url && <Image url={props.url} size={"40px"} />}
            <Text>{props.text}</Text>
        </Wrapper>
    );
}

const Wrapper = styled.div<{ width?: string; height?: string }>`
    display: flex;
    justify-content: space-evenly;

    align-items: center;

    background: #66c2a9;
    background-blend-mode: darken;
    mix-blend-mode: normal;
    box-shadow: 0px 3px 3px -2px rgba(255, 255, 255, 0.35);
    border-radius: 10px;

    aspect-ratio: 16/7;
    height: ${(props) => props.height};
    width: ${(props) => props.width};


    :hover {
        cursor: pointer;

        // For no text selection
        -webkit-touch-callout: none; /* iOS Safari */
        -webkit-user-select: none; /* Safari */
        -khtml-user-select: none; /* Konqueror HTML */
        -moz-user-select: none; /* Old versions of Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
        user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome, Edge, Opera and Firefox */
    }
`;

const Image = styled.img<{ url: string; size: string }>`
    position: relative;
    width: ${(props) => props.size};
    height: ${(props) => props.size};
    content: url(${(props) => props.url});
`;

const Text = styled.div`
    font-family: "Arimo";
    font-style: normal;
    font-weight: 700;
    font-size: 1.5em;

    text-align: center;

    color: #ffffff;

    mix-blend-mode: normal;

    @media all and (max-width: 1400px) {
        font-size: 1rem;
    }

    @media all and (max-width: 500px) {
        font-size: 0.25em;
    }
`;

export default Button;
