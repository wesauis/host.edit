import { IpcMainEvent, IpcRendererEvent } from "electron";

/** Events that can be emitted by the main process */
export type IPCs = {
  pong: [message: string];
};

/** Events that can be emitted by the renderer process */
export type IPCr = {
  ping: [message: string];
};

/** Listned by the main process and emited by the renderer process */
export type IPCrListner = <K extends keyof IPCr>(
  channel: K,
  listner: (event: IpcMainEvent, ...args: IPCr[K]) => void
) => void;

/** Emited by the main process and listned by the renderer process */
export type IPCsEvent = <K extends keyof IPCs>(
  target: IpcMainEvent["sender"],
  channel: K,
  ...args: IPCs[K]
) => void;

/** Listned by the renderer process and emited by the main process */
export type IPCsListner = <K extends keyof IPCs>(
  channel: K,
  listner: (event: IpcRendererEvent, ...args: IPCs[K]) => void
) => void;

/** Emited by the renderer process and listned by the main process */
export type IPCrEvent = <K extends keyof IPCr>(
  channel: K,
  ...args: IPCr[K]
) => void;
