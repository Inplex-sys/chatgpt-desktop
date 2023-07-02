const { app, BrowserWindow } = require('electron')
const path = require('path')
const fs = require('fs-extra')

function createWindow () {
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        autoHideMenuBar: true
    })

    mainWindow.loadURL('https://chat.openai.com/auth/login')

    const { session } = mainWindow.webContents;

    const extensionSourcePath = path.join(__dirname, 'aiprm-extension');
    const tempExtensionPath = path.join(app.getPath('temp'), 'aiprm-extension');

    fs.copySync(extensionSourcePath, tempExtensionPath);

    session.loadExtension(tempExtensionPath);
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
