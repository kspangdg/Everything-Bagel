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
        this.playing = false;
    }

    play(reset = false, start = 0) {
        if (!game.mute) {
            if (reset && !this.playing) {
                this.sound.currentTime = start;
            }
            this.sound.play();  
            this.playing = true; 
        }     
    }
    pause(reset = false, start = 0) {
        if (!game.mute) {
            if (reset) {
                this.sound.currentTime = start;
            }
            this.sound.pause();
            this.playing = false;
        }
    }
}