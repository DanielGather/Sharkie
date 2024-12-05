class Character extends MovableObject {
  width = 200;
  height = 200;
  IMAGES_SWIMING = [
    "img/1.Sharkie/3.Swim/1.png",
    "img/1.Sharkie/3.Swim/2.png", 
    "img/1.Sharkie/3.Swim/3.png", 
    "img/1.Sharkie/3.Swim/4.png", 
    "img/1.Sharkie/3.Swim/5.png", 
    "img/1.Sharkie/3.Swim/6.png"
];



  constructor() {
    super().loadImage("img/1.Sharkie/3.Swim/1.png");
    this.loadImages(this.IMAGES_SWIMING);
    this.animate();
  }

  animate() {
    setInterval(()=>{
        let i = this.currentImage % this.IMAGES_SWIMING.length;
        let path = this.IMAGES_SWIMING[i];
        this.img = this.imageCache[path];
        this.currentImage++;

    }, 200)
  }

  jump() {

  }
}
