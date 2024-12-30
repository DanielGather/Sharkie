class Level {
  static level_end_x;
  enemies;
  canvas;
  backgroundObjects;
  repeatCount;
  step;
  coinsArray = [];

  constructor(enemies, backgroundObjects, coins, repeatCount, step) {
    Level.level_end_x = repeatCount * step;
    this.enemies = enemies;
    this.backgroundObjects = backgroundObjects;
    this.coins = coins;
    this.repeatCount = repeatCount;
    this.step = step;
    this.createBackgroundObjects(repeatCount, step);
    this.createCoins(coins);
  }

  createCoins(coins) {
    for (let i = 0; i < coins; i++) {
      const angleStep = (1.25 * Math.PI) / coins; // Winkelabstand zwischen den Coins
      const angle = angleStep * i; // Winkel für den aktuellen Coin
      let x = 600 + 75 * Math.cos(-angle); // X-Koordinate
      let y = 150 + 75 * Math.sin(-angle);
      this.coinsArray.push(new Coins(x, y));
    }
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
