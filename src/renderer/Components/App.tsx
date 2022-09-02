import React, { FC, useCallback, useState } from "react";
import {
    savegameDecodeToJSON,
    savegameEncodeFromJSON,
} from "../../utils/savegame";
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
    const [savegame, setSavegame] = useState("");

    const onOpenFileHandle = async () => {
        setLoading(true);
        const { content, path } = await window.electronAPI.openFile();
        setPath(path);
        savegameDecodeToJSON(content).then((jsonString) => {
            setLoading(false);
            setSavegameJSON(JSON.parse(jsonString));
        });
    };
    const onWriteFileHandle = useCallback(() => {
        if (savegameJSON) {
            const encodedSavegame = savegameEncodeFromJSON(savegameJSON);
            window.electronAPI.writeFile({ content: encodedSavegame, path });
        }
    }, [savegameJSON]);

    return (
        <>
            <h1>Derail Valley</h1>
            <h2>Savegame Editor</h2>
            <p>{path}</p>
            <p>{savegame}</p>
            <button onClick={onOpenFileHandle}>Open savegame</button>
            {path && (
                <button onClick={onWriteFileHandle}>Write savegame</button>
            )}
            {isLoading && <p>Loading...</p>}
            <ReactJson src={savegameJSON} />
        </>
    );
};
export default App;
