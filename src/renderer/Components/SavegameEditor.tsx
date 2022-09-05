import React, { FC, useContext } from "react";
import ReactJson from "react-json-view";
import styled from "styled-components";
import { AppContext } from "./App";

const Wrapper = styled.div``;

const SavegameEditor: FC = () => {
    const context = useContext(AppContext);
    return (
        <Wrapper>
            <ReactJson src={context.savegame} />
        </Wrapper>
    );
};

export default SavegameEditor;
