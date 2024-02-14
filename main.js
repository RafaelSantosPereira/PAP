const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');


  let mainWindow;

  app.on('ready', () => {
    Menu.setApplicationMenu(null);
    mainWindow = new BrowserWindow({
      width: 1400,
      height: 800,
      
    });
    
    const iconPath = path.join(__dirname, 'assets', 'images', 'logo.ico');
    mainWindow.setIcon(iconPath);
    mainWindow.loadURL(`file:${__dirname}/index.html`);

  });


