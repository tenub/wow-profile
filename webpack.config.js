const webpack = require('webpack');
const { resolve } = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	context: resolve(__dirname, 'app'),
	entry: {
		vendor: 'vendor',
		app: process.env.NODE_ENV === 'dev' ? ['react-hot-loader/patch', 'index'] : 'index'
	},
	output: {
		filename: '[name].bundle.js',
		path: resolve(__dirname, 'public'),
		publicPath: '/'
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				use: 'babel-loader'
			},
			{
				test: /\.css$/,
				use: process.env.NODE_ENV === 'dev' ? [
					{
						loader: 'style-loader'
					},
					{
						loader: 'css-loader',
						options: {
							sourceMap: true
						}
					},
					{
						loader: 'postcss-loader',
						options: {
							plugins: [
								require('autoprefixer')({
									browsers: ['> 1%', 'last 2 versions']
								})
							]
						}
					}
				] : ExtractTextPlugin.extract({
					loader: [
						{
							loader: 'css-loader',
							options: {
								minimize: true,
								sourceMap: true
							}
						},
						{
							loader: 'postcss-loader',
							options: {
								plugins: [
									require('autoprefixer')({
										browsers: ['> 1%', 'last 2 versions']
									})
								]
							}
						}
					]
				})
			}
		]
	},
	resolve: {
		modules: ['node_modules', resolve(__dirname, 'app')],
		extensions: ['.js', '.json', '.jsx', '.css']
	},
	devtool: 'source-map',
	watch: process.env.NODE_ENV === 'dev',
	watchOptions: { ignored: /node_modules/ },
	plugins: process.env.NODE_ENV === 'dev' ? [
		new webpack.DefinePlugin({ NODE_ENV: JSON.stringify('development') })
	] : [
		new webpack.DefinePlugin({ NODE_ENV: JSON.stringify('production') }),
		new webpack.optimize.UglifyJsPlugin({ compress: { screw_ie8: true, warnings: false }, comments: false }),
		new ExtractTextPlugin({ filename: 'app.bundle.css', disable: false, allChunks: true })
	],
	devServer: {
		proxy: {
			'/api': `http://localhost:${process.env.API_PORT || 7777}`
		}
	}
};
