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

	/**
	 * {
			"province": "",         //省
			"city": "",             //城市
			"area": "",             //区县
			"ageMax": null,         //年龄上限
			"ageMin": null,         //年龄下限
			"gender": "",           //性别 1男 2女
			"gameId": "ba471d5f29634582b76bbc3dbfc605a4", //服务类型id
			"rankId": null,         //段位id
			"priceSort": null,      //价格排序 0 从低到高，1 从高到低
			"pageNum": 1,           //页码
			"pageSize": 20,         //每页条数
			"newPlayer": false,     //是否按新秀排序 true 是 ，false 否
			"integrate": true,      //是否综合排序 true 是
			"queryParameter": ""    //陪玩号或昵称搜素参数
		}
	 */
	playerList(params) {
		return this.request.post(this.namespace + '/playerList', params);
	}

	hotPlayerList() {
		return this.request.get(this.namespace + '/homeHotPlayerList', {
			pageSize: 5,
			pageNum: 1,
		});
	}
}
