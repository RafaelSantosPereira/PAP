const { app, BrowserWindow, Menu} = require('electron');
const path = require('path');

let mainWindow

app.on('ready', () =>
{
    Menu.setApplicationMenu(null);
    mainWindow = new BrowserWindow({
        // frame:false,
        //titleBarStyle:'hidden',//permite esconder a barra de titulo, mantendo as funcionalidades da mesma

        //titleBarOverlay:{//permite customizar a barra(sõ funciona caso a barra não seja a padrão)
            //color: '#1C1C1C',
            //symbolColor: '#D8D8D8',
            //height: 30
       // }
       width : 1400,
       height:800,



    })
   
    // Obtém o caminho completo para o ícone(o join junta cada um dos nomes para formar um caminho)
    const iconPath = path.join(__dirname, 'assets', 'images', 'logo.ico');

    // Define o ícone da janela principal
    mainWindow.setIcon(iconPath);
    mainWindow.loadURL(`file:${__dirname}/index.html `)//inicia o html

    

});