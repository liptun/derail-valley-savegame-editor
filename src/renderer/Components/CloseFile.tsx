import React, { FC, useContext } from "react";
import styled from "styled-components";
import { AppContext } from "./App";
import Button from "./Button";

const Wrapper = styled.div`
    display: flex;
    padding: 30px;
    background-color: #ccc;
`;

const CloseFile: FC = () => {
    const context = useContext(AppContext);
    return (
        <Wrapper>
            <Button
                label="Close file"
                onClick={() => context.onCloseFileHandle()}
            />
        </Wrapper>
    );
};

export default CloseFile;
