const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');


  let mainWindow;

  app.on('ready', () => {
    Menu.setApplicationMenu(null);
    mainWindow = new BrowserWindow({
      width: 1550,
      height: 900,
      icon: path.join(__dirname, 'assets', 'images', 'logo.ico')
      
    });
    
    const iconPath = path.join(__dirname, 'assets', 'images', 'logo.ico');
    mainWindow.setIcon(iconPath);
    mainWindow.loadURL(`file:${__dirname}/index.html`);

  });


