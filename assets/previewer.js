const marked = require('marked');
const createDomPurify = require('dompurify');
const { JSDOM } = require('jsdom');

const dompurify = createDomPurify(new JSDOM().window);

const content = document.getElementById('content');
const panel = document.getElementById('preview-panel');
panel.innerHTML = dompurify.sanitize(marked(content.value));

const preview = e => {
  panel.innerHTML = dompurify.sanitize(marked(e.target.value));
};

content.addEventListener('input', preview);
