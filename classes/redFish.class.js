class RedFish extends MovableObject {
  width = 120;
  height = 80;

  offset = {
    top: 5,
    right: 10,
    left: 5,
    bottom: 25,
  };

  IMAGES_RED_FISH_SWIMING = ["img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim1.webp", "img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim2.webp", "img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim3.webp", "img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim4.webp", "img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim5.webp"];

  IMAGES_RED_FISH_TRANSITION = ["img/2.Enemy/1.Puffer fish (3 color options)/2.transition/3.transition1.webp", "img/2.Enemy/1.Puffer fish (3 color options)/2.transition/3.transition2.webp", "img/2.Enemy/1.Puffer fish (3 color options)/2.transition/3.transition3.webp", "img/2.Enemy/1.Puffer fish (3 color options)/2.transition/3.transition4.webp", "img/2.Enemy/1.Puffer fish (3 color options)/2.transition/3.transition5.webp"];

  IMAGES_RED_FISH_BUBBLE_SWIM = ["img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/3.bubbleswim1.webp", "img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/3.bubbleswim2.webp", "img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/3.bubbleswim3.webp", "img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/3.bubbleswim4.webp", "img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/3.bubbleswim5.webp"];

  constructor(level_end_x) {
    super();
    this.level_end_x = level_end_x;
    this.loadImages(this.IMAGES_RED_FISH_SWIMING);
    this.loadImages(this.IMAGES_RED_FISH_TRANSITION);
    this.loadImages(this.IMAGES_RED_FISH_BUBBLE_SWIM);
    this.x = level_end_x;
    this.y = this.calculateY();
    this.speed = 0.15 + Math.random() * 0.25;
    this.animate();
  }

  animate() {
    this.j = 0;
    setStoppableInterval(this.moveLeft.bind(this), 1000 / this.hz);
    setStoppableInterval(this.checkFishAndCharacterDistance.bind(this, this.IMAGES_RED_FISH_BUBBLE_SWIM, this.IMAGES_RED_FISH_SWIMING, this.IMAGES_RED_FISH_TRANSITION), 150);
  }
}
