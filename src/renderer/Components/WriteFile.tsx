import React, { FC, useContext } from "react";
import styled from "styled-components";
import { AppContext } from "./App";
import Button from "./Button";

const Wrapper = styled.div`
    display: flex;
    padding: 30px;
    grid-gap: 30px;
    align-items: center;
`;

const WriteButton = styled(Button)`
    flex-shrink: 0;
    background-color: #01b74a;
`;

const WriteFile: FC = () => {
    const context = useContext(AppContext);
    return (
        <Wrapper>
            <WriteButton onClick={() => context.onWriteFileHandle()}>
                Write file
            </WriteButton>
        </Wrapper>
    );
};

export default WriteFile;
