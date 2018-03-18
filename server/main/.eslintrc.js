module.exports = {
	"env": {
		"es6": true,
		"node": true
	},
	"extends": "eslint:recommended",
	"parserOptions": {
		"sourceType": "module"
	},
	"rules": {
		"indent": [
			"error",
			"tab"
		],
		"quotes": [
			"error",
			"single"
		],
		"semi": [
			"error",
			"always"
		],
		"no-await-in-loop": [
			"warn"
		],
		"default-case": [
			"warn"
		],
		"eqeqeq": [
			"warn",
			"smart"
		],
		"semi-spacing": [
			"warn",
			{"before": false, "after": true}
		],
		"max-nested-callbacks": [
			"error",
			3
		],
		"no-trailing-spaces": [
			"error"
		],
		"require-await": [
			"error"
		]
	}
};