import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import zhHans from 'vuetify/es5/locale/zh-Hans';
import colors from 'vuetify/lib/util/colors';

Vue.use(Vuetify);

export default new Vuetify({
	breakpoint: {
		thresholds: {
			md: 1280,
			lg: 1400,
		},
	},
	theme: {
		options: {
			customProperties: true,
		},
		themes: {
			light: {
				primary: '#FFD33E',
				secondary: colors.pink.base,
				accent: colors.deepPurple.accent2,
				error: '#FF5252',
				info: '#2196F3',
				success: '#4CAF50',
				warning: '#FB8C00',
			},
		},
	},
	lang: {
		locales: { zhHans },
		current: 'zh-Hans',
	},
});
