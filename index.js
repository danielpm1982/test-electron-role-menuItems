const { app, BrowserWindow, Menu, Tray, dialog } = require('electron')
const path = require('path')

let mainWindow
let tray

function createMainWindow(){
    mainWindow = new BrowserWindow({
        width: 1143,
        height: 800,
        minWidth: 690,
        minHeight: 483,
        resizable: true,
        alwaysOnTop: false,
        show: false,
        webPreferences: {
            nodeIntegration: true,
        }
    })
    mainWindow.loadFile("index.html")
    mainWindow.once("ready-to-show", mainWindow.show)
    mainWindow.on('closed', function() { 
        mainWindow = null
    })
    const menu = Menu.buildFromTemplate(menuItemConstructorOptionsArray)
    mainWindow.setMenu(menu)
    mainWindow.webContents.on('context-menu', (e) => {
      menu.popup()
    })
    const pathTotrayIcon = path.join(__dirname, "iconLinux.png")
    tray = new Tray(pathTotrayIcon)
    tray.setToolTip('Exchange Rate Client')
    tray.setContextMenu(menu)
    tray.setIgnoreDoubleClickEvents(true)
}

app.on('ready', function() {
  createMainWindow()
})

app.on('window-all-closed', function() 
{ 
    app.quit()
})

const menuItemConstructorOptionsArray = [
  {
    role: 'fileMenu',
  },
  {
    role: 'editMenu'
  },
  {
    role: 'viewMenu',
  },
  {
    role: 'help',
    submenu: [
      {
        label: 'About',
        click: () => {
          dialog.showMessageBox(mainWindow, {type: "info", message: "Custom menuItem (not role menuItem) was clicked and responded !"})
        }
      }
    ]
  }
]
