// eslint-disable-next-line import/no-extraneous-dependencies
import { defineConfig, loadEnv } from 'vite';
import { fileURLToPath, URL } from 'url';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    // vite config
    define: {
      __APP_ENV__: env.APP_ENV
    },
    root: __dirname,
    publicDir: 'public',
    build: {
      outDir: 'dist'
    },
    base: env.BASE_URL || '/',
    resolve: {
      alias: {
        '@/*': fileURLToPath(new URL('./src', `${import.meta.url}.ts`)),
        'three/addons/controls': fileURLToPath(new URL('node_modules/three/examples/jsm/controls', import.meta.url))
      }
    }
  };
});
