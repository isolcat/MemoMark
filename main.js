const { app, BrowserWindow } = require('electron');

function createWindow() {
  // 创建一个无边框的浏览器窗口
  const win = new BrowserWindow({
    width: 400,
    height: 200,
    frame: false, // 设置窗口无边框
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false, // 根据Electron版本和安全需求调整
    }
  });

  // 加载应用的index.html
  win.loadFile('index.html');

  // 打开开发者工具
  // win.webContents.openDevTools();
}

// 当Electron完成初始化并准备创建浏览器窗口时，调用此函数
app.whenReady().then(createWindow);

// 关闭所有窗口后退出应用（在macOS上除外）
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// 当应用被激活时（例如，首次启动应用，重新启动应用），创建一个新的窗口
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
