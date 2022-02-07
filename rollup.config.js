import typescript from 'rollup-plugin-typescript2'
import pkg from './package.json'
// import babel from '@rollup/plugin-babel';
// continued
export default {
    input: 'src/index.tsx',
    output: [
      {
        file: pkg.main,
        format: 'cjs',
        exports: 'named',
        sourcemap: true,
        strict: false
      }
    ],
    plugins: [
      // sass({ insert: true }),
      typescript({ 
        objectHashIgnoreUnknownHack: false
      }),
      // babel({
      //   presets: ["@babel/preset-react"],
      // })
    ],
    external: ['react', 'react-dom']
  }