const { app, BrowserWindow, desktopCapturer, ipcMain } = require('electron');
const WebSocket = require('ws');

let mainWindow;
let wsServer;
let clients = new Set();

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 300,
    height: 150,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    },
    title: "System Audio Captioning (Background)"
  });

  mainWindow.loadFile('index.html');
  
  // Minimize to prevent occupying space if preferred
  // mainWindow.minimize();
  
  // Start WebSocket Server
  wsServer = new WebSocket.Server({ port: 8999 });
  
  wsServer.on('connection', (ws) => {
    clients.add(ws);
    console.log('Chrome Extension Connected via WebSocket');
    
    ws.on('message', (message) => {
      try {
        const data = JSON.parse(message);
        if (data.type === 'START_CAPTIONS') {
          // Find system audio source
          desktopCapturer.getSources({ types: ['screen'] }).then(async sources => {
            for (const source of sources) {
              if (source.id.startsWith('screen')) {
                mainWindow.webContents.send('start-capture', source.id, data.apiKey);
                return;
              }
            }
          });
        } else if (data.type === 'STOP_CAPTIONS') {
          mainWindow.webContents.send('stop-capture');
        }
      } catch (e) {
        console.error('Invalid message from WS client', e);
      }
    });

    ws.on('close', () => {
      clients.delete(ws);
      mainWindow.webContents.send('stop-capture');
    });
  });
}

app.whenReady().then(createWindow);

ipcMain.on('caption-result', (event, payload) => {
  for (let ws of clients) {
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({ type: 'CAPTIONS_RESULT', payload }));
    }
  }
});

ipcMain.on('caption-error', (event, error) => {
  for (let ws of clients) {
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({ type: 'CAPTIONS_ERROR', error }));
    }
  }
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
