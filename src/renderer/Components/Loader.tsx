import React, { FC } from "react";
import styled, { keyframes } from "styled-components";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    grid-gap: 20px;
`;

const Text = styled.p`
    color: #444;
    text-align: center;
    text-transform: uppercase;
    letter-spacing: 2px;
`;

const Spin = keyframes`
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
`;

const Circle = styled.div`
    border: 4px solid #28a5ff;
    border-top-color: #ccc;
    border-radius: 50%;
    width: 64px;
    height: 64px;
    margin: auto;
    animation: ${Spin} 2s linear infinite;
`;

const Loader: FC = () => {
    return (
        <Wrapper>
            <Circle />
            <Text>Loading...</Text>
        </Wrapper>
    );
};

export default Loader;
