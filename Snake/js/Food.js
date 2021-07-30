class Food {
    x;
    y;
    constructor() {
        this.x = initRandomX();
        this.y = initRandomY();
    }
    drawFood () {
        ctx.drawImage(foodImg,0,0,foodImg.width,foodImg.height,this.x,this.y,cellSize,cellSize);
    }
}