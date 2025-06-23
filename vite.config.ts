import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import vitePluginSvgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/Ecommerce/",
  plugins: [tsconfigPaths(), react(), vitePluginSvgr()],
});
