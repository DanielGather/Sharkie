let repeatCanvas = 5;
let coinsPerLevel = 20;
let PoisonBottleLevel = 15;
let enemyPerLevel = 20;
let speedNormalFish = 0.5;
let speedFromDangerousFish = 0.1;
let canvasStep = 1024;
let first_level_end_x_ = repeatCanvas * canvasStep;
let dangerousEnemiesPerLevel = repeatCanvas;

const level1 = new Level(

  [
    // new BackgroundObject("img/3.Background/Dark/1.png", 0,0),
    new BackgroundObject("img/3.Background/Layers/5. Water/D2.webp", -1024, 0),
    new BackgroundObject("img/3.Background/Layers/1. Light/2.webp", -1024, 0),
    new BackgroundObject("img/3.Background/Layers/3.Fondo 1/D2.webp", -1024, 0),
    new BackgroundObject("img/3.Background/Layers/4.Fondo 2/D2.webp", -1024, 0),
    new BackgroundObject("img/3.Background/Layers/2.Floor/D2.webp", -1024, 0),
  ],
  coinsPerLevel, // Coins
  repeatCanvas, // repeatCount
  canvasStep,  // step(width)
  PoisonBottleLevel, // PoisonBottle
  enemyPerLevel,
  dangerousEnemiesPerLevel,
  speedFromDangerousFish,
  speedNormalFish
);