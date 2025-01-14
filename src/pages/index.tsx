import { mount, Fragment } from 'lithent';
// import { navigate } from '@/base/route';
import { getPreloadData } from '@/base/data';
import { groupByYear } from '@/helper/calculator';

// import { TYPE_DESCRIPT } from '@/helper/constants';

export const preload = async ({ origin }: { origin: string }) => {
  const list = await fetch(`${origin}/api/bloglist`).then(response =>
    response.json()
  );

  return { layout: { title: 'Superlucky84' }, list };
};

const Index = mount(() => {
  const preload = getPreloadData<{ list: string[] }>();

  console.log(groupByYear(preload.list));

  return () => (
    <Fragment>
      <main class="max-w-2xl font-mono m-auto mb-10 text-sm">
        <header class="text-gray-500 dark:text-gray-600 flex items-center text-xs">
          <button class="w-12 h-9 text-left  ">date</button>
          <span class="grow pl-2">title</span>
          <button
            class="
                  h-9
                  pl-4
                "
          >
            views
          </button>
        </header>
        <ul>
          <li>
            <a href="/2020/books-people-reread">
              <span class="flex transition-[background-color] hover:bg-gray-100 dark:hover:bg-[#242424] active:bg-gray-200 dark:active:bg-[#222] border-y border-gray-200 dark:border-[#313131]">
                <span class="py-3 flex grow items-center">
                  <span class="w-14 inline-block self-start shrink-0 text-gray-500 dark:text-gray-500">
                    2021
                  </span>
                  <span class="grow dark:text-gray-100">
                    Books people re-read
                  </span>
                  <span class="text-gray-500 dark:text-gray-500 text-xs">
                    31,797
                  </span>
                </span>
              </span>
            </a>
          </li>
          <li>
            <a href="/2020/books-people-reread">
              <span class="flex transition-[background-color] hover:bg-gray-100 dark:hover:bg-[#242424] active:bg-gray-200 dark:active:bg-[#222] border-y border-gray-200 dark:border-[#313131] border-t-0">
                <span class="py-3 flex grow items-center">
                  <span class="grow dark:text-gray-100 ml-14">
                    Books people re-read
                  </span>
                  <span class="text-gray-500 dark:text-gray-500 text-xs">
                    31,797
                  </span>
                </span>
              </span>
            </a>
          </li>
        </ul>
      </main>
    </Fragment>
  );
});

export default Index;
