

const screen = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 1024;
        this.canvas.height = 576;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(update, 20);
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    },
    clear : function(){
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

const background = new Sprite({
    position: {
      x: 0,
      y: 0
    },
    imageSrc: 'assets/img/background.png'
});

const player = new Sprite({
    position: {
      x: 1,
      y: 1
    },
    imageSrc: 'assets/img/run.png',
    scale: 2.5,
    framesMax: 8,
    offset: {
      x: 0,
      y: 0
    }
});

// Update the game
function update() {
    screen.clear();
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

// Start the game
function init() {
    screen.start();
}

