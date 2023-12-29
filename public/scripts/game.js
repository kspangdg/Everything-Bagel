// Config Canvas
const game = new EB_Config(document.createElement("canvas"), 1024, 576, 20);
// Update clock
function clock() { game.clock++ }

const background = new EB_Background({
	position: {
		x: 0,
		y: 0
	},
	imageSrc: 'public/assets/images/background.png',
	loop: true,
});
const midground = new EB_Background({
	position: {
		x: 0,
		y: 0
	},
	imageSrc: 'public/assets/images/midground.png',
	loop: true,
});
const forground = new EB_Background({
	position: {
		x: 0,
		y: 0
	},
	imageSrc: 'public/assets/images/forground.png',
	loop: true,
});

const banner = new EB_Sprite({
	position: {
		x: (game.width / 2) - 300,
		y: 24
	},
	width: 50,
	height: 150,
	imageSrc: 'public/assets/images/banner.png',
	scale: 2
})

const player = new EB_Player({
	position: {
		x: 350,
		y: 240
	},
	width: 50,
	height: 150,
	velocity: {
		x: 0,
		y: 0
	},
	imageSrc: 'public/assets/images/idle_right.png',
	framesMax: 8,
	scale: 2,
	offset: {
		x: 0,
		y: 0
	},
	collisionBox: {
		offset: {x: 150, y: 150},
		width: 70,
		height: 90
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
		},
		Jump_left: {
			imageSrc: 'public/assets/images/Jump_left.png',
			framesMax: 2
		},
		Jump_right: {
			imageSrc: 'public/assets/images/Jump_right.png',
			framesMax: 2
		},
		Fall_left: {
			imageSrc: 'public/assets/images/Fall_left.png',
			framesMax: 2
		},
		Fall_right: {
			imageSrc: 'public/assets/images/Fall_right.png',
			framesMax: 2
		},
		Attack_left: {
			imageSrc: 'public/assets/images/Attack_left.png',
			framesMax: 6
		},
		Attack_right: {
			imageSrc: 'public/assets/images/Attack_right.png',
			framesMax: 6
		}
	}
})

const enemy = new EB_Player({
	position: {
		x: game.width,
		y: 240
	},
	width: 50,
	height: 150,
	velocity: {
		x: 0,
		y: 0
	},
	imageSrc: 'public/assets/images/idle_right.png',
	framesMax: 8,
	scale: 2,
	offset: {
		x: 0,
		y: 0
	},
	collisionBox: {
		offset: {x: 150, y: 150},
		width: 70,
		height: 90
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
		},
		Jump_left: {
			imageSrc: 'public/assets/images/Jump_left.png',
			framesMax: 2
		},
		Jump_right: {
			imageSrc: 'public/assets/images/Jump_right.png',
			framesMax: 2
		},
		Fall_left: {
			imageSrc: 'public/assets/images/Fall_left.png',
			framesMax: 2
		},
		Fall_right: {
			imageSrc: 'public/assets/images/Fall_right.png',
			framesMax: 2
		},
		Attack_left: {
			imageSrc: 'public/assets/images/Attack_left.png',
			framesMax: 6
		},
		Attack_right: {
			imageSrc: 'public/assets/images/Attack_right.png',
			framesMax: 6
		}
	}
})

const input = new EB_Input([ "ArrowLeft", "ArrowRight", "ArrowUp", "Space"], false);

// Start the game
function init() {
    game.start();
}