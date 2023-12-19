const background = new EB_Sprite({
	position: {
		x: 0,
		y: 0
	},
	angle: 0,
	imageSrc: 'public/assets/images/background.png'
});

const player = new EB_Player({
	position: {
		x: 200,
		y: 0
	},
	velocity: {
		x: 0,
		y: 0
	},
	offset: {
		x: 0,
		y: 0
	},
	imageSrc: 'public/assets/images/idle.png',
	framesMax: 8,
	scale: 2.5,
	offset: {
		x: 0,
		y: 0
	},
	sprites: {
		idle: {
			imageSrc: 'public/assets/images/Idle.png',
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

const keys = {
	ArrowRight: {
		pressed: false
	},
	ArrowLeft: {
		pressed: false
	}
}

const gravity = 0.7;