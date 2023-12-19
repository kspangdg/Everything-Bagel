const game = {
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