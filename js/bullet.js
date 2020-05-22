class Bullet {
    constructor(x, y, angle) {
        this.x = x;
        this.y = y;
        this.angle = angle;
        this.size = 4;
        this.velocity = 10;
        this.r = this.size/2;                 // needed for explosion function
        this.coordinates = [];
        this.statSelfDestroy = false;
        this.statExploding = false;
        this.explodingTime = 0;
    }
    
    render() {
        if(this.explodingTime === 0) {
            gameBoard.ctx.fillStyle = "red";
            gameBoard.ctx.fillRect(this.x, this.y, this.size, this.size);
        }
        else {
            // draw explosion (concentric circles of different colours)
            gameBoard.ctx.fillStyle = "darkred";
            gameBoard.ctx.beginPath();
            gameBoard.ctx.arc(this.x, this.y, this.r * 4.0, 0, 2*Math.PI, false);
            gameBoard.ctx.fill();
            gameBoard.ctx.fillStyle = "red";
            gameBoard.ctx.beginPath();
            gameBoard.ctx.arc(this.x, this.y, this.r * 3.2, 0, 2*Math.PI, false);
            gameBoard.ctx.fill();
            gameBoard.ctx.fillStyle = "orange";
            gameBoard.ctx.beginPath();
            gameBoard.ctx.arc(this.x, this.y, this.r * 2.4, 0, 2*Math.PI, false);
            gameBoard.ctx.fill();
            gameBoard.ctx.fillStyle = "yellow";
            gameBoard.ctx.beginPath();
            gameBoard.ctx.arc(this.x, this.y, this.r * 1.6, 0, 2*Math.PI, false);
            gameBoard.ctx.fill();
            gameBoard.ctx.fillStyle = "white";
            gameBoard.ctx.beginPath();
            gameBoard.ctx.arc(this.x, this.y, this.r * 0.5, 0, 2*Math.PI, false);
            gameBoard.ctx.fill();

            this.explodingTime -= 1;
        }
    }

    update() {
        this.x += Math.cos(Utils.toRadians(this.angle)) * this.velocity; //brings bullets to move straight ahead - with respect to flight path of the ship
        this.y -= Math.sin(Utils.toRadians(this.angle)) * this.velocity;

        // handles bullet expiration at edge of gameBoard
        if ((this.x < 0) || (this.x > gameBoard.canvas.width) || 
            (this.y < 0) || (this.y > gameBoard.canvas.height)) {
                this.statSelfDestroy = true;  
        }
     
        this.coordinates = [];
        this.coordinates.push(
            {x: this.x, y: this.y},
            {x: this.x + this.size, y: this.y},
            {x: this.x + this.size, y: this.y - this.size},
            {x: this.x, y: this.y - this.size}
        );

    }
    
}