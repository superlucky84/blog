import { mount, mountCallback } from 'lithent';
import { formatNumberWithCommas, isExity } from '@/helper/calculator';

const PageWrap = mount<{ id: string; preload: any }>(
  (_r, { id, preload }, ...children) => {
    mountCallback(() => {
      console.log('PRELOAD = ', id, preload);
    });

    return () => (
      <article class="text-gray-800 dark:text-gray-300 mb-10">
        <h1 class="text-2xl font-bold mb-1 dark:text-gray-100">
          {preload.value?.title || "superlucky84's blog"}
        </h1>
        <p class="font-mono flex text-xs text-gray-500 dark:text-gray-500">
          <span class="flex-grow">
            <span class="hidden md:inline">
              <span>
                <a
                  href="https://twitter.com/rauchg"
                  class="hover:text-gray-800 dark:hover:text-gray-400"
                  target="_blank"
                >
                  @superlucky84
                </a>
              </span>
              <span class="mx-2">|</span>
            </span>
            <span>June 23, 2021 (4y ago)</span>
          </span>
          <span class="pr-1.5">
            <span>
              {formatNumberWithCommas(
                isExity(preload.v?.views) ? preload.v.views : 0
              )}{' '}
              views
            </span>
          </span>
        </p>
        <section class="mt-5 whitespace-normal break-all prose dark:prose-invert prose-sm sm:prose">
          {children}
        </section>
      </article>
    );
  }
);

export default PageWrap;
