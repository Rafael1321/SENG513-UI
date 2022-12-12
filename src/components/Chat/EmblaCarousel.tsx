import React, { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { mediaByIndex } from "../../media";
import "./embla.css";
import styled from "styled-components";
import HistoryCard from "./HistoryCard";
import { Chat } from "./ChatHistory";

enum HistoryCardSize {
    One = "35%",
    Two = "30%",
    Three = "10%",
}

type Props = {
    history: Array<Chat>;
    slides: Array<number>;
};

export const EmblaCarousel = (props: Props) => {
    const [viewportRef, embla] = useEmblaCarousel({
        align: "center",
        skipSnaps: false,
        draggable: false,
    });
    const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
    const [nextBtnEnabled, setNextBtnEnabled] = useState(false);
    const [main, setMain] = useState(0);

    const decrement = (val: number) => {
        setMain((val -= 1));
    };

    const increment = (val: number) => {
        setMain((val += 1));
    };

    const scrollPrev = useCallback(() => {
        embla && embla.scrollPrev();
        setMain(main - 1);
    }, [embla, main]);

    const scrollNext = useCallback(() => {
        embla && embla.scrollNext();
        setMain(main + 1);
    }, [embla, main]);

    const onSelect = useCallback(() => {
        if (!embla) return;
        setPrevBtnEnabled(embla.canScrollPrev());
        setNextBtnEnabled(embla.canScrollNext());
    }, [embla]);

    useEffect(() => {
        if (!embla) return;
        embla.on("select", onSelect);
        onSelect();
    }, [embla, onSelect]);

    return (
        <Container>
            <div className="embla__viewport" ref={viewportRef}>
                <div className="embla__container">

                    {props.history.map((chat: Chat) => (
                        <HistoryCard
                            key={chat.key}
                            width={main === chat.key ? HistoryCardSize.One : HistoryCardSize.Two}
                            url={chat.profile_url}
                            username={chat.username}
                            message={chat.last_message}
                            isMain={main === chat.key}
                            zIndex={main === chat.key ? "3" : "1"}
                        />
                    ))}

                </div>
            </div>
            
            <div className="e"></div>

            <PrevButton onClick={scrollPrev} enabled={prevBtnEnabled} />
            <NextButton onClick={scrollNext} enabled={nextBtnEnabled} />
        </Container>
    );
};

interface IButtonProps {
    enabled: boolean;
    onClick: React.MouseEventHandler<HTMLButtonElement>;
}

export const PrevButton = (props: IButtonProps) => (
    <button className="embla__button embla__button--prev" onClick={props.onClick} disabled={!props.enabled}>
        <svg className="embla__button__svg" viewBox="137.718 -1.001 366.563 644">
            <path d="M428.36 12.5c16.67-16.67 43.76-16.67 60.42 0 16.67 16.67 16.67 43.76 0 60.42L241.7 320c148.25 148.24 230.61 230.6 247.08 247.08 16.67 16.66 16.67 43.75 0 60.42-16.67 16.66-43.76 16.67-60.42 0-27.72-27.71-249.45-249.37-277.16-277.08a42.308 42.308 0 0 1-12.48-30.34c0-11.1 4.1-22.05 12.48-30.42C206.63 234.23 400.64 40.21 428.36 12.5z" />
        </svg>
    </button>
);

export const NextButton = (props: IButtonProps) => (
    <button className="embla__button embla__button--next" onClick={props.onClick} disabled={!props.enabled}>
        <svg className="embla__button__svg" viewBox="0 0 238.003 238.003">
            <path d="M181.776 107.719L78.705 4.648c-6.198-6.198-16.273-6.198-22.47 0s-6.198 16.273 0 22.47l91.883 91.883-91.883 91.883c-6.198 6.198-6.198 16.273 0 22.47s16.273 6.198 22.47 0l103.071-103.039a15.741 15.741 0 0 0 4.64-11.283c0-4.13-1.526-8.199-4.64-11.313z" />
        </svg>
    </button>
);



const Container = styled.div`
    position: relative;
    padding: 2%;
    width: 100%;
    height: 100%;
    margin-left: auto;
    margin-right: auto;
`;

// const EmblaSlide = styled.div<{ width: string }>`
//     position: relative;
//     flex: 0 0 ${(props) => props.width};
// `;

export default EmblaCarousel;
