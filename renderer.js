const marked = require('marked');

document.getElementById('markdown-content').addEventListener('input', function () {
  const markdownText = this.value;
  const renderedMarkdown = marked(markdownText);
  document.getElementById('markdown-preview').innerHTML = renderedMarkdown;
});
