const level1 = new Level(
  [
    new Fish('img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.webp'),
    new Fish('img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim1.webp'),
    new Fish('img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim1.webp'),
    new Fish('img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim1.webp'),
    new Fish('img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim1.webp'),
    new Fish('img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim1.webp'),
    new Endboss(),
  ],
  [
    // new BackgroundObject("img/3.Background/Dark/1.png", 0,0),
    new BackgroundObject("img/3.Background/Layers/5. Water/D2.webp", -1024, 0),
    new BackgroundObject("img/3.Background/Layers/1. Light/2.webp", -1024, 0),
    new BackgroundObject("img/3.Background/Layers/3.Fondo 1/D2.webp", -1024, 0),
    new BackgroundObject("img/3.Background/Layers/4.Fondo 2/D2.webp", -1024, 0),
    new BackgroundObject("img/3.Background/Layers/2.Floor/D2.webp", -1024, 0),
  ],
  15, // Coins
  4, // repeatCount
  1024,  // step(width)
  10 // PoisonBottle
);
