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
`

const OpenFile: FC = () => {
    return (
        <Wrapper>
            <Label>Load savegame file</Label>
            <Button label="Open" />
        </Wrapper>
    );
};

export default OpenFile;
