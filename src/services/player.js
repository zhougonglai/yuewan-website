import Request from '@utils/request';

/**
 * @url ./player.http
 */
export default class PlayerService {
	constructor() {
		this.request = new Request(process.env.VUE_APP_BASE);
		this.namespace = `${process.env.VUE_APP_BASE_PATH}/player`;
	}

	homePlayerList() {
		return this.request.get(this.namespace + '/homePlayerList');
	}

	homeHotPlayerList() {
		return this.request.get(this.namespace + '/homeHotPlayerList', {
			pageSize: 5,
			pageNum: 1,
		});
	}
}
