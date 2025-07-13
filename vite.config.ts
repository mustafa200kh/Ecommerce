import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import vitePluginSvgr from "vite-plugin-svgr";
import path from 'path';
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/Ecommerce/",
  plugins: [tsconfigPaths(), react(), vitePluginSvgr()],
    resolve: {
    alias: {
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@hooks': path.resolve(__dirname, 'src/hooks'),
      '@layout': path.resolve(__dirname, 'src/layout'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@routes': path.resolve(__dirname, 'src/routes'),
      '@services': path.resolve(__dirname, 'src/services'),
      '@store': path.resolve(__dirname, 'src/store'),
      '@style': path.resolve(__dirname, 'src/style'),
      '@type': path.resolve(__dirname, 'src/types'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@validation': path.resolve(__dirname, 'src/validation'),
      '@form': path.resolve(__dirname, 'src/form'),
    },
  },
});