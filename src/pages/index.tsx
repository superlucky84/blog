import { mount, Fragment } from 'lithent';
// import { navigate } from '@/base/route';
// import { getPreloadData } from '@/base/data';
// import { TYPE_DESCRIPT } from '@/helper/constants';

export const preload = async () => {
  return { layout: { title: 'Superlucky84' } };
};

const Index = mount(() => {
  /*
  const preload = getPreloadData<{ data: { name: string; url: string }[] }>();
  const moveTypePage = (event: Event, name: string) => {
    event.preventDefault();
    navigate(`/${name}`);
  };
   */

  return () => <Fragment>INDEX</Fragment>;
});

export default Index;
