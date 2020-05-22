const show_bounding_roid = false;             //monitor function: draws bounding of objects

class Asteroid {
    constructor(x, y, size, angle, velocity, vert, offs) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.r = size/2;
        this.angle = angle;
        this.velocity = velocity;
        this.vert = vert;
        this.offs = offs; //creates the irregularity of polygons
        this.coordinates = []; //saves coordinates of vertices for collision detection   
    }

    
    render() {
        //saves coordinates of vertices for collision detection
        this.coordinates = [];
        for (let j = 0; j < this.vert; j++) {
            this.coordinates.push({
                x: this.x + this.r * this.offs[j] * Math.cos(Utils.toRadians(this.angle) + j * Math.PI * 2 / this.vert),
                y: this.y + this.r * this.offs[j] * Math.sin(Utils.toRadians(this.angle) + j * Math.PI * 2 / this.vert)
            });
        }

        // draw the asteroids
        gameBoard.ctx.strokeStyle = "slategrey";
        gameBoard.ctx.lineWidth = 3;

        gameBoard.ctx.beginPath();
        gameBoard.ctx.moveTo(
                this.x + this.r * this.offs[0] * Math.cos(Utils.toRadians(this.angle)),
                this.y + this.r * this.offs[0] * Math.sin(Utils.toRadians(this.angle))
        );

        for (let j = 1; j < this.vert; j++) {
            gameBoard.ctx.lineTo(
                    this.x + this.r * this.offs[j] * Math.cos(Utils.toRadians(this.angle) + j * Math.PI * 2 / this.vert),
                    this.y + this.r * this.offs[j] * Math.sin(Utils.toRadians(this.angle) + j * Math.PI * 2 / this.vert)
                );
        }
        gameBoard.ctx.closePath();
        gameBoard.ctx.stroke();

        if(show_bounding_roid) {
            gameBoard.ctx.strokeStyle = "lime";
            gameBoard.ctx.beginPath();
            gameBoard.ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
            gameBoard.ctx.stroke();
        }
        
    }

    update() {
        // move the asteroids
        this.x += this.velocity.x;
        this.y += this.velocity.y;

        // handle asteroid edge of gameBoard
        if (this.x < 0 - this.r) {
            this.x = gameBoard.canvas.width + this.r;
        } 
        else if (this.x > gameBoard.canvas.width + this.r) {
            this.x = 0 - this.r;
        }

        if (this.y < 0 - this.r) {
            this.y = gameBoard.canvas.height + this.r;
        } 
        else if (this.y > gameBoard.canvas.height + this.r) {
            this.y = 0 - this.r;
        }

    }

}