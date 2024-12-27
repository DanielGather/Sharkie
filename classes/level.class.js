class Level {
  enemies;
  canvas;
  backgroundObjects;
  static level_end_x;;
  repeatCount;
  step;

  constructor(enemies, backgroundObjects, repeatCount, step) {
    Level.level_end_x = repeatCount * step;
    this.enemies = enemies;
    this.backgroundObjects = backgroundObjects;
    this.repeatCount = repeatCount;
    this.step = step;
    this.createBackgroundObjects(repeatCount, step)
  }

  createBackgroundObjects(repeatCount, step) {
    const backgroundLayers = ["img/3.Background/Layers/5. Water/D", "img/3.Background/Layers/1. Light/", "img/3.Background/Layers/3.Fondo 1/D", "img/3.Background/Layers/4.Fondo 2/D", "img/3.Background/Layers/2.Floor/D"];
    let variableZahl = 1;
    let count = 0;
    this.level_end_x = repeatCount * step;
    for (let i = 0; i < repeatCount; i++) {
      let x = i * step;
      backgroundLayers.forEach((backgroundLayerBase) => {
        this.backgroundObjects.push(new BackgroundObject(`${backgroundLayerBase}${variableZahl}.png`, x, 0));
      });
      count++;
      if (count >= 1) {
        variableZahl = variableZahl === 1 ? 2 : 1;
        count = 0;
      }  
    }
  }
}
