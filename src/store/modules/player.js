import PlayerService from '@services/player';

const playerService = new PlayerService();

const types = chat => Symbol(`PLAYER_${chat}`).toString();

const state = {
	playerList: {},
	hotPlayerList: [],
};

const actions = {
	async getPlayerList({ commit }) {
		const { data } = await playerService.homePlayerList();
		commit(types('LIST'), data);
		return data;
	},
	async getHotPlayerList({ commit }) {
		const { data } = await playerService.homeHotPlayerList();
		commit(types('HOT_LIST'), data);
		return data;
	},
};

const mutations = {
	[types('LIST')](state, data) {
		state.playerList = data;
	},
	[types('HOT_LIST')](state, data) {
		state.hotPlayerList = data;
	},
};

export default {
	namespaced: true,
	state,
	actions,
	mutations,
};
