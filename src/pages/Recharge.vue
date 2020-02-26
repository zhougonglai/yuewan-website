<template lang="pug">
#recharge
	v-container(fluid)
		v-menu
			template(v-slot:activator="{ on }")
				v-btn.setting(fab dark icon text absolute v-on="on")
					v-icon settings
			v-list
				v-list-item(v-for="device in devices.filter(device => device.kind === 'audioinput')" :key="device.groupId")
					v-list-item-title {{device.label}}
		v-btn.wave(fab outlined color="primary" :loading="loading" @click="recordingAction")
			v-icon(dark v-if="recording") stop
			v-icon(dark v-else) keyboard_voice
	.files(v-if="audios.length")
		.file(v-for="(audio, i) in audios" :key="i")
			audio(controls :src="audio")
</template>
<script>
const audioContext = new AudioContext();
const analyser = audioContext.createAnalyser();
const waveShaper = audioContext.createWaveShaper();
const gain = audioContext.createGain();
const biquadFilter = audioContext.createBiquadFilter();

export default {
	name: 'Recharge',
	data() {
		return {
			devices: [],
			recording: false,
			loading: false,
			stream: null,
			microphone: null,
			source: null,
			audios: [],
		};
	},
	methods: {
		async recordingAction() {
			if (this.recording) {
				this.microphone.stop();
				// this.microphone.requestData();
				this.recording = false;
			} else {
				this.loading = true;
				this.stream = await navigator.mediaDevices.getUserMedia({
					audio: true,
				});
				this.microphone = new MediaRecorder(this.stream);
				this.source = audioContext.createMediaStreamSource(this.stream);
				this.source.connect(analyser);
				analyser.connect(waveShaper);
				waveShaper.connect(biquadFilter);
				biquadFilter.connect(gain);
				gain.connect(audioContext.destination);
				console.log('source', this.source);
				this.microphone.start();
				this.loading = false;
				this.recording = true;
				this.microphone.addEventListener('dataavailable', ev => {
					const file = URL.createObjectURL(ev.data);
					console.log('file', file);
					this.audios.push(file);
				});
			}
		},
	},
	async mounted() {
		this.devices = await navigator.mediaDevices.enumerateDevices();
		console.log(this.devices);
	},
};
</script>
<style lang="scss" scoped>
#recharge {
	.container::v-deep {
		height: 450px;
		// height: calc(100vh - 200px);
		display: flex;
		position: relative;
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
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			opacity: 0.2;
			animation: wave 625ms linear infinite alternate;
		}
	}

	.setting {
		bottom: 15px;
		right: 15px;
	}

	.files {
		position: absolute;
		bottom: 0;
		width: 100vw;
		/* height: 12vh; */
		backdrop-filter: blur(11px);
		background-color: rgba(22, 22, 22, 0.75) !important;
		display: flex;
		align-items: center;
		padding: 16px;
		& + .file {
			margin-left: 16px;
		}
	}
}
</style>
