class World {
  character = new Character();
//   barrier = new Barrier();
  enemies = [
    new Fish('img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png'), 
    new Fish('img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim1.png'), 
    new Fish('img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim1.png')
  ];

  canvas;
  ctx;

  backgroundObjects = [
    // new BackgroundObject("img/3.Background/Dark/1.png", 0,0),
    new BackgroundObject("img/3.Background/Layers/5. Water/D1.png", 0,0),
    new BackgroundObject("img/3.Background/Layers/1. Light/1.png", 0,0),
    new BackgroundObject("img/3.Background/Layers/3.Fondo 1/D1.png", 0,0),
    new BackgroundObject("img/3.Background/Layers/4.Fondo 2/D1.png", 0,0),
    new BackgroundObject("img/3.Background/Layers/2.Floor/D1.png", 0,0)


];

  constructor(canvas) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.draw();
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.addObjectsToMap(this.backgroundObjects);
    this.addObjectsToMap(this.enemies);
    this.addToMap(this.character);
    // this.addToMap(this.barrier);

    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  addObjectsToMap(objects) {
    objects.forEach((o) => {
        this.addToMap(o);
      });
  }

  addToMap(mo) {
    this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
  }
}
