class GreenFish extends MovableObject {
  width = 120;
  height = 80;
  speed = 0.25;

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
   * Creates an instance of the fish enemy with properties like position, speed, and damage.
   * The constructor initializes the fish's image, position (`x`), and speed based on parameters.
   * It also loads the appropriate animations and handles the level-specific damage using the
   * `ifNextLevel` function. Additionally, the fish's vertical position is calculated dynamically
   * using `calculateY`, and its swimming animations are started.
   * @param {number} xPosition - The initial horizontal position of the fish on the screen.
   * @param {number} speedNormalFish - The speed of the fish based on the current level or difficulty.
   * @param {number} damage - The damage dealt by the fish to the player. The value is adjusted for the current level.
   */
  constructor(xPosition, speedNormalFish, damage) {
    super().loadImage("img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.webp");
    this.ifNextLevel(damage);

    this.x = xPosition;
    this.loadImages(sprites.greenFish.swim);
    this.loadImages(sprites.greenFish.transition);
    this.loadImages(sprites.greenFish.bubbleSwim);
    this.loadImages(sprites.greenFish.isDead);
    this.y = this.calculateY();
    this.speed = this.calculateSpeed(speedNormalFish);
    this.animate();
  }

  /**
   * Starts multiple intervals to handle the animation and behavior of the fish.
   * This method sets up various intervals to perform actions such as checking the distance
   * between the fish and the character, checking if the fish is dead, handling the swimming
   * animation of the fish, and determining the direction in which the fish is moving.
   * The intervals run at different time intervals (e.g., every 150ms for checking distance,
   * and every 1000ms or more for checking death and movement).
   * @method
   */
  animate() {
    this.j = 0;
    setStoppableInterval(this.checkFishAndCharacterDistance.bind(this,sprites.greenFish.bubbleSwim,sprites.greenFish.swim,sprites.greenFish.transition),150);
    setStoppableInterval(this.checkIfSmallFishIsDead.bind(this, sprites.greenFish.isDead),1000 / this.hz);
    setStoppableInterval(this.fishSwimsTowardsCharacter.bind(this), 1000 / this.hz);
    setStoppableInterval(this.checkOtherDirection.bind(this), 100);
  }
}
