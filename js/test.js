let imageCache = {};

function loadImagesTest(arr) {
    // Erstelle ein Array von Promises für die Bilder
    const promises = arr.map((path) => {
      return new Promise((resolve, reject) => {
        const image = new Image();
        image.src = path;
  
        image.onload = () => {
          imageCache[path] = image; // Bild im Cache speichern
          resolve(); // Promise wird aufgelöst, wenn das Bild geladen ist
        };
  
        image.onerror = () => {
          reject(`Bild konnte nicht geladen werden: ${path}`); // Promise wird abgelehnt, wenn ein Fehler auftritt
        };
      });
    });
  
    // Gib die Liste von Promises zurück
    return Promise.all(promises);
  }

  async function preloadImagesAndContinue() { 
    try {
      console.log("Lade alle Bilder...");
  
      // Warte darauf, dass alle Bilder geladen werden 
      await Promise.all([
        loadImagesTest(sprites.character.swim),
        loadImagesTest(sprites.character.bubbleAttack),
        loadImagesTest(sprites.character.idle),
        loadImagesTest(sprites.character.longIdle),
        loadImagesTest(sprites.character.electroDead),
        loadImagesTest(sprites.character.hurtElectro),
        loadImagesTest(sprites.character.finSlap)

        // loadImagesTest(sprites.greenFish.swim),
        // loadImagesTest(sprites.greenFish.transition),
        // loadImagesTest(sprites.greenFish.bubbleSwim),
        // loadImagesTest(sprites.greenFish.isDead),
      ]);
  
      console.log("Alle Bilder wurden erfolgreich geladen!");
    } catch (error) {
      console.error("Fehler beim Laden der Bilder:", error);
    }
  }

  function playAnimationTest(images) {
    if (this.currentAnimation !== images) {
      this.currentAnimation = images; // Speichere den neuen Bildsatz
      this.currentImage = 0; // Setze die Animation zurück
    }
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = imageCache[path];
    this.currentImage++;
  }

//   loadImagesTest(["img/1.Sharkie/3.Swim/1.webp","img/1.Sharkie/3.Swim/2.webp","img/1.Sharkie/3.Swim/3.webp","img/1.Sharkie/3.Swim/4.webp","img/1.Sharkie/3.Swim/5.webp","img/1.Sharkie/3.Swim/6.webp"])
//   loadImagesTest(["img/1.Sharkie/1.IDLE/1.webp", "img/1.Sharkie/1.IDLE/2.webp", "img/1.Sharkie/1.IDLE/3.webp", "img/1.Sharkie/1.IDLE/4.webp", "img/1.Sharkie/1.IDLE/5.webp", "img/1.Sharkie/1.IDLE/6.webp", "img/1.Sharkie/1.IDLE/7.webp", "img/1.Sharkie/1.IDLE/8.webp", "img/1.Sharkie/1.IDLE/9.webp", "img/1.Sharkie/1.IDLE/10.webp", "img/1.Sharkie/1.IDLE/11.webp", "img/1.Sharkie/1.IDLE/12.webp", "img/1.Sharkie/1.IDLE/13.webp", "img/1.Sharkie/1.IDLE/14.webp", "img/1.Sharkie/1.IDLE/15.webp", "img/1.Sharkie/1.IDLE/16.webp", "img/1.Sharkie/1.IDLE/17.webp", "img/1.Sharkie/1.IDLE/18.webp"])