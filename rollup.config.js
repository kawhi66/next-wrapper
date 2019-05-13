const cjs = require('rollup-plugin-commonjs')

export default {
    input: 'index.js',
    output: {
        file: 'dist/bundle.js',
        format: 'cjs',
        name: 'hahaha'
    },
    plugins: [cjs()]
};