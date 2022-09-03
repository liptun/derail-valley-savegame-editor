import React, { FC } from "react";
import styled from "styled-components";
import logo from "../assets/dvlogo.png";

const Logo = styled.img`
    width: 180px;
`;

const Wrapper = styled.div`
    background-color: #222;
    padding: 15px 30px;
    color: white;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const Title = styled.h2`
    font-size: 1.4em;
    letter-spacing: 3px;
    text-transform: uppercase;
    margin-bottom: 4px;
`
const Author = styled.h3`
    font-size: .8em;
    opacity: 0.5;
    margin-top: 4px;
`

const Topbar: FC = () => {
    return (
        <Wrapper>
            <Logo src={logo} />
            <div>
                <Title>savegame editor</Title>
                <p>for Derail Dalley: Overhauled</p>
                <Author>by LiptuN</Author>
            </div>
        </Wrapper>
    );
};

export default Topbar;
