const { resolvePath } = require('./utils');

export default {
	"presets": [
		[
            resolvePath("@babel/preset-env"),
            {
                "modules": false
            }
        ],
        resolvePath('@vue/babel-preset-jsx')
	],
	"plugins": [
		resolvePath("@babel/plugin-syntax-dynamic-import"),
		[
			resolvePath("@babel/plugin-proposal-decorators"),
			{
				"legacy": true
			}
		],
		[
			resolvePath("@babel/plugin-proposal-class-properties"),
			{
				"loose": true
			}
		]
	]
}
