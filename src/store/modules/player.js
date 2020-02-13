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
	playerList: {},
	hotPlayerList: [],
};

const actions = {
	async getPlayerList({ commit }) {
		const { data } = await playerService.playerList();
		commit(types('LIST'), data);
		return data;
	},
	async getHotPlayerList({ commit }) {
		const { data } = await playerService.hotPlayerList();
		commit(types('HOT_LIST'), data);
		return data;
	},
};

const mutations = {
	[types('LIST')](state, { hotPlayers, newPlayers, onlinePlayers }) {
		state.playerList = {
			hotPlayers,
			newPlayers: newPlayers.map(player => new Player(player)),
			onlinePlayers: onlinePlayers.map(player => new Player(player)),
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
