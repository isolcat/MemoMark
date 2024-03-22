const { ipcRenderer } = require('electron');

const togglePinBtn = document.getElementById('toggle-pin');
const togglePreviewBtn = document.getElementById('toggle-preview');
const mdInput = document.getElementById('markdown-input');
const mdPreview = document.getElementById('markdown-preview');

let isWindowPinned = false;
let isPreviewMode = false; // 新增变量来明确追踪预览模式状态

togglePinBtn.addEventListener('click', () => {
  isWindowPinned = !isWindowPinned;
  ipcRenderer.send('toggle-pin', isWindowPinned);
  togglePinBtn.textContent = isWindowPinned ? '📌 Toggle Pin' : '📄 Just Paper';
});

togglePreviewBtn.addEventListener('click', () => {
  isPreviewMode = !isPreviewMode; // 直接切换预览模式状态
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
  const renderedHtml = marked.parse(mdInput.value);
  mdPreview.innerHTML = renderedHtml;
});
