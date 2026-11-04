import { mount, mountCallback } from 'lithent';
import { state } from 'lithent/helper';
import clsx from '@/helper/clsx';

const Logo = mount<{
  goHome: (event: Event) => void;
  isIndex: { v: boolean };
}>(r => {
  let timeoutFlag: number | null = null;
  const aniState = [state('', r), state('', r), state('', r)];
  const getRandomDelay = () => Math.floor(Math.random() * (10000 - 60)) + 60;
  // Light mode uses the white glitch, dark mode the colored one.
  const animationClassName = 'animate-glitchwhite dark:animate-glitch';

  const runAnimation = () => {
    aniState.forEach(item => (item.v = animationClassName));

    timeoutFlag = setTimeout(() => {
      aniState.forEach(item => (item.v = ''));
      setTimeout(runAnimation, getRandomDelay());
      timeoutFlag = null;
    }, 500);
  };

  mountCallback(() => {
    runAnimation();

    return () => {
      if (timeoutFlag) {
        clearTimeout(timeoutFlag);
      }
    };
  });

  return ({ goHome, isIndex }) => (
    <span class="text-md md:text-lg whitespace-nowrap font-bold">
      <a
        class={clsx([
          'relative hover:bg-gray-200 dark:hover:bg-[#313131] active:bg-gray-300 dark:active:bg-[#242424] p-2 rounded-sm -ml-2',
          !isIndex.v && 'text-title-light dark:text-title-dark',
        ])}
        href="/"
        onClick={goHome}
      >
        <span class="opacity-0">Subtleflo</span>
        {aniState.map((item, index) => (
          <span
            class={clsx(['absolute', 'top-2', 'left-2', item.v])}
            style={`animation-delay: ${index * 100}ms; --glitch-translate: ${index === 1 ? '8' : '-8'}px; --stack-height: calc(100% / 3 - 1px); --inverse-index: calc(2 - ${index}); --clip-top: calc(var(--stack-height) * ${index}); --clip-bottom: calc(var(--stack-height) * var(--inverse-index)); clip-path: inset(var(--clip-top) 0 var(--clip-bottom) 0);`}
          >
            Subtleflo
          </span>
        ))}
      </a>
    </span>
  );
});

export default Logo;
