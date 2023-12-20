window.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowRight':
            keys.ArrowRight.pressed = true;
            player.flip = false;
            break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true;
            player.flip = true;
            break
        case 'ArrowUp':
            player.velocity.y = -20;
            break
        case 'ArrowDown':
           // player.attack();
            break
    }
})

window.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'ArrowRight':
            keys.ArrowRight.pressed = false
            break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false
            break
    }
})


// Start the game
function init() {
    game.start();
}