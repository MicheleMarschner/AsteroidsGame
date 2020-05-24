# Game Coding: Asteroids 

**Goal:** Practice Javascript skills and OOP (by using modules and classes)
**Helpful Resources:** MDN-Web documentation, Tutorials from FreeCodeCamp, CodePen, New Think Tank and Plunker as well as dyn4j (regarding Separating Axis Theorem) and a open source polygons intersection algorithm on GitHub by vrd and kottans.org

## Milestones
1. Dividing game into its components and their individual functions (game Board, ship, asteroids, bullets)
2. Sketching basic flowchart (added as pdf-file)
3. Understanding the basic underlying mathematic principles

*[starting actual coding]*
4. Drawing game Board
5. Ship Creation: defining properties and functions (drawing and movement)
6. Setting up game loop
7. Adding Event Listeners and Event Handlers
8. Creating bullets 
9. Creating individual asteroids and asteroid Belt
10. Adding the collision detection and its consequences
11. Adding Lives and Levels
12. Polishing Game by dissolving bugs and removing comments and redundant code


## Greatest challenges
1. Modular structure: 
  * Which classes or variables are needed when and where and is the current module able to access it? The problem was often solved through passing values in functions. 
  * Functions in the Utils class became static and to be able to handle the asteroids I added an overall Asteroid Belt
  * Next step would be to move more of the functions in the game loop (.html) to the game.js file
2. Object Collision:
  * The basic collision algorithms (using circle or rectangle “boxes” around the objects) proved to be very inaccurate as the created asteroids have different shapes. Internet research provided a more refined solution in form of the separate axis theorem. 
  * To integrate the external code snippets for detecting a collision properly, the position of the objects needed to be passed in a certain format (property: coordinates). 
  * The integrated algorithm affected the smooth gameplay when more asteroids were added in higher levels. Therefore, I added a two-step-collision solution. Only after the basic circle collision is triggered, we run a second collision check by using the separate axis theorem. 
3. Game Loop & order of code snippets:
  * Tried two different methods: requestAnimationFrame() and setInterval(). Research showed that the first method is usually preferred also when it is not as supported by all browsers.
  * Another challenge was to figure out the best order for events (updating, cheking for key Events & collision, drawing objects) --> bugs mostly involved drawing issues (explosion of bullets wasn't visible or splicing method didn't occur when bullets were shot too fast, the thrusting trail of the ship lacked behind the ship itself the faster the ship became)


## Next features and code improvements
* Improving code (SOLID) by standardizing names of variables/functions, creating superclasses (e.g. Utils) or functions for recurring activities (like a general drawing function) and reducing possible redundant code
* Trim the external intersection.js code to improve performance
* Enabling simultaneous movement of ship + shooting by using array of pressed keys
* Bullets currently don't start at centre but at the top left corner (solution = introducing constant to move the position)
* Feature: high score and timer
* Feature: music & sounds
* Feature: graphical improvements of explosions etc. (e.g. bursting into little pieces with particle function)
