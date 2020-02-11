import Request from '@utils/request';

/**
 * @url ./home.http
 */
export default class HomeService {
	constructor() {
		this.request = new Request(process.env.VUE_APP_BASE);
		this.namespace = `${process.env.VUE_APP_BASE_PATH}/home`;
	}

	bannerBackend() {
		return this.request.get(this.namespace + '/bannerBackend');
	}

	slides() {
		return this.request.get(this.namespace + '/homeSlideshow');
	}
}
