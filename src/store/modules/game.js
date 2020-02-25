import GameService from '@services/game';

const gameService = new GameService();

const types = chat => Symbol(`GAME_${chat}`).toString();

const state = {
	gameList: [],
	rankList: [],
	search: {},
};

const actions = {
	async getGameList({ commit, dispatch }) {
		const { data } = await gameService.gameList();
		commit(types('LIST'), data);
		dispatch('activeSearch', data[0].id);
		return data;
	},
	async getRankList({ state, commit }) {
		const { data } = await gameService.rankList(state.search.id);
		commit(types('RANK'), data);
		return data;
	},
	activeSearch({ state, commit, dispatch }, id) {
		const data =
			state.gameList[state.gameList.findIndex(game => game.id === id)];
		commit(types('INDEX'), data);
		dispatch('getRankList', id);
		return data;
	},
};

const mutations = {
	[types('LIST')](state, data) {
		state.gameList = data;
	},
	[types('RANK')](state, data) {
		state.rankList = data;
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
