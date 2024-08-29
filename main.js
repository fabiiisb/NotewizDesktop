const { app, BrowserWindow } = require('electron')

const createWindow = () => {
  const window = new BrowserWindow({
    minWidth: 400,
    minHeight: 400,
    show: false
  })

  window.maximize()
  window.show()

  window.loadURL('https://notewiz.net/login.php')

  window.webContents.on('will-navigate', (event, url) => {
    const allowedPaths = ['https://notewiz.net/login.php', 'https://notewiz.net/signup.php', 'https://notewiz.net/home.php']

    if (!allowedPaths.includes(url)) {
      event.preventDefault()
      window.loadURL('https://notewiz.net/login.php')
    }
  })

  window.webContents.setWindowOpenHandler(() => {
    return { action: 'deny' }
  })
}

app.whenReady().then(() => {
  createWindow()
})
