class Character extends MovableObject {
  width = 200;
  height = 200;
  speed = 1;
  IMAGES_SWIMING = [
    "img/1.Sharkie/3.Swim/1.png",
    "img/1.Sharkie/3.Swim/2.png", 
    "img/1.Sharkie/3.Swim/3.png", 
    "img/1.Sharkie/3.Swim/4.png", 
    "img/1.Sharkie/3.Swim/5.png", 
    "img/1.Sharkie/3.Swim/6.png"
];

world;

  constructor() {
    super().loadImage("img/1.Sharkie/3.Swim/1.png");
    this.loadImages(this.IMAGES_SWIMING);
    this.animate();
  }

  animate() {

      setInterval(()=>{
        if (this.world.keyboard.RIGHT){
          this.x += this.speed;
          this.otherDirection = false;

        }
        if (this.world.keyboard.LEFT){
          this.x -= this.speed;
          this.otherDirection = true;

        }
        if (this.world.keyboard.UP){
          this.y -= this.speed;
        }
        if (this.world.keyboard.DOWN){
          this.y += this.speed;
        }
        this.world.camera_x = -this.x;
      }, 1000 / this.hz)
      

      setInterval(()=>{
        if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT || this.world.keyboard.UP || this.world.keyboard.DOWN){
          // Walk animation
          let i = this.currentImage % this.IMAGES_SWIMING.length;
          let path = this.IMAGES_SWIMING[i];
          this.img = this.imageCache[path];
          this.currentImage++;
        }
      }, 150)
  }


  jump() {

  }
}
