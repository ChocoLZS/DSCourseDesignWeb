import { UserConfigFn, UserConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import legacy from "@vitejs/plugin-legacy";
import tsconfigPaths from "vite-tsconfig-paths";
import mkcert from "vite-plugin-mkcert";
import svgLoader from 'vite-svg-loader';
import { resolve } from 'path'
import { viteMockServe } from 'vite-plugin-mock'
import macrosPlugin from "vite-plugin-babel-macros"

const defineConfig: UserConfigFn = ({ command, mode }) => {
  const isBuild = command === "build";
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
  process.env.PUBLIC_URL = "/public"
  const config: UserConfig = {
    resolve: {
      alias: {
        '@assets': resolve(__dirname, './src/assets'),
        '@components': resolve(__dirname, './src/components'),
        '@pages': resolve(__dirname, './src/pages'),
        '@uitls': resolve(__dirname, './src/uitls'),
        '@styles': resolve(__dirname, './src/styles'),
        '@config': resolve(__dirname, './src/config'),
        '@mock': resolve(__dirname, './mock')
      }
    },
    base: process.env.VITE_APP_BASE,
    server: {
      proxy: {
        '/api': {
          target: 'http://127.0.0.1:8080',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      }
    },
    plugins: [
      react(),
      tsconfigPaths(),
      legacy(),
      mkcert({
        source: "coding",
      }),
      svgLoader(),
      // viteMockServe({
      //   mockPath: 'mock',
      //   localEnabled: !isBuild,
      //   prodEnabled: !isBuild,
      //   injectCode: `
      //   import { setupProdMockServer } from './mockProdServer';
      //   setupProdMockServer();
      // `,
      //   injectFile: resolve(__dirname, "./src/main.tsx"),
      //   logger: true,
      // }),
      macrosPlugin(),
    ],
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            react: ["react"],
            "react-dom": ["react-dom"],
          },
        },
      },
      outDir: process.env.VITE_APP_DIR,
    },
    define: {
      'process.env': process.env
    }
  };
  return config;
};

export default defineConfig;
