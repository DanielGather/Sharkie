class RedFish extends MovableObject {
  width = 120;
  height = 80;
  speed = 0.35;

  /**
  * Defines the offset values for the object, used for positioning or collision detection.
  * @typedef {Object} Offset
  * @property {number} top - The top offset value.
  * @property {number} right - The right offset value.
  * @property {number} left - The left offset value.
  * @property {number} bottom - The bottom offset value.
  * @type {Offset}
  */
  offset = {
    top: 5,
    right: 10,
    left: 5,
    bottom: 25,
  };

/**
 * Constructor for the class that creates a fish object.
 * The fish loads images for its animations and sets its position and speed.
 * @param {number} xPosition - The x-coordinate position of the fish.
 * @param {number} speedNormalFish - The speed of the fish in its normal state.
 * @param {number} damage - The damage the fish causes.
 */
  constructor(xPosition, speedNormalFish, damage) {
    super().loadImage("img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim1.webp");
    this.ifNextLevel(damage)
    this.x = xPosition;
    this.loadImages(sprites.redFish.swim);
    this.loadImages(sprites.redFish.transition);
    this.loadImages(sprites.redFish.bubbleSwim);
    this.loadImages(sprites.redFish.isDead);
    this.y = this.calculateY();
    this.speed = this.calculateSpeed(speedNormalFish);
    this.animate();    
  }

  /**
 * Starts the animation process for the fish character, including movement and various checks.
 * The function triggers multiple intervals to handle the fish's movement, state transitions, and interactions.
 * It uses `setStoppableInterval` to repeatedly execute movement, state checks, and death checks for small fish.
 */
  animate() {
    this.j = 0;
    setStoppableInterval(this.moveLeft.bind(this), 1000 / this.hz);
    setStoppableInterval(this.checkFishAndCharacterDistance.bind(this, sprites.redFish.bubbleSwim, sprites.redFish.swim, sprites.redFish.transition), 150);
    setStoppableInterval(this.checkIfSmallFishIsDead.bind(this,sprites.redFish.isDead), 1000 / this.hz)
  }
}
