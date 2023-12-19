const background = new EB_Sprite({
    position: {
      x: 0,
      y: 0
    },
    imageSrc: 'public/assets/images/background.png'
});

const player = new EB_Sprite({
    position: {
      x: 1,
      y: 1
    },
    imageSrc: 'public/assets/images/run.png',
    scale: 2.5,
    framesMax: 8,
    offset: {
      x: 0,
      y: 0
    }
});