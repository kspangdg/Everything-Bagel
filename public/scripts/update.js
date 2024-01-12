function timer() {
	clock.seconds++;
}
function update() {
    game.clear();
    clock.update();
    background.update();
    midground.update();
    forground.update();
    enemy.update();
    player.update();
    

    // Player
    if (player.health > 0) {
        if (!input.keys.ArrowLeft.pressed && !input.keys.ArrowRight.pressed && !player.jump && !player.fall && !player.attack) {
            player.switchSprite('idle' + (player.flip ? '_left' : '_right'));
        }
    
        // Run
        if (input.keys.ArrowLeft.pressed && !player.attack && !player.dead && !enemy.dead) {
            if (player.collisionBox.left >= 350) {
                if (player.velocity.x >= -8) {
                    player.velocity.x -= 0.5;
                }
            } else { 
                player.velocity.x = 0
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
                if (player.velocity.x <= 8) {
                    player.velocity.x += 0.5;
                }
            } else {
                player.velocity.x = 0
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
        } else {
            player.velocity.x = 0;
        }
    
        // Jump
        if (input.keys.ArrowUp.pressed && !player.jump && !player.fall && !player.attack && !player.dead && !enemy.dead) {
            player.jump = true;
            player.time = 0;
        }
        if (player.jump && player.position.y < 150) {
            player.jump = false;
            player.fall = true;
            player.time = 0;
        }
        if (player.fall && player.collisionBox.bottom >= 525) {
            player.fall = false;
        }
        if (player.jump) {
            player.time++;
            player.velocity.y -= 5 + (player.time / 5);
            player.switchSprite('Jump' + (player.flip ? '_left' : '_right'));
            jump.play(true);
        } else if (player.fall) {
            player.time++;
            player.velocity.y += 5 - (player.time / 5);
            player.switchSprite('Fall' + (player.flip ? '_left' : '_right'));
            jump.pause(true);
        } else {
            player.velocity.y = 0;
            player.position.y = 295;
        }
    
        // Attack
        if (input.keys.x.pressed && !player.jump && !player.fall && !player.dead && !enemy.dead) {
            player.attack = true;
            player.framesElapsed = 0;
            clock.timer_start('player_attack',5);
            clock.timer_start('player_attack_sound', 1);
        }
        if (player.attack) {
            player.switchSprite('attack' + (player.flip ? '_left' : '_right'));
            if (clock.timer_end('player_attack_sound')) {
                attack.play();
                player.hitBox.active = true;
            }
            if (player.hitBox.active && player.hitBox.right > enemy.collisionBox.left && player.hitBox.left < enemy.collisionBox.right) {
                if (enemy.health > 0 && !enemy.hit) {
                    enemy.health -= 10;
                    enemy.hit = true;
                }
            }
            if (clock.timer_end('player_attack')) {
                player.attack = false;
                player.hitBox.active = false;
                attack.pause(true);
                if (enemy.hit) {
                    enemy.hit = false;
                }
            }
        }
    } else {
        player.switchSprite('dead' + (player.flip ? '_left' : '_right'));
        player.velocity.x = 0;
        if (!player.dead) {
            player.dead = true;
            clock.timer_start('player_dead',4);
        }
        if (player.dead && clock.timer_end('player_dead')) {
            player.pauseAnimate = true;
            music.pause(false);
            gameover.update();
        }
    }

    // Enemy

    // Run
    if (clock.seconds > 2 && enemy.health > 0 && !player.dead) {
        if (physics.collision(player, enemy) == false) {
            if (player.position.x < enemy.position.x) { 
                if (enemy.velocity.x >= -6) {
                    enemy.velocity.x -= 0.5;
                }
                enemy.flip = true;
                enemy.switchSprite('run_left');
            } else if (player.position.x > enemy.position.x) {
                if (enemy.velocity.x <= 6) {
                    enemy.velocity.x += 0.5;
                }
                enemy.flip = false;
                enemy.switchSprite('run_right');                
            } else {
                enemy.velocity.x = 0;
            }
        } else {
            enemy.velocity.x = 0;
            if (player.jump || player.fall) {
                enemy.switchSprite('idle' + (enemy.flip ? '_left' : '_right'))
            } else {
                enemy.switchSprite('attack' + (enemy.flip ? '_left' : '_right'));
                    if (player.health > 0 && !player.hit) {
                        player.health -= 10;
                        player.hit = true;
                        eattack.play();
                        clock.timer_start('enemy_attack',5);
                    }
            }
        }
    }

    if (player.hit && clock.timer_end('enemy_attack')) {
        player.hit = false;
        eattack.pause(true);
    }


    if (enemy.health <= 0) {
        enemy.switchSprite('dead' + (enemy.flip ? '_left' : '_right'));
        enemy.velocity.x = 0;
        if (!enemy.dead) {
            enemy.dead = true;
            clock.timer_start('enemy_dead',4);
        }
        if (enemy.dead && clock.timer_end('enemy_dead')) {
            enemy.pauseAnimate = true;
            music.pause(false);
            victory.update();
        }
    }
}
