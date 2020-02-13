import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import '@styles/global.scss';

Vue.config.productionTip = false;

new Vue({
	router,
	store,
	vuetify,
	render: h => h(App),
	mounted() {
		document.dispatchEvent(new Event('render-event'));
	},
}).$mount('#app');
