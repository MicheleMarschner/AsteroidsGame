const show_bounding_ship = false;             //monitor function: draws bounding of objects
const max_velocity = 7;

class Ship {
    constructor(canvasWidth, canvasHeight, angle) {
        this.x = canvasWidth / 2;
        this.y = canvasHeight / 2;
        this.size = 30; //ship height
        this.r = this.size/2;
        this.angle = angle || 0;
        this.rotateSpeed = 5; // in degrees
        this.statThrusting = false;
        this.speed = 0.05;
        this.friction = 0.03;
        this.velocity = {
                            x: 0,
                            y: 0
                        }
        this.visibility = true;
        this.coordinates = [];
        this.statExploding = false;
    }


    render() {    
        
        if(this.statThrusting) {
            // draw thruster
            gameBoard.ctx.fillStyle = "red";
            gameBoard.ctx.strokeStyle = "yellow";
            gameBoard.ctx.lineWidth = this.size/10;
            gameBoard.ctx.beginPath();
            gameBoard.ctx.moveTo( // rear left
                this.x - this.r * (2 / 3 * Math.cos(Utils.toRadians(this.angle)) + 0.5 * Math.sin(Utils.toRadians(this.angle))),
                this.y + this.r * (2 / 3 * Math.sin(Utils.toRadians(this.angle)) - 0.5 * Math.cos(Utils.toRadians(this.angle)))
            );
            gameBoard.ctx.lineTo( // rear centre (behind the ship)
                this.x - this.r * 5 / 3 * Math.cos(Utils.toRadians(this.angle)),
                this.y + this.r * 5 / 3 * Math.sin(Utils.toRadians(this.angle))
            );
            gameBoard.ctx.lineTo( // rear right
                this.x - this.r * (2 / 3 * Math.cos(Utils.toRadians(this.angle)) - 0.5 * Math.sin(Utils.toRadians(this.angle))),
                this.y + this.r * (2 / 3 * Math.sin(Utils.toRadians(this.angle)) + 0.5 * Math.cos(Utils.toRadians(this.angle)))
            );
            gameBoard.ctx.closePath();
            gameBoard.ctx.fill();
            gameBoard.ctx.stroke();
        }    

        if(!this.statExploding) {
            gameBoard.ctx.strokeStyle = "white";
            gameBoard.ctx.lineWidth = this.size/10;
            gameBoard.ctx.beginPath();
            gameBoard.ctx.moveTo(                   //Tip or "nose" of the ship
                this.getPosTip().x,
                this.getPosTip().y
            ); 
            gameBoard.ctx.lineTo(                  // rear left
                this.x + (this.r * Math.cos((Utils.toRadians(this.angle)) + ((3/4)*Math.PI))),
                this.y - (this.r * Math.sin((Utils.toRadians(this.angle)) + ((3/4)*Math.PI)))
            );
            gameBoard.ctx.lineTo(                  // rear right
                this.x + (this.r * Math.cos((Utils.toRadians(this.angle)) + ((5/4)*Math.PI))),
                this.y - (this.r * Math.sin((Utils.toRadians(this.angle)) + ((5/4)*Math.PI)))
            );
            gameBoard.ctx.closePath();
            gameBoard.ctx.stroke();


        }

        else {
            // draw explosion (concentric circles of different colours)
            gameBoard.ctx.fillStyle = "darkred";
            gameBoard.ctx.beginPath();
            gameBoard.ctx.arc(this.x, this.y, this.r * 1.9, 0, 2*Math.PI, false);
            gameBoard.ctx.fill();
            gameBoard.ctx.fillStyle = "red";
            gameBoard.ctx.beginPath();
            gameBoard.ctx.arc(this.x, this.y, this.r * 1.6, 0, 2*Math.PI, false);
            gameBoard.ctx.fill();
            gameBoard.ctx.fillStyle = "orange";
            gameBoard.ctx.beginPath();
            gameBoard.ctx.arc(this.x, this.y, this.r * 1.3, 0, 2*Math.PI, false);
            gameBoard.ctx.fill();
            gameBoard.ctx.fillStyle = "yellow";
            gameBoard.ctx.beginPath();
            gameBoard.ctx.arc(this.x, this.y, this.r * 0.9, 0, 2*Math.PI, false);
            gameBoard.ctx.fill();
            gameBoard.ctx.fillStyle = "white";
            gameBoard.ctx.beginPath();
            gameBoard.ctx.arc(this.x, this.y, this.r * 0.5, 0, 2*Math.PI, false);
            gameBoard.ctx.fill();
        }

        if(show_bounding_ship) {
            gameBoard.ctx.fillStyle = "red";
            gameBoard.ctx.fillRect(this.getPosTip().x-1,this.getPosTip().y-1,2,2);
            gameBoard.ctx.fillRect(this.x-1,this.y-1,2,2);

            gameBoard.ctx.beginPath();
            gameBoard.ctx.arc(this.x, this.y, this.r, 0, 2*Math.PI, false);
            gameBoard.ctx.strokeStyle = "white";
            gameBoard.ctx.lineWidth = 1;
            gameBoard.ctx.stroke();
        }
    }
    
    getPosTip() {
        return {
            x: this.x + Utils.rotate_dx(this.angle, this.r),
            y: this.y - Utils.rotate_dy(this.angle, this.r)
        };
    }

    rotate(direction) {
       this.angle += direction * this.rotateSpeed;
    }

    update() {
        if (this.statThrusting && this.velocity.x < max_velocity){
            this.velocity.x += this.speed * Math.cos(Utils.toRadians(this.angle));
            this.velocity.y -= this.speed * Math.sin(Utils.toRadians(this.angle)); 
        }

        else if (!this.statThrusting) {
            this.velocity.x -= this.friction * this.velocity.x;
            this.velocity.y -= this.friction * this.velocity.y;
        }

        // if ship goes off gameBoard place it on the opposite side 
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

        this.x += this.velocity.x;
        this.y += this.velocity.y;

        //saves coordinates of vertices for collision detection
        this.coordinates = [];
        this.coordinates.push(this.getPosTip());
        this.coordinates.push({
            x: this.x + (this.r * Math.cos((Utils.toRadians(this.angle)) + ((3/4)*Math.PI))),
            y: this.y - (this.r * Math.sin((Utils.toRadians(this.angle)) + ((3/4)*Math.PI)))
        });
        this.coordinates.push({
            x: this.x + (this.r * Math.cos((Utils.toRadians(this.angle)) + ((5/4)*Math.PI))),
            y: this.y - (this.r * Math.sin((Utils.toRadians(this.angle)) + ((5/4)*Math.PI)))
        });
    }

    exploding() {
        this.velocity = {x:0, y:0};
        this.speed = 0;
        this.statExploding = true;
    }
    
    newShip(canvasWidth,canvasHeight) {
        
        this.x = canvasWidth / 2;
        this.y = canvasHeight / 2;
        this.angle = 0;
        this.rotateSpeed = 10;
        this.statThrusting = false;
        this.speed = 0.1;
        this.velocity = {
                            x: 0,
                            y: 0
                        }
        this.statExploding = false;
    }

}