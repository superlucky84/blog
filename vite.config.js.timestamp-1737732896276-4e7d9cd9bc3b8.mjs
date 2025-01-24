// vite.config.js
import { resolve } from "path";
import { defineConfig, build } from "file:///Users/kjw/project/blog/node_modules/.pnpm/vite@5.4.11_terser@5.37.0/node_modules/vite/dist/node/index.js";
import checker from "file:///Users/kjw/project/blog/node_modules/.pnpm/vite-plugin-checker@0.8.0_eslint@9.18.0_jiti@1.21.7__optionator@0.9.4_typescript@5.7.3_vite@5.4.11_terser@5.37.0_/node_modules/vite-plugin-checker/dist/esm/main.js";
import dts from "file:///Users/kjw/project/blog/node_modules/.pnpm/vite-plugin-dts@2.3.0_rollup@4.30.1_vite@5.4.11_terser@5.37.0_/node_modules/vite-plugin-dts/dist/index.mjs";
import fs from "fs";
var __vite_injected_original_dirname = "/Users/kjw/project/blog";
var cachedEntries = getEntries();
function fixMdxExports() {
  return {
    name: "fix-mdx-exports",
    transform(code, id) {
      if (id.endsWith(".mdx")) {
        const fixedCode = code.replace(
          /^(?!export )function\s+_createMdxContent/gm,
          "export function _createMdxContent"
        ).replace(
          /^(?!export )function\s+MDXContent/gm,
          "export default function MDXContent"
        );
        return {
          code: fixedCode,
          map: null
        };
      }
      return null;
    }
  };
}
var vite_config_default = defineConfig(async ({ mode }) => {
  const mdx = await import("file:///Users/kjw/project/blog/node_modules/.pnpm/@mdx-js+rollup@3.1.0_acorn@8.14.0_rollup@4.30.1/node_modules/@mdx-js/rollup/index.js");
  return {
    plugins: [
      checker({
        typescript: true,
        eslint: {
          useFlatConfig: true,
          lintCommand: 'eslint "./src/**/*.{ts,tsx}"'
        }
      }),
      dts({
        outputDir: ["dist"]
      }),
      mdx.default({
        jsxImportSource: "lithent",
        // Preact의 JSX pragma 사용
        outputFormat: "esm"
      }),
      fixMdxExports()
    ],
    resolve: {
      alias: {
        "@": resolve(__vite_injected_original_dirname, "./src")
      }
    },
    build: {
      lib: {
        entry: cachedEntries,
        formats: ["es"],
        fileName: (format) => `[name]-[hash].${format}.js`
        // 파일 이름 패턴 지정
      },
      rollupOptions: {
        output: {
          // 파일 구조를 유지하는 설정
          entryFileNames: (assetInfo) => {
            const relativePath = assetInfo.facadeModuleId.replace(
              `${resolve(__vite_injected_original_dirname, "src")}/`,
              ""
            );
            const dir = relativePath.substring(
              0,
              relativePath.lastIndexOf("/")
            );
            return dir ? `${dir}/[name]-[hash].js` : `[name]-[hash].js`;
          },
          assetFileNames: (assetInfo) => {
            const relativePath = assetInfo.name.replace(
              `${resolve(__vite_injected_original_dirname, "src")}/`,
              ""
            );
            const dir = relativePath.substring(
              0,
              relativePath.lastIndexOf("/")
            );
            return dir ? `${dir}/[name]-[hash][extname]` : `[name]-[hash][extname]`;
          },
          chunkFileNames: (assetInfo) => {
            return `[name]-[hash].js`;
          }
        }
      }
    },
    test: {
      environment: "jsdom",
      includeSource: ["src/tests/*.{js,ts,jsx,tsx}"]
    }
  };
});
function getEntries() {
  const entriesDir = resolve(__vite_injected_original_dirname, "src/pages");
  const utilDir = resolve(__vite_injected_original_dirname, "src");
  const files = fs.readdirSync(entriesDir);
  const entries = files.reduce((entries2, file) => {
    const name = file;
    entries2[name] = resolve(entriesDir, file);
    return entries2;
  }, {});
  entries["load.ts"] = `${utilDir}/base/load.ts`;
  entries["layout.tsx"] = `${utilDir}/layout.tsx`;
  entries["Oops.tsx"] = `${utilDir}/components/Oops.tsx`;
  entries["NotFound.tsx"] = `${utilDir}/components/NotFound.tsx`;
  return entries;
}
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMva2p3L3Byb2plY3QvYmxvZ1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL2tqdy9wcm9qZWN0L2Jsb2cvdml0ZS5jb25maWcuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL2tqdy9wcm9qZWN0L2Jsb2cvdml0ZS5jb25maWcuanNcIjtpbXBvcnQgeyByZXNvbHZlIH0gZnJvbSAncGF0aCc7XG5pbXBvcnQgeyBkZWZpbmVDb25maWcsIGJ1aWxkIH0gZnJvbSAndml0ZSc7XG5pbXBvcnQgY2hlY2tlciBmcm9tICd2aXRlLXBsdWdpbi1jaGVja2VyJztcbmltcG9ydCBkdHMgZnJvbSAndml0ZS1wbHVnaW4tZHRzJztcbmltcG9ydCBmcyBmcm9tICdmcyc7XG5cbmNvbnN0IGNhY2hlZEVudHJpZXMgPSBnZXRFbnRyaWVzKCk7XG5cbmZ1bmN0aW9uIGZpeE1keEV4cG9ydHMoKSB7XG4gIHJldHVybiB7XG4gICAgbmFtZTogJ2ZpeC1tZHgtZXhwb3J0cycsXG4gICAgdHJhbnNmb3JtKGNvZGUsIGlkKSB7XG4gICAgICBpZiAoaWQuZW5kc1dpdGgoJy5tZHgnKSkge1xuICAgICAgICAvLyBcdUM5MTFcdUJDRjUgZXhwb3J0IFx1QkMyOVx1QzlDMCBcdUJDMEYgXHVDOTExXHVCQ0Y1IFx1QzEyMFx1QzVCOCBcdUJDMjlcdUM5QzBcbiAgICAgICAgY29uc3QgZml4ZWRDb2RlID0gY29kZVxuICAgICAgICAgIC8vIFx1Qzc3NFx1QkJGOCBleHBvcnRcdUFDMDAgXHVEM0VDXHVENTY4XHVCNDFDIFx1RDU2OFx1QzIxOCBcdUMxMjBcdUM1QjhcdUM3NDAgXHVBQzc0XHVCMTA4XHVCNzAwXG4gICAgICAgICAgLnJlcGxhY2UoXG4gICAgICAgICAgICAvXig/IWV4cG9ydCApZnVuY3Rpb25cXHMrX2NyZWF0ZU1keENvbnRlbnQvZ20sXG4gICAgICAgICAgICAnZXhwb3J0IGZ1bmN0aW9uIF9jcmVhdGVNZHhDb250ZW50J1xuICAgICAgICAgIClcbiAgICAgICAgICAucmVwbGFjZShcbiAgICAgICAgICAgIC9eKD8hZXhwb3J0IClmdW5jdGlvblxccytNRFhDb250ZW50L2dtLFxuICAgICAgICAgICAgJ2V4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIE1EWENvbnRlbnQnXG4gICAgICAgICAgKTtcblxuICAgICAgICAvLyBcdUJDQzBcdUQ2NThcdUI0MUMgXHVDRjU0XHVCNERDIFx1Q0Q5Q1x1QjgyNSAoXHVCNTE0XHVCQzg0XHVBRTQ1XHVDNkE5KVxuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgY29kZTogZml4ZWRDb2RlLFxuICAgICAgICAgIG1hcDogbnVsbCxcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH0sXG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyhhc3luYyAoeyBtb2RlIH0pID0+IHtcbiAgY29uc3QgbWR4ID0gYXdhaXQgaW1wb3J0KCdAbWR4LWpzL3JvbGx1cCcpO1xuICByZXR1cm4ge1xuICAgIHBsdWdpbnM6IFtcbiAgICAgIGNoZWNrZXIoe1xuICAgICAgICB0eXBlc2NyaXB0OiB0cnVlLFxuICAgICAgICBlc2xpbnQ6IHtcbiAgICAgICAgICB1c2VGbGF0Q29uZmlnOiB0cnVlLFxuICAgICAgICAgIGxpbnRDb21tYW5kOiAnZXNsaW50IFwiLi9zcmMvKiovKi57dHMsdHN4fVwiJyxcbiAgICAgICAgfSxcbiAgICAgIH0pLFxuICAgICAgZHRzKHtcbiAgICAgICAgb3V0cHV0RGlyOiBbJ2Rpc3QnXSxcbiAgICAgIH0pLFxuICAgICAgbWR4LmRlZmF1bHQoe1xuICAgICAgICBqc3hJbXBvcnRTb3VyY2U6ICdsaXRoZW50JywgLy8gUHJlYWN0XHVDNzU4IEpTWCBwcmFnbWEgXHVDMEFDXHVDNkE5XG4gICAgICAgIG91dHB1dEZvcm1hdDogJ2VzbScsXG4gICAgICB9KSxcbiAgICAgIGZpeE1keEV4cG9ydHMoKSxcbiAgICBdLFxuICAgIHJlc29sdmU6IHtcbiAgICAgIGFsaWFzOiB7XG4gICAgICAgICdAJzogcmVzb2x2ZShfX2Rpcm5hbWUsICcuL3NyYycpLFxuICAgICAgfSxcbiAgICB9LFxuICAgIGJ1aWxkOiB7XG4gICAgICBsaWI6IHtcbiAgICAgICAgZW50cnk6IGNhY2hlZEVudHJpZXMsXG4gICAgICAgIGZvcm1hdHM6IFsnZXMnXSxcbiAgICAgICAgZmlsZU5hbWU6IGZvcm1hdCA9PiBgW25hbWVdLVtoYXNoXS4ke2Zvcm1hdH0uanNgLCAvLyBcdUQzMENcdUM3N0MgXHVDNzc0XHVCOTg0IFx1RDMyOFx1RDEzNCBcdUM5QzBcdUM4MTVcbiAgICAgIH0sXG4gICAgICByb2xsdXBPcHRpb25zOiB7XG4gICAgICAgIG91dHB1dDoge1xuICAgICAgICAgIC8vIFx1RDMwQ1x1Qzc3QyBcdUFENkNcdUM4NzBcdUI5N0MgXHVDNzIwXHVDOUMwXHVENTU4XHVCMjk0IFx1QzEyNFx1QzgxNVxuICAgICAgICAgIGVudHJ5RmlsZU5hbWVzOiBhc3NldEluZm8gPT4ge1xuICAgICAgICAgICAgY29uc3QgcmVsYXRpdmVQYXRoID0gYXNzZXRJbmZvLmZhY2FkZU1vZHVsZUlkLnJlcGxhY2UoXG4gICAgICAgICAgICAgIGAke3Jlc29sdmUoX19kaXJuYW1lLCAnc3JjJyl9L2AsXG4gICAgICAgICAgICAgICcnXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgY29uc3QgZGlyID0gcmVsYXRpdmVQYXRoLnN1YnN0cmluZyhcbiAgICAgICAgICAgICAgMCxcbiAgICAgICAgICAgICAgcmVsYXRpdmVQYXRoLmxhc3RJbmRleE9mKCcvJylcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICByZXR1cm4gZGlyID8gYCR7ZGlyfS9bbmFtZV0tW2hhc2hdLmpzYCA6IGBbbmFtZV0tW2hhc2hdLmpzYDtcbiAgICAgICAgICB9LFxuICAgICAgICAgIGFzc2V0RmlsZU5hbWVzOiBhc3NldEluZm8gPT4ge1xuICAgICAgICAgICAgY29uc3QgcmVsYXRpdmVQYXRoID0gYXNzZXRJbmZvLm5hbWUucmVwbGFjZShcbiAgICAgICAgICAgICAgYCR7cmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMnKX0vYCxcbiAgICAgICAgICAgICAgJydcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBjb25zdCBkaXIgPSByZWxhdGl2ZVBhdGguc3Vic3RyaW5nKFxuICAgICAgICAgICAgICAwLFxuICAgICAgICAgICAgICByZWxhdGl2ZVBhdGgubGFzdEluZGV4T2YoJy8nKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHJldHVybiBkaXJcbiAgICAgICAgICAgICAgPyBgJHtkaXJ9L1tuYW1lXS1baGFzaF1bZXh0bmFtZV1gXG4gICAgICAgICAgICAgIDogYFtuYW1lXS1baGFzaF1bZXh0bmFtZV1gO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgY2h1bmtGaWxlTmFtZXM6IGFzc2V0SW5mbyA9PiB7XG4gICAgICAgICAgICByZXR1cm4gYFtuYW1lXS1baGFzaF0uanNgO1xuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0sXG4gICAgdGVzdDoge1xuICAgICAgZW52aXJvbm1lbnQ6ICdqc2RvbScsXG4gICAgICBpbmNsdWRlU291cmNlOiBbJ3NyYy90ZXN0cy8qLntqcyx0cyxqc3gsdHN4fSddLFxuICAgIH0sXG4gIH07XG59KTtcblxuZnVuY3Rpb24gZ2V0RW50cmllcygpIHtcbiAgY29uc3QgZW50cmllc0RpciA9IHJlc29sdmUoX19kaXJuYW1lLCAnc3JjL3BhZ2VzJyk7XG4gIGNvbnN0IHV0aWxEaXIgPSByZXNvbHZlKF9fZGlybmFtZSwgJ3NyYycpO1xuICBjb25zdCBmaWxlcyA9IGZzLnJlYWRkaXJTeW5jKGVudHJpZXNEaXIpO1xuICBjb25zdCBlbnRyaWVzID0gZmlsZXMucmVkdWNlKChlbnRyaWVzLCBmaWxlKSA9PiB7XG4gICAgY29uc3QgbmFtZSA9IGZpbGU7IC8vIFx1RDY1NVx1QzdBNVx1Qzc5MCBcdUM4MUNcdUFDNzBcbiAgICBlbnRyaWVzW25hbWVdID0gcmVzb2x2ZShlbnRyaWVzRGlyLCBmaWxlKTtcbiAgICByZXR1cm4gZW50cmllcztcbiAgfSwge30pO1xuXG4gIGVudHJpZXNbJ2xvYWQudHMnXSA9IGAke3V0aWxEaXJ9L2Jhc2UvbG9hZC50c2A7XG4gIGVudHJpZXNbJ2xheW91dC50c3gnXSA9IGAke3V0aWxEaXJ9L2xheW91dC50c3hgO1xuICBlbnRyaWVzWydPb3BzLnRzeCddID0gYCR7dXRpbERpcn0vY29tcG9uZW50cy9Pb3BzLnRzeGA7XG4gIGVudHJpZXNbJ05vdEZvdW5kLnRzeCddID0gYCR7dXRpbERpcn0vY29tcG9uZW50cy9Ob3RGb3VuZC50c3hgO1xuXG4gIHJldHVybiBlbnRyaWVzO1xufVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUF1UCxTQUFTLGVBQWU7QUFDL1EsU0FBUyxjQUFjLGFBQWE7QUFDcEMsT0FBTyxhQUFhO0FBQ3BCLE9BQU8sU0FBUztBQUNoQixPQUFPLFFBQVE7QUFKZixJQUFNLG1DQUFtQztBQU16QyxJQUFNLGdCQUFnQixXQUFXO0FBRWpDLFNBQVMsZ0JBQWdCO0FBQ3ZCLFNBQU87QUFBQSxJQUNMLE1BQU07QUFBQSxJQUNOLFVBQVUsTUFBTSxJQUFJO0FBQ2xCLFVBQUksR0FBRyxTQUFTLE1BQU0sR0FBRztBQUV2QixjQUFNLFlBQVksS0FFZjtBQUFBLFVBQ0M7QUFBQSxVQUNBO0FBQUEsUUFDRixFQUNDO0FBQUEsVUFDQztBQUFBLFVBQ0E7QUFBQSxRQUNGO0FBSUYsZUFBTztBQUFBLFVBQ0wsTUFBTTtBQUFBLFVBQ04sS0FBSztBQUFBLFFBQ1A7QUFBQSxNQUNGO0FBQ0EsYUFBTztBQUFBLElBQ1Q7QUFBQSxFQUNGO0FBQ0Y7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
