import { loadHosts } from "../utils/hosts/load";
import * as ipc from "./ipc";

export function init() {
  ipc.on("hosts-load", async (event, backchannel) => {
    ipc.emit(event.sender, backchannel, await loadHosts());
  });
}
