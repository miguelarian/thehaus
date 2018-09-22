var webpack = require('webpack');
	ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
	// your root file
	entry: './src/index.js',

	// output JS bundle to: build/bundle.js
	output: {
		path: './dist',
		filename: 'bundle.js'
	},

	resolve: {
		// you can load named modules from any dirs you want.
		// attempts to find them in the specified order.
		modulesDirectories: [
			'./src/lib',
			'node_modules'
		]
	},

	module: {

		preLoaders: [
			// before hitting the actual loaders, load any sourcemaps specified by npm modules
			{ loader: 'source-map' }
		],

		loaders: [
			// transpile ES6/7 to ES5 via babel
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				loader: 'babel'
			},
			// bundle LESS and CSS into a single CSS file, auto-generating -vendor-prefixes
			{
				test: /\.(less|css)$/,
				exclude: /\b(some\-css\-framework|whatever)\b/i,
				loader: ExtractTextPlugin.extract("style?sourceMap", "css?sourceMap!autoprefixer?browsers=last 2 version!less")
			}
		]
	},

	plugins: ([
		// Write out CSS bundle to its own file:
		new ExtractTextPlugin('style.css', { allChunks: true })
	]),

	// Pretty terminal output
	stats: { colors: true },

	// Generate external sourcemaps for the JS & CSS bundles
	devtool: 'source-map',

	// `webpack-dev-server` spawns a live-reloading HTTP server for your project.
	devServer: {
		port: process.env.PORT || 8080,
		contentBase: './src',
		historyApiFallback: true
	}
};