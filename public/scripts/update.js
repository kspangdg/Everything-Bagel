function update() {
    game.clear();
    background.update();
    midground.update();
    forground.update();
    enemy.update();
    player.update();
    

    // Player
    if (player.health > 0) {
        player.velocity.x = 0
        if (!input.keys.ArrowLeft.pressed && !input.keys.ArrowRight.pressed && !player.jump && !player.fall && !player.attack) {
            player.switchSprite('idle' + (player.flip ? '_left' : '_right'));
        }
    
        // Run
        if (input.keys.ArrowLeft.pressed && !player.attack && !player.dead && !enemy.dead) {
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
        } else if (input.keys.ArrowRight.pressed && !player.attack && !player.dead && !enemy.dead) {
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
        if (input.keys.ArrowUp.pressed && !player.jump && !player.fall && !player.attack && !player.dead && !enemy.dead) {
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
            jump.play(true);
        } else if (player.fall) {
            player.velocity.y = 10;
            player.switchSprite('Fall' + (player.flip ? '_left' : '_right'));
            jump.pause(true);
        } else {
            player.velocity.y = 0;
            player.position.y = 295;
        }
    
        if (input.keys.x.pressed && !player.jump && !player.fall && !player.dead && !enemy.dead) {
            player.attack = true;
            player.framesElapsed = 0;
            if (player.hitBox.active && player.hitBox.right > enemy.collisionBox.left && player.hitBox.left < enemy.collisionBox.right) {
                if (enemy.health > 0 && !enemy.hit) {
                    enemy.health -= 10;
                    enemy.hit = true;
                }
            }
        }
        if (player.attack) {
            player.switchSprite('attack' + (player.flip ? '_left' : '_right'));
            if (player.framesElapsed == 10) {
                attack.play();
                player.hitBox.active = true;
            }
    
            if (player.framesElapsed == 30) {
                player.attack = false;
                player.hitBox.active = false;
                attack.pause(true);
            }
        }
    } else {
        player.switchSprite('dead' + (player.flip ? '_left' : '_right'));
        player.velocity.x = 0;
        if (!player.dead) {
            player.framesElapsed = 0
            player.dead = true;
        }
        if (player.dead && player.framesElapsed > 28) {
            player.pauseAnimate = true;
            music.pause(false);
            gameover.update();
        }
    }

    // Enemy
    enemy.velocity.x = 0

    // Run
    if (game.clock > 2 && enemy.health > 0 && !player.dead) {
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
                    if (player.health > 0 && !player.hit) {
                        player.health -= 10;
                        player.hit = true;
                        eattack.play();
                        enemy.framesElapsed = 0
                    }
            }
        }
    }

    if (enemy.framesElapsed > 30 && player.hit) {
        player.hit = false;
        eattack.pause(true);      
    }


    if (enemy.health <= 0) {
        enemy.switchSprite('dead' + (enemy.flip ? '_left' : '_right'));
        enemy.velocity.x = 0;
        if (!enemy.dead) {
            enemy.framesElapsed = 0
            enemy.dead = true;
        }
        if (enemy.dead && enemy.framesElapsed > 28) {
            enemy.pauseAnimate = true;
            music.pause(false);
            victory.update();
        }
    }

    if (player.hitBox.active && player.hitBox.right > enemy.collisionBox.left && player.hitBox.left < enemy.collisionBox.right) {
        if (enemy.health > 0 && !enemy.hit) {
            enemy.health -= 10;
            enemy.hit = true;
        }
    }
    if (player.framesElapsed > 30 && enemy.hit) {
        enemy.hit = false;
    }
}