class Food {
    x;
    y;
    constructor() {
        this.x = initRandomX();
        this.y = initRandomY();
    }
    drawFood () {
        ctx.fillStyle = 'lightgreen';
        ctx.strokestyle = 'darkgreen';
        ctx.fillRect(this.x, this.y, 20, 20);
        ctx.strokeRect(this.x, this.y, 20, 20);
    }
}