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
						v-img.hover.white--text.align-end(:src="hotPlayer.imageUrl[0]" aspect-ratio="1")
							.mask.pa-2(v-text="hotPlayer.rankName")
						v-card-text.d-flex.justify-space-between
							div.black--text(v-text="hotPlayer.nickname")
							b.black--text.large(v-text="hotPlayer.gameName")
						v-card-actions
							.voice.brown--text {{hotPlayer.duration}}s
								svg.icon(aria-hidden="true")
									use(xlink:href="#icon-voice1")
							v-spacer
							.price
								b.red--text {{hotPlayer.dateMoney}}
								small.red--text 元/每小时
		section.new
			.content
				v-banner.transparent 新秀
				.scrollWarp(ref="scrollWarp")
					div.prev(v-if="scrollIndex > -5" @click="prev") <
					div.next(v-if="scrollIndex < 5" @click="next") >
					.scrollContent(ref="scrollContent" :style="{transform: `translateX(${scrollIndex * 233.333}px)`}")
						v-img.hover.cursor.white--text.align-end(v-for="player in homePlayerList.newPlayers" :key="`${player.playerNo}-prev`" :src="player.imageUrl[0]" aspect-ratio="1" width="233.3333")
							.mask.pa-2(v-text="player.nickname")
						v-img.hover.cursor.white--text.align-end(v-for="player in homePlayerList.newPlayers" :key="`${player.playerNo}-next`" :src="player.imageUrl[0]" aspect-ratio="1" width="233.3333")
							.mask.pa-2(v-text="player.nickname")
		section.online
			.content
				v-banner.transparent 当前在线
				.grid
					v-card(v-for="player in homePlayerList.onlinePlayers" :key="player.memberNo" hover)
						v-img.hover.white--text.align-end(:src="player.imageUrl[0]" aspect-ratio="1")
							.mask.pa-2(v-text="player.rankName")
						v-card-text.d-flex.justify-space-between
							div.black--text(v-text="player.nickname")
							b.black--text.large(v-text="player.gameName")
						v-card-actions
							small.gender.grey--text
								template(v-if="player.gender === 1")
									svg.icon
										use(xlink:href="#icon-Man")
								template(v-else)
									svg.icon
										use(xlink:href="#icon-woman")
								|{{player.age}}
							small.address.grey--text
								svg.icon
									use(xlink:href="#icon-location")
								|{{player.city}}
							v-spacer
							.price
								b.red--text {{player.dateMoney}}
								small.red--text 元/每小时

</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
	name: 'Home',
	data() {
		return {
			scrollIndex: 0,
		};
	},
	computed: {
		...mapState('game', ['gameList']),
		...mapState('home', ['slides']),
		...mapState('player', ['homePlayerList', 'hotPlayerList']),
	},
	methods: {
		...mapActions('game', ['getGameList']),
		...mapActions('home', ['getSlides']),
		...mapActions('player', ['getHomePlayerList', 'getHotPlayerList']),
		prev() {
			this.scrollIndex -= 1;
		},
		next() {
			this.scrollIndex += 1;
		},
	},
	async mounted() {
		Promise.all([
			this.getGameList(),
			this.getSlides(),
			this.getHotPlayerList(),
			this.getHomePlayerList(),
		]);
	},
};
</script>
<style lang="scss" scoped>
.home {
	padding-bottom: 32px;
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
	&.new,
	&.online {
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
		.scrollWarp {
			height: 233.33333px;
			position: relative;
			display: flex;
			align-items: center;
			justify-content: center;
			.prev {
				cursor: pointer;
				user-select: none;
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
				user-select: none;
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
			.scrollContent {
				height: 233.33333px;
				transition: transform 0.25s linear;
				will-change: transform;
				display: flex;
			}
		}
	}
	.mask {
		background-image: linear-gradient(
			to top,
			rgba(0, 0, 0, 0.8),
			rgba(0, 0, 0, 0)
		);
	}
	.voice {
		background-color: var(--v-primary-base);
		border-radius: 15px 15px 15px 0;
		padding: 0 12px;
		line-height: 30px;
		font-size: 16px;
		transition: box-shadow 0.25s linear;
		&:hover {
			box-shadow: 0 0 8px 4px var(--v-primary-darken1);
		}
	}
	.icon {
		width: 1em;
		height: 1em;
		vertical-align: -0.15em;
		fill: currentColor;
		overflow: hidden;
		margin-left: 8px;
	}
	.grid {
		display: grid;
		grid-template-columns: repeat(5, 1fr);
		grid-template-rows: repeat(2, 1fr);
		grid-column-gap: 16px;
		grid-row-gap: 16px;
	}
}
</style>
