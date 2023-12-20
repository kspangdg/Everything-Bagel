function update() {
    game.clear();
    background.update();
    player.update();
    
    player.velocity.x = 0

    if (keys.ArrowLeft.pressed) {
        if (player.position.x >= 0 + (player.width / player.framesMax) + 300) {
            player.velocity.x = -5;
        } else { 
            background.position.x += 5;
        }
        player.switchSprite('run_left');
    } else if (keys.ArrowRight.pressed) {
        if (player.position.x <= game.canvas.width - (player.width / player.framesMax) - 300) {
            player.velocity.x = 5;
        } else {
            background.position.x -= 5;
        }
        player.switchSprite('run_right');
    } else {
        player.switchSprite('idle' + (player.flip ? '_left' : '_right'));
    }
}