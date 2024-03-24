function timer() {
	clock.seconds++;
}
function update() {
    game.clear();
    clock.update();
    background.update();
    // Update cursor position
    cursor.position.x = input.mouse.x;
    cursor.position.y = input.mouse.y;

    game.meta.has_flashlight = true;

    //game.level = 2;

    /*
    * LEVELS
    */

    let level_break = false;
     // level 0 ---------------------------------->
    if (game.level === 0 && !level_break && !game.meta.notes_open) {
        game.meta.dark = false;
        game.meta.noise = false;
        if (game.scene === 1) { 
                background.image.src = 'public/assets/images/level_0.png';
                l0_s1_cz1.update();
                if (physics.collision(l0_s1_cz1, cursor).any && input.mouse.clicked) {
                    game.scene_change(2);
                }
                l0_s1_cz2.update();
                if (physics.collision(l0_s1_cz2, cursor).any && input.mouse.clicked && game.meta.elevator.level > 0) {
                    game.level_change(game.meta.elevator.level);
                    game.scene_change(1);
                }
        } else if (game.scene === 2) {
            background.image.src = 'public/assets/images/level_0.1.png';
            l0_s2_cz1.update();
            // Back to scene 1
            if (physics.collision(l0_s2_cz1, cursor).any && input.mouse.clicked) {
                game.scene_change(1);
            }
            /*
            * ELEVATOR
            */
            // elevator display
            elevator_message.display = true;
            elevator_message.update();
            if (!game.meta.elevator.is_running) elevator_message.text = '{x: ' + game.meta.elevator.x + ', y: ' + game.meta.elevator.y + ', z: ' + game.meta.elevator.z + '}';

            // elevator buttons x
            for (let index = 0; index < elevator_buttons_x.length; index++) {
                elevator_buttons_x[index].update();
                if (index + 1 == game.meta.elevator.x) {
                    elevator_buttons_x[index].image.src = 'public/assets/images/elevator_btn_active.png';
                } else {
                    elevator_buttons_x[index].image.src = 'public/assets/images/elevator_btn.png';
                }
                if (physics.collision(elevator_buttons_x[index], cursor).any && input.mouse.clicked) {
                    game.meta.elevator.x = index + 1;
                    button_sound.play(true);
                } 
            }

            // elevator buttons y
            for (let index = 0; index < elevator_buttons_y.length; index++) {
                elevator_buttons_y[index].update();
                if (index + 1 == game.meta.elevator.y) {
                    elevator_buttons_y[index].image.src = 'public/assets/images/elevator_btn_active.png';
                } else {
                    elevator_buttons_y[index].image.src = 'public/assets/images/elevator_btn.png';
                }
                if (physics.collision(elevator_buttons_y[index], cursor).any && input.mouse.clicked) {
                    game.meta.elevator.y = index + 1;
                    button_sound.play(true);
                } 
            }
            // elevator buttons z
            for (let index = 0; index < elevator_buttons_z.length; index++) {
                elevator_buttons_z[index].update();
                if (index + 1 == game.meta.elevator.z) {
                    elevator_buttons_z[index].image.src = 'public/assets/images/elevator_btn_active.png';
                } else {
                    elevator_buttons_z[index].image.src = 'public/assets/images/elevator_btn.png';
                }
                if (physics.collision(elevator_buttons_z[index], cursor).any && input.mouse.clicked) {
                    game.meta.elevator.z = index + 1;
                    button_sound.play(true);
                } 
            }
            // elevator buttons go
            elevator_button_go.update();
            if (physics.collision(elevator_button_go, cursor).any && input.mouse.clicked) {
                clock.timer_start('elevator_run', 10)

                // TODO: Make function to check JSON file for matching coordinates
                let levels_index = 0, levels_length = Object.keys(levels_data).length;
                while (levels_index < levels_length) {
                    let code = levels[levels_index].code;
                    if (game.meta.elevator.x === code.x && game.meta.elevator.y === code.y && game.meta.elevator.z === code.z) { // if location is found
                        game.meta.elevator.level = levels[levels_index].id;
                        l0_s1_cz2.image.src = 'public/assets/images/' + levels[levels_index].slug + '/elevator_view_' + levels[levels_index].slug + '.png';
                        elevator_button_go.image.src = 'public/assets/images/elevator_btn_true.png';
                        elevator_message.text = 'true';
                        button_sound_true.play(true);
                        game.meta.elevator.is_location = true;
                    }
                    levels_index++;
                }   
                if (!game.meta.elevator.is_location) { // if location is not found
                    elevator_button_go.image.src = 'public/assets/images/elevator_btn_false.png';
                    elevator_message.text = 'false';
                    button_sound_false.play(true);
                }
                game.meta.elevator.is_running = true;
            }
            if (game.meta.elevator.is_running && clock.timer_end('elevator_run')) {
                if (game.meta.elevator.is_location) {
                    game.scene_change(1);
                    game.meta.elevator.is_location = false;
                }
                game.meta.elevator.x = 0;
                game.meta.elevator.y = 0;
                game.meta.elevator.z = 0;
                elevator_button_go.image.src = 'public/assets/images/elevator_btn_try.png';
                game.meta.elevator.is_running = false;
            }
        }
        level_break = true;
    } // <---------------------------------- level 0

    // level loop ---------------------------------->
    let levels_index = 0, levels_length = Object.keys(levels_data).length;
    while (levels_index < levels_length) {
        if (game.level === levels_index + 1 && !level_break && !game.meta.notes_open) {
            game.meta.dark = levels[levels_index].darkness;
            game.meta.noise = levels[levels_index].noises;
            let scene_break = false;
            let scenes = levels_data[game.level];
            let scenes_index = 0, scenes_length = Object.keys(scenes).length;
            while (scenes_index < scenes_length) {
                if (game.scene == scenes_index + 1 && !scene_break) {
                    background.image.src = levels_data[game.level][game.scene].background;
                    let click_zone_index = 0, click_zone_length = levels_data[game.level][game.scene].click_zones.length;
                    while (click_zone_index < click_zone_length) {
                        let actions = levels_data[game.level][game.scene].click_zones[click_zone_index].actions;
                        let actions_index = 0, actions_length = actions.length;
                        while (actions_index < actions_length) {
                            if (actions[actions_index].action !== undefined) actions[actions_index].action(levels_data[game.level].slug, game.level, game.scene, click_zone_index, actions_index);
                            actions_index++;
                        }
                        click_zone_index++;
                    }
                    scene_break = true;
                }
                scenes_index++;
            }
            level_break = true;
        }
        levels_index++;
    } // <---------------------------------- level loop

    if (game.meta.noise) noise.update();
    // Update flashlight position
    if (game.meta.dark) {
        flashlight.position.x = input.mouse.x - 1024;
        flashlight.position.y = input.mouse.y - 576;
        if (game.meta.flashlight) {
            flashlight.image.src = 'public/assets/images/flashlight.png';
        } else {
            flashlight.image.src = 'public/assets/images/flashlight_off.png';
        }
        flashlight.update();
    }
    //toggle flashlight if flashlight icon is clicked and user has flashlight
    if (game.meta.has_flashlight) flashlight_icon.update();
    if (physics.collision(flashlight_icon, cursor).any && input.mouse.clicked) {
        flashlight_sound.play(true);
        if (game.meta.flashlight) {
            game.meta.flashlight = false;
            flashlight_icon.image.src = 'public/assets/images/flashlight_icon.png';
        } else {
            game.meta.flashlight = true;
            flashlight_icon.image.src = 'public/assets/images/flashlight_icon_on.png';
        }
    }
    //notes 
    notes_icon.update();
    if (physics.collision(notes_icon, cursor).any && input.mouse.clicked) {
        notes_sound.play(true);
        if (game.meta.notes_open) {
            game.meta.notes_open = false;
            notes_icon.image.src = 'public/assets/images/notes_icon.png';
        } else {
            game.meta.notes_open = true;
            notes_icon.image.src = 'public/assets/images/notes_icon_open.png';
        }
    }
    if (game.meta.notes_open) {
        background.image.src = 'public/assets/images/notes_bg.png';
    }
    cursor.update();
    input.update();
}
