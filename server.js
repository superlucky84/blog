import { Redis } from '@upstash/redis';
import path, { resolve } from 'path';
import express from 'express';
import { createServer as createViteServer } from 'vite';
import sortFiles from './sortFiles.js';
import createMakePage from './serverHelper/createMakePage.js';
import { getEntries, excludeRoutePath } from './serverHelper/helper.js';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import { readFileSync } from 'fs';
import dotenv from 'dotenv';

dotenv.config();

const postsData = JSON.parse(readFileSync('./src/posts.json', 'utf-8')).posts;

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

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
    server: {
      middlewareMode: 'ssr',
      hmr: true,
    },
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

  app.get('/favicon.ico', (req, res) => {
    res.sendFile(path.join(__dirname, 'assets', 'favicon.ico'));
  });

  const sortedRouteList = sortFiles(Object.keys(entries));

  app.get(`/api/views/:id`, async (req, res, next) => {
    const id = req.params.id.replace(/^ko\./, '');
    const views = (await redis.hincrby('views', id, 1)) ?? 0;
    const item = postsData.find(item => item.id === id);
    const result = { ...item, views };

    res
      .status(200)
      .set({ 'Content-Type': 'application/json' })
      .end(JSON.stringify(result));
  });

  app.get(`/api/blog/list`, async (req, res, next) => {
    const sortedPosts = postsData.sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );
    const allViews = (await redis.hgetall('views')) || {};

    const sortedPostsWithView = sortedPosts.map(item => {
      return {
        ...item,
        view: allViews[item.id] || 0,
      };
    });

    res
      .status(200)
      .set({ 'Content-Type': 'application/json' })
      .end(JSON.stringify(sortedPostsWithView));
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

      const props = { id: key, params: req.params, query: req.query, origin };
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
