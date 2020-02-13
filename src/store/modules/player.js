import PlayerService from '@services/player';

const playerService = new PlayerService();

const types = chat => Symbol(`PLAYER_${chat}`).toString();

class Player {
	constructor(args) {
		for (const key in args) {
			this[key] = args[key];
		}
		this._init();
	}

	_init() {
		this.voice = this.voiceUrl ? new Audio(this.voiceUrl) : '';
		if (this.voice) {
			this.voice.load();
		}
	}
}

const state = {
	playerList: {
		list: [],
		total: 0,
	},
	homePlayerList: {},
	hotPlayerList: [],
};

const actions = {
	async getHomePlayerList({ commit }) {
		const { data } = await playerService.homePlayerList();
		commit(types('HOME_LIST'), data);
		return data;
	},
	async getPlayerList({ commit, rootState }) {
		const { data, code } = await playerService.playerList({
			gameId: rootState.game.search.id,
			pageNum: 1,
			pageSize: 20,
		});
		if (code) {
			return;
		} else {
			commit(types('LIST'), data);
			return data;
		}
	},
	async getHotPlayerList({ commit }) {
		const { data } = await playerService.hotPlayerList();
		commit(types('HOT_LIST'), data);
		return data;
	},
};

const mutations = {
	[types('HOME_LIST')](state, { hotPlayers, newPlayers, onlinePlayers }) {
		state.homePlayerList = {
			hotPlayers,
			newPlayers: newPlayers.map(player => new Player(player)),
			onlinePlayers: onlinePlayers.map(player => new Player(player)),
		};
	},
	[types('LIST')](state, { total, list }) {
		state.playerList = {
			total,
			list: list.map(player => new Player(player)),
		};
	},
	[types('HOT_LIST')](state, { list }) {
		state.hotPlayerList = { list: list.map(item => new Player(item)) };
	},
};

export default {
	namespaced: true,
	state,
	actions,
	mutations,
};
