import { ipcMain } from "electron";
import { IPCrListner, IPCsEvent } from "../ipc";

export const on: IPCrListner = (channel, listner) => {
  ipcMain.on(channel, listner as any);
};

export const emit: IPCsEvent = (target, channel, ...args) => {
  target.send(channel, ...args);
};
