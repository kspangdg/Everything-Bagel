function update() {
    game.clear();
    background.update();
    midground.update();
    forground.update();
    banner.update();
    player.update();
    enemy.update();
    

    // Player
    player.velocity.x = 0

    // Run
    if (input.keys.ArrowLeft.pressed) {
        if (player.position.x >= 0 + (player.width / player.framesMax) + 350) {
            player.velocity.x = -8;
        } else { 
            background.position.x += 2;
            midground.position.x += 4;
            forground.position.x += 8;
            enemy.position.x += 8;
        }
        // flip
        player.flip = true;
        player.switchSprite('run_left');
    } else if (input.keys.ArrowRight.pressed) {
        if (player.position.x <= game.canvas.width - (player.width / player.framesMax) - 350) {
            player.velocity.x = 8;
        } else {
            background.position.x -= 2;
            midground.position.x -= 4;
            forground.position.x -= 8;
            enemy.position.x -= 8;
        }
        // flip
        player.flip = false;
        player.switchSprite('run_right');
    } else {
        player.switchSprite('idle' + (player.flip ? '_left' : '_right'));
    }

    // Jump
    if (input.keys.ArrowUp.pressed && !player.jump && !player.fall) {
        player.jump = true;
    }
    if (player.jump && player.position.y < 25) {
        player.jump = false;
        player.fall = true;
    }
    if (player.fall && player.position.y >= 240) {
        player.fall = false;
    }
    if (player.jump) {
        player.velocity.y = -20;
        player.switchSprite('Jump' + (player.flip ? '_left' : '_right'));
    } else if (player.fall) {
        player.velocity.y = 10;
        player.switchSprite('Fall' + (player.flip ? '_left' : '_right'));
    } else {
        player.velocity.y = 0;
    }

    // Enemy
    enemy.velocity.x = 0

    // Run
    if (player.position.x + 75 < enemy.position.x) {
        enemy.velocity.x = -6;
        // flip
        enemy.flip = true;
        enemy.switchSprite('run_left');
    } else if (player.position.x - 75 > enemy.position.x) {
        enemy.velocity.x = 6;
        // flip
        enemy.flip = false;
        enemy.switchSprite('run_right');
    } else {
        enemy.switchSprite('idle' + (enemy.flip ? '_left' : '_right'));
    }
}