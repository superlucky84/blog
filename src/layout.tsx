import type { TagFunction } from 'lithent';
import { mount, mountCallback } from 'lithent';
import { computed, state } from 'lithent/helper';
import LoadingText from '@/components/Loading';
import PageWrap from '@/components/PageWrap';
import Header from '@/components/Header';
import Meta from '@/components/Meta';
import mdxComponents from '@/mdxComponents';
import { getPreloadData, getGtmId } from '@/base/data';
import 'highlight.js/styles/hybrid.css';
// import clsx from '@/helper/clsx';
import { routeWatch } from '@/base/routeStore';
import '@/main.css';

const Layout = mount<{
  page: TagFunction;
  id: string;
  origin: string;
  params: Record<string, string>;
  query: Record<string, string>;
}>((r, { origin }) => {
  let systemColor = 'dark';
  const routeRef = routeWatch(r);
  const mode = state('init', r);
  const isDark = computed(() => {
    return mode.v === 'system' ? systemColor === 'dark' : mode.v === 'dark';
  });
  const preload = computed(
    () =>
      getPreloadData<{
        layout: {
          views: number;
          title: string;
          description: string;
          openGraph: {
            title: string;
            description: string;
            images: { url: string }[];
          };
        };
      }>()?.layout
  );
  const gtmId = getGtmId();

  mountCallback(() => {
    systemColor = window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';

    mode.v = localStorage.getItem('theme') || 'system';
  });

  return ({ page: Page, id }) => (
    <html
      lang="en"
      class={mode.v === 'init' ? 'init' : isDark.v ? 'dark' : 'light'}
    >
      <head>
        <title>{preload.value?.title || "superlucky84's blog"}</title>
        <Meta origin={origin} preload={preload} id={id} />
        <link rel="stylesheet" href="/assets/font.css" />
        <script
          innerHTML={`
          (function (w, d, s, l, i) {
            w[l] = w[l] || [];
            w[l].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
            var f = d.getElementsByTagName(s)[0],
              j = d.createElement(s),
              dl = l != 'dataLayer' ? '&l=' + l : '';
            j.async = true;
            j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
            f.parentNode.insertBefore(j, f);
          })(window, document, 'script', 'dataLayer', '${gtmId}');
          `}
        />
      </head>
      <body class="font-blog dark:text-gray-100 max-w-2xl m-auto">
        <noscript
          innerHTML={`<iframe
                src="https://www.googletagmanager.com/ns.html?id=${gtmId}"
                height="0"
                width="0"
                style="display:none;visibility:hidden"></iframe>`}
        />
        <main class="p-6 pt-3 md:pt-6 min-h-[calc(100vh-64px)]">
          <Header mode={mode} id={id} />
          {routeRef.loading.value ? (
            <LoadingText />
          ) : ['index.tsx', 'ko.tsx'].includes(id) ? (
            <Page isDark={isDark} />
          ) : (
            <PageWrap preload={preload} id={id}>
              <Page components={mdxComponents} />
            </PageWrap>
          )}
        </main>
      </body>
    </html>
  );
});

export default Layout;
