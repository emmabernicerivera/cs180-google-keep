// const withCSS = require('@zeit/next-css');
// module.exports = withCSS();

// const path = require('path');
// const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');

// module.exports = {
// 	webpack: (config, { dev }) => {
// 		const oldEntry = config.entry;

// 		config.entry = () =>
// 			oldEntry().then(entry => {
// 				if (entry['static/runtime/main.js']) {
// 					entry['static/runtime/main.js'].push('./js/offline.js');
// 				}
// 				return entry;
// 			});
// 		console.log(dev);
// 		/* Enable only in Production */
// 		if (!dev) {
// 			// Service Worker
// 			config.plugins.push(
// 				new SWPrecacheWebpackPlugin({
// 					filename: 'sw.js',
// 					minify: false,
// 					staticFileGlobsIgnorePatterns: [/\.next\//],
// 					importScripts: ['./js/push-notifications.js'],
// 					staticFileGlobs: [
// 						'static/**/*', // Precache all static files by default
// 					],
// 					forceDelete: true,
// 					runtimeCaching: [
// 						// Example with different handlers
// 						{
// 							handler: 'fastest',
// 							urlPattern: /[.](png|jpg|css)/,
// 						},
// 						{
// 							handler: 'networkFirst',
// 							urlPattern: /^http.*/, // cache all files
// 						},
// 					],
// 				})
// 			);
// 		}
// 		return config;
// 	},
// };
