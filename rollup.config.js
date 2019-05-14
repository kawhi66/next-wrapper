import cjs from "rollup-plugin-commonjs"
import pkg from './package.json';
import resolve from "rollup-plugin-node-resolve"
import {
    terser
} from "rollup-plugin-terser";

export default [
    // browser-friendly UMD build
    {
        input: 'index.js',
        output: {
            file: pkg.browser,
            format: 'umd',
            name: 'nextWrapper'
        },
        plugins: [
            resolve(),
            cjs(),
            terser()
        ]
    },

    // CommonJS (for Node) and ES module (for bundlers) build.
    // (We could have three entries in the configuration array
    // instead of two, but it's quicker to generate multiple
    // builds from a single configuration where possible, using
    // an array for the `output` option, where we can specify 
    // `file` and `format` for each target)
    {
        input: 'index.js',
        output: [{
            file: pkg.main,
            format: 'cjs'
        }, {
            file: pkg.module,
            format: 'es'
        }],
        plugins: [
            terser()
        ]
    },

    {
        input: 'index.js',
        output: {
            file: 'next-wrapper.js',
            format: 'cjs'
        }
    }
];