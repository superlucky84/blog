import type { TagFunction } from 'lithent';
import { mount } from 'lithent';
import { computed } from 'lithent/helper';
import LoadingText from '@/components/Loading';
import { getPreloadData } from '@/base/data';
// import clsx from '@/helper/clsx';
import { routeWatch } from '@/base/route';
import '@/main.css';

const Layout = mount<{
  page: TagFunction;
  params: Record<string, string>;
  query: Record<string, string>;
}>(r => {
  const preload = computed(
    () => getPreloadData<{ layout: { title: string } }>()?.layout
  );
  const routeRef = routeWatch(r);

  return ({ page: Page, params, query }) => (
    <html lang="en" class="light" style="color-scheme: light;">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{preload.value?.title || 'unknown'}</title>
      </head>
      <body class="dark:text-gray-100 max-w-2xl m-auto">
        <div class="flex">
          {routeRef.loading.value ? (
            <LoadingText />
          ) : (
            <Page params={params} query={query} />
          )}
        </div>
        <footer class="p-6 pt-3 pb-6 flex text-xs text-center mt-3 dark:text-gray-400 text-gray-500 font-mono">
          <div class="grow text-left">
            superlucky84 (
            <a
              class="border-b text-gray-600 border-gray-300 transition-[border-color] hover:border-gray-600 dark:text-white dark:border-gray-500 dark:hover:border-white "
              target="_blank"
              href="https://twitter.com/superlucky84"
            >
              @superlucky84
            </a>
            )
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
