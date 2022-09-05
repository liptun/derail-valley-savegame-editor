import React, { FC, useContext } from "react";
import styled from "styled-components";
import { AppContext } from "./App";
import Button from "./Button";
import Path from "./Path";

const Wrapper = styled.div`
    display: flex;
    padding: 30px;
    grid-gap: 30px;
    align-items: center;
`;

const CloseButton = styled(Button)`
    flex-shrink: 0;
    background-color: #cb5c5c;
`;

const CloseFile: FC = () => {
    const context = useContext(AppContext);
    return (
        <Wrapper>
            <CloseButton onClick={() => context.onCloseFileHandle()}>
                Close file
            </CloseButton>
            <Path>{context.path}</Path>
        </Wrapper>
    );
};

export default CloseFile;
