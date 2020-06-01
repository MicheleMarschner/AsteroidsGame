# Game: Asteroids 

**Goal:** Practice Javascript skills, game logic and OOP (by using modules and classes) <br/>
**Helpful Resources:** MDN-Web Documentation, tutorials from FreeCodeCamp, CodePen, New Think Tank and Plunker as well as dyn4j (regarding Separating Axis Theorem) and a open source polygons intersection algorithm on GitHub by vrd and kottans.org

## Milestones
1. Dividing game into its components and their individual functions (game board, ship, asteroids, bullets)
2. Sketching basic flowchart (attached as pdf-file)
3. Understanding the basic underlying mathematic concepts

*[actual coding]*

4. Drawing game board
5. Creating ship: defining properties and functions (drawing and movement)
6. Setting up game loop
7. Adding Event Listeners and Event Handlers
8. Creating bullets 
9. Creating individual asteroids and asteroid belt
10. Adding the collision detection and handling collision events
11. Adding lives and levels
12. Polishing game by dissolving bugs and removing comments and redundant code


## Greatest challenges
1. Modular structure: 
    * Clarifying which classes or variables are needed when and where and if the current module is able to access them. Problem was often solved through passing values in functions. 
    * Turned functions in the Utils class static and created asteroid belt to handle asteroids
    * Next step/improvement would be to move more of the functions in the game loop (.html) to the game.js file
2. Object collision:
    * The basic collision algorithms (using circle or rectangle “boxes” around the objects) proved to be very inaccurate as the created asteroids have very different shapes. Internet research provided a more refined solution in form of the "separate axis theorem". 
    * To integrate the external code snippets for detecting a collision properly, the position of the objects needed to be passed in a certain format (property: coordinates). 
    * The integrated algorithm affected the smooth gameplay the more asteroids were added in higher levels. Therefore, I added a two-step-collision solution. Only after the basic circle collision is triggered, I run a second collision check by using the more detailed separate axis theorem. 
3. Game loop & order of code snippets:
    * Tried two different methods: requestAnimationFrame() and setInterval(). Research showed that the first method is usually preferred, also when it is not fully supported by all browsers.
    * Another challenge was to figure out the best order for the events in the game lopp (updating, checking for key events & collision, drawing objects) --> bugs mostly occurred because of drawing and or updating the objects at the wrong point in time (explosion of bullet wasn't visible or splicing method didn't occur when bullets were shot too fast; the faster the ship got, the more its thrusting trail lacked behind the ship itself)


## Upcoming features and code improvements
* Improve code (SOLID) by standardizing names of variables/functions, create superclasses (e.g. Utils) or functions for recurring activities (like a generalized drawing function) and reduce possible redundant code
* Trim the external intersection.js code to improve overall performance
* Enable simultaneous movement of ship + shooting its bullets by saving an array of pressed keys
* Bullets currently don't start at centre of the ship but at the top left corner (solution --> introduce constant to move the position)
* Feature: add high score and timer
* Feature: add music & sounds (e.g. when collision occurs)
* Feature: improve graphical effects of explosions etc. (e.g. objects burst into little pieces with particle function)
