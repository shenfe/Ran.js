const json = require('rollup-plugin-json');
const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const babel = require('rollup-plugin-babel');
const uglify = require('rollup-plugin-uglify');

module.exports = {
    input: 'src/index.js',
    output: {
        file: 'dist/vdom.js',
        format: 'umd',
        name: 'vdom'
    },
    plugins: [
        json(),

        resolve({
            jsnext: true,
            main: true
        }),

        commonjs({
            include: ['node_modules/**']
        }),

        babel(),

        // uglify()
    ]
};
