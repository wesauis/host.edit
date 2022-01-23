import { Debug } from "debug";
import { IpcRenderer } from "electron";

export declare global {
  namespace NodeJS {
    interface Global {
      ipcRenderer: IpcRenderer;
      debug: Debug;
      env: {
        LOG?: string;
      };
    }
  }
}
