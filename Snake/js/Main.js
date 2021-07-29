const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const board_border = 'black';
const board_background = "white";
const snake_col = 'lightblue';
const snake_border = 'blue';
const snake_init_length = 5;
let bite = new Audio("sound/swallow.mp3")
let dx = 20;
let dy = 0;
let score = 0;

let speedSelected = "normal";
let timeoutValue = 1000;

let food = new Food;
let snake = [];

function initRandomX() {
    return Math.trunc(Math.random() * canvas.clientWidth / 20) * 20;
}

function initRandomY() {
    return Math.trunc(Math.random() * canvas.clientHeight / 20) * 20;
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

function initSnake() {
    for (let i = 0; i < snake_init_length; i++) {
        snake[i] = new SnakePart(80 - 20 * i, 0);
    }
}


initSnake();

main();

function main() {
    function onEachMove() {
        if (checkGameOver()) {
            alert("Game Over!")
            return;
        }
        clearCanvas();
        showScore();
        food.drawFood();
        move();
        drawSnake();
        checkFoodIsEaten()
        main();
    }
    setTimeout(onEachMove, timeoutValue)
}

function clearCanvas() {
    ctx.fillStyle = board_background;
    ctx.strokestyle = board_border;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
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
    for (let i = 0; i < snake.length; i++) {
        snake[i].drawSnakePart();
    }
}

function changeDirection(evt) {
    const goingUp = dy === -20;
    const goingDown = dy === 20;
    const goingRight = dx === 20;
    const goingLeft = dx === -20;

    switch (evt.keyCode) {
        case 37:
            if (!goingRight) {
                dx = -20;
                dy = 0;
            }
            break;
        case 39:
            if (!goingLeft) {
                dx = 20;
                dy = 0;
            }
            break;
        case 38:
            if (!goingDown) {
                dx = 0;
                dy = -20;
            }
            break;
        case 40:
            if (!goingUp) {
                dx = 0;
                dy = 20;
            }
            break;
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

function showScore() {
    document.getElementById("score").innerHTML = "Score: " + score;
}

function checkGameOver() {
    let hitLeftWall = snake[0].x < 0;
    let hitRightWall = snake[0].x > canvas.clientWidth;
    let hitTopWall = snake[0].y < 0;
    let hitBottomWall = snake[0].y > canvas.clientHeight;
    let hitTail;
    for (let i = 4; i < snake.length; i++) {
        if (snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
            hitTail = true;
        }
    }
    return (hitTail || hitTopWall || hitRightWall || hitLeftWall || hitBottomWall);
}