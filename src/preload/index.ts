import { contextBridge, ipcRenderer } from "electron";
import { HandleFileWriteArgs } from "../main/";

const electronAPI = {
    openFile: () => ipcRenderer.invoke("dialog:openFile"),
    writeFile: (args: HandleFileWriteArgs) => ipcRenderer.invoke("file:write", args),
};
contextBridge.exposeInMainWorld("electronAPI", electronAPI);

export type ElectronAPI = typeof electronAPI;
