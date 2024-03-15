function timer() {
	clock.seconds++;
}
function update() {
    game.clear();
    clock.update();
    background.update();
    message.update();
    message.display = false;

    // Update cursor position
    cursor.position.x = input.mouse.x;
    cursor.position.y = input.mouse.y;

    // Update flashlight position
    if (game.meta.dark) {
        flashlight.position.x = input.mouse.x - 1024;
        flashlight.position.y = input.mouse.y - 576;
        if (game.meta.flashlight) {
            flashlight.image.src = 'public/assets/images/flashlight.png';
        } else {
            flashlight.image.src = 'public/assets/images/flashlight_off.png';
            message.display = true;
        }
    }
    //game.meta.dark = true;
    //game.meta.flashlight = true;

    // level 1
    switch (game.level) {
        case 1:
            switch (game.scene) {
                case 1:   
                    background.image.src = 'public/assets/images/level_1.png';
                    l1_s1_cz1.update();
                    if (physics.collision(l1_s1_cz1, cursor).any && input.mouse.clicked) {
                        game.scene_change(2)
                    }
                    break;
                case 2:
                    background.image.src = 'public/assets/images/level_1.1.png';
                    l1_s2_cz1.update();
                    // Back to scene 1
                    if (physics.collision(l1_s2_cz1, cursor).any && input.mouse.clicked) {
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
                        } 
                    }
                    // elevator buttons go
                    elevator_button_go.update();
                    if (physics.collision(elevator_button_go, cursor).any && input.mouse.clicked) {
                        clock.timer_start('elevator_run', 10)

                        // TODO: Check JSON file for elevator location

                        if (game.meta.elevator.x === 0 || game.meta.elevator.y === 0 || game.meta.elevator.z === 0) { //temp
                            elevator_button_go.image.src = 'public/assets/images/elevator_btn_false.png';
                            elevator_message.text = 'false';
                        } else {
                            elevator_button_go.image.src = 'public/assets/images/elevator_btn_true.png';
                            elevator_message.text = 'true';
                            game.meta.elevator.is_location = true;
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
                    break;
            }

            break;
        case 2:
            // level 2
            break;
        default:
            break;
    }

    noise.update();
    if (game.meta.dark) flashlight.update();
    cursor.update();
    input.update();
}
