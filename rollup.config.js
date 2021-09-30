import { defineConfig } from 'rollup';
import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import pkg from './package.json';
import alias from '@rollup/plugin-alias';
import path from 'path';

const projectRootDir = path.resolve(__dirname);
const extensions = ['.js', '.ts'];

const config = defineConfig({
  input: './src/index.ts',
  output: {
    file: pkg.main,
    format: 'cjs',
  },
  plugins: [
    alias({
      entries: [
        {
          find: '@',
          replacement: path.resolve(projectRootDir, 'src'),
        },
      ],
    }),
    resolve({ extensions, modulesOnly: true }),
    commonjs(),
    babel({ babelHelpers: 'bundled', include: ['src/**/*'], extensions }),
  ],
});

export default config;
