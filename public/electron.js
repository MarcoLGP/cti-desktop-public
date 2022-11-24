const { app, BrowserWindow, protocol, ipcMain } = require("electron");
const sgMail = require('@sendgrid/mail')
const qrcode = require('qrcode')
const path = require("path");
const url = require('url')

function createWindow() {

  const loginWindow = new BrowserWindow({
    width: 600,
    height: 390,
    transparent: true,
    fullscreenable: false,
    frame: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  ipcMain.on('print', () => {
    loginWindow.webContents.print()
  })

  ipcMain.on('enviarEmail-qrCode', (e, { Email, Nome, data, id }) => {

    qrcode.toDataURL(id)
      .then(url => {
        sgMail.setApiKey(process.env.SG_MAIL_API_KEY);
        const msg = {
          to: `${Email}`,
          from: 'cti_atendimento@hotmail.com',
          templateId: process.env.SG_MAIL_TEMPLATE_ID,
          attachments: [
            {
              content: `${url.replace('data:image/png;base64,', '')}`,
              filename: `qrcode-ficha-de-entrada-${data}.png`,
              content_id: 'mytext'
            },
          ],
          dynamicTemplateData: {
            cliente: `${Nome}`,
            data: `${data}`
          }
        };
        sgMail.send(msg)
      })
  })

  ipcMain.on('enviarEmail-finish', (e, { Email, Nome, data, equipamento }) => {

    sgMail.setApiKey(process.env.SG_MAIL_API_KEY);
    const msg = {
      to: `${Email}`,
      from: 'cti_atendimento@hotmail.com',
      templateId: process.env.SG_MAIL_TEMPLATE_ID,
      dynamicTemplateData: {
        cliente: `${Nome}`,
        data: `${data}`,
        equipamento: `${equipamento}`
      }
    };
    sgMail.send(msg)

  })

  ipcMain.on('logout', () => {
    loginWindow.setSize(600, 390)
    loginWindow.center()
  })

  ipcMain.on('auth', () => {
    loginWindow.setSize(1290, 650)
    loginWindow.center()
  })

  ipcMain.on('minimize', () => {
    BrowserWindow.getFocusedWindow().minimize()
  })
  ipcMain.on('maximize', () => {
    loginWindow.setSize(1366, 700)
    loginWindow.center()
  })

  ipcMain.on('unmaximize', () => {
    loginWindow.setSize(1290, 650)
    loginWindow.center()
  })

  const appURL = app.isPackaged
    ? url.format({
      pathname: path.join(__dirname, "index.html"),
      protocol: "file:",
      slashes: true,
    })
    : "http://localhost:3000";
  loginWindow.loadURL(appURL);
}

function setupLocalFilesNormalizerProxy() {
  protocol.registerHttpProtocol(
    "file",
    (request, callback) => {
      const url = request.url.substr(8);
      callback({ path: path.normalize(`${__dirname}/${url}`) });
    },
    (error) => {
      if (error) console.error("Failed to register protocol");
    }
  );
}

app.whenReady().then(() => {
  createWindow();
  setupLocalFilesNormalizerProxy();

  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
