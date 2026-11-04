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
