const pkg = require('./package');
const routes = require('./routes');
const webpack = require('webpack');
const path = require('path');
const PrerenderSPAPlugin = require('prerender-spa-plugin');
const Renderer = PrerenderSPAPlugin.PuppeteerRenderer;

const isProd = () => {
	return process.env.NODE_ENV === 'production';
};

const resolve = dir => {
	return path.join(__dirname, './', dir);
};

const plugins = [];

if (isProd()) {
	const banner = new webpack.BannerPlugin({
		banner: `Current version ${
			pkg.version
		} and build time ${new Date().toString()}`,
	});
	const prerender = new PrerenderSPAPlugin({
		staticDir: resolve('dist'),
		routes: ['/', '/players', '/recharge'],
		postProcess(renderedRoute) {
			renderedRoute.route = renderedRoute.originalRoute;
			renderedRoute.html = renderedRoute.html.replace(
				/<title>[^<]*<\/title>/i,
				'<title>' + routes[renderedRoute.route].title + '</title>',
			);
			if (renderedRoute.route.endsWith('.html')) {
				renderedRoute.outputPath = path.join(
					__dirname,
					'dist',
					renderedRoute.route,
				);
			}

			return renderedRoute;
		},
		renderer: new Renderer({
			maxConcurrentRoutes: 4,
			renderAfterDocumentEvent: 'render-event',
			headless: true,
		}),
	});
	plugins.push(banner, prerender);
}

module.exports = {
	transpileDependencies: ['vuetify'],

	devServer: {
		proxy: {
			'/baseUrl': {
				target: 'https://yuewanapi.nn.com/',
			},
		},
	},

	// css相关配置
	css: {
		// 是否使用css分离插件 ExtractTextPlugin
		extract: isProd(),
		// 开启 CSS source maps?
		sourceMap: isProd(),
	},

	configureWebpack: {
		resolve: {
			alias: {
				'@': resolve('src'),
				'@environments': resolve('src/environments.js'),
				'@share': resolve('src/share'),
				'@components': resolve('src/components'),
				'@layouts': resolve('src/layouts'),
				'@pages': resolve('src/pages'),
				'@plugins': resolve('src/plugins'),
				'@store': resolve('src/store'),
				'@router': resolve('src/router'),
				'@assets': resolve('src/assets'),
				'@styles': resolve('src/styles'),
				'@services': resolve('src/services'),
				'@utils': resolve('src/utils'),
			},
		},
		optimization: {
			splitChunks: {
				chunks: 'async',
				minSize: 30000,
				maxSize: 0,
				minChunks: 1,
				maxAsyncRequests: 5,
				maxInitialRequests: 3,
				automaticNameDelimiter: '~',
				name: true,
				cacheGroups: {
					vendors: {
						test: /[\\/]node_modules[\\/]/,
						priority: -10,
					},
					commons: {
						name: 'chunk-commons',
						test: resolve('src/components'), // 可自定义拓展你的规则
						minChunks: 3, // 最小公用次数
						priority: -15,
						reuseExistingChunk: true,
					},
					default: {
						minChunks: 2,
						priority: -20,
						reuseExistingChunk: true,
					},
				},
			},
		},
		plugins,
	},

	pwa: {
		name: 'dfb',
	},
};
