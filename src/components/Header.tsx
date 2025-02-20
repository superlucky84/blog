import { mount } from 'lithent';
import { computed } from 'lithent/helper';
import clsx from '@/helper/clsx';
import { navigate } from '@/base/route';
import { transformFilename } from '@/helper/calculator';
import { getLabColor } from '@/helper/labColor';

const Header = mount<{
  mode: { v: string };
  isDark: { v: boolean };
  isIndex: { v: boolean };
  id: string;
}>((_r, props) => {
  const isKo = computed(() => /^ko\./.test(props.id));

  const goHome = (event: Event) => {
    event.preventDefault();
    navigate(isKo.v ? '/ko' : '/');
  };

  const goAbout = (event: Event) => {
    event.preventDefault();
    navigate(isKo.v ? '/ko/about' : '/about');
  };

  const changeLanguage = () => {
    const path = transformFilename(props.id);
    const newPath = isKo.v ? path.replace(/^\/ko/, '') : `/ko${path}`;
    navigate(newPath.replace('/index', ''));
  };

  const toggleMode = () => {
    const { mode } = props;
    if (props.mode.v === 'system') {
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
  };

  return ({ mode, isDark, isIndex }) => (
    <header class="flex mb-5 md:mb-10 items-center">
      <span class="text-md md:text-lg whitespace-nowrap font-bold">
        <a
          class="relative hover:bg-gray-200 dark:hover:bg-[#313131] active:bg-gray-300 dark:active:bg-[#242424] p-2 rounded-sm -ml-2"
          href="/"
          onClick={goHome}
          style={{
            color: isIndex.v ? 'inherit' : getLabColor(isDark.v, 0, 1),
          }}
        >
          <span class="opacity-0">Subtleflo</span>
          <span
            class="absolute top-2 left-2 animate-glitch"
            style="animation-delay: 0ms; --glitch-translate: -8px; --stack-height: calc(100% / 3 - 1px); --inverse-index: calc(2 - 0); --clip-top: calc(var(--stack-height) * 0); --clip-bottom: calc(var(--stack-height) * var(--inverse-index)); clip-path: inset(var(--clip-top) 0 var(--clip-bottom) 0);"
          >
            Subtleflo
          </span>
          <span
            class="absolute top-2 left-2 animate-glitch"
            style="--glitch-translate: 8px; animation-delay: 100ms; --stack-height: calc(100% / 3 - 1px); --inverse-index: calc(2 - 1); --clip-top: calc(var(--stack-height) * 1); --clip-bottom: calc(var(--stack-height) * var(--inverse-index)); clip-path: inset(var(--clip-top) 0 var(--clip-bottom) 0);"
          >
            Subtleflo
          </span>
          <span
            class="absolute top-2 left-2 animate-glitch"
            style="--glitch-translate: -8px; animation-delay: 200ms; --stack-height: calc(100% / 3 - 1px); --inverse-index: calc(2 - 2); --clip-top: calc(var(--stack-height) * 2); --clip-bottom: calc(var(--stack-height) * var(--inverse-index)); clip-path: inset(var(--clip-top) 0 var(--clip-bottom) 0);"
          >
            Subtleflo
          </span>
        </a>
      </span>
      <nav class="text-xs grow justify-end items-center flex gap-1 md:gap-3">
        <button
          onClick={toggleMode}
          aria-label="Toggle theme"
          class={clsx([
            'inline-flex  active:bg-gray-300 transition-[background-color] dark:active:bg-[#242424] rounded-sm p-1',
            'hover:bg-gray-200 dark:hover:bg-[#313131] active:bg-gray-300 dark:active:bg-[#242424]',
            'theme-system:!bg-inherit',
            '[&_.moon-icon]:hidden',
            'dark:[&_.sun-icon]:hidden',
            'dark:[&_.moon-icon]:inline',
          ])}
        >
          <span class={`text-[9px] text-gray-400 mr-1`}>{mode.v}</span>
          <span class="sun-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="sun"
              class="svg-inline--fa fa-sun fa-w-16 "
              role="img"
              viewBox="0 0 512 512"
              style="font-size: 1.2rem;"
            >
              <path
                fill="currentColor"
                d="M256 160c-52.9 0-96 43.1-96 96s43.1 96 96 96 96-43.1 96-96-43.1-96-96-96zm246.4 80.5l-94.7-47.3 33.5-100.4c4.5-13.6-8.4-26.5-21.9-21.9l-100.4 33.5-47.4-94.8c-6.4-12.8-24.6-12.8-31 0l-47.3 94.7L92.7 70.8c-13.6-4.5-26.5 8.4-21.9 21.9l33.5 100.4-94.7 47.4c-12.8 6.4-12.8 24.6 0 31l94.7 47.3-33.5 100.5c-4.5 13.6 8.4 26.5 21.9 21.9l100.4-33.5 47.3 94.7c6.4 12.8 24.6 12.8 31 0l47.3-94.7 100.4 33.5c13.6 4.5 26.5-8.4 21.9-21.9l-33.5-100.4 94.7-47.3c13-6.5 13-24.7.2-31.1zm-155.9 106c-49.9 49.9-131.1 49.9-181 0-49.9-49.9-49.9-131.1 0-181 49.9-49.9 131.1-49.9 181 0 49.9 49.9 49.9 131.1 0 181z"
              ></path>
            </svg>
          </span>
          <span class="moon-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="moon"
              class="svg-inline--fa fa-moon fa-w-16 "
              role="img"
              viewBox="0 0 512 512"
              style="font-size: 1.1rem;"
            >
              <path
                fill="currentColor"
                d="M283.211 512c78.962 0 151.079-35.925 198.857-94.792 7.068-8.708-.639-21.43-11.562-19.35-124.203 23.654-238.262-71.576-238.262-196.954 0-72.222 38.662-138.635 101.498-174.394 9.686-5.512 7.25-20.197-3.756-22.23A258.156 258.156 0 0 0 283.211 0c-141.309 0-256 114.511-256 256 0 141.309 114.511 256 256 256z"
              ></path>
            </svg>
          </span>
        </button>
        <button
          class="hover:bg-gray-200 dark:hover:bg-[#313131] active:bg-gray-300 dark:active:bg-[#242424] p-1"
          onClick={changeLanguage}
        >
          {isKo.v ? 'KR' : 'US'}
        </button>
        <a
          class="inline-flex hover:bg-gray-200 dark:hover:bg-[#313131] active:bg-gray-300 dark:active:bg-[#242424] rounded-sm p-1 transition-[background-color]"
          href="/about"
          onClick={goAbout}
        >
          About
        </a>
        <a
          href="https://bsky.app/profile/superlucky84.bsky.social"
          target="_blank"
          class="inline-flex hover:bg-gray-200 dark:hover:bg-[#313131] active:bg-gray-300 dark:active:bg-[#242424] items-center p-1 rounded-sm transition-[background-color] whitespace-nowrap -mr-2"
        >
          <svg
            class="mr-1"
            fill="none"
            viewBox="0 0 64 57"
            width="13"
            height="16"
          >
            <path
              fill="currentColor"
              d="M13.873 3.805C21.21 9.332 29.103 20.537 32 26.55v15.882c0-.338-.13.044-.41.867-1.512 4.456-7.418 21.847-20.923 7.944-7.111-7.32-3.819-14.64 9.125-16.85-7.405 1.264-15.73-.825-18.014-9.015C1.12 23.022 0 8.51 0 6.55 0-3.268 8.579-.182 13.873 3.805ZM50.127 3.805C42.79 9.332 34.897 20.537 32 26.55v15.882c0-.338.13.044.41.867 1.512 4.456 7.418 21.847 20.923 7.944 7.111-7.32 3.819-14.64-9.125-16.85 7.405 1.264 15.73-.825 18.014-9.015C62.88 23.022 64 8.51 64 6.55c0-9.818-8.578-6.732-13.873-2.745Z"
            ></path>
          </svg>{' '}
          Follow<span class="hidden md:inline">&nbsp;me</span>
        </a>
      </nav>
    </header>
  );
});

export default Header;
