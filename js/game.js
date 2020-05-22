const game_lives = 1;

class Game {
    constructor(div) {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext("2d");
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.lives = [];
        this.level = 1;
        this.textDisplay = 0;

        div.appendChild(this.canvas);
    
    }

    initGame() {
        this.level = 1;

        for(let i=0; i < game_lives; i++){
            this.lives.push(new Ship(2*(20 + i * 20) * 1.2, 50, 270));
        }
        this.render();
    }


    render() {
        this.canvas.width = this.width - 600;
        this.canvas.height = this.height - 250;

        this.ctx.fillStyle = "black";
        this.ctx.fillRect(0,0,this.width,this.height);

        for(let i=0; i < this.lives.length; i++){
            this.lives[i].render();
        }
    }

    message(text) {
        if(this.textDisplay > 0) {
            this.ctx.textAlign = "center";
            this.ctx.textBaseline = "middle";
            this.ctx.fillStyle = "white";
            this.ctx.font = "40px Arial";
            this.ctx.fillText(text, this.canvas.width/2, this.canvas.height * 0.75);
            this.textDisplay -= 1;
        }
    }

}