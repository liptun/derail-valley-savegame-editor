import React, { FC, useContext } from "react";
import styled from "styled-components";
import { AppContext } from "./App";

const Wrapper = styled.div`
    background-color: #e9b9b9;
    color: red;
    padding: 30px;
`;

const ReadError: FC = () => {
    const context = useContext(AppContext);
    return <Wrapper>{context.readErrorMessage}</Wrapper>;
};

export default ReadError;
