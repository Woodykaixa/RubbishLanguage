import alias from '@rollup/plugin-alias';
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import path from 'path';
import { defineConfig } from 'rollup';
import pkg from './package.json';

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
    json(),
    resolve({ extensions, modulesOnly: true }),
    commonjs(),
    babel({ babelHelpers: 'bundled', include: ['src/**/*'], extensions }),
  ],
});

export default config;
