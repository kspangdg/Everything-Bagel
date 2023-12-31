/**
 * Audio handler.
 *
 * @param {string} src - The audio file source (e.g. 'public/assets/audio/sound.mp3')
 * @param {bool} loop - Define if audio should loop
 */

class EB_Audio {
    constructor(src, volume = 1, loop = false) {
        this.sound = document.createElement("audio");
        this.sound.src = src;
        this.sound.volume = volume;
        this.sound.loop = loop;
        this.sound.setAttribute("preload", "auto");
        this.sound.setAttribute("controls", "none");
        this.sound.setAttribute("muted", "muted");
        this.sound.style.display = "none";
        document.body.appendChild(this.sound);
    }

    play() {
        this.sound.muted = false;
        this.sound.play();        
    }
    pause(reset = false) {
        if (reset) {
            this.sound.currentTime = 0;
        }
        this.sound.pause();
    }
}