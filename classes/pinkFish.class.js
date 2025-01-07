class PinkFish extends MovableObject {
  width = 120;
  height = 80;
  x;

  offset = {
    top: 5,
    right: 10,
    left: 5,
    bottom: 25,
  };

  IMAGES_PINK_FISH_SWIMING = ["img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim1.webp", "img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim2.webp", "img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim3.webp", "img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim4.webp", "img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim5.webp"];

IMAGES_PINK_FISH_TRANSITION = [
    "img/2.Enemy/1.Puffer fish (3 color options)/2.transition/2.transition1.webp",
    "img/2.Enemy/1.Puffer fish (3 color options)/2.transition/2.transition2.webp",
    "img/2.Enemy/1.Puffer fish (3 color options)/2.transition/2.transition3.webp",
    "img/2.Enemy/1.Puffer fish (3 color options)/2.transition/2.transition4.webp",
    "img/2.Enemy/1.Puffer fish (3 color options)/2.transition/2.transition5.webp"
]

  constructor(level_end_x) {
    super();
    this.level_end_x = level_end_x;
    this.loadImages(this.IMAGES_PINK_FISH_SWIMING);
    this.loadImages(this.IMAGES_PINK_FISH_TRANSITION);
    this.x = level_end_x;
    this.y = this.calculateY();
    this.speed = 0.15 + Math.random() * 0.25;
    this.animate();
  }

  animate() {
    setStoppableInterval(this.moveLeft.bind(this), 1000 / this.hz);
    setStoppableInterval(this.fishSwiming.bind(this), 200);
    setStoppableInterval(this.checkFishAndCharacterDistance.bind(this), 400);
  }



  calculateY() {
    let number = Math.random() * 400;
    if (number < 200) {
      return 200 + number;
    } else if (number > 400) {
      return number - 200;
    }
    return number;
  }

  checkFishAndCharacterDistance(){
    if(this.fishIsNearCharacter()){
      console.log("RTest");
      
      this.playAnimation(this.IMAGES_PINK_FISH_TRANSITION)
    }
  }


  calculateX(){    
    let number = 300 + Math.random() * this.level_end_x
    console.log("calculateX",number);
    
    return number
}

  fishSwiming() {
    this.playAnimation(this.IMAGES_PINK_FISH_SWIMING);
  }

}
