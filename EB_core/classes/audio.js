/**
 * Audio handler.
 *
 * @param {string} src - The audio file source (e.g. 'public/assets/audio/sound.mp3')
 * @param {bool} loop - Define if audio should loop
 */

class EB_Audio {
    constructor(src, loop = false) {
        this.sound = document.createElement("audio");
        this.sound.src = src;
        this.sound.loop = loop;
        this.sound.setAttribute("preload", "auto");
        this.sound.setAttribute("controls", "none");
        this.sound.style.display = "none";
        document.body.appendChild(this.sound);
    }

    play() {
        this.sound.play();        
    }
    pause() {
        this.sound.pause();
    }
}