import { defineConfig } from 'vite'
import { fileURLToPath, URL } from "node:url";
import uni from '@dcloudio/vite-plugin-uni'
import * as dotenv from "dotenv";
import { expand } from "dotenv-expand";
import Components from "unplugin-vue-components/vite";


const toLiteral = (s) => `"${s.replaceAll(/"/g, '\\"')}"`;
const { parsed: exposedEnvs } = expand({
  ...dotenv.config({
    override: false,
    path: __dirname + "/.env"
  }),
  ignoreProcessEnv: true
});

const envKeys = Object.fromEntries(
  Object.entries(exposedEnvs).map(([k, v]) => [
    `process.env.${k}`,
    toLiteral(v)
  ])
);

// https://vitejs.dev/config/
export default defineConfig({
  define: envKeys,
  plugins: [
    Components({
      // https://github.com/antfu/unplugin-vue-components#configuration
      dirs: ["./components"],
      extensions: ["vue", "jsx"],
      dts: "./unplugin/components.d.ts",
      directoryAsNamespace: false,
      resolvers: []
    }),
    uni(),
  ],
  resolve: {
    alias: {
      "@/": fileURLToPath(new URL(".", import.meta.url)),
    }
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  }
})
