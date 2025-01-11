class OrangeFish extends MovableObject {
  width = 120;
  height = 80;
  speed = 0.08;

  offset = {
    top: 5,
    right: 10,
    left: 5,
    bottom: 25,
  };

  IMAGES_ORANGE_FISH_SWIMING = ["img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim1.webp", "img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim2.webp", "img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim3.webp", "img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim4.webp", "img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim5.webp"];

  IMAGES_ORANGE_FISH_TRANSITION = ["img/2.Enemy/1.Puffer fish (3 color options)/2.transition/2.transition1.webp", "img/2.Enemy/1.Puffer fish (3 color options)/2.transition/2.transition2.webp", "img/2.Enemy/1.Puffer fish (3 color options)/2.transition/2.transition3.webp", "img/2.Enemy/1.Puffer fish (3 color options)/2.transition/2.transition4.webp", "img/2.Enemy/1.Puffer fish (3 color options)/2.transition/2.transition5.webp"];

  IMAGES_ORANGE_FISH_BUBBLE_SWIM = ["img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/2.bubbleswim1.webp", "img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/2.bubbleswim2.webp", "img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/2.bubbleswim3.webp", "img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/2.bubbleswim4.webp", "img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/2.bubbleswim5.webp"];

  constructor(xPosition, speedNormalFish) {
    super();
    this.x = xPosition;
    this.loadImages(this.IMAGES_ORANGE_FISH_SWIMING);
    this.loadImages(this.IMAGES_ORANGE_FISH_TRANSITION);
    this.loadImages(this.IMAGES_ORANGE_FISH_BUBBLE_SWIM);
    this.y = this.calculateY();
    this.speed = this.calculateSpeed(speedNormalFish);
    this.animate();
  }

  animate() {
    this.j = 0;
    setStoppableInterval(this.moveLeft.bind(this), 1000 / this.hz);
    setStoppableInterval(this.checkFishAndCharacterDistance.bind(this, this.IMAGES_ORANGE_FISH_BUBBLE_SWIM, this.IMAGES_ORANGE_FISH_SWIMING, this.IMAGES_ORANGE_FISH_TRANSITION), 150);
  }
}
