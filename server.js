import { Redis } from '@upstash/redis';
import path, { resolve } from 'path';
import express from 'express';
import { createServer as createViteServer } from 'vite';
import sortFiles from './sortFiles.js';
import createMakePage from './serverHelper/createMakePage.js';
import { getEntries, excludeRoutePath } from './serverHelper/helper.js';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

const redis = new Redis({
  url: 'https://known-feline-53619.upstash.io',
  token: 'AdFzAAIjcDFkNTQ1NDA5NzdjZTA0MjZiYmEzMGY4NTdiZmRiZjBkMHAxMA',
});

/*
await redis.set('foo', 'bar');
const data = await redis.get('foo');

const result = await redis.del('foo');
console.log(result); // 삭제된 키의 수 (보통 1)

const exists = await redis.exists('foo');
console.log(exists); // 키가 존재하면 1, 존재하지 않으면 0

await redis.incr('counter'); // counter 값을 1 증가시킴
await redis.decr('counter'); // counter 값을 1 감소시킴

const data = await redis.mget('foo', 'bar');
console.log(data); // ['value of foo', 'value of bar']
*/

const __dirname = path.dirname(new URL(import.meta.url).pathname);

const isDev = process.env.NODE_ENV !== 'production';
let vite;
if (isDev) {
  vite = await createViteServer({
    css: {
      postcss: {
        plugins: [tailwindcss, autoprefixer], // 미리 import한 플러그인 사용
      },
    },
    server: { middlewareMode: 'ssr', hmr: true },
    root: process.cwd(),
    resolve: {
      alias: {
        '@': '/src',
      },
    },
  });
}

async function createServer() {
  const entries = getEntries();
  const app = express();

  if (!isDev) {
    app.use('/dist', express.static(path.resolve(__dirname, 'dist')));
  }

  app.use('/assets', express.static(path.resolve(__dirname, 'assets')));

  const sortedRouteList = sortFiles(Object.keys(entries));

  app.get(`/api/bloglist`, async (req, res, next) => {
    const blogFiles = sortedRouteList
      .filter(file => /^[0-9]+\./.test(file))
      .sort((a, b) => {
        // 날짜 부분을 추출하여 Date 객체로 변환
        const dateA = new Date(
          a.split('.')[0],
          a.split('.')[1] - 1,
          a.split('.')[2]
        );
        const dateB = new Date(
          b.split('.')[0],
          b.split('.')[1] - 1,
          b.split('.')[2]
        );

        // 최근일 순으로 정렬
        return dateB - dateA;
      });

    console.log('BLOGFILES', blogFiles);

    res
      .status(200)
      .set({ 'Content-Type': 'application/json' })
      .end(JSON.stringify(blogFiles));
  });

  sortedRouteList.forEach(key => {
    const pathSplit = key.split('.');
    const newPathSplit = pathSplit.slice(0, pathSplit.length - 1);

    const expressPath = newPathSplit
      .map(item => (item === 'index' ? '' : item))
      .filter(item => item)
      .join('/');

    app.get(`/${expressPath.replace(/_/g, ':')}`, async (req, res, next) => {
      if (excludeRoutePath(req.params)) {
        next();
        return;
      }

      const protocol = req.protocol;
      const host = req.get('host');
      const origin = `${protocol}://${host}`;

      const props = { params: req.params, query: req.query, origin };
      let finalHtml = '';

      try {
        const pageIns = createMakePage({ key, req, props, isDev, vite });
        finalHtml = await pageIns.run();
      } catch (e) {
        isDev && vite.ssrFixStacktrace(e);
        console.error(e, e.stack);

        const pageIns = createMakePage({
          key: 'oops',
          req,
          props,
          isDev,
          vite,
        });
        finalHtml = await pageIns.runOops();
      }

      res.status(200).set({ 'Content-Type': 'text/html' }).end(finalHtml);
    });
  });

  if (isDev) {
    app.use(vite.middlewares);
  } else {
    // 404 Handler
    app.use(async (req, res, next) => {
      const pageIns = createMakePage({
        key: 'notfound',
        req,
        props: {},
        isDev: false,
      });
      const finalHtml = await pageIns.run404();

      res.status(404).set({ 'Content-Type': 'text/html' }).end(finalHtml);
      next();
    });
  }

  app.listen(3000, () => {
    console.log('Server is running at http://localhost:3000');
  });
}

createServer();
