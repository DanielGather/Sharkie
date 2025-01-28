// let audioFiles = {};

// async function loadAudio() {
//     audioFiles.character = {
//         walking_SOUND: new Audio("audio/fishSwiming.mp3"),
//         sleepSound: new Audio("audio/sleepSound.wav"),
//         backgroundSound: new Audio("audio/backgroundSound.mp3"),
//         finSlapSound: new Audio("audio/finSlap.mp3"),
//         hurtSound: new Audio("audio/electroHurt.mp3"),
//         scarySound: new Audio("audio/whaleSound.mp3"),
//         bubbleShotSound: new Audio("audio/bubbleShot.wav"),
//         coinCollectedSound: new Audio("audio/coinCollection.wav"),
//         loseSound: new Audio("audio/loseSound.mp3"),
//         winSound: new Audio("audio/winSound.mp3"),
//         hurtBossSound: new Audio("audio/hurtSoundBoss.wav"),
//         attackBossSound: new Audio("audio/monsterBite.wav")
//     };

//     const promises = Object.values(audioFiles.character).map((audio) => {
//         return new Promise((resolve, reject) => {
//             audio.addEventListener("canplaythrough", resolve, { once: true });
//             audio.addEventListener("error", reject, { once: true });
//             audio.load();
//         });
//     });

//     try {
//         await Promise.all(promises);
//         console.log("Alle Sounds erfolgreich geladen.");
//     } catch (error) {
//         console.error("Ein Fehler ist beim Laden der Sounds aufgetreten:", error);
//     }
// }