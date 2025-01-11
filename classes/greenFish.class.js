class GreenFish extends MovableObject {
  width = 120;
  height = 80;
  speed = 0.25;

  offset = {
    top: 5,
    right: 10,
    left: 5,
    bottom: 25,
  };

  IMAGES_GREEN_FISH_SWIMING = ["img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.webp", "img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim2.webp", "img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim3.webp", "img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim4.webp", "img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim5.webp"];

  IMAGES_GREEN_FISH_TRANSITION = ["img/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition1.webp", "img/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition2.webp", "img/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition3.webp", "img/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition4.webp", "img/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition5.webp"];

  IMAGES_GREEN_FISH_BUBBLE_SWIM = ["img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/1.bubbleswim1.webp", "img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/1.bubbleswim2.webp", "img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/1.bubbleswim3.webp", "img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/1.bubbleswim4.webp", "img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/1.bubbleswim5.webp"];

  constructor(xPosition, speedNormalFish) {
    super();
    this.x = xPosition;
    this.loadImages(this.IMAGES_GREEN_FISH_SWIMING);
    this.loadImages(this.IMAGES_GREEN_FISH_TRANSITION);
    this.loadImages(this.IMAGES_GREEN_FISH_BUBBLE_SWIM);
    this.y = this.calculateY();
    this.speed = this.calculateSpeed(speedNormalFish);
    this.animate();
  }

  animate() {
    this.j = 0;
    // setStoppableInterval(this.moveLeft.bind(this), 1000 / this.hz);
    setStoppableInterval(this.checkFishAndCharacterDistance.bind(this, this.IMAGES_GREEN_FISH_BUBBLE_SWIM, this.IMAGES_GREEN_FISH_SWIMING, this.IMAGES_GREEN_FISH_TRANSITION), 150);
    setStoppableInterval(this.fishSwimsTowardsCharacter.bind(this),1000 / this.hz)
    setStoppableInterval(this.checkOtherDirection.bind(this), 100)
  }

}
