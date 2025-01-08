import { mount } from 'lithent';
// import { state } from 'lithent/helper';
// import { getPreloadData } from '@/base/data';
// import { navigate } from '@/base/route';
// import { fetchMonsterListByType } from '@/helper/request';
// import { shuffleArray } from '@/helper/calculator';

import type { PageProps } from '@/base/types';
// import type { Info } from '@/helper/request';

// const Main = mount<PageProps>((_r, { params: { aa } }) => {
const Main = mount<PageProps>(_r => {
  return () => (
    <div class="bg-pokemon-${params.type} container px-8 mx-auto xl:px-5 max-w-screen-lg py-5 lg:py-8">
      about
    </div>
  );
});

export default Main;
