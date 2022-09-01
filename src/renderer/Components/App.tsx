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
    const [path, setPath] = useState("");
    const [savegameJSON, setSavegameJSON] = useState({});

    const onClickHandle = async () => {
        setLoading(true);
        const { content, path } = await window.electronAPI.openFile();
        setPath(path);
        savegameDecodeToJSON(content).then((v) => {
            setLoading(false);
            setSavegameJSON(JSON.parse(v));
        });
    };

    return (
        <>
            <h1>Derail Valley</h1>
            <h2>Savegame Editor</h2>
            <p>{path}</p>
            <button onClick={onClickHandle}>Open savegame</button>
            {isLoading && <p>Loading...</p>}
            <ReactJson src={savegameJSON} />
        </>
    );
};
export default App;
