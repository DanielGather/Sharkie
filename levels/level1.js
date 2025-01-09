let coinsLevel = 20
let repeatCountLevel = 2;
let stepLevel = 1024;
let PoisonBottleLevel = 20;
let first_level_end_x_ = repeatCountLevel * stepLevel;
let enemyLevel = 1

const level1 = new Level(

  [
    // new BackgroundObject("img/3.Background/Dark/1.png", 0,0),
    new BackgroundObject("img/3.Background/Layers/5. Water/D2.webp", -1024, 0),
    new BackgroundObject("img/3.Background/Layers/1. Light/2.webp", -1024, 0),
    new BackgroundObject("img/3.Background/Layers/3.Fondo 1/D2.webp", -1024, 0),
    new BackgroundObject("img/3.Background/Layers/4.Fondo 2/D2.webp", -1024, 0),
    new BackgroundObject("img/3.Background/Layers/2.Floor/D2.webp", -1024, 0),
  ],
  coinsLevel, // Coins
  repeatCountLevel, // repeatCount
  stepLevel,  // step(width)
  PoisonBottleLevel, // PoisonBottle
  enemyLevel
);