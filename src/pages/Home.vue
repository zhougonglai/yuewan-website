<template lang="pug">
	.home
		section.active
			.menus
				.menus-item(v-for="game in gameList.slice(0, 8)" :key="game.memberNo")
					v-avatar
						v-img(:src="game.unselectIcon")
					.label.mt-2(v-text="game.name")
			v-carousel.banner(cycle hide-delimiter-background show-arrows-on-hover height="400")
				v-carousel-item(v-for="(slide, i) in slides" :key="i")
					v-img(:src="slide.imgAddress" height="400" width="1000")
		section.hot
			.content
				v-banner.transparent 热门推荐
				.d-flex.justify-space-between.mt-3
					v-card(v-for="hotPlayer in hotPlayerList.list" :key="hotPlayer.memberNo" hover width="19%")
						v-img.white--text.align-end(:src="hotPlayer.imageUrl[0]" aspect-ratio="1")
							.mask.pa-2(v-text="hotPlayer.rankName")
						v-card-text.d-flex.justify-space-between
							div(v-text="hotPlayer.nickname")
							div(v-text="hotPlayer.gameName")
		section.new
			.content
				v-banner.transparent 新秀
				v-item-group.d-flex(ref="scrollWarp")
					div.prev(@click="prev") <
					div.next(@click="next") >
					v-item(v-for="(player, i) in playerList.onlinePlayers" :style="{}" :key="`${player.memberNo}-prev`")
						v-img(:src="player.imageUrl[0]" aspect-ratio="1" width="16.6667%")
				//- v-item-group.d-flex
				//- 	v-item(v-for="player in playerList.onlinePlayers" :key="`${player.memberNo}-next`")
				//- 		v-img(:src="player.imageUrl[0]" aspect-ratio="1" width="20%")
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
	name: 'Home',
	computed: {
		...mapState('game', ['gameList']),
		...mapState('home', ['slides']),
		...mapState('player', ['playerList', 'hotPlayerList']),
	},
	methods: {
		...mapActions('game', ['getGameList']),
		...mapActions('home', ['getSlides']),
		...mapActions('player', ['getPlayerList', 'getHotPlayerList']),
		prev() {},
		next() {},
	},
	async mounted() {
		Promise.all([
			this.getGameList(),
			this.getSlides(),
			this.getHotPlayerList(),
			this.getPlayerList(),
		]);
	},
};
</script>
<style lang="scss" scoped>
.home {
	padding-bottom: 50vh;
}
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
	&.new {
		overflow: hidden;
		position: relative;
		&::before {
			content: '';
			flex: 1;
			background-color: rgba(0, 0, 0, 0.45);
			height: 233.33px;
			align-self: flex-end;
			z-index: 1;
			backdrop-filter: blur(4px);
		}
		&::after {
			content: '';
			flex: 1;
			background-color: rgba(0, 0, 0, 0.45);
			height: 233.33px;
			align-self: flex-end;
			z-index: 1;
			backdrop-filter: blur(4px);
		}
		::v-deep .v-item-group {
			position: relative;
			display: flex;
			align-items: center;
			justify-content: center;
			.prev {
				cursor: pointer;
				position: absolute;
				left: 15px;
				top: calc(50% - 25px);
				width: 50px;
				height: 50px;
				font-size: 22px;
				color: white;
				background-color: rgba(0, 0, 0, 0.45);
				backdrop-filter: blur(4px);
				z-index: 1;
				text-align: center;
				border-radius: 50%;
				line-height: 50px;
			}
			.next {
				cursor: pointer;
				position: absolute;
				right: 15px;
				top: calc(50% - 25px);
				font-size: 22px;
				width: 50px;
				height: 50px;
				color: white;
				background-color: rgba(0, 0, 0, 0.45);
				backdrop-filter: blur(4px);
				z-index: 1;
				text-align: center;
				border-radius: 50%;
				line-height: 50px;
			}
		}
	}
	.mask {
		background-image: linear-gradient(
			bottom,
			rgba(0, 0, 0, 0.8),
			rgba(0, 0, 0, 0)
		);
	}
}
</style>
