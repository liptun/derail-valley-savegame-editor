import React, { createContext, FC, useCallback, useState } from "react";
import {
    savegameDecodeToJSON,
    savegameEncodeFromJSON,
} from "../../utils/savegame";
import { ElectronAPI } from "../../preload";
import ReactJson from "react-json-view";
import { Savegame } from "../../types/savegame";
import styled, { createGlobalStyle } from "styled-components";
import Topbar from "./Topbar";
import ResetCSS from "./ResetCSS";
import Fonts from "./Fonts";
import OpenFile from "./OpenFile";

declare global {
    interface Window {
        electronAPI: ElectronAPI;
    }
}

const GlobalStyles = createGlobalStyle`
    html {
        font-size: 16px;
    }
`;

const AppWrapper = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    width: 100vw;
`;

const AppContent = styled.div`
    flex-grow: 1;
    background-color: #eeeeee;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
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
                <AppWrapper>
                    <Topbar />
                    <AppContent>
                        <OpenFile />
                        {path && (
                            <button onClick={onWriteFileHandle}>
                                Write savegame
                            </button>
                        )}
                        {isLoading && <p>Loading...</p>}
                        <ReactJson src={savegameJSON} />
                    </AppContent>
                </AppWrapper>
            </AppContext.Provider>
        </>
    );
};
export default App;
