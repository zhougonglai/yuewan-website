<template lang="pug">
	v-app
		.app-header(app)
			.app-header-content
				img.logo(:src="require('@assets/img/head-logo.png')")
				.app-header-content-nav NN
				.app-header-content-nav NN加速器
				.app-header-content-nav N站
				.app-header-content-nav.active NN约玩
				v-spacer
				.app-header-user
					.login 登录
					div |
					.register 注册
				.app-header-menu-item 关于雷神
				.app-header-menu-item 商家服务
				.app-header-menu-item 简体中文
		.prominent
			.prominent-content
				.prominent-content-item 首页
				.prominent-content-item 约玩
				.prominent-content-item 充值
				v-spacer
					.search-bar
				.prominent-content-item 消息
				button.app-btn.rounded.outlined.dark.ml-5 陪玩申请入驻
		v-content#scrolling-techniques.overflow-y-auto
			router-view
</template>
<script>
export default {
	name: 'default',
	data() {
		return {
			bottomNav: 3,
		};
	},
};
</script>
<style lang="scss" scoped>
.app-header {
	height: 80px;
	width: 100vw;
	background-color: #222;
	display: flex;
	align-items: stretch;
	justify-content: center;
	&-content {
		width: 1400px;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #999;
		.logo {
			margin-right: 50px;
		}
		&-nav {
			line-height: 80px;
			position: relative;
			font-size: 16px;
			padding: 0 32px;
			cursor: pointer;
			transition: color 0.25s linear;
			will-change: color;
			display: flex;
			align-items: center;
			justify-content: center;
			&::after {
				content: '';
				position: absolute;
				bottom: 0;
				width: 0;
				height: 4px;
				transition: width 0.25s linear;
				will-change: width;
				background-color: var(--v-primary-base);
			}
			&.active {
				&::after {
					width: 38%;
				}
			}
			&::before {
				content: '';
				text-align: center;
				position: absolute;
				transition: box-shadow 0.25s linear;
				will-change: box-shadow;
				box-shadow: 0 0 0 0 rgba(142, 76, 252, 0);
			}
			&:hover,
			&.active {
				color: var(--v-primary-base);
				&::before {
					box-shadow: 0 0 40px 32px rgba(142, 76, 252, 0.35);
				}
			}
		}
	}
	&-user {
		color: #999;
		display: inline-flex;
		align-items: center;
		.login,
		.register {
			padding: 8px 16px;
			cursor: pointer;
			&:hover {
				color: var(--v-primary-base);
			}
		}
	}
	&-menu-item {
		color: #666;
		cursor: pointer;
		padding: 8px 16px;
		&:hover {
			color: var(--v-primary-base);
		}
	}
}
.prominent {
	height: 60px;
	width: 100vw;
	background-color: #303030;
	display: flex;
	align-items: stretch;
	justify-content: center;
	&-content {
		padding-left: 215px;
		width: 1400px;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		&-item {
			color: #999;
			padding: 0 16px;
			cursor: pointer;
			&:hover {
				color: var(--v-primary-base);
			}
			& + .prominent-content-item {
				margin-left: 16px;
			}
		}
	}
}
#scrolling-techniques {
	background-image: url('https://www.nn.com/_nuxt/img/a642a1a.png');
}
</style>
