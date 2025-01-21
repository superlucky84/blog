import { mount } from 'lithent';

const Footer = mount(() => {
  return () => (
    <footer class="p-6 pt-3 pb-6 flex text-xs text-center mt-3 dark:text-gray-400 text-gray-500 font-mono">
      <div class="grow text-left">
        Built with{' '}
        <a
          class="border-b text-gray-600 border-gray-300 transition-[border-color] hover:border-gray-600 dark:text-white dark:border-gray-500 dark:hover:border-white "
          target="_blank"
          href="https://github.com/superlucky84/lithent/tree/master/createLithent/express"
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
    </footer>
  );
});

export default Footer;
