import React, { FC } from "react";
import styled from "styled-components";

const ButtonElement = styled.button`
    border: 0;
    padding: 8px 18px;
    border-radius: 50px;
    background-color: #28a5ff;
    color: white;
    cursor: pointer;
    font-weight: 700;
    font-size: 1.2em;
    font-family: "Lato";
`;

interface Props {
    onClick?: () => void;
    label?: string;
}

const Button: FC<Props> = ({ onClick, label }) => {
    return <ButtonElement onClick={onClick}>{label}</ButtonElement>;
};

export default Button;
