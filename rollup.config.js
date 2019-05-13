const babel = require('rollup-plugin-babel')
const cjs = require('rollup-plugin-commonjs')
const minify = require('rollup-plugin-babel-minify')

export default {
    input: 'index.js',
    output: [{
        banner: '/* https://kawhi.site */',
        file: 'dist/next-wrapper.js',
        format: 'umd',
        compact: true,
        name: 'nextWrapper'
    }, {
        banner: '/* https://kawhi.site */',
        file: 'dist/next-wrapper.es.js',
        format: 'es'
    }],
    plugins: [
        babel(),
        cjs(),
        minify()
    ]
};