class OrangeFish extends MovableObject {
  width = 120;
  height = 80;
  speed = 0.08;

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
 * Initializes a new instance of the fish, loading images, setting initial position, speed, 
 * and triggering animations. The constructor sets up the fish based on provided parameters 
 * and handles level progression.
 * @constructor
 * @param {number} xPosition - The initial horizontal position of the fish.
 * @param {number} speedNormalFish - The speed at which the fish moves.
 * @param {number} damage - The amount of damage the fish deals when interacted with.
 */
  constructor(xPosition, speedNormalFish, damage) {
    super().loadImage("img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim1.webp");
    this.ifNextLevel(damage)
    this.x = xPosition;
    this.loadImages(sprites.orangeFish.swim);
    this.loadImages(sprites.orangeFish.transition);
    this.loadImages(sprites.orangeFish.bubbleSwim);
    this.loadImages(sprites.orangeFish.isDead)
    this.y = this.calculateY();
    this.speed = this.calculateSpeed(speedNormalFish);
    this.animate();
  }

  /**
 * Initiates the animation loop for the fish, controlling movement, direction change, 
 * and interactions with the character. It sets multiple intervals to update the 
 * fish's behavior, position, and status.
 * @method animate
 * @memberof FishClass  // Replace with the appropriate class name if needed.
 */
  animate() {
    this.j = 0;
    setStoppableInterval(this.moveLeft.bind(this), 1000 / this.hz);
    setStoppableInterval(this.fishChangeDirection.bind(this), 1000 / this.hz)
    setStoppableInterval(this.checkFishAndCharacterDistance.bind(this, sprites.orangeFish.bubbleSwim, sprites.orangeFish.swim, sprites.orangeFish.transition), 150);
    setStoppableInterval(this.checkIfSmallFishIsDead.bind(this,sprites.orangeFish.isDead), 1000 / this.hz)
  }

}
