const {app, BrowserWindow} = require('electron');
const path = require('path');
const url = require('url');

app.on('ready', function(){
    let win = new BrowserWindow({
        frame: false,
        width: 1280,
        height: 720,
        useContentSize: true,
        resizable: true,
        titleBarStyle: 'hidden-inset',
        devTools: false
    });

    win.setMenu(null);
    win.loadURL(url.format({
        pathname: path.join(__dirname, '/../static/main.html'),
        protocol: 'file:',
        slashes: true
    }));

    win.on('closed', function(){
        win = null;
    });
});

app.on('window-all-closed', app.quit);