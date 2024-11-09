const { app, BrowserWindow, Menu, session } = require('electron')

const createWindow = () => {
  // Crear una sesión persistente especificando un nombre único
  const persistSession = session.fromPartition('persist:notewiz_session')

  const window = new BrowserWindow({
    minWidth: 600,
    minHeight: 600,
    show: false,
    backgroundColor: '#121212',
    title: 'NoteWiz',
    webPreferences: {
      session: persistSession
    }
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

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
