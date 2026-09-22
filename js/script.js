const canvas = document.getElementById('canvas');
const ctx = document.getContext('2d')

canvas.width = innerWidth;
canvas.height = innerWidth;
const width = canvas.width;
const height = canvas.height;




function draw(){
    
}
function gameLoop(){
    requestAnimationFrame(gameLoop)
}


gameLoop()