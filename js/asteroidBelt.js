const show_position = false; //monitor function: checks x & y positions of objects and logs it to console 

let asteroids_num = 3;
const asteroids_jag = 0.4;               // jaggedness of the asteroid (0 = none, 1 = lots)
const asteroids_sizes = [50,80,100,120]; //starting sizes of asteroids
const asteroids_speed = 2;               // max starting speed of asteroid
const asteroids_vertices = 10;          


class AsteroidBelt {
    constructor() {
        this.quantity = asteroids_num;
        this.asteroids = [];
    }


    create(ship) {
        //creates asteroids
        for(let i = 0; i < this.quantity; i++) {
            this.asteroids.push(this.createRandomAsteroid(ship));
        }

        if (show_position) {
            for(let i = 0; i < this.quantity; i++) {
                    console.log(this.asteroids[i]);
            }
        }
    }

    render() {
        for(let i = 0; i < this.asteroids.length; i++) {
            this.asteroids[i].render();
        }
    }

    update() {
        for(let i = 0; i < this.asteroids.length; i++) {
            this.asteroids[i].update();
        }
    }

    createRandomAsteroid(ship) {
        let x, y, size, angle, velocity, vert, offs;
        
            size = asteroids_sizes[Math.floor(Math.random() * asteroids_sizes.length)];
            
            do {
                x = Math.floor(Math.random() * gameBoard.canvas.width);
                y = Math.floor(Math.random() * gameBoard.canvas.height);
            } while (Utils.distBetweenPoints(ship.x, ship.y, x, y) < size * 2 + ship.r);
            
            angle = Math.floor(Math.random() * 360); //angle in degrees  
            
            velocity = {
                x: Math.random() * asteroids_speed * (Math.random() < 0.5 ? 1 : -1), //adds randomness to flight direction, either *1 or *(-1)
                y: Math.random() * asteroids_speed * (Math.random() < 0.5 ? 1 : -1) 
            };

            vert = Math.floor(Math.random() * (asteroids_vertices + 1) + 3); // +1 to avoid vertices to be 0, added constant to avoid e.g. only 1 vertex 
            
            offs = [];
            // populate the offsets array
            for (let i = 0; i < vert; i++) {
                offs.push(Math.random() * asteroids_jag * 2 + 1 - asteroids_jag);
            }

        return new Asteroid(x, y, size, angle, velocity, vert, offs);
    }


    destroy(asteroid, index) {
        
        if(asteroid.size > asteroids_sizes[0]) { 
            this.asteroids.push(new Asteroid(asteroid.x-5, asteroid.y-5, asteroid.size/2, Math.floor(Math.random() * 360), asteroid.velocity, asteroid.vert, asteroid.offs));
            this.asteroids.push(new Asteroid(asteroid.x+5, asteroid.y+5, asteroid.size/2, Math.floor(Math.random() * 360), {x:(asteroid.velocity.x*-1), y:(asteroid.velocity.y*-1)}, asteroid.vert, asteroid.offs));
        }
        
        this.asteroids.splice(index,1);

    }

}