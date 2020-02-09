import Vue from 'vue';
import Vuex from 'vuex';
import game from './modules/game';
import home from './modules/home';
import player from './modules/player';

Vue.use(Vuex);

export default new Vuex.Store({
	modules: {
		game,
		home,
		player,
	},
});
