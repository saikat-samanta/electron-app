const { app, BrowserWindow } = require("electron");
const path = require("path");
const fs = require("fs");
const url = require("url");

function createWindow() {
  const startUrl =
    process.env.ELECTRON_START_URL ||
    url.format({
      pathname: path.join(__dirname, "../public/index.html"),
      protocol: "file:",
      slashes: true,
    });
  let mainWindow = new BrowserWindow({ width: 800, height: 600 });
  mainWindow.loadURL(startUrl);
  mainWindow.on("closed", function () {
    mainWindow = null;
  });
  return mainWindow;
}
app.on("ready", createWindow);
app.on("window-all-closed", function () {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
app.on("activate", function () {
  const window = createWindow();
  if (window === null) {
    createWindow();
  }
});
app.on("ready", () => {
  const window = createWindow();
  setTimeout(() => {
    console.log(`Capturing screen`);
    window.webContents.capturePage().then((image) => {
      fs.writeFile(`test_img.png`, image.toPNG(), (err) => {
        if (err) throw err;
        console.log("Image Saved");
      });
    });
  }, 3000);
});
