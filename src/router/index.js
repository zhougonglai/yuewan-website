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
					title: '高端陪玩_趣味开黑_玩游戏找陪玩上NN约玩【NN约玩官网】',
				},
				component: () =>
					import(/* webpackChunkName: 'page.home' */ '@pages/Home.vue'),
			},
			{
				path: 'players',
				name: 'players',
				meta: {
					keepAlive: true,
					title: '游戏陪玩_游戏开黑_美女陪玩_找陪玩找NN约玩',
				},
				component: () =>
					import(/* webpackChunkName: 'page.players' */ '@pages/Players.vue'),
			},
			{
				path: 'recharge',
				name: 'recharge',
				meta: {
					keepAlive: true,
					title: '用户中心',
				},
				component: () =>
					import(/* webpackChunkName: 'page.recharge' */ '@pages/Recharge.vue'),
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
