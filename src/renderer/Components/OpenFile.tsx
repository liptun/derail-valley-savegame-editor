import React, { FC } from "react";
import styled from "styled-components";
import Button from "./Button";

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    grid-gap: 15px;
    padding: 30px;
    flex-direction: column;
`;

const Label = styled.p`
    text-align: center;
    margin-bottom: 30px;
    font-size: 1.8em;
`;

const Hint = styled.p`
    font-size: 0.8em;
`;
const Path = styled.code`
    font-size: 0.8em;
    font-family: monospace;
    background-color: #ccc;
    padding: 8px 12px;
    color: #333;
    border-radius: 8px;
`;

const OpenFile: FC = () => {
    return (
        <Wrapper>
            <Label>Load savegame file</Label>
            <Hint>Derail Valley stores save data in this direction:</Hint>
            <Path>
                /steamapps/common/Derail Valley/DerailValley_Data/SaveGameData
            </Path>
            <Button label="Open" />
        </Wrapper>
    );
};

export default OpenFile;
