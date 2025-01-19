let sprites;
async function importSprites(){
    sprites = await fetch('./js/sprites.json').then(r => r.json());
}