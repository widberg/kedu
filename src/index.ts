import { app, BrowserWindow, Menu } from 'electron'
import * as path from 'path'

let win

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
	icon: path.join(__dirname, '../assets/icon.png'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
	  enableRemoteModule: true,
      nodeIntegration: true
    }
  })
  
  const menu = Menu.buildFromTemplate([
    {
	  label: "File"  
    }
  ])
  
  Menu.setApplicationMenu(menu);
  
  win.maximize()

  win.loadFile(path.join(__dirname, '../src/index.html'))
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
