import type { TagFunction } from 'lithent';
import { mount, mountCallback } from 'lithent';
import { computed, state } from 'lithent/helper';
// import LoadingText from '@/components/Loading';
import PageWrap from '@/components/PageWrap';
import clsx from '@/helper/clsx';
import { getPreloadData } from '@/base/data';
import { navigate } from '@/base/route';
// import clsx from '@/helper/clsx';
// import { routeWatch } from '@/base/route';
import '@/main.css';

const Layout = mount<{
  page: TagFunction;
  id: string;
  origin: string;
  params: Record<string, string>;
  query: Record<string, string>;
}>((r, { origin }) => {
  let systemColor = 'dark';
  const mode = state('init', r);
  const showMode = state(false, r);
  const isDark = computed(() => {
    console.log(systemColor);
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
  // const routeRef = routeWatch(r);

  const goHome = (event: Event) => {
    event.preventDefault();
    navigate('/');
  };

  const goAbout = (event: Event) => {
    event.preventDefault();
    navigate('/about');
  };

  let timeout: number | null = null;
  const toggleMode = () => {
    if (mode.v === 'system') {
      mode.v = 'dark';
    } else if (mode.v === 'dark') {
      mode.v = 'light';
    } else if (mode.v === 'light') {
      mode.v = 'system';
    }

    if (mode.v === 'system') {
      localStorage.removeItem('theme');
    } else {
      localStorage.setItem('theme', mode.v);
    }

    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }

    showMode.v = true;
    timeout = setTimeout(() => {
      showMode.v = false;
    }, 1000);
  };

  mountCallback(() => {
    systemColor = window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';

    mode.v = localStorage.getItem('theme') || 'system';
  });

  console.log(preload.value);

  return ({ page: Page, id }) => (
    <html
      lang="en"
      class={mode.v === 'init' ? 'init' : isDark.v ? 'dark' : 'light'}
    >
      <head>
        <title>{preload.value?.title || "superlucky84's blog"}</title>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content={
            preload.value?.description ||
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
          content={preload.value?.openGraph?.title || "superlucky84's blog"}
        />
        <meta
          property="og:description"
          content={preload.value?.openGraph?.description}
        />
        {(preload.value?.openGraph?.images || []).length > 0 ? (
          preload.value.openGraph.images.map(item => (
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
          content={preload.value?.openGraph?.title || "superlucky84's blog"}
        />
        <meta
          name="twitter:description"
          content={
            preload.value?.openGraph?.description ||
            'superlucky84 is a software programmer and creator of Lithent, State-Ref open source.'
          }
        />
        {(preload.value?.openGraph?.images || []).length > 0 ? (
          <meta
            property="twitter:image"
            content={origin + preload.value?.openGraph?.images[0].url}
          />
        ) : (
          <meta property="twitter:image" content={origin + '/assets/kim.jpg'} />
        )}
      </head>
      <body class="dark:text-gray-100 max-w-2xl m-auto">
        <main class="p-6 pt-3 md:pt-6 min-h-screen">
          <header class="flex mb-5 md:mb-10 items-center">
            <span class="text-md md:text-lg whitespace-nowrap font-bold">
              <a
                class="hover:bg-gray-200 dark:hover:bg-[#313131] active:bg-gray-300 dark:active:bg-[#242424] p-2 rounded-sm -ml-2 transition-[background-color]"
                href="/"
                onClick={goHome}
              >
                Superlucky84
              </a>
            </span>
            <nav class="font-mono text-xs grow justify-end items-center flex gap-1 md:gap-3">
              <span
                class={`text-[9px] text-gray-400 mr-[-5px] ${showMode.v ? '' : 'hidden'}`}
              >
                {mode.v}
              </span>
              <button
                onClick={toggleMode}
                aria-label="Toggle theme"
                class={clsx([
                  'inline-flex  active:bg-gray-300 transition-[background-color] dark:active:bg-[#242424] rounded-sm p-2',
                  mode.v !== 'system' ? 'bg-gray-200' : false,
                  mode.v !== 'system' ? 'dark:bg-[#313131]' : false,
                  'theme-system:!bg-inherit',
                  '[&_.sun-icon]:hidden',
                  'dark:[&_.moon-icon]:hidden',
                  'dark:[&_.sun-icon]:inline',
                ])}
              >
                <span class="sun-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    stroke-width="0"
                    viewBox="0 0 56 56"
                  >
                    <path
                      d="M30 4.6c0-1-.9-2-2-2a2 2 0 00-2 2v5c0 1 .9 2 2 2s2-1 2-2zm9.6 9a2 2 0 000 2.8c.8.8 2 .8 2.9 0L46 13a2 2 0 000-2.9 2 2 0 00-3 0zm-26 2.8c.7.8 2 .8 2.8 0 .8-.7.8-2 0-2.9L13 10c-.7-.7-2-.8-2.9 0-.7.8-.7 2.1 0 3zM28 16a12 12 0 00-12 12 12 12 0 0012 12 12 12 0 0012-12 12 12 0 00-12-12zm0 3.6c4.6 0 8.4 3.8 8.4 8.4 0 4.6-3.8 8.4-8.4 8.4a8.5 8.5 0 01-8.4-8.4c0-4.6 3.8-8.4 8.4-8.4zM51.3 30c1.1 0 2-.9 2-2s-.9-2-2-2h-4.9a2 2 0 00-2 2c0 1.1 1 2 2 2zM4.7 26a2 2 0 00-2 2c0 1.1.9 2 2 2h4.9c1 0 2-.9 2-2s-1-2-2-2zm37.8 13.6a2 2 0 00-3 0 2 2 0 000 2.9l3.6 3.5a2 2 0 002.9 0c.8-.8.8-2.1 0-3zM10 43.1a2 2 0 000 2.9c.8.7 2.1.8 3 0l3.4-3.5c.8-.8.8-2.1 0-2.9-.8-.8-2-.8-2.9 0zm20 3.4c0-1.1-.9-2-2-2a2 2 0 00-2 2v4.9c0 1 .9 2 2 2s2-1 2-2z"
                      stroke="none"
                      fill="currentColor"
                    ></path>
                  </svg>
                </span>
                <span class="moon-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    stroke-width="0"
                    viewBox="0 0 56 56"
                  >
                    <path
                      d="M41.2 36.1c-12.9 0-21-7.8-21-20.3 0-3.5.7-6.7 1.6-8.3.3-.7.4-1 .4-1.5 0-.8-.7-1.7-1.7-1.7-.2 0-.7 0-1.3.3A24.5 24.5 0 004.4 27.1 23.8 23.8 0 0029 51.7c10.2 0 18.4-5.3 22.3-14.1l.3-1.4c0-1-.9-1.6-1.6-1.6a3 3 0 00-1.2.2c-2 .8-4.8 1.3-7.6 1.3zM8.1 27c0-7.3 3.8-14.3 9.9-18-.8 2-1.2 4.5-1.2 7.2 0 14.6 9 23.3 23.9 23.3 2.4 0 4.5-.2 6.4-1a20.8 20.8 0 01-18 9.6C17 48 8.1 39 8.1 27z"
                      stroke="none"
                      fill="currentColor"
                    ></path>
                  </svg>
                </span>
              </button>
              <a
                class="inline-flex hover:bg-gray-200 dark:hover:bg-[#313131] active:bg-gray-300 dark:active:bg-[#242424] rounded-sm p-2 transition-[background-color]"
                href="/about"
                onClick={goAbout}
              >
                About
              </a>
              <a
                href="https://twitter.com/superlucky84"
                target="_blank"
                class="inline-flex hover:bg-gray-200 dark:hover:bg-[#313131] active:bg-gray-300 dark:active:bg-[#242424] items-center p-2 rounded-sm transition-[background-color] whitespace-nowrap -mr-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  style="margin-right:4px"
                >
                  <path
                    fill="currentColor"
                    fill-rule="nonzero"
                    stroke="none"
                    stroke-width="1"
                    d="M8.28 20.26c7.55 0 11.68-6.26 11.68-11.67v-.53c.8-.58 1.49-1.3 2.04-2.13-.74.33-1.53.54-2.36.65.85-.5 1.5-1.32 1.8-2.28-.78.48-1.66.81-2.6 1a4.1 4.1 0 0 0-7 3.74c-3.4-.17-6.43-1.8-8.46-4.29a4.1 4.1 0 0 0 1.28 5.48c-.68-.02-1.3-.2-1.86-.5v.05a4.11 4.11 0 0 0 3.29 4.02 4 4 0 0 1-1.85.08 4.1 4.1 0 0 0 3.83 2.85A8.23 8.23 0 0 1 2 18.43a11.67 11.67 0 0 0 6.28 1.83"
                  ></path>
                </svg>{' '}
                Follow<span class="hidden md:inline">&nbsp;me</span>
              </a>
            </nav>
          </header>
          {['index.tsx', 'about.tsx'].includes(id) ? (
            <Page />
          ) : (
            <PageWrap preload={preload} id={id}>
              <Page />
            </PageWrap>
          )}
        </main>
        <footer class="p-6 pt-3 pb-6 flex text-xs text-center mt-3 dark:text-gray-400 text-gray-500 font-mono">
          <div class="grow text-left">
            Built with{' '}
            <a
              class="border-b text-gray-600 border-gray-300 transition-[border-color] hover:border-gray-600 dark:text-white dark:border-gray-500 dark:hover:border-white "
              target="_blank"
              href="https://github.com/superlucky84/lithent/tree/master/createLithent/express"
            >
              Lithent SSR Boilerplate
            </a>
          </div>
          <div>
            <a
              class="border-b text-gray-600 border-gray-300 transition-[border-color] hover:border-gray-600 dark:text-white dark:border-gray-500 dark:hover:border-white "
              target="_blank"
              href="https://github.com/superlucky84/blog"
            >
              Source
            </a>
          </div>
        </footer>
      </body>
    </html>
  );
});

export default Layout;
