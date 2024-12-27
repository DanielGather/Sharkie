class StatusBar extends DrawableObject {
  IMAGES_LIFE = ["img/4. Marcadores/green/Life/0_  copia 3.png", "img/4. Marcadores/green/Life/20_ copia 4.png", "img/4. Marcadores/green/Life/40_  copia 3.png", "img/4. Marcadores/green/Life/60_  copia 3.png", "img/4. Marcadores/green/Life/80_  copia 3.png", "img/4. Marcadores/green/Life/100_  copia 2.png"];

  IMAGES_LIFE_ICON = ["img/4. Marcadores/green/100_  copia 3.png"];

  percentage = 100;
  poisonIcon = "img/4. Marcadores/green/100_ copia 5.png";
  lifeIcon = "img/4. Marcadores/green/100_  copia 3.png";
  coinIcon = "img/4. Marcadores/green/100_ copia 6.png";
  icons = []; 

  constructor() {
    super();
    this.loadImages(this.IMAGES_LIFE);
    this.setPercentage(100);
  }


  setPercentage(percentage) {
    this.x = 0;
    this.y = 0;
    this.width = 200;
    this.height = 60;
    this.percentage = percentage;
    let path = this.IMAGES_LIFE[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  resolveImageIndex() {
    if (this.percentage == 100) {
      return 5;
    } else if (this.percentage > 80) {
      return 4;
    } else if (this.percentage > 60) {
      return 3;
    } else if (this.percentage > 40) {
      return 2;
    } else if (this.percentage > 20) {
      return 1;
    } else {
      return 0;
    }
  }

  loadSingleImage(x, y, weight, height, img) {
    this.x = x;
    this.y = y;
    this.height = height;
    this.width = weight;
    this.loadImage(img);
  }
}
