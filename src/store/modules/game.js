import GameService from '@services/game';

const gameService = new GameService();

const types = chat => Symbol(`GAME_${chat}`).toString();

const state = {
	gameList: [],
};

const actions = {
	async getGameList({ commit }) {
		const { data } = await gameService.gameList();
		commit(types('LIST'), data);
		return data;
	},
};

const mutations = {
	[types('LIST')](state, data) {
		state.gameList = data;
	},
};

export default {
	namespaced: true,
	state,
	actions,
	mutations,
};
