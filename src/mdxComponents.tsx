import hljs from 'highlight.js/lib/core';
import bash from 'highlight.js/lib/languages/bash';
import javascript from 'highlight.js/lib/languages/javascript';
import json from 'highlight.js/lib/languages/json';
import markdown from 'highlight.js/lib/languages/markdown';
import plaintext from 'highlight.js/lib/languages/plaintext';
import shell from 'highlight.js/lib/languages/shell';
import typescript from 'highlight.js/lib/languages/typescript';
import xml from 'highlight.js/lib/languages/xml';

// Register only the languages the posts use, instead of all of highlight.js.
// Aliases cover js/jsx, ts/tsx, html, sh and text.
hljs.registerLanguage('bash', bash);
hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('json', json);
hljs.registerLanguage('markdown', markdown);
hljs.registerLanguage('plaintext', plaintext);
hljs.registerLanguage('shell', shell);
hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('xml', xml);

export default {
  code(properties: { className: string }, children: [{ text: string }]) {
    const language = (properties?.className || 'language-javascript').replace(
      'language-',
      ''
    );
    const code = hljs.highlight(children[0].text, {
      language: hljs.getLanguage(language) ? language : 'plaintext',
    }).value;

    return <code {...properties} innerHTML={code} />;
  },
  a({ href, ...properties }: any, children: any) {
    return (
      <a href={href} {...properties} target="_blank">
        {children}
      </a>
    );
  },
  h1({ properties }: any, children: unknown) {
    return (
      <h1 class="py-2 border-b dark:border-[#313131]" {...properties}>
        {children}
      </h1>
    );
  },
  h2({ properties }: any, children: unknown) {
    return (
      <h2 class="py-1 border-b dark:border-[#313131]" {...properties}>
        {children}
      </h2>
    );
  },
};
