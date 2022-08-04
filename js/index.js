//game costants
let inputDir = {x: 0, y:0};
const foodSound = new Audio('music/Food.wav');
const gameOverSound = new Audio('music/Dead.wav');
const moveSound = new Audio('music/Move.wav');
const musicSound = new Audio('music/GameBGM.mp3');
let speed = 8
let score = 0;
let lastPaintTime = 0;
let snakeArr = [
    {x: 13, y: 15}
];

food = {x: 6, y: 7};

//Game Functions
function main(ctime) {
    window.requestAnimationFrame(main);
    // console.log(ctime)
    if((ctime - lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

function isCollide(snake) {
    //if you bump into snake
    for (let i = 1; i< snakeArr.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }
    // if you bump into the wall
    if(snake[0].x >= 18 || snake[0].x <=0 && snake[0].y >= 18 || snake[0].y <=0){
        return true;
    }
    return false;
}


function gameEngine(){
    //Part 1: Updating the snake array & Food
    if(isCollide(snakeArr)){
        gameOverSound.play();
        musicSound.pause();
        inputDir = {x: 0, y: 0};
        alert("Game Over Press any key to Play again")
        snakeArr= [{x: 13, y: 15}];
        // musicSound.play();
        score = 0;
    }

    //If you have eaten the food increment the score and regenerate the food
    if(snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
        foodSound.play();
        score += 1;
        if(score>hiscoreeval){
            hiscoreval = score;
            localStorage.setItem('hiscore', JSON.stringify(hiscoreval));
            hiscoreBox.innerHTML = "HiScore: " + hiscoreval;
        }
        scoreBox.innerHTML = "Score:" + score;
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y});
        let a = 2;
        let b = 16;
        food = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())}
    }

    //moving algorithm
    for (let i = snakeArr.length - 2; i>=0; i--) {
        snakeArr[i+1] = {...snakeArr[i]}; //dig deep about it
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;



    //Part 2: Display the snake and Food
    //Display the Snake
    board.innerHTML = "";
    snakeArr.forEach((e, index)=>{
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
    });

    //Display the Food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}





//main logic starts here
// inputDir is velocity of Snake if it moves vertfical the x will be 0 and if moves horizontal the y will be 0
musicSound.play();
let hiscore = localStorage.getItem("hiscore");
if(hiscore === null){
    hiscoreeval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreeval));
}
else{
    hiscoreeval = JSON.parse(hiscore);
    hiscore.innerHTML = "Hiscore" + hiscore
}

window.requestAnimationFrame(main)
window.addEventListener('keydown', e =>{
    inputDir = {x: 0, y: 1}//start the game
    moveSound.play();
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