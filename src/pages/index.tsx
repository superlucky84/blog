import { mount, Fragment } from 'lithent';
import { navigate } from '@/base/route';
import { getPreloadData } from '@/base/data';
import { groupByYear, transformFilename } from '@/helper/calculator';
import { getLabColor } from '@/helper/labColor';

import clsx from '@/helper/clsx';
//@ts-ignore
import timeago from 'time-ago';

// import { TYPE_DESCRIPT } from '@/helper/constants';

export const preload = async ({ origin }: { origin: string }) => {
  const list = await fetch(`${origin}/api/blog/list`).then(response =>
    response.json()
  );

  return { layout: { title: 'Subtleflo' }, list };
};

const Index = mount<{ isDark: { v: boolean } }>(() => {
  const preload = getPreloadData<{
    list: {
      id: string;
      date: string;
      title: string;
      title_ko: string;
      view: number;
      order: number;
    }[];
  }>();
  const list = groupByYear(preload.list);
  const totalLengh = list.reduce((acc, item) => acc + item.list.length, 0);

  const moveLink = (event: Event, path: string) => {
    event.preventDefault();
    navigate(path);
  };

  return ({ isDark }) => (
    <Fragment>
      <main class="max-w-2xl m-auto mb-10 text-base">
        <div class="pb-1 flex text-sm text-center dark:text-gray-400 text-gray-500 mb-negative-4">
          Kim Jinwoo's Blog
        </div>
        <div class="pb-6 flex text-xs text-center dark:text-gray-400 text-gray-500">
          <div class="grow text-left">
            Created with{' '}
            <a
              class="border-b text-gray-600 border-gray-300 transition-[border-color] hover:border-gray-600 dark:text-white dark:border-gray-500 dark:hover:border-white "
              target="_blank"
              href="https://github.com/superlucky84/lithent/tree/master/createLithent/express#welcome-to-lithent-ssr-boilerplate"
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
        </div>
        <ul>
          {list.map(({ year, list }) =>
            list.map((item, index) => (
              <li>
                <a
                  onClick={(event: Event) =>
                    moveLink(event, transformFilename(item.id))
                  }
                  href={transformFilename(item.id)}
                >
                  <span
                    class={clsx(
                      'flex flex-col transition-[background-color] hover:bg-gray-100 dark:hover:bg-[#242424] active:bg-gray-200 dark:active:bg-[#222] border-b  border-gray-200 dark:border-[#313131] '
                    )}
                  >
                    <span
                      class={clsx(
                        'pt-2 flex grow items-center text-xl',
                        index !== 0 ? 'ml-14' : false
                      )}
                    >
                      {index === 0 && (
                        <span class="w-14 inline-block self-start shrink-0 text-gray-500 dark:text-gray-500">
                          {year}
                        </span>
                      )}
                      <span
                        class="pl-1 grow font-extrabold"
                        style={{
                          color: getLabColor(isDark.v, item.order, totalLengh),
                        }}
                      >
                        {item.title}
                      </span>
                    </span>
                    <span class="flex pt-1 pl-1 pb-1 ml-14 text-gray-500 dark:text-gray-500 text-xs">
                      <span class="flex-grow">
                        {item.date}{' '}
                        <span class="sm:inline hidden">
                          ({timeago.ago(item.date)})
                        </span>
                      </span>
                      <span>{item.view} views</span>
                    </span>
                  </span>
                </a>
              </li>
            ))
          )}
        </ul>
      </main>
    </Fragment>
  );
});

export default Index;
