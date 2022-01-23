import * as ipc from "./ipc";

export function init() {
  ipc.on("ping", (event, message) => {
    ipc.emit(event.sender, "pong", message);
  });
}
