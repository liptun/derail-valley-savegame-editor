import { contextBridge, ipcRenderer } from "electron";

const electronAPI = {
    openFile: () => ipcRenderer.invoke("dialog:openFile"),
};
contextBridge.exposeInMainWorld("electronAPI", electronAPI);

export type ElectronAPI = typeof electronAPI;
