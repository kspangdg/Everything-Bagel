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
    if (!input.keys.ArrowLeft.pressed && !input.keys.ArrowRight.pressed && !player.jump && !player.fall && !player.attack) {
        player.switchSprite('idle' + (player.flip ? '_left' : '_right'));
    }

    // Run
    if (input.keys.ArrowLeft.pressed && !player.attack) {
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
    } else if (input.keys.ArrowRight.pressed && !player.attack) {
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
    }

    // Jump
    if (input.keys.ArrowUp.pressed && !player.jump && !player.fall && !player.attack) {
        player.jump = true;
    }
    if (player.jump && player.position.y < 25) {
        player.jump = false;
        player.fall = true;
    }
    if (player.fall && player.collisionBox.bottom >= 465) {
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

    if (input.keys.Space.pressed && !player.jump && !player.fall) {
        player.attack = true;
        player.framesElapsed = 0;
    }
    if (player.attack) {
        //player.velocity.x = 0;
        player.switchSprite('Attack' + (player.flip ? '_left' : '_right'));
        if (player.framesElapsed == 30) {
            player.attack = false;
        }
    }


    // Enemy
    enemy.velocity.x = 0

    // Run
    if (game.clock > 3) {
        if (player.collisionBox.right < enemy.collisionBox.left) {
            enemy.velocity.x = -6;
            // flip
            enemy.flip = true;
            enemy.switchSprite('run_left');
        } else if (player.collisionBox.left > enemy.collisionBox.right) {
            enemy.velocity.x = 6;
            // flip
            enemy.flip = false;
            enemy.switchSprite('run_right');
        } else {
            if (player.jump || player.fall) {
                enemy.switchSprite('idle' + (enemy.flip ? '_left' : '_right'))
            } else {
                enemy.switchSprite('Attack' + (enemy.flip ? '_left' : '_right'));
            }
        }
    }
}