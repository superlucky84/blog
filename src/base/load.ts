import { h, componentUpdate } from 'lithent';
import type { WDom, Props, TagFunction } from 'lithent';
import { hydration } from 'lithent/ssr';
import { makeRoute } from '@/base/route';
import { routeRef, pageModules } from '@/base/routeStore';
import Layout from '@/layout';

//@ts-ignore
// const tagManagerId = process.env.GOOGLE_TAG_MANAGER_ID;
// console.log('TAGMANAGERID', tagManagerId);

export default async function load(
  key?: string,
  props?: Props,
  initProp?: any,
  gtmId?: string
) {
  makeRoute();

  let res;
  if (key === 'oops') {
    res = await import('@/components/Oops');
  } else if (key === 'notfound') {
    res = await import('@/components/NotFound');
  } else {
    res = await pageModules.v[`../pages/${key}`]();
  }

  const { pathname, search } = location;

  (globalThis as any).pagedata = initProp;
  (globalThis as any).gtmId = gtmId;
  // const Page = h(res!.default as TagFunction, props) as WDom;
  const LayoutWDom = h(
    Layout as TagFunction,
    Object.assign(
      {
        // @ts-ignore
        page: res!.default,
      },
      props
    )
  ) as WDom;

  const renewRoot =
    (LayoutWDom.compKey && componentUpdate(LayoutWDom.compKey)) || (() => {});

  routeRef.page.value = `${pathname}${search}`;
  routeRef.renew.value = renewRoot;
  routeRef.rVDom.value = LayoutWDom;

  hydration(LayoutWDom, document.documentElement);
}
