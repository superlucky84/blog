import { h, componentUpdate, componentMap, replaceWDom } from 'lithent';
import type { WDom, Props, TagFunction } from 'lithent';
import { hydration } from 'lithent/ssr';
import { makeRoute, makePathToKey } from '@/base/route';
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

/**
 * When comments are removed,
 * HMR can be selectively applied only to components under /pages/ in the component tree structure.
 *
 * The following three APIs are required.
 * Please uncomment them at the top as well.
 *
 * - componentMap
 * - replaceWDom
 * - makePathToKey
 */
if (import.meta.hot) {
  pageModules.v = import.meta.glob('../pages/*.(tsx|mdx)');
  import.meta.hot.accept(async () => {
    console.log('Accept up resources...');

    const dynamicPath = routeRef.page.value;
    const rVDom = routeRef.rVDom.value;
    const compKey = rVDom?.compKey;
    const { key, id, query, params, origin } = makePathToKey(dynamicPath);

    if (key && compKey) {
      const currentVDom = componentMap.get(compKey)?.vd?.value;
      const res = await pageModules.v[key]();
      const preload = res.preload;

      let initProp = null;
      if (preload) {
        initProp = await preload({ id, query, params, origin });
      }
      (globalThis as any).pagedata = initProp;

      const props = { page: res.default, id, query, params };

      try {
        replaceWDom(Layout as TagFunction, props, [], currentVDom!);
      } catch {
        location.reload();
      }
    }
  });
}
