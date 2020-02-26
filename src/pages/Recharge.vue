<template lang="pug">
#recharge
	v-container(fluid)
		v-menu
			template(v-slot:activator="{ on }")
				v-btn.setting(fab dark icon text absolute v-on="on")
					v-icon settings
			v-list
				v-list-item-group(v-model="device.deviceId")
					v-list-item(v-for="device in devices.filter(device => device.kind === 'audioinput')" :key="device.deviceId" :value="device.deviceId")
						v-list-item-title {{device.label}}
		canvas#draw(ref="draw")
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
analyser.minDecibels = -90;
analyser.maxDecibels = -10;
analyser.smoothingTimeConstant = 0.85;
const distortion = audioContext.createWaveShaper();
const gainNode = audioContext.createGain();
const biquadFilter = audioContext.createBiquadFilter();
const convolver = audioContext.createConvolver();

export default {
	name: 'Recharge',
	data() {
		return {
			devices: [],
			device: {},
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
				this.loading = false;
				this.recording = true;
				const audioTracks = this.stream.getAudioTracks();
				this.microphone = new MediaRecorder(this.stream);
				this.microphone.start();
				this.visualize();
				this.microphone.addEventListener('dataavailable', ev => {
					const file = URL.createObjectURL(ev.data);
					this.audios.push(file);
					audioTracks[0].stop();
				});
			}
		},
		visualize() {
			this.source = audioContext.createMediaStreamSource(this.stream);
			this.source.connect(analyser);
			analyser.connect(distortion);
			distortion.connect(biquadFilter);
			biquadFilter.connect(gainNode);
			convolver.connect(gainNode);
			gainNode.connect(audioContext.destination);
			this.draw();
		},
		draw() {
			this.$nextTick(() => {
				const { width, height } = this.$refs.draw;
				const canvasCtx = this.$refs.draw.getContext('2d');
				canvasCtx.clearRect(0, 0, width, height);
				window.requestAnimationFrame(this.draw);
				const dataArray = new Uint8Array(analyser.fftSize);
				analyser.getByteTimeDomainData(dataArray);

				canvasCtx.fillStyle = 'transparent';
				canvasCtx.fillRect(0, 0, width, height);
				canvasCtx.lineWidth = 1;
				// canvasCtx.globalAlpha = 0.5;
				canvasCtx.strokeStyle = 'rgb(255, 211, 62)'; // rgb(0, 0, 0)
				canvasCtx.beginPath();

				const sliceWidth = (width * 1) / analyser.fftSize;
				let x = 0;
				for (let i = 0; i < analyser.fftSize; i++) {
					const v = dataArray[i] / 128.0;
					const y = (v * height) / 2;
					if (i === 0) {
						canvasCtx.moveTo(x, y);
					} else {
						canvasCtx.lineTo(x, y);
					}

					x += sliceWidth;
				}

				canvasCtx.lineTo(width, height / 2);
				canvasCtx.stroke();
			});
		},
	},
	async mounted() {
		this.devices = await navigator.mediaDevices.enumerateDevices();
		this.device = this.devices.find(device => device.deviceId === 'default');
	},
};
</script>
<style lang="scss" scoped>
#recharge {
	.container::v-deep {
		height: 450px;
		// height: calc(100vh - 200px);
		display: flex;
		flex-direction: column;
		position: relative;
		align-items: center;
		justify-content: space-around;
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
		.file {
			& + .file {
				margin-left: 16px;
			}
		}
	}
}
#draw {
	position: absolute;
	bottom: 0;
	left: 25vw;
	width: 50vw;
	height: 50px;
	&::before {
		content: '•••';
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%) rotate(90deg);
		color: white;
		font-size: 12px;
		letter-spacing: 2px;
		margin-top: 0;
	}
}
</style>
