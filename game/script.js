const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const boxSize = 20;
let snake = [{x: 9 * boxSize, y: 10 * boxSize}];
let direction = '';
let food = {
    x: Math.floor(Math.random() * 19) * boxSize,
    y: Math.floor(Math.random() * 19) * boxSize
};
let score = 0;

document.addEventListener('keydown', changeDirection);

function changeDirection(event) {
    const key = event.keyCode;
    if (key === 37 && direction !== 'RIGHT') direction = 'LEFT';
    else if (key === 38 && direction !== 'DOWN') direction = 'UP';
    else if (key === 39 && direction !== 'LEFT') direction = 'RIGHT';
    else if (key === 40 && direction !== 'UP') direction = 'DOWN';
}

function draw() {
    // Background
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw Snake
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = (i === 0) ? 'lime' : 'green';
        ctx.fillRect(snake[i].x, snake[i].y, boxSize, boxSize);
    }

    // Draw Food
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, boxSize, boxSize);

    // Old head position
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    // Update snake position
    if (direction === 'LEFT') snakeX -= boxSize;
    if (direction === 'UP') snakeY -= boxSize;
    if (direction === 'RIGHT') snakeX += boxSize;
    if (direction === 'DOWN') snakeY += boxSize;

    // Check if snake eats the food
    if (snakeX === food.x && snakeY === food.y) {
        score++;
        food = {
            x: Math.floor(Math.random() * 19) * boxSize,
            y: Math.floor(Math.random() * 19) * boxSize
        };
    } else {
        snake.pop();
    }

    // Add new head to the snake
    const newHead = {x: snakeX, y: snakeY};
    
    // Check game over
    if (snakeX < 0 || snakeY < 0 || snakeX >= canvas.width || snakeY >= canvas.height || collision(newHead, snake)) {
        clearInterval(game);
        alert('Game Over! Your score: ' + score);
    }

    snake.unshift(newHead);
}

function collision(head, snake) {
    for (let i = 0; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            return true;
        }
    }
    return false;
}

// Set game speed
let game = setInterval(draw, 100);
