// 首先引入所需的模块
const { ipcRenderer } = require('electron');
const MarkdownIt = require('markdown-it'),
  hljs = require('highlight.js'); // 引入highlight.js

// 创建markdown-it实例，并配置highlight.js用于代码高亮
const md = new MarkdownIt({
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        // 成功高亮语法
        return `<pre class="hljs"><code>${hljs.highlight(str, { language: lang, ignoreIllegals: true }).value
          }</code></pre>`;
      } catch (__) {
        // 忽略高亮失败
      }
    }
    // 对于无法识别语言的代码块，进行普通处理
    return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>';
  }
});

const togglePinBtn = document.getElementById('toggle-pin');
const togglePreviewBtn = document.getElementById('toggle-preview');
const mdInput = document.getElementById('markdown-input');
const mdPreview = document.getElementById('markdown-preview');

let isWindowPinned = false;
let isPreviewMode = false;

togglePinBtn.addEventListener('click', () => {
  isWindowPinned = !isWindowPinned;
  ipcRenderer.send('toggle-pin', isWindowPinned);
  togglePinBtn.textContent = isWindowPinned ? '📌 Toggle Pin' : '📄 Just Paper';
});

togglePreviewBtn.addEventListener('click', () => {
  isPreviewMode = !isPreviewMode;
  if (isPreviewMode) {
    mdInput.style.display = 'none';
    mdPreview.style.display = 'block';
    togglePreviewBtn.textContent = '✏️  Edit';
  } else {
    mdInput.style.display = 'block';
    mdPreview.style.display = 'none';
    togglePreviewBtn.textContent = '👌🏻 Preview';
  }
});

mdInput.addEventListener('input', function () {
  // 使用markdown-it实例处理输入的Markdown文本
  const renderedHtml = md.render(mdInput.value);
  mdPreview.innerHTML = renderedHtml;
});
