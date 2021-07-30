class SnakePart {
    x;
    y;
    constructor(x,y) {
        this.x = x;
        this.y = y;
    }
    drawSnakePart () {
        ctx.fillStyle = snake_col;
        // if (dx!==0) {
        //     ctx.fillRect(this.x, this.y+5, cellSize, cellSize-10);
        // } else {
        //     ctx.fillRect(this.x+5, this.y, cellSize -10, cellSize);
        // }
        // ctx.strokestyle = snake_border;
        ctx.fillRect(this.x, this.y, cellSize, cellSize);
        // ctx.strokeRect(this.x, this.y, cellSize, cellSize);
    }
    clearSnakePart () {
        ctx.clearRect(this.x, this.y, cellSize, cellSize);
    }
}