class StatusBar extends DrawableObject {

  constructor() {
    super().loadImage("img/4. Marcadores/green/lifePoisonCoinsIcons.webp");
    this.x = 0;
    this.y = 0;
    this.width = 50;
    this.height = 150;
    this.loadImage("img/4. Marcadores/green/lifePoisonCoinsIcons.webp");
    
    // this.setPercentage(100);
  }


  // setPercentage(percentage) {
  //   this.x = 0;
  //   this.y = 0;
  //   this.width = 200;
  //   this.height = 60;
  //   this.percentage = percentage;
  //   let path = this.IMAGES_LIFE[this.resolveImageIndex()];
  //   this.img = this.imageCache[path];
  // }

  // resolveImageIndex() {
  //   if (this.percentage == 100) {
  //     return 5;
  //   } else if (this.percentage > 80) {
  //     return 4;
  //   } else if (this.percentage > 60) {
  //     return 3;
  //   } else if (this.percentage > 40) {
  //     return 2;
  //   } else if (this.percentage > 20) {
  //     return 1;
  //   } else {
  //     return 0;
  //   }
  // }

  // loadSingleImage(x, y, weight, height, img) {
  //   this.x = x;
  //   this.y = y;
  //   this.height = height;
  //   this.width = weight;
  //   this.loadImage(img);
  // }
}
