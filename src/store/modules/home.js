import HomeService from '@services/home';

const homeService = new HomeService();

const types = chat => Symbol(`GAME_${chat}`).toString();

const state = {
	homeSlideshow: [],
};

const actions = {
	async getHomeSlideshow({ commit }) {
		const { data } = await homeService.homeSlideshow();
		commit(types('SLIDE'), data);
		return data;
	},
};

const mutations = {
	[types('SLIDE')](state, data) {
		state.homeSlideshow = data;
	},
};

export default {
	namespaced: true,
	state,
	actions,
	mutations,
};
