const menu = new EB_Menu(1024, 576, "public/assets/images/menu_background.png", 'EverythingBagel.js', 'EB_core/assets/img/bagel.png'); // Config Main Menu
const game = new EB_Config(document.createElement("canvas"), 1024, 576, {sanity: 1, dark: false, flashlight: false, noise: false}); // Config Canvas
const clock = new EB_Clock(20); // Start clock
const input = new EB_Input([], true); // Init input
const music = new EB_Audio('public/assets/audio/EB_soundtrack.mp3', 0.9, true); // Music
const physics = new EB_Physics(); // Init physics

const cursor = new EB_Sprite({
	position: {
		x: 0,
		y: 0
	},
	size: {
		w: 10,
		h: 10
	},
	image_src: 'public/assets/images/cursor.png',
	collision_box: {
		active: true,
		offset: {
			x: 0,
			y: 0
		},
		width: 10,
		height: 10
	}
});

const flashlight = new EB_Sprite({
	position: {
		x: -512,
		y: -288
	},
	size: {
		w: 2048,
		h: 1152
	},
	image_src: 'public/assets/images/flashlight_off.png',
});

const noise = new EB_Sprite({
	position: {
		x: 0,
		y: 0
	},
	size: {
		w: 1024,
		h: 576
	},
	image_src: 'public/assets/images/noise.png',
	frames_max: 4,
});

const background = new EB_Background({
	position: {
		x: 0,
		y: 0
	},
	image_src: 'public/assets/images/level_1.png',
	loop: false,
	parallax: 1
});

const message = new EB_Text({ position: {x: 512, y: 550}, size: 16, color: 'white', text: 'It is dark in here. If only I had a flashlight...' });

// level 1
const l1_s1_cz1 = new EB_Sprite({ position: {x: 668, y: 225}, size: {w:80, h: 90}, collision_box: { active: true, offset: {x: 0, y: 0}, width: 80, height: 90} });
const l1_s2_cz1 = new EB_Sprite({ position: {x: 0, y: 0}, size: {w:250, h: 576}, collision_box: { active: true, offset: {x: 0, y: 0}, width: 250, height: 576} });


// Main Menu
menu.init();

// Toggle mute
function mute() {
	let audio_button = document.getElementById('audio_btn');
	let audio_img = audio_button.childNodes[0];
	if (game.mute) {
		game.mute = false
		//audio_img.src = 'public/assets/images/audio_on.png';
	} else {
		game.mute = true;
		//audio_img.src = 'public/assets/images/audio_off.png';
	}
}

// Start the game
function init() {
	game.mute = true;
	menu.hide();
	clock.start();
	game.start();
	music.play();
}