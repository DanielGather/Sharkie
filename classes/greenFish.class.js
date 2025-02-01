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
   */
  animate() {
    this.j = 0;
    setStoppableInterval(this.checkFishAndCharacterDistance.bind(this,sprites.greenFish.bubbleSwim,sprites.greenFish.swim,sprites.greenFish.transition),150);
    setStoppableInterval(this.checkIfSmallFishIsDead.bind(this, sprites.greenFish.isDead),1000 / this.hz);
    setStoppableInterval(this.fishSwimsTowardsCharacter.bind(this), 1000 / this.hz);
    setStoppableInterval(this.checkOtherDirection.bind(this), 100);
  }
}
