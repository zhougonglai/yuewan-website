<template lang="pug">
#players
	v-container.header-bars(fluid)
		v-row.justify-space-between
			v-col.game.d-inline-flex(:cols="gameList.filter(({type}) => type === 1).length")
				v-item(v-for="game in gameList.filter(({type}) => type === 1)" :key="game.id")
					router-link.box(:class="{active: game.id === $route.query.id || game.id === search.id}" :to="{name: 'players', query:{id: game.id}}" exact)
						v-img.img(:src="game.unselectIcon")
						.label.mt-2(v-text="game.name")
			v-col.services.d-inline-flex(:cols="gameList.filter(({type}) => type === 2).length")
				v-item(v-for="game in gameList.filter(({type}) => type === 2)" :key="game.id")
					router-link.box(:class="{active: game.id === $route.query.id || game.id === search.id}" :to="{name: 'players', query:{id: game.id}}" exact)
						v-img.img(:src="game.unselectIcon")
						.label.mt-2(v-text="game.name")
		v-row.justify-space-between
			v-col.rank.d-inline-flex(:cols="rankList.length + 1")
				v-item
					.box.active 全部
				v-item(v-for="rank in rankList" :key="rank.rankId")
					.box {{rank.rankName}}
			v-col.gender.d-inline-flex(cols="3")
				v-item
					.box.active 全部
				v-item
					.box 男
				v-item
					.box 女
	v-item-group.grid-content(key="content")
		v-item(v-for="player in playerList.list" :key="player.playerNo")
			v-card(hover)
				v-img.hover.white--text.align-end(:src="player.imageUrl[0]" aspect-ratio="1")
					.mask.pa-2(v-text="player.rankName")
				v-card-text.d-flex.justify-space-between
					div.card-title.black--text(v-text="player.nickname")
					b.nowrap.ml-2.black--text.large(v-text="player.gameName")
				v-card-actions
					.voice.brown--text {{player.duration}}s
						svg.icon(aria-hidden="true")
							use(xlink:href="#icon-voice1")
					v-spacer
					.price
						b.red--text {{player.dateMoney}}
						small.red--text 元/每小时
</template>
<script>
import { mapState, mapActions } from 'vuex';

export default {
	name: 'players',
	computed: {
		...mapState('game', ['gameList', 'search', 'rankList']),
		...mapState('player', ['playerList']),
	},
	watch: {
		async $route(now) {
			await this.activeSearch(now.query.id);
			await this.getPlayerList();
			await this.getRankList();
		},
	},
	methods: {
		...mapActions('game', ['getGameList', 'getRankList', 'activeSearch']),
		...mapActions('player', ['getPlayerList']),
	},
	async mounted() {
		await this.getPlayerList();
	},
};
</script>
<style lang="scss" scoped>
#players {
	display: flex;
	flex-direction: column;
	align-items: center;
	padding-bottom: 16px;
	.row::v-deep {
		& + .row {
			margin-top: 10px;
			height: 90px;
		}
	}
}
.header-bars {
	width: 1400px;
	.game {
		border: 2px solid var(--v-primary-base);
		border-radius: 0 50px 0 0;
		position: relative;
		padding: 8px 32px 0 32px;
		.box.active {
			border-color: var(--v-primary-base);
			color: var(--v-primary-darken4);
		}
		&::before {
			content: '游戏服务';
			position: absolute;
			width: 24px;
			height: 100%;
			left: 0;
			top: 0;
			padding: 4px;
			line-height: 1.3;
			text-align: center;
			background-color: var(--v-primary-base);
			color: var(--v-primary-darken4);
		}
	}
	.services {
		border: 2px solid var(--v-accent-base);
		border-radius: 50px 0 0 0;
		position: relative;
		padding: 8px 32px 0 32px;
		.box.active {
			border-color: var(--v-accent-base);
			color: var(--v-accent-darken4);
		}
		&::before {
			content: '娱乐服务';
			position: absolute;
			width: 24px;
			height: 100%;
			right: 0;
			top: 0;
			padding: 4px;
			line-height: 1.3;
			text-align: center;
			background-color: var(--v-accent-base);
			color: var(--v-accent-darken4);
		}
	}
	.rank {
		border: 2px solid var(--v-secondary-base);
		border-radius: 0 0 50px 0;
		position: relative;
		padding: 8px 32px 0 32px;
		.box.active {
			border-color: var(--v-secondary-base);
			color: var(--v-secondary-darken4);
		}
		&::before {
			content: '陪玩段位';
			position: absolute;
			width: 24px;
			height: 100%;
			left: 0;
			top: 0;
			padding: 4px;
			line-height: 1.3;
			text-align: center;
			background-color: var(--v-secondary-base);
			color: var(--v-secondary-darken4);
		}
	}
	.gender {
		border: 2px solid var(--v-info-base);
		border-radius: 0 0 0 50px;
		position: relative;
		padding: 8px 32px 0 32px;
		.box.active {
			border-color: var(--v-info-base);
			color: var(--v-info-darken4);
		}
		&::before {
			content: '陪玩性别';
			position: absolute;
			width: 24px;
			height: 100%;
			right: 0;
			top: 0;
			padding: 4px;
			line-height: 1.3;
			text-align: center;
			background-color: var(--v-info-base);
			color: var(--v-info-darken4);
		}
	}
	.box {
		display: inline-flex;
		align-items: center;
		flex-direction: column;
		justify-content: center;
		flex: 1;
		cursor: pointer;
		color: #999;
		border-left-width: 2px;
		border-top-width: 2px;
		border-right-width: 2px;
		border-bottom-width: 0;
		border-color: transparent;
		border-style: solid;
		border-radius: 15px 15px 0 0;
		& + .box {
			margin-left: 16px;
		}
		.img {
			width: 45px;
			height: 45px;
		}
	}
}
.grid-content {
	width: 1400px;
	display: grid;
	grid-template-columns: repeat(5, 1fr);
	grid-template-rows: repeat(4, 1fr);
	grid-column-gap: 16px;
	grid-row-gap: 16px;
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
</style>
