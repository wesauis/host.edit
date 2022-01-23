import { IPCrEvent, IPCsListner } from "../../main/ipc";

export const on: IPCsListner = (channel, listner) => {
  global?.ipcRenderer?.addListener(channel, listner);

  return () => global?.ipcRenderer?.removeListener(channel, listner);
};

export const emit: IPCrEvent = (channel, ...args) => {
  return global?.ipcRenderer?.send(channel, ...args);
};
