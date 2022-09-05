import React, { createContext, FC, useCallback, useState } from "react";
import {
    savegameDecodeToJSON,
    savegameEncodeFromJSON,
} from "../../utils/savegame";
import { ElectronAPI } from "../../preload";
import { Savegame } from "../../types/savegame";
import styled, { createGlobalStyle } from "styled-components";
import Topbar from "./Topbar";
import ResetCSS from "./ResetCSS";
import Fonts from "./Fonts";
import OpenFile from "./OpenFile";
import Loader from "./Loader";
import CloseFile from "./CloseFile";
import ReadError from "./ReadError";
import SavegameEditor from "./SavegameEditor";

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
    background-color: #eeeeee;
`;

const AppHeader = styled.div`
    display: flex;
    flex-direction: column;
`;

const AppContent = styled.div`
    flex-grow: 1;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

export interface AppContextType {
    savegame: Savegame | Object;
    path: string;
    isLoading: boolean;
    isFileOpen: boolean;
    isReadError: boolean;
    readErrorMessage: string;
    onOpenFileHandle: () => void;
    onWriteFileHandle: () => void;
    onCloseFileHandle: () => void;
}

export const AppContext = createContext<AppContextType>({
    savegame: {},
    path: "",
    isLoading: false,
    isFileOpen: false,
    isReadError: false,
    readErrorMessage: "",
    onOpenFileHandle: () => {},
    onWriteFileHandle: () => {},
    onCloseFileHandle: () => {},
});

const App: FC = () => {
    const [path, setPath] = useState("");
    const [isLoading, setLoading] = useState(false);
    const [isFileOpen, setFileOpen] = useState(false);
    const [isReadError, setReadError] = useState(false);
    const [readErrorMessage, setReadErrorMessage] = useState("");
    const [savegameJSON, setSavegameJSON] = useState<Savegame>(null);

    const onOpenFileHandle = async () => {
        setLoading(true);
        setReadError(false);
        setFileOpen(false);
        const { content, path } = await window.electronAPI.openFile();
        setPath(path);
        savegameDecodeToJSON(content)
            .then((jsonString) => {
                setLoading(false);
                setReadError(false);
                setFileOpen(true);
                setSavegameJSON(JSON.parse(jsonString));
            })
            .catch((error) => {
                setReadErrorMessage(error);
                setLoading(false);
                setReadError(true);
            });
    };

    const onWriteFileHandle = useCallback(() => {
        if (savegameJSON) {
            const encodedSavegame = savegameEncodeFromJSON(savegameJSON);
            window.electronAPI.writeFile({ content: encodedSavegame, path });
        }
    }, [savegameJSON]);

    const onCloseFileHandle = useCallback(() => {
        setFileOpen(false);
        setSavegameJSON(null);
    }, []);

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
                    isFileOpen,
                    isReadError,
                    onOpenFileHandle,
                    onWriteFileHandle,
                    onCloseFileHandle,
                    readErrorMessage,
                }}
            >
                <AppWrapper>
                    <Topbar />
                    <AppHeader>
                        {isReadError && <ReadError />}
                        {isFileOpen && <CloseFile />}
                    </AppHeader>
                    <AppContent>
                        {!isFileOpen && !isLoading && <OpenFile />}
                        {isLoading && <Loader />}
                        {isFileOpen && <SavegameEditor />}
                    </AppContent>
                </AppWrapper>
            </AppContext.Provider>
        </>
    );
};
export default App;
