import { mount } from 'lithent';
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

  return () => (
    <div class="container px-8 mx-auto xl:px-5  max-w-screen-lg py-5 lg:py-8">
      INDEX
    </div>
  );
});

export default Index;
