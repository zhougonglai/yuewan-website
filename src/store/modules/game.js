import GameService from '@services/game';

const gameService = new GameService();

const types = chat => Symbol(`GAME_${chat}`).toString();

const state = {
	gameList: [],
	search: {},
};

const actions = {
	async getGameList({ commit, dispatch }) {
		const { data } = await gameService.gameList();
		commit(types('LIST'), data);
		dispatch('activeSearch', data[0].id);
		return data;
	},
	activeSearch({ state, commit }, id) {
		const data =
			state.gameList[state.gameList.findIndex(game => game.id === id)];
		commit(types('INDEX'), data);
		return data;
	},
};

const mutations = {
	[types('LIST')](state, data) {
		state.gameList = data;
	},
	[types('INDEX')](state, data) {
		state.search = data;
	},
};

export default {
	namespaced: true,
	state,
	actions,
	mutations,
};
