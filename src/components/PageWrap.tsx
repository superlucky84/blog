import { mount } from 'lithent';
//@ts-ignore
import timeago from 'time-ago';
import { formatNumberWithCommas, isExity } from '@/helper/calculator';

const PageWrap = mount<{ id: string; preload: any }>(
  (_r, { preload }, ...children) => {
    return () => (
      <article class="text-gray-800 dark:text-gray-300 mb-10">
        <h1 class="font-bold text-2xl mb-1 dark:text-gray-100">
          {preload.value?.title || 'Jinwoo Kim'}
        </h1>
        <p class="font-blog flex text-xs text-gray-500 dark:text-gray-500">
          <span class="grow">
            <span class="hidden md:inline">
              <span>
                <a
                  href="https://bsky.app/profile/superlucky84.bsky.social"
                  class="hover:text-gray-800 dark:hover:text-gray-400"
                  target="_blank"
                >
                  @superlucky84
                </a>
              </span>
              {preload.value?.date && <span class="mx-2">|</span>}
            </span>
            {preload.value?.date && (
              <span>
                {preload.value.date} ({timeago.ago(preload.value.date, true)}{' '}
                ago)
              </span>
            )}
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
        <section class="mt-5 whitespace-normal break-words dark:prose-invert prose sm:prose">
          {children}
        </section>
      </article>
    );
  }
);

export default PageWrap;
