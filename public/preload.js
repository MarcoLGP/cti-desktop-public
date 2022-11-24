const { contextBridge, ipcRenderer } = require("electron");


contextBridge.exposeInMainWorld(
  'electron',
  {
    singleSend: (event) => ipcRenderer.send(event),
    doubleSend: (event, args) => ipcRenderer.send(event, args),
    doubleOn: (evento, args) => ipcRenderer.on(evento, args),
  }
)
