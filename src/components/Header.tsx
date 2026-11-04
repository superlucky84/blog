import { mount } from 'lithent';
import { computed } from 'lithent/helper';
import { navigate } from '@/base/route';
import { transformFilename } from '@/helper/calculator';
import Logo from '@/components/Logo';

const Header = mount<{
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

  return ({ isIndex }) => (
    <header class="flex mb-5 md:mb-10 items-center">
      <Logo goHome={goHome} isIndex={isIndex} />
      <nav class="text-xs grow justify-end items-center flex gap-1 md:gap-3">
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
          aria-label="Bluesky"
          class="inline-flex hover:bg-gray-200 dark:hover:bg-[#313131] active:bg-gray-300 dark:active:bg-[#242424] items-center p-1 rounded-sm transition-[background-color]"
        >
          <svg
            aria-hidden="true"
            fill="none"
            viewBox="0 0 64 57"
            width="13"
            height="16"
          >
            <path
              fill="currentColor"
              d="M13.873 3.805C21.21 9.332 29.103 20.537 32 26.55v15.882c0-.338-.13.044-.41.867-1.512 4.456-7.418 21.847-20.923 7.944-7.111-7.32-3.819-14.64 9.125-16.85-7.405 1.264-15.73-.825-18.014-9.015C1.12 23.022 0 8.51 0 6.55 0-3.268 8.579-.182 13.873 3.805ZM50.127 3.805C42.79 9.332 34.897 20.537 32 26.55v15.882c0-.338.13.044.41.867 1.512 4.456 7.418 21.847 20.923 7.944 7.111-7.32 3.819-14.64-9.125-16.85 7.405 1.264 15.73-.825 18.014-9.015C62.88 23.022 64 8.51 64 6.55c0-9.818-8.578-6.732-13.873-2.745Z"
            ></path>
          </svg>
        </a>
        <a
          href="https://x.com/superlucky84"
          target="_blank"
          aria-label="X"
          class="inline-flex hover:bg-gray-200 dark:hover:bg-[#313131] active:bg-gray-300 dark:active:bg-[#242424] items-center p-1 rounded-sm transition-[background-color]"
        >
          <svg viewBox="0 0 24 24" width="14" height="16" aria-hidden="true">
            <path
              fill="currentColor"
              d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
            ></path>
          </svg>
        </a>
        <a
          href="https://github.com/superlucky84"
          target="_blank"
          aria-label="GitHub"
          class="inline-flex hover:bg-gray-200 dark:hover:bg-[#313131] active:bg-gray-300 dark:active:bg-[#242424] items-center p-1 rounded-sm transition-[background-color]"
        >
          <svg viewBox="0 0 24 24" width="15" height="16" aria-hidden="true">
            <path
              fill="currentColor"
              d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
            ></path>
          </svg>
        </a>
        <a
          href="https://www.linkedin.com/in/superlucky84/"
          target="_blank"
          aria-label="LinkedIn"
          class="inline-flex hover:bg-gray-200 dark:hover:bg-[#313131] active:bg-gray-300 dark:active:bg-[#242424] items-center p-1 rounded-sm transition-[background-color] -mr-2"
        >
          <svg viewBox="0 0 24 24" width="14" height="16" aria-hidden="true">
            <path
              fill="currentColor"
              d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
            ></path>
          </svg>
        </a>
      </nav>
    </header>
  );
});

export default Header;
