import Request from '@utils/request';

export default class GameService {
	constructor() {
		this.request = new Request(process.env.VUE_APP_BASE);
		this.namespace = `${process.env.VUE_APP_BASE_PATH}/game`;
	}

	gameList() {
		return this.request.get(this.namespace + '/gameList');
	}

	rankList(gameId) {
		return this.request.get(this.namespace + '/rankList', { gameId });
	}
}
