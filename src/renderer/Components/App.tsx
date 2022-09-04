import React, { createContext, FC, useCallback, useState } from "react";
import {
    savegameDecodeToJSON,
    savegameEncodeFromJSON,
} from "../../utils/savegame";
import { ElectronAPI } from "../../preload";
import ReactJson from "react-json-view";
import { Savegame } from "../../types/savegame";
import { createGlobalStyle } from "styled-components";
import Topbar from "./Topbar";
import ResetCSS from "./ResetCSS";
import Button from "./Button";
import Fonts from "./Fonts";

declare global {
    interface Window {
        electronAPI: ElectronAPI;
    }
}

const GlobalStyles = createGlobalStyle`
    html {
        font-size: 16px;
    }
	body {
        background-color: #eee;
	}
`;

export interface AppContextType {
    savegame: Savegame;
    path: string;
    isLoading: boolean;
    isFileOpen: boolean;
    isReadError: boolean;
}

export const AppContext = createContext({});

const App: FC = () => {
    const [isLoading, setLoading] = useState(false);
    const [isReadError, setReadError] = useState(false);
    const [path, setPath] = useState("");
    const [savegameJSON, setSavegameJSON] = useState<Savegame>(null);

    const onOpenFileHandle = async () => {
        setLoading(true);
        setReadError(false);
        const { content, path } = await window.electronAPI.openFile();
        setPath(path);
        savegameDecodeToJSON(content)
            .then((jsonString) => {
                setLoading(false);
                setReadError(false);
                setSavegameJSON(JSON.parse(jsonString));
            })
            .catch((e) => {
                setLoading(false);
                console.log("wyjebało błąd");
                setReadError(true);
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
            <GlobalStyles />
            <Fonts />
            <ResetCSS />
            <AppContext.Provider
                value={{
                    savegame: savegameJSON,
                    path,
                    isLoading,
                    isFileOpen: false,
                    isReadError,
                }}
            >
                <Topbar />
                <p>{path}</p>
                {isReadError && <p>Wyjebało błąd</p>}
                <button onClick={onOpenFileHandle}>Open savegame</button>
                <Button label="Hehe" />
                {path && (
                    <button onClick={onWriteFileHandle}>Write savegame</button>
                )}
                {isLoading && <p>Loading...</p>}
                <ReactJson src={savegameJSON} />
            </AppContext.Provider>
        </>
    );
};
export default App;
