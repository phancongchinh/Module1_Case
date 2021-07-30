class Food {
    x;
    y;
    constructor() {
        this.x = initRandomX();
        this.y = initRandomY();
    }
    drawFood () {
        let foodImg = new Image();
        foodImg.src = "../Snake/img/food.png";
        ctx.drawImage(foodImg,0,0,foodImg.width,foodImg.height,this.x+5,this.y,cellSize-10,cellSize);
    }
}