import { IPCr, IPCrEvent, IPCsListner } from "../../main/ipc";
import { randomBytes } from "crypto";

const debug = global.debug("renderer:ipc");
const ipc = () => global?.ipcRenderer;

export const on: IPCsListner = (channel, listner) => {
  debug("on(%s)", channel);
  ipc().addListener(channel, listner);

  return () => {
    debug("off(%s)", channel);
    ipc().removeListener(channel, listner);
  };
};

export const once: IPCsListner = (channel, listner) => {
  debug("once(%s)", channel);
  ipc().once(channel, listner);
};

export const emit: IPCrEvent = (channel, ...args) => {
  debug("emit(%s)", channel);
  return ipc().send(channel, ...args);
};

/**
 * Triggers an operation on the main process that will return some data into a channel
 *
 * @param igniter what event will triger this operations
 * @param args arguments for it to happen
 * @returns the event + the data for this execution
 */
export const exchange = <T extends keyof IPCr>(
  igniter: T,
  ...args: Omit<IPCr[T], 0> | []
) => {
  return new Promise((resolve) => {
    debug("exchange(%s)", igniter);
    const hash = randomBytes(16).toString("hex");
    const backchannel = `${igniter as keyof IPCr}#${hash}` as const;

    once(backchannel, (_event, ...args) => resolve([_event, args]));
    emit(igniter, ...([backchannel, ...args] as IPCr[T]));
  });
};
