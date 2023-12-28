function update() {
    game.clear();
    background.update();
    midground.update();
    forground.update();
    banner.update();
    player.update();
    
    player.velocity.x = 0

    if (controls.keys.ArrowLeft.pressed) {
        if (player.position.x >= 0 + (player.width / player.framesMax) + 350) {
            player.velocity.x = -5;
        } else { 
            background.position.x += 1;
            midground.position.x += 2.5;
            forground.position.x += 5;
        }
        // flip
        player.flip = true;
        player.switchSprite('run_left');
    } else if (controls.keys.ArrowRight.pressed) {
        if (player.position.x <= game.canvas.width - (player.width / player.framesMax) - 350) {
            player.velocity.x = 5;
        } else {
            background.position.x -= 1;
            midground.position.x -= 2.5;
            forground.position.x -= 5;
        }
        // flip
        player.flip = false;
        player.switchSprite('run_right');
    } else {
        player.switchSprite('idle' + (player.flip ? '_left' : '_right'));
    }
}