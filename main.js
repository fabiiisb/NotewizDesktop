const { app, BrowserWindow, Menu } = require('electron')

const createWindow = () => {
  const window = new BrowserWindow({
    minWidth: 600,
    minHeight: 600,
    show: false,
    backgroundColor: '#121212',
    title: 'NoteWiz'
  })

  Menu.setApplicationMenu(null)

  window.loadURL('https://notewiz.net/login.php')
  window.maximize()
  window.show()

  window.webContents.on('will-navigate', (event, url) => {
    const allowedPaths = [
      'https://notewiz.net/login.php',
      'https://notewiz.net/signup.php',
      'https://notewiz.net/home.php'
    ]

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
