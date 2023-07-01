const { app, BrowserWindow } = require('electron')
const path = require('path')

function createWindow () {
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600
    })

    mainWindow.loadURL('https://chat.openai.com/auth/login')

    const { session } = mainWindow.webContents;
    session.loadExtension(path.join(__dirname, 'aiprm-extension'));
}

app.whenReady().then(() => {
    createWindow()
    
    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
})