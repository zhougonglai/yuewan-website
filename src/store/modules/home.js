import HomeService from '@services/home';

const homeService = new HomeService();

const types = chat => Symbol(`GAME_${chat}`).toString();

const state = {
	slides: [],
};

const actions = {
	async getSlides({ commit }) {
		const { data } = await homeService.slides();
		commit(types('SLIDE'), data);
		return data;
	},
};

const mutations = {
	[types('SLIDE')](state, data) {
		state.slides = data;
	},
};

export default {
	namespaced: true,
	state,
	actions,
	mutations,
};
