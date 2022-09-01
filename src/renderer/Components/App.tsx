import React, { FC, useEffect, useState } from "react";
import { savegameDecodeToJSON } from "../../utils/savegame";
import styled from "styled-components";
import { ElectronAPI } from "../../preload";
import ReactJson from "react-json-view";

declare global {
    interface Window {
        electronAPI: ElectronAPI;
    }
}

const SavegameRAW = styled.textarea`
    display: block;
    width: 100%;
    min-height: 300px;
`;
const SavegameJSON = styled(SavegameRAW)``;

const App: FC = () => {
    const [savegame, setSavegame] = useState("");
    const [savegameJSON, setSavegameJSON] = useState({});
    const onClickHandle = async () => {
        const fileContent = await window.electronAPI.openFile();
        setSavegame(fileContent);
    };
    useEffect(() => {
        savegameDecodeToJSON(savegame).then(
            (v) => v && setSavegameJSON(JSON.parse(v))
        );
    }, [savegame]);
    return (
        <>
            <h1>Derail Valley</h1>
            <h2>Savegame Editor</h2>
            <button onClick={onClickHandle}>Open savegame</button>
            <SavegameRAW value={savegame} />
            <ReactJson src={savegameJSON} />
        </>
    );
};
export default App;
