import { mount } from 'lithent';

type Preload = {
  views: number;
  title: string;
  description: string;
  openGraph: {
    title: string;
    description: string;
    images: { url: string }[];
  };
};

const Meta = mount<{ origin: string; id: string; preload: { v: Preload } }>(
  () => {
    return ({ origin, id, preload }) => (
      <>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content={
            preload.v?.description ||
            'superlucky84 is a software programmer and creator of Lithent, State-Ref open source.'
          }
        />
        <meta
          property="og:url"
          content={
            `${origin}/${id.replace(/\./g, '\/').replace(/(index\/tsx$|\/mdx$|\/tsx$)/, '')}` ||
            origin
          }
        />
        <meta
          property="og:title"
          content={preload.v?.openGraph?.title || "superlucky84's blog"}
        />
        <meta
          property="og:description"
          content={preload.v?.openGraph?.description}
        />
        {(preload.v?.openGraph?.images || []).length > 0 ? (
          preload.v.openGraph.images.map(item => (
            <meta property="og:image" content={origin + item.url} />
          ))
        ) : (
          <meta property="og:image" content={origin + '/assets/kim.jpg'} />
        )}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@superlucky84" />
        <meta name="twitter:creator" content="@superlucky84" />
        <meta
          name="twitter:title"
          content={preload.v?.openGraph?.title || "superlucky84's blog"}
        />
        <meta
          name="twitter:description"
          content={
            preload.v?.openGraph?.description ||
            'superlucky84 is a software programmer and creator of Lithent, State-Ref open source.'
          }
        />
        {'   '}
        {(preload.v?.openGraph?.images || []).length > 0 ? (
          <meta
            property="twitter:image"
            content={origin + preload.v?.openGraph?.images[0].url}
          />
        ) : (
          <meta property="twitter:image" content={origin + '/assets/kim.jpg'} />
        )}
      </>
    );
  }
);

export default Meta;
