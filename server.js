// server.js
import path, { resolve } from 'path';
import express from 'express';
import { createServer as createViteServer } from 'vite';
import sortFiles from './sortFiles.js';
import createMakePage from './serverHelper/createMakePage.js';
import { getEntries, excludeRoutePath } from './serverHelper/helper.js';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import mdx from '@mdx-js/rollup';
import babel from '@rollup/plugin-babel';

const __dirname = path.dirname(new URL(import.meta.url).pathname);

function fixMdxExports() {
  return {
    name: 'fix-mdx-exports',
    transform(code, id) {
      if (id.endsWith('.mdx')) {
        // 중복 export 방지 및 중복 선언 방지
        const fixedCode = code
          // 이미 export가 포함된 함수 선언은 건너뜀
          .replace(
            /^(?!export )function\s+_createMdxContent/gm,
            'export function _createMdxContent'
          )
          .replace(
            /^(?!export )function\s+MDXContent/gm,
            'export default function MDXContent'
          );

        // 변환된 코드 출력 (디버깅용)

        return {
          code: fixedCode,
          map: null,
        };
      }
      return null;
    },
  };
}

const isDev = process.env.NODE_ENV !== 'production';
let vite;
if (isDev) {
  // const mdx = await import('@mdx-js/rollup');

  vite = await createViteServer({
    css: {
      postcss: {
        plugins: [tailwindcss, autoprefixer], // 미리 import한 플러그인 사용
      },
    },
    server: { middlewareMode: 'ssr', hmr: true },
    root: process.cwd(),
    plugins: [
      mdx({
        jsxImportSource: 'lithent', // Preact의 JSX pragma 사용
        outputFormat: 'esm',
      }),
      fixMdxExports(),
    ],
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

  /**
   * 블로그 리스트
   */
  app.get(`/api/bloglist`, async (req, res, next) => {
    console.log(sortedRouteList);
    const blogFiles = sortedRouteList.filter(file => /^[0-9]+\./.test(file));

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

      console.log('EXPRESSPATH', expressPath, key);

      const props = { params: req.params, query: req.query };
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
