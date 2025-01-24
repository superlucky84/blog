import hljs from 'highlight.js';

export default {
  code(properties: { className: string }, children: [{ text: string }]) {
    const code = hljs.highlight(children[0].text, {
      language: (properties?.className || 'language-javascript').replace(
        'language-',
        ''
      ),
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
      <h1 class="border-b py-2" {...properties}>
        {children}
      </h1>
    );
  },
  h2({ properties }: any, children: unknown) {
    return (
      <h2 class="border-b" {...properties}>
        {children}
      </h2>
    );
  },
};
