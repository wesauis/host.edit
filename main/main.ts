// Native
import { join } from "path";

// Packages
import { BrowserWindow, app } from "electron";
import isDev from "electron-is-dev";
import prepareNext from "electron-next";

global.debug = require("debug");
global.debug.enable(process.env.LOG || "");

// Prepare the renderer once the app is ready
app.on("ready", async () => {
  await prepareNext({
    development: "./renderer",
    production: "./build/renderer",
  });

  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: false,
      preload: join(__dirname, "preload.js"),
    },
  });

  const url = isDev
    ? "http://localhost:8000/"
    : `file://${join(__dirname, "../renderer/out/index.html")}`;

  console.log("Entrypoint:", url);

  mainWindow.loadURL(url);
});

// Quit the app once all windows are closed
app.on("window-all-closed", app.quit);

require("./ipc/init").init();
