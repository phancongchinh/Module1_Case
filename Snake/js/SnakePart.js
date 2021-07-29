class SnakePart {
    x;
    y;
    constructor(x,y) {
        this.x = x;
        this.y = y;
    }
    drawSnakePart () {
        ctx.fillStyle = snake_col;
        ctx.strokestyle = snake_border;
        ctx.fillRect(this.x, this.y, 20, 20);
        ctx.strokeRect(this.x, this.y, 20, 20);
    }
}