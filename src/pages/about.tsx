import { mount, Fragment } from 'lithent';
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
    <Fragment>
      <h1>Title 블로그 진우</h1>
      <h1>sdgag</h1>
      <h1>sdgsAAAAAAAAAAAAAA</h1>
    </Fragment>
  );
});

export default Main;
