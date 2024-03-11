function timer() {
	clock.seconds++;
}
function update() {
    game.clear();
    clock.update();
    background.update();
    noise.update();
    if (game.meta.dark) flashlight.update();
    message.update();
    message.display = false;
    cursor.update();

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
    if (game.level == 1) {
        if (game.scene == 1) {     
            background.image.src = 'public/assets/images/level_1.png';
            l1_s1_cz1.update();
            if (physics.collision(l1_s1_cz1, cursor).any && input.mouse.clicked) {
                game.scene = 2;
            }
        }
        if (game.scene == 2) {
            background.image.src = 'public/assets/images/level_1.1.png';
            l1_s2_cz1.update();
            if (physics.collision(l1_s2_cz1, cursor).any && input.mouse.clicked) {
                game.scene = 1;
            }
        }
    }

    // level 2
    if (game.level == 2) {
        //background.image.src = 'public/assets/images/menu_background.png';
    }
}
