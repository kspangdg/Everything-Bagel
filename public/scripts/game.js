const background = new EB_Sprite({
	position: {
		x: 0,
		y: 0
	},
	angle: 0,
	imageSrc: 'public/assets/images/background.png',
	background: true
});

const player = new EB_Player({
	position: {
		x: 300,
		y: 180
	},
	velocity: {
		x: 0,
		y: 0
	},
	imageSrc: 'public/assets/images/idle_right.png',
	framesMax: 8,
	scale: 2.5,
	offset: {
		x: 220,
		y: 0
	},
	sprites: {
		idle_right: {
			imageSrc: 'public/assets/images/Idle_right.png',
			framesMax: 8
		},
		idle_left: {
			imageSrc: 'public/assets/images/Idle_left.png',
			framesMax: 8
		},
		run_left: {
			imageSrc: 'public/assets/images/RunLeft.png',
			framesMax: 8
		},
		run_right: {
			imageSrc: 'public/assets/images/RunRight.png',
			framesMax: 8
		}
	}
})

const gravity = 0.7;