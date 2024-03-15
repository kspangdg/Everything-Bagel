const menu = new EB_Menu(1024, 576, "public/assets/images/menu_background.png", 'EverythingBagel.js', 'EB_core/assets/img/bagel.png'); // Config Main Menu
const game = new EB_Game(document.createElement("canvas"), 1024, 576, {
	sanity: 1, 
	dark: false, 
	flashlight: false, 
	noise: false,
	elevator: {x: 0, y: 0, z: 0, is_running: false, is_location: false},
});
const clock = new EB_Clock(20); // Start clock
const input = new EB_Input([], true); // Init input
const music = new EB_Audio('public/assets/audio/l1_bg.mp3', 0.5, true); // Music
const physics = new EB_Physics(); // Init physics

const cursor = new EB_Sprite({
	position: {
		x: 0,
		y: 0
	},
	size: {
		w: 5,
		h: 5
	},
	image_src: 'public/assets/images/cursor.png',
	collision_box: {
		active: true,
		offset: {
			x: 0,
			y: 0
		},
		width: 5,
		height: 5
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

let elevator_buttons_x = [];
let elevator_buttons_x_position = [{x: 446, y: 293}, {x: 498, y: 293}, {x: 552, y: 293}, {x: 604, y: 293}];
let elevator_buttons_y = [];
let elevator_buttons_y_position = [{x: 397, y: 245}, {x: 397, y: 193}, {x: 397, y: 140}, {x: 397, y: 87}];
let elevator_buttons_z = [];
let elevator_buttons_z_position = [{x: 652, y: 245}, {x: 652, y: 193}, {x: 652, y: 140}, {x: 652, y: 87}];

// Elevator x
for (let index = 0; index < 4; index++) {
	elevator_buttons_x.push(new EB_Sprite({ position: elevator_buttons_x_position[index], size: {w: 37, h: 37}, image_src: 'public/assets/images/elevator_btn.png', collision_box: { active: true, offset: {x: 0, y: 0}, width: 37, height: 37} }));
}
// Elevator y
for (let index = 0; index < 4; index++) {
	elevator_buttons_y.push(new EB_Sprite({ position: elevator_buttons_y_position[index], size: {w: 37, h: 37}, image_src: 'public/assets/images/elevator_btn.png', collision_box: { active: true, offset: {x: 0, y: 0}, width: 37, height: 37} }));
}
// Elevator z
for (let index = 0; index < 4; index++) {
	elevator_buttons_z.push(new EB_Sprite({ position: elevator_buttons_z_position[index], size: {w: 37, h: 37}, image_src: 'public/assets/images/elevator_btn.png', collision_box: { active: true, offset: {x: 0, y: 0}, width: 37, height: 37} }));
}
const elevator_message = new EB_Text({ position: {x: 601, y: 448}, size: 20, color: 'lightgreen', text: '{x: 0, y: 0, z: 0}' });
const elevator_button_go = new EB_Sprite({ position: {x: 389, y: 412}, size: {w: 59, h: 59}, image_src: 'public/assets/images/elevator_btn_try.png', collision_box: { active: true, offset: {x: 0, y: 0}, width: 59, height: 59} });

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
	menu.hide();
	clock.start();
	game.start();
	music.play();
}