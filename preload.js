const { contextBridge } = require('electron');
const marked = require('marked');

contextBridge.exposeInMainWorld('api', {
  renderMarkdown: (markdownText) => marked(markdownText)
});
