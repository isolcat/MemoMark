const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

let win; // 修改变量名以符合下文使用

function createWindow() {
  // 创建一个无边框的浏览器窗口
  win = new BrowserWindow({
    width: 320,
    height: 320,
    frame: false, // 设置窗口无边框
    icon: path.join(__dirname, 'assets/MemoMark.icns'),
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    }
  });

  // 加载应用的index.html，并在加载完成后尝试聚焦窗口
  win.loadFile('index.html').then(() => {
    win.focus(); // 窗口加载完成后尝试聚焦窗口
  });
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

// 监听从渲染进程发来的toggle-pin消息
ipcMain.on('toggle-pin', (event, shouldPin) => {
  if (win) {
    win.setAlwaysOnTop(shouldPin); // 设置窗口是否置顶
  }
});
