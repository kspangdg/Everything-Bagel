
function update() {
    game.clear();
    background.update();
    player.update();

    window.addEventListener('keydown', (event) => {
        switch (event.key) {
          case 'd':
            player.position.x += 0.1
            break
        case 'a':
            player.position.x -= 0.1
            break
        case 'w':
            player.position.y -= 0.1
            break
        case 's':
            player.position.y += 0.1
            break
        }
    });
}