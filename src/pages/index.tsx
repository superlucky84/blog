import { mount, Fragment } from 'lithent';
import { navigate } from '@/base/route';
import { getPreloadData } from '@/base/data';
import { groupByYear, transformFilename } from '@/helper/calculator';
import clsx from '@/helper/clsx';

// import { TYPE_DESCRIPT } from '@/helper/constants';

export const preload = async ({ origin }: { origin: string }) => {
  const list = await fetch(`${origin}/api/bloglist`).then(response =>
    response.json()
  );

  return { layout: { title: "Superlucky84's blog" }, list };
};

const Index = mount(() => {
  const preload = getPreloadData<{
    list: { id: string; date: string; title: string; view: number }[];
  }>();
  const list = groupByYear(preload.list);

  const moveLink = (event: Event, path: string) => {
    event.preventDefault();
    navigate(path);
  };

  return () => (
    <Fragment>
      <main class="max-w-2xl font-mono m-auto mb-10 text-sm">
        <header class="text-gray-500 dark:text-gray-600 flex items-center text-xs">
          <button class="w-12 h-9 text-left  ">date</button>
          <span class="grow pl-2">title</span>
          <button class=" h-9 pl-4 ">views</button>
        </header>
        <ul>
          {list.map(({ year, list }, wIndex) =>
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
                      'flex transition-[background-color] hover:bg-gray-100 dark:hover:bg-[#242424] active:bg-gray-200 dark:active:bg-[#222] border-y border-gray-200 dark:border-[#313131]',
                      wIndex > 0 || index > 0 ? 'border-t-0' : false
                    )}
                  >
                    <span
                      class={clsx(
                        'py-3 flex grow items-center',
                        index !== 0 ? 'ml-14' : false
                      )}
                    >
                      {index === 0 && (
                        <span class="w-14 inline-block self-start shrink-0 text-gray-500 dark:text-gray-500">
                          {year}
                        </span>
                      )}
                      <span class="grow dark:text-gray-100">{item.title}</span>
                      <span class="text-gray-500 dark:text-gray-500 text-xs">
                        {item.view}
                      </span>
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
