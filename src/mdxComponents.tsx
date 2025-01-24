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
    console.log(href, properties);
    return (
      <a href={href} {...properties} target="_blank">
        {children}
      </a>
    );
  },
};
