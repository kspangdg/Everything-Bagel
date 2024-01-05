// Config Canvas
const game = new EB_Config(document.createElement("canvas"), 1024, 576, 20);
// Update clock
function clock() { game.clock++ }

// Music
const music = new EB_Audio('public/assets/audio/EB_soundtrack.mp3', 0.9, true);

// Sounds
const attack = new EB_Audio('public/assets/audio/attack.mp3' , 0.8, false);
const eattack = new EB_Audio('public/assets/audio/eattack.mp3', 0.8, false);
const run = new EB_Audio('public/assets/audio/run.mp3', 0.3, true);
const erun = new EB_Audio('public/assets/audio/erun.mp3', 0.5, true);

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
		x: -600,
		y: 0
	},
	imageSrc: 'public/assets/images/forground.png',
	loop: false,
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
		y: 295
	},
	width: 50,
	height: 150,
	velocity: {
		x: 0,
		y: 0
	},
	imageSrc: 'public/assets/images/idle_right.png',
	framesMax: 8,
	scale: 1,
	offset: {
		x: 0,
		y: 0
	},
	collisionBox: {
		offset: {x: 140, y: 125},
		width: 80,
		height: 100
	},
	hitBox: {
		offset: {x: 15, y: 130},
		width: 120,
		height: 90
	},
	sprites: {
		idle_right: {
			imageSrc: 'public/assets/images/idle_right.png',
			framesMax: 8
		},
		idle_left: {
			imageSrc: 'public/assets/images/idle_left.png',
			framesMax: 8
		},
		run_left: {
			imageSrc: 'public/assets/images/run_left.png',
			framesMax: 8
		},
		run_right: {
			imageSrc: 'public/assets/images/run_right.png',
			framesMax: 8
		},
		Jump_left: {
			imageSrc: 'public/assets/images/jump_left.png',
			framesMax: 2
		},
		jump_right: {
			imageSrc: 'public/assets/images/jump_right.png',
			framesMax: 2
		},
		Fall_left: {
			imageSrc: 'public/assets/images/fall_left.png',
			framesMax: 2
		},
		Fall_right: {
			imageSrc: 'public/assets/images/fall_right.png',
			framesMax: 2
		},
		attack_left: {
			imageSrc: 'public/assets/images/attack_left.png',
			framesMax: 6
		},
		attack_right: {
			imageSrc: 'public/assets/images/attack_right.png',
			framesMax: 6
		},
		dead_left: {
			imageSrc: 'public/assets/images/dead_left.png',
			framesMax: 6
		},
		dead_right: {
			imageSrc: 'public/assets/images/dead_right.png',
			framesMax: 6
		}
	}
})

const enemy = new EB_Player({
	position: {
		x: game.width + 300,
		y: 300
	},
	width: 50,
	height: 150,
	velocity: {
		x: 0,
		y: 0
	},
	imageSrc: 'public/assets/images/eidle_right.png',
	framesMax: 8,
	scale: 1,
	offset: {
		x: 0,
		y: 0
	},
	collisionBox: {
		offset: {x: 120, y: 120},
		width: 115,
		height: 95
	},
	sprites: {
		idle_right: {
			imageSrc: 'public/assets/images/eidle_right.png',
			framesMax: 8
		},
		idle_left: {
			imageSrc: 'public/assets/images/eidle_left.png',
			framesMax: 8
		},
		run_left: {
			imageSrc: 'public/assets/images/erun_left.png',
			framesMax: 8
		},
		run_right: {
			imageSrc: 'public/assets/images/erun_right.png',
			framesMax: 8
		},
		Jump_left: {
			imageSrc: 'public/assets/images/jump_left.png',
			framesMax: 2
		},
		Jump_right: {
			imageSrc: 'public/assets/images/jump_right.png',
			framesMax: 2
		},
		Fall_left: {
			imageSrc: 'public/assets/images/fall_left.png',
			framesMax: 2
		},
		Fall_right: {
			imageSrc: 'public/assets/images/fall_right.png',
			framesMax: 2
		},
		attack_left: {
			imageSrc: 'public/assets/images/eattack_left.png',
			framesMax: 6
		},
		attack_right: {
			imageSrc: 'public/assets/images/eattack_right.png',
			framesMax: 6
		},
		dead_left: {
			imageSrc: 'public/assets/images/dead_left.png',
			framesMax: 6
		},
		dead_right: {
			imageSrc: 'public/assets/images/dead_right.png',
			framesMax: 6
		}
	}
})

const input = new EB_Input([ "ArrowLeft", "ArrowRight", "ArrowUp", "Space"], false);

// Start the game
function init() {
	document.getElementById('play_btn').remove();
	game.start();
	music.play();
}