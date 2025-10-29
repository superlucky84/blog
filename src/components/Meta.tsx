import { mount, Fragment } from 'lithent';
import { computed } from 'lithent/helper';

type Preload = {
  views: number;
  title: string;
  description: string;
  openGraph: {
    title: string;
    description: string;
    images: { url: string; width?: number; height?: number }[];
  };
};

const Meta = mount<{ origin: string; id: string; preload: { v: Preload } }>(
  (_r, props) => {
    const isKo = computed(() => /^ko\./.test(props.id));

    return ({ origin, id, preload }) => (
      <>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          rel="preload"
          href="/assets/JTUQjIg1_i6t8kCHKm459WxRyS7m0dR9pA.woff2"
          as="font"
          crossorigin
          type="font/woff2"
        />
        <link
          rel="preload"
          href="/assets/JTUSjIg1_i6t8kCHKm459WlhyyTh89Y.woff2"
          as="font"
          crossorigin
          type="font/woff2"
        />
        {isKo.v && (
          <>
            <link
              rel="preload"
              href="/assets/GangwonEdu.woff"
              as="font"
              crossorigin
              type="font/woff"
            />
            <link
              rel="preload"
              href="/assets/PretendardStd-Regular.woff2"
              as="font"
              crossorigin
              type="font/woff2"
            />
            <link
              rel="preload"
              href="/assets/PretendardStd-Bold.woff2"
              as="font"
              crossorigin
              type="font/woff2"
            />
            <link
              rel="preload"
              href="/assets/PretendardStd-Medium.woff2"
              as="font"
              crossorigin
              type="font/woff2"
            />
          </>
        )}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Subtleflo" />
        <meta property="og:locale" content={isKo.v ? 'ko_KR' : 'en_US'} />
        <meta
          property="og:url"
          content={
            `${origin}/${id?.replace(/\./g, '\/').replace(/(index\/tsx$|\/mdx$|\/tsx$)/, '')}` ||
            origin
          }
        />
        <meta
          property="og:title"
          content={preload.v?.openGraph?.title || 'The Blog of Jinwoo Kim'}
        />
        {(preload.v?.openGraph?.images || []).length > 0 ? (
          preload.v.openGraph.images.map(item => (
            <>
              <meta property="og:image" content={origin + item.url} />
              <meta property="og:image:width" content={item.width || 1080} />
              <meta property="og:image:height" content={item.height || 1080} />
            </>
          ))
        ) : (
          <meta
            property="og:image"
            content={origin + '/assets/subtleflo.png'}
          />
        )}
        <meta
          property="og:description"
          content={
            preload.v?.openGraph?.description ||
            'Jinwoo Kim is a software engineer and a father of a child. He is from Korea. He has built most of his career as a web developer, owing much to frontend development and open-source contributions.'
          }
        />
        <meta
          name="description"
          content={
            preload.v?.description ||
            'Jinwoo Kim is a software engineer and a father of a child. He is from Korea. He has built most of his career as a web developer, owing much to frontend development and open-source contributions.'
          }
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@superlucky84" />
        <meta name="twitter:creator" content="@superlucky84" />
        <meta
          name="twitter:title"
          content={preload.v?.openGraph?.title || 'The Blog of Jinwoo Kim'}
        />
        <meta
          name="twitter:description"
          content={
            preload.v?.openGraph?.description ||
            'Jinwoo Kim is a software engineer and a father of a child. He is from Korea. He has built most of his career as a web developer, owing much to frontend development and open-source contributions.'
          }
        />
        {'   '}
        {(preload.v?.openGraph?.images || []).length > 0 ? (
          <meta
            property="twitter:image"
            content={origin + preload.v?.openGraph?.images[0].url}
          />
        ) : (
          <meta
            property="twitter:image"
            content={origin + '/assets/subtleflo.png'}
          />
        )}
      </>
    );
  }
);

export default Meta;
