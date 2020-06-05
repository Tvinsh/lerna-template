import commonjs from 'rollup-plugin-commonjs'
import VuePlugin from 'rollup-plugin-vue'
import sourceMaps from 'rollup-plugin-sourcemaps'
import nodeResolve from 'rollup-plugin-node-resolve'
import json from 'rollup-plugin-json'
import babel from 'rollup-plugin-babel'
import { createFilter } from 'rollup-pluginutils'
import postcss from 'rollup-plugin-postcss'
import { resolve } from 'path';
import babelConfig from './babel.config'

const CWD_PATH = process.cwd();

const defaultExternal = [
	'vue',
	'lodash',
	'lodash/**',
	'@babel/polyfill'
];

module.exports = () => {
	const options = {
		input: resolve(CWD_PATH, './src/index.js'),
		output: resolve(CWD_PATH, './lib/index.js'),
		package: resolve(CWD_PATH, './package.json')
	}
	const pkg = require(options.package)
	const externalList = [
		...defaultExternal,
		...Object.keys(pkg.peerDependencies || {})
	]

  return {
		input: options.input,
		output: {
			file: options.output,
			format: 'es',
			name: pkg.name,
			sourcemap: true,
		},
		external: createFilter(
			externalList,
			null,
			{resolve: false}
		),
		plugins: [
			json(),
			nodeResolve({
				extensions: ['.vue', '.js', '.ts', '.less', '.css', '.json', '.md', '.jsx'],
				// jsnext: true,
				// main: true,
				// browser: true
			}),
			sourceMaps(),
			VuePlugin(
				// {
				// 	css: false
				// }
			),
			// cssPlugin(),
			postcss({
				extract: false,
				extensions: [ '.css', '.less' ],
				minimize: true
			}),
			babel({
				...babelConfig,
				// exclude: 'node_modules/**',
				// include: ['src/**/*'],
				extensions: ['.js', '.jsx', '.es6', '.es', '.mjs', '.vue']
			}),
			commonjs()
		]
	}
}
