import type { IpcRenderer } from "electron";
import type EventEmitter from "node:events";

type FnOn = (...args: Parameters<EventEmitter["addListener"]>) => () => void;
export const on: FnOn = (event: string, ...args) => {
  console.log("ipc/on", event);
  global?.ipcRenderer?.addListener(event, ...args);

  return () => {
    console.log("ipc/off", event);
    global?.ipcRenderer?.removeListener(event, ...args);
  };
};

export const emit: IpcRenderer["send"] = (event, ...args) => {
  console.debug("ipc/emit", event);

  return global?.ipcRenderer?.send(event, ...args);
};
