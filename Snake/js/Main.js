const cellSize = 50;
// const cellSize = 10;

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const snakeHead = new Image();

const snake_col = 'lightblue';
const snake_init_length = 5;
let bite = new Audio("sound/swallow.mp3")
let gameOver = new Audio("sound/gameover.mp3")

let reversing = false;

let dx = cellSize;
let dy = 0;

let score = 0;
let highScore = 0;

let speedSelected = "hardcore";
let timeoutValue = 150;

let food = new Food;
let snake = [];

function initRandomX() {
    return Math.trunc(Math.random() * canvas.clientWidth / cellSize) * cellSize;
}

function initRandomY() {
    return Math.trunc(Math.random() * canvas.clientHeight / cellSize) * cellSize;
}

function foodOnSnake() {
    for (let i = 0; i < snake.length; i++) {
        if (food.x === snake[i].x && food.y === snake[i].y)
            return true;
    }
    return false;
}

function initFood() {
    while (foodOnSnake()) {
        food = new Food;
    }
}

function reInitSnake() {
    dx = cellSize;
    dy = 0;
    clearSnake();
    snake = [];
    for (let j = 0; j < snake_init_length; j++) {
        snake[j] = new SnakePart(cellSize * (snake_init_length-j-1 ), 0);
    }
}

// function loadImage(path) {
//     let image = new Image();
//     let promise = new Promise((resolve, reject) => {
//         image.onload = () => resolve(image);
//         image.onerror = reject;
//     });
//     image.src = path;
//     return promise;
// }
// loadImage('../Snake/img/snakeHead.png')

reInitSnake();
main()

function main() {
    function onEachMove() {
        reversing = false;
        showInfo();
        food.drawFood();
        clearCanvas();
        move();
        if (checkGameOver()) {
            gameOver.play();
            if (confirm("Game Over! Try again?")) {
                clearSnake();
                reInitSnake();
                score = 0;
                drawSnake();
            } else {
                return;
            }
        }
        drawSnake();
        checkFoodIsEaten()
        main();
    }
    setTimeout(onEachMove, timeoutValue)
}

function clearCanvas() {
    clearSnake();
    ctx.strokeRect(0, 0, canvas.width, canvas.height);
}

function move() {
    let newHead = new SnakePart(snake[0].x + dx, snake[0].y + dy);
    snake.unshift(newHead);
    if (snake[0].x !== food.x || snake[0].y !== food.y) {
        snake.pop();
    }
}

function drawSnake() {
    if (dx !== 0) {
        switch (dx) {
            case cellSize:
                snakeHead.src = '../Snake/img/snakeHeadRight.png';
                break;
            case -cellSize:
                snakeHead.src = '../Snake/img/snakeHeadLeft.png';
                break;
        }
        ctx.drawImage(snakeHead,0,0,snakeHead.width,snakeHead.height,snake[0].x,snake[0].y+5,cellSize,cellSize-10);
    } else {
        switch (dy) {
            case cellSize:
                snakeHead.src = '../Snake/img/snakeHeadDown.png';
                break;
            case -cellSize:
                snakeHead.src = '../Snake/img/snakeHeadUp.png';
                break;
        }
        ctx.drawImage(snakeHead,0,0,snakeHead.width,snakeHead.height,snake[0].x+5,snake[0].y,cellSize-10,cellSize);
    }
    for (let i = 1; i < snake.length; i++) {
        snake[i].drawSnakePart();
    }
}

function clearSnake() {
    for (let i = 0; i < snake.length; i++) {
        snake[i].clearSnakePart();
    }
}

function changeDirection(evt) {
    const goingUp = dy === -cellSize;
    const goingDown = dy === cellSize;
    const goingRight = dx === cellSize;
    const goingLeft = dx === -cellSize;

    if (reversing) return;
    reversing = true;

    if (evt.keyCode === 37 && !goingRight) {
        dx = -cellSize;
        dy = 0;
    }
    if (evt.keyCode === 38 && !goingDown) {
        dx = 0;
        dy = -cellSize;
    }
    if (evt.keyCode === 39 && !goingLeft) {
        dx = cellSize;
        dy = 0;
    }
    if (evt.keyCode === 40 && !goingUp) {
        dx = 0;
        dy = cellSize;
    }
}

window.addEventListener('keydown', changeDirection);

function changeSpeed(evt) {
    if (evt.keyCode === 32) {
        switch (speedSelected) {
            case "normal":
                speedSelected = "hardcore";
                timeoutValue = 150;
                break;
            case "hardcore":
                speedSelected = "incredible";
                timeoutValue = 50;
                break;
            case "incredible":
                speedSelected = "normal";
                timeoutValue = 500;
                break;
        }
    }
}

window.addEventListener('keydown', changeSpeed);

function checkFoodIsEaten() {
    let foodIsEaten = snake[0].x === food.x && snake[0].y === food.y;
    if (foodIsEaten) {
        bite.play();
        initFood();
        score += 10;
    }
}

function showInfo() {
    document.getElementById("speed").innerHTML = " Press Space bar to change Speed!";
    document.getElementById("score").innerHTML = "Score: " + score;
    if (score >= highScore) {
        highScore = score;
    }
    document.getElementById("highscore").innerHTML = "Best: " + highScore;
}

function checkGameOver() {
    let hitLeftWall = snake[0].x < 0;
    let hitRightWall = snake[0].x >= canvas.clientWidth;
    let hitTopWall = snake[0].y < 0;
    let hitBottomWall = snake[0].y >= canvas.clientHeight;
    let hitTail;
    for (let i = 4; i < snake.length; i++) {
        if (snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
            hitTail = true;
        }
    }
    return (hitTail || hitTopWall || hitRightWall || hitLeftWall || hitBottomWall);
}