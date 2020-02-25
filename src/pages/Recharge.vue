<template lang="pug">
#recharge
	v-container(fluid)
		v-btn.wave(fab outlined color="primary")
			v-icon(dark) keyboard_voice
</template>
<script>
export default {
	name: 'Recharge',
};
</script>
<style lang="scss" scoped>
#recharge {
	.container::v-deep {
		height: calc(100vh - 200px);
		display: flex;
		align-items: center;
		justify-content: center;
		background: radial-gradient(
					ellipse at center,
					rgba(123, 0, 199, 0.1) 0,
					rgba(255, 255, 255, 0) 70%
				)
				25% 60px no-repeat,
			radial-gradient(
					ellipse at center,
					rgba(0, 252, 255, 0.1) 0,
					rgba(0, 252, 255, 0) 70%
				)
				75% -130px no-repeat,
			radial-gradient(ellipse at center, #1a2f7d 0, #232b56 100%);
	}
	.wave {
		position: relative;
		&::after {
			content: '';
			border-radius: 50%;
			background-color: var(--v-primary-base);
		}
	}
}
</style>
