//game constant and variables
let inputDir = {x: 0, y: 0};
const foodsound = new Audio('food.mp3');
const gameoversound = new Audio('gameover.mp3');
const movesound = new Audio('move.mp3');
const musicsound = new Audio('music.mp3');
let score = 0;
let speed = 5;
let lastpainttime = 0;
let snakeArr = [
    {x: 13, y: 15}
]
food = {x: 6, y: 7};


//game functions
let levelboard = document.getElementById('levelboard');
levelboard.innerHTML = 'Level : ' + speed;
let levelUp = document.getElementById('levelUp');
levelUp.addEventListener('click', ()=>{
    speed += 1;
 console.log(speed);
 let levelboard = document.getElementById('levelboard');
levelboard.innerHTML = 'Level : ' + speed;

});
let levelDown = document.getElementById('levelDown');
levelDown.addEventListener('click', ()=>{
    speed -= 1;
 console.log(speed);
 let levelboard = document.getElementById('levelboard');
levelboard.innerHTML = 'Level : ' + speed;
});


// var myAudio = document.getElementById("myAudio");
let gamemusic = document.getElementById('gamemusic');
var isPlaying = false;

function togglePlay() {
    isPlaying ? musicsound.pause() : musicsound.play();

};

musicsound.onplaying = function() {
  isPlaying = true;
  gamemusic.innerHTML = "game music off";
};
musicsound.onpause = function() {
  isPlaying = false;
  gamemusic.innerHTML = "game music on";
};







function main(ctime) {
    window.requestAnimationFrame(main);
    // console.log(ctime);
    if ((ctime - lastpainttime)/1000 < 1/speed){
        return;
    }
    lastpainttime = ctime;
    gameEngine();
}

function isCollide(snake) {
    //if colide into itself then
    for (let i = 1; i < snakeArr.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }
    //if you collide into the wall then
    if(snake[0].x >= 18 || snake[0].x <=0 || snake[0].y >= 18 || snake[0].y <=0){
        return true;
    }

}
function gameEngine() {
    //updating the snake array and food
    if(isCollide(snakeArr)){
        gameoversound.play();
        inputDir = {x: 0, y: 0};
        alert("Game Over! Press any key to play again!");
        snakeArr = [{x: 13, y: 15}];
        score = 0;    
    }
    //if you have eaten the food, increment the score and regenerate the food 
    if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y});
        score += 1;
        if (score>hiscore) {
            hiscoreval = score;
            localStorage.setItem('hiscore',JSON.stringify(hiscoreval));
            hiscoreboard.innerHTML = "Hi-Score " + hiscoreval;
        }
        foodsound.play();
        let a = 2;
        let b = 16;
        scoreboard.innerHTML = "Score: " + score;
        food = {x: Math.round(a + (b-a)*Math.random()),y: Math.round(a + (b-a)*Math.random())}
    }

    //moveing the snake
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i+1] = {...snakeArr[i]};
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    //display the snake
    board.innerHTML = "";
    snakeArr.forEach((e, index) =>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if(index === 0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    })
    //display the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);    

}


//Main logic
let hiscore = localStorage.getItem('hiscore');
if(hiscore === null){
    hiscoreval = 0;
    localStorage.setItem('hiscore',JSON.stringify(hiscoreval));
}
else{
    hiscoreval = JSON.parse(hiscore);
    hiscoreboard.innerHTML = "Hi-Score " + hiscore;
}


window.requestAnimationFrame(main);
window.addEventListener("keydown", e=>{
    inputDir = {x: 0, y: 1} // start the game
    movesound.play();
    // musicsound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1;
            break;
        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y = 0;
            break;
    
        default:
            break;
    }
});









