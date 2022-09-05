import React, { FC, useContext } from "react";
import styled from "styled-components";
import { AppContext } from "./App";
import Button from "./Button";
import Path from "./Path";

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

const OpenFile: FC = () => {
    const context = useContext(AppContext);
    return (
        <Wrapper>
            <Label>Load savegame file</Label>
            <Hint>Derail Valley stores save data in this direction:</Hint>
            <Path>
                /steamapps/common/Derail Valley/DerailValley_Data/SaveGameData
            </Path>
            <Button onClick={() => context.onOpenFileHandle()}>Open file</Button>
        </Wrapper>
    );
};

export default OpenFile;
