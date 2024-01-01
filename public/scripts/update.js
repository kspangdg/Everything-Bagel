function update() {
    game.clear();
    background.update();
    midground.update();
    forground.update();
    //banner.update();
    enemy.update();
    player.update();
    

    // Player
    if (player.health > 0) {
        player.velocity.x = 0
        if (!input.keys.ArrowLeft.pressed && !input.keys.ArrowRight.pressed && !player.jump && !player.fall && !player.attack) {
            player.switchSprite('idle' + (player.flip ? '_left' : '_right'));
        }
    
        // Run
        if (input.keys.ArrowLeft.pressed && !player.attack && !player.dead) {
            if (player.collisionBox.left >= 350) {
                player.velocity.x = -8;
            } else { 
                if (forground.position.x < -240) {
                    background.position.x += 2;
                    midground.position.x += 4;
                    forground.position.x += 8;
                    enemy.position.x += 8;
                }
            }
            // flip
            player.flip = true;
            player.switchSprite('run_left');
        } else if (input.keys.ArrowRight.pressed && !player.attack && !player.dead) {
            if (player.collisionBox.right <= game.canvas.width - 350) {
                player.velocity.x = 8;
            } else {
                if (forground.position.x > -forground.image.width + 1270) {
                    background.position.x -= 2;
                    midground.position.x -= 4;
                    forground.position.x -= 8;
                    enemy.position.x -= 8;
                }
            }
            // flip
            player.flip = false;
            player.switchSprite('run_right');
        }
    
        // Jump
        if (input.keys.ArrowUp.pressed && !player.jump && !player.fall && !player.attack && !player.dead) {
            player.jump = true;
        }
        if (player.jump && player.position.y < 25) {
            player.jump = false;
            player.fall = true;
        }
        if (player.fall && player.collisionBox.bottom >= 525) {
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
            player.position.y = 295;
        }
    
        if (input.keys.Space.pressed && !player.jump && !player.fall && !player.dead) {
            player.attack = true;
            player.framesElapsed = 0;
        }
        if (player.attack) {
            //player.velocity.x = 0;
            player.switchSprite('attack' + (player.flip ? '_left' : '_right'));
            if (player.framesElapsed == 10) {
                hit.play();
                player.hitBox.active = true;
            }
    
            if (player.framesElapsed == 30) {
                player.attack = false;
                player.hitBox.active = false;
                hit.pause(true);
            }
        }
    } else {
        player.switchSprite('dead' + (player.flip ? '_left' : '_right'));
        player.framesElapsed = 0;
        if (player.framesElapsed == 30) {
            player.dead = true;
            console.log('dead');
        }
    }

    // Enemy
    enemy.velocity.x = 0

    // Run
    if (game.clock > 2 && !enemy.dead && !player.dead) {
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
                enemy.switchSprite('attack' + (enemy.flip ? '_left' : '_right'));
                    if (player.health <= 0) {

                    } else {
                        player.health -= 1;
                    }
            }
        }
    } else {
        enemy.switchSprite('idle' + (enemy.flip ? '_left' : '_right'))
    }

    if (player.hitBox.active && player.hitBox.right > enemy.collisionBox.left && player.hitBox.left < enemy.collisionBox.right) {
        if (enemy.health <= 0) {
            enemy.dead = true;
        } else {
            enemy.health -= 1;
        }
    }
}