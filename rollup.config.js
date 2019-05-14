import babel from "rollup-plugin-babel"
import cjs from "rollup-plugin-commonjs"
import minify from "rollup-plugin-babel-minify"
import pkg from './package.json';
import resolve from "rollup-plugin-node-resolve"

export default [
    // browser-friendly UMD build
    {
        input: 'index.js',
        output: {
            banner: '/* https://kawhi.site */',
            file: pkg.browser,
            format: 'umd',
            name: 'nextWrapper'
        },
        plugins: [
            resolve(),
            cjs(),
            babel(),
            minify()
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
        // external: ['ms'],
        output: [{
            banner: '/* https://kawhi.site */',
            file: pkg.main,
            format: 'cjs'
        }, {
            banner: '/* https://kawhi.site */',
            file: pkg.module,
            format: 'es'
        }],
        plugins: [
            babel(),
            minify()
        ]
    },

    {
        input: 'index.js',
        // external: ['uuid/v1'],
        output: {
            file: 'next-wrapper.js',
            format: 'cjs'
        },
        plugins: [
            babel()
        ]
    }
];