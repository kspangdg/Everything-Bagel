function update() {
    game.clear();
    background.update();
    player.update();
    
    player.velocity.x = 0

    if (keys.ArrowLeft.pressed && player.lastKey === 'ArrowLeft') {
        player.velocity.x = -5;
        player.switchSprite('run_left');
    } else if (keys.ArrowRight.pressed && player.lastKey === 'ArrowRight') {
        player.velocity.x = 5;
        player.switchSprite('run_right');
    } else {
        player.switchSprite('idle');
    }
}