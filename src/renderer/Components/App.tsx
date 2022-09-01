import React, { FC, useState } from "react";
import { savegameDecodeToJSON } from "../../utils/savegame";
import { ElectronAPI } from "../../preload";
import ReactJson from "react-json-view";

declare global {
    interface Window {
        electronAPI: ElectronAPI;
    }
}

const App: FC = () => {
    const [isLoading, setLoading] = useState(false);
    const [savegameJSON, setSavegameJSON] = useState({});

    const onClickHandle = async () => {
        setLoading(true);
        const fileContent = await window.electronAPI.openFile();
        savegameDecodeToJSON(fileContent).then((v) => {
            setLoading(false);
            setSavegameJSON(JSON.parse(v));
        });
    };

    return (
        <>
            <h1>Derail Valley</h1>
            <h2>Savegame Editor</h2>
            <button onClick={onClickHandle}>Open savegame</button>
            {isLoading && <p>Loading...</p>}
            <ReactJson src={savegameJSON} />
        </>
    );
};
export default App;
