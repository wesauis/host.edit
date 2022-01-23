import { ipcMain } from "electron";
import { IPCrListner, IPCsEvent } from "../ipc";

const debug = global.debug("main:ipc");

export const on: IPCrListner = (channel, listner) => {
  debug("on(%s)", channel);
  ipcMain.on(channel, listner as any);
};

export const emit: IPCsEvent = (target, channel, ...args) => {
  debug("emit(%s)", channel);
  target.send(channel, ...args);
};
