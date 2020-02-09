<template lang="pug">
	.home
		section.active
			.menus
				.menus-item(v-for="game in gameList.slice(0, 8)" :key="game.id")
					v-avatar
						img(:src="game.unselectIcon")
					.label.mt-2(v-text="game.name")
			v-carousel.banner(cycle hide-delimiter-background show-arrows-on-hover height="400")
				v-carousel-item(v-for="slide in homeSlideshow")
					v-img(:src="slide.imgAddress" height="400" width="1000")
		section.hot
			.content
				v-banner.transparent 热门推荐
				.d-flex.justify-space-between.mt-3
					v-card(v-for="hotPlayer in hotPlayerList.list" :key="hotPlayer.gameId" hover width="19%")
						v-img(:src="hotPlayer.imageUrl[0]" aspect-ratio="1")
						v-card-text(v-text="hotPlayer.nickname")
		section.new
			.content
				v-banner.transparent 新秀
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
	name: 'Home',
	computed: {
		...mapState('game', ['gameList']),
		...mapState('home', ['homeSlideshow']),
		...mapState('player', ['hotPlayerList']),
	},
	methods: {
		...mapActions('game', ['getGameList']),
		...mapActions('home', ['getHomeSlideshow']),
		...mapActions('player', ['getHotPlayerList']),
	},
	async mounted() {
		Promise.all([
			this.getGameList(),
			this.getHomeSlideshow(),
			this.getHotPlayerList(),
		]);
	},
};
</script>
<style lang="scss" scoped>
section {
	.content {
		width: 1400px;
	}
	&.active {
		background-image: url('../assets/img/img_bg.png');
		width: 100vw;
		padding: 16px 0;
		display: flex;
		align-items: center;
		justify-content: center;
		.menus {
			width: 400px;
			max-width: 38%;
			height: 400px;
			background-color: whitesmoke;
			border-radius: 5px;
			display: flex;
			flex-wrap: wrap;
			&-item {
				min-width: 33.3%;
				flex-grow: 1;
				flex: 1;
				height: 33.3%;
				display: inline-flex;
				align-items: center;
				justify-content: center;
				flex-direction: column;
			}
		}
		.banner {
			width: 984px;
			margin-left: 16px;
			border-radius: 5px;
		}
	}
	&.hot,
	&.new {
		display: flex;
		align-items: center;
		justify-content: center;
	}
}
</style>
