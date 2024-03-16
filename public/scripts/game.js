// Base config ---------------------------------->
	const menu = new EB_Menu(1024, 576, "public/assets/images/menu_background.png", 'EverythingBagel.js', 'EB_core/assets/img/bagel.png'); // Config Main Menu
	const game = new EB_Game(document.createElement("canvas"), 1024, 576, {
		sanity: 1, 
		dark: false, 
		flashlight: false, 
		noise: false,
		elevator: {x: 0, y: 0, z: 0, is_running: false, is_location: false, level: 0},
	});
	const clock = new EB_Clock(20); // Start clock
	const input = new EB_Input([], true); // Init input
	const music = new EB_Audio('public/assets/audio/l1_bg.mp3', 0.7, true); // Music
	const button_sound = new EB_Audio('public/assets/audio/elevator_btn.mp3', 0.8, false); // Button sound
	const button_sound_true = new EB_Audio('public/assets/audio/elevator_btn_true.mp3', 0.2, false); // Button sound
	const button_sound_false = new EB_Audio('public/assets/audio/elevator_btn_false.mp3', 0.1, false); // Button sound
	const physics = new EB_Physics(); // Init physics
	const cursor = new EB_Sprite({position: {x: 0, y: 0}, size: {w: 5, h: 5}, image_src: 'public/assets/images/cursor.png', collision_box: { active: true, offset: {x: 0, y: 0}, width: 5, height: 5}});
	const flashlight = new EB_Sprite({position: {x: -512, y: -288}, size: {w: 2048, h: 1152}, image_src: 'public/assets/images/flashlight_off.png',});
	const noise = new EB_Sprite({position: {x: 0, y: 0}, size: {w: 1024, h: 576}, image_src: 'public/assets/images/noise.png', frames_max: 4,});
	const background = new EB_Background({position: {x: 0,y: 0}, image_src: 'public/assets/images/level_0.png', loop: false, parallax: 1});
// <---------------------------------- Base config

// level 0 ---------------------------------->
	// Click zones
	const l0_s1_cz1 = new EB_Sprite({ position: {x: 668, y: 225}, size: {w:80, h: 90}, collision_box: { active: true, offset: {x: 0, y: 0}, width: 80, height: 90} });
	const l0_s1_cz2 = new EB_Sprite({ position: {x: 391, y: 147}, size: {w:234, h: 335}, image_src: 'public/assets/images/level_1/elevator_level_1.png', collision_box: { active: true, offset: {x: 0, y: 0}, width: 234, height: 335} });
	const l0_s2_cz1 = new EB_Sprite({ position: {x: 0, y: 0}, size: {w:250, h: 576}, collision_box: { active: true, offset: {x: 0, y: 0}, width: 250, height: 576} });
	// Elevator controls
	let elevator_buttons_x = [];
	let elevator_buttons_x_position = [{x: 446, y: 293}, {x: 498, y: 293}, {x: 552, y: 293}, {x: 604, y: 293}];
	let elevator_buttons_y = [];
	let elevator_buttons_y_position = [{x: 397, y: 245}, {x: 397, y: 193}, {x: 397, y: 140}, {x: 397, y: 87}];
	let elevator_buttons_z = [];
	let elevator_buttons_z_position = [{x: 652, y: 245}, {x: 652, y: 193}, {x: 652, y: 140}, {x: 652, y: 87}];
	for (let index = 0; index < 4; index++) {
		elevator_buttons_x.push(new EB_Sprite({ position: elevator_buttons_x_position[index], size: {w: 37, h: 37}, image_src: 'public/assets/images/elevator_btn.png', collision_box: { active: true, offset: {x: 0, y: 0}, width: 37, height: 37} }));
	}
	for (let index = 0; index < 4; index++) {
		elevator_buttons_y.push(new EB_Sprite({ position: elevator_buttons_y_position[index], size: {w: 37, h: 37}, image_src: 'public/assets/images/elevator_btn.png', collision_box: { active: true, offset: {x: 0, y: 0}, width: 37, height: 37} }));
	}
	for (let index = 0; index < 4; index++) {
		elevator_buttons_z.push(new EB_Sprite({ position: elevator_buttons_z_position[index], size: {w: 37, h: 37}, image_src: 'public/assets/images/elevator_btn.png', collision_box: { active: true, offset: {x: 0, y: 0}, width: 37, height: 37} }));
	}
	const elevator_message = new EB_Text({ position: {x: 601, y: 448}, size: 20, color: 'lightgreen', text: '{x: 0, y: 0, z: 0}' });
	const elevator_button_go = new EB_Sprite({ position: {x: 389, y: 412}, size: {w: 59, h: 59}, image_src: 'public/assets/images/elevator_btn_try.png', collision_box: { active: true, offset: {x: 0, y: 0}, width: 59, height: 59} });
// <---------------------------------- level 0

// level loop ---------------------------------->
	let levels_data = {};
	let levels_index = 0, levels_length = levels.length;
	while (levels_index < levels_length) { // loop levels
		let level_id = levels[levels_index].id;
		let scenes = levels[levels_index].scenes;
		let scenes_index = 0, scenes_length = scenes.length;
		levels_data[level_id] = {};
		while (scenes_index < scenes_length) { // loop scenes
			let scene_id = scenes[scenes_index].id;
			let click_zones = scenes[scenes_index].click_zones;
			let click_zone_index = 0, click_zone_length = click_zones.length;
			levels_data[level_id][scene_id] = {background: scenes[scenes_index].background, click_zones: []};
			while (click_zone_index < click_zone_length) { // loop click zones
				levels_data[level_id][scene_id]['click_zones'].push({
					sprite: new EB_Sprite({position: {x: click_zones[click_zone_index].x, y: click_zones[click_zone_index].y}, size: {w: click_zones[click_zone_index].width, h: click_zones[click_zone_index].height}, image_src: click_zones[click_zone_index].image_src, collision_box: { active: true, offset: {x: 0, y: 0}, width: click_zones[click_zone_index].width, height: click_zones[click_zone_index].height} })
				});
				let actions = click_zones[click_zone_index].actions;
				let click_zone_actions = [];
				let actions_index = 0, actions_length = Object.keys(actions).length;
				while (actions_index < actions_length) { // loop actions
					if (Object.keys(actions)[actions_index] == 'scene_change') {
						let action_function = function(level_id, scene_id, click_zone_index, actions_index) {
							levels_data[game.level][game.scene].click_zones[click_zone_index].sprite.update();
							if (physics.collision(levels_data[game.level][game.scene].click_zones[click_zone_index].sprite, cursor).any && input.mouse.clicked) {
								game.scene_change(levels_data[level_id][scene_id]['click_zones'][click_zone_index].actions[actions_index].data);
							}
						}
						click_zone_actions.push({action:action_function, data: click_zones[click_zone_index].actions.scene_change});
					}
					// play sound
					if (Object.keys(actions)[actions_index] == 'play_sound') {
						levels_data[level_id][scene_id]['click_zones'][click_zone_index]['sound'] = new EB_Audio(actions.play_sound, 1, false);
						let action_function = function(level_id, scene_id, click_zone_index, actions_index) {
							if (physics.collision(levels_data[level_id][scene_id].click_zones[click_zone_index].sprite, cursor).any && input.mouse.clicked) {
								levels_data[level_id][scene_id].click_zones[click_zone_index].sound.play();
							}
						}
						click_zone_actions.push({action:action_function});
					}

					actions_index++
				}
				levels_data[level_id][scene_id]['click_zones'][click_zone_index]['actions'] = click_zone_actions;
				click_zone_index++
			}
			scenes_index++
		}
		levels_index++
	}
// <---------------------------------- level loop

// Main Menu
menu.init();

// Toggle mute
function mute() {
	let audio_button = document.getElementById('audio_btn');
	//let audio_img = audio_button.childNodes[0];
	if (game.mute) {
		game.mute = false
		audio_button.innerHTML = 'Mute';
		//audio_img.src = 'public/assets/images/audio_on.png';
	} else {
		game.mute = true;
		audio_button.innerHTML = 'Unmute';
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