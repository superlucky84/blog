import hljs from 'highlight.js';

export default {
  code(properties: { className: string }, children: [{ text: string }]) {
    const code = hljs.highlight(children[0].text, {
      language: properties.className.replace('language-', ''),
    }).value;

    return <code {...properties} innerHTML={code} />;
  },
};
