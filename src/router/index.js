import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		component: () =>
			import(/* webpackChunkName: 'layout.default' */ '@layouts/default.vue'),
		children: [
			{
				path: '',
				name: 'home',
				meta: {
					keepAlive: true,
				},
				component: () =>
					import(/* webpackChunkName: 'page.home' */ '@pages/Home.vue'),
			},
		],
	},
];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes,
});

export default router;
