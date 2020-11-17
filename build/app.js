class Car {
    constructor(name, colour, xPos, yPos) {
        this.giveName = (name) => {
            this._name = name;
        };
        this.setDistance = (distanceRaced) => {
            this._distance = distanceRaced * 200;
        };
        this.addXPosition = (xPos) => {
            this._xPosition += xPos;
        };
        this.resetX = () => {
            this._xPosition = 0;
        };
        this.getDistance = () => {
            return this._distance;
        };
        this.getXPosition = () => {
            return this._xPosition;
        };
        this.getYPostition = () => {
            return this._yPosition;
        };
        this.getName = () => {
            return this._name;
        };
        this._xPosition = xPos;
        this._yPosition = yPos;
        this._name = name;
        this.image = this.loadNewImage(`./assets/img/${colour}-racing-car.png`);
    }
    draw(ctx) {
        ctx.drawImage(this.image, this._xPosition, this._yPosition);
    }
    loadNewImage(source) {
        const img = new Image();
        img.src = source;
        return img;
    }
}
class KeyboardListener {
    constructor() {
        this.keyDown = (ev) => {
            this.keyCodeStates[ev.keyCode] = true;
        };
        this.keyUp = (ev) => {
            this.keyCodeStates[ev.keyCode] = false;
        };
        this.keyCodeStates = new Array();
        window.addEventListener("keydown", this.keyDown);
        window.addEventListener("keyup", this.keyUp);
    }
    isKeyDown(keyCode) {
        return this.keyCodeStates[keyCode] === true;
    }
}
KeyboardListener.KEY_SPACE = 32;
KeyboardListener.KEY_LEFT = 37;
KeyboardListener.KEY_UP = 38;
KeyboardListener.KEY_RIGHT = 39;
KeyboardListener.KEY_DOWN = 40;
KeyboardListener.KEY_R = 82;
class Rectangle {
    constructor(x, y, width, height) {
        this.lineWidth = 1;
        this.strokeStyle = "white";
        this.fill = true;
        this.fillStyle = "white";
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    drawRectangle(ctx) {
        ctx.save();
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        if (this.fill) {
            console.log(this.fillStyle);
            ctx.fillStyle = this.fillStyle;
            ctx.fill();
        }
        else {
            ctx.lineWidth = this.lineWidth;
            ctx.strokeStyle = this.strokeStyle;
            ctx.stroke();
        }
        ctx.restore();
    }
}
class Game {
    constructor(canvas) {
        this.loop = () => {
            this.road.fillStyle = "black";
            this.road.drawRectangle(this.ctx);
            this.roadSide1.fillStyle = this.trackSide;
            this.roadSide1.drawRectangle(this.ctx);
            this.roadSide2.fillStyle = this.trackSide;
            this.roadSide2.drawRectangle(this.ctx);
            this.stripe1.fillStyle = "rgba(230, 230, 230, 0.8)";
            this.stripe2.fillStyle = "rgba(230, 230, 230, 0.8)";
            this.stripe3.fillStyle = "rgba(230, 230, 230, 0.8)";
            this.stripe4.fillStyle = "rgba(230, 230, 230, 0.8)";
            this.stripe1.drawRectangle(this.ctx);
            this.stripe2.drawRectangle(this.ctx);
            this.stripe3.drawRectangle(this.ctx);
            this.stripe4.drawRectangle(this.ctx);
            if (this.gameState == "begin" && this.keyboardListener.isKeyDown(78)) {
                this.gameState = "nameChosen";
                this.car1.giveName(prompt("enter a name for car 1").toString());
                this.car2.giveName(prompt("enter a name for car 2").toString());
            }
            if (this.gameState == "begin" && this.keyboardListener.isKeyDown(82) || this.gameState == "nameChosen" && this.keyboardListener.isKeyDown(82)) {
                this.gameState = "dice";
                this.car1.setDistance(this.rollDice());
                this.car2.setDistance(this.rollDice());
                this.gameState = "animate";
            }
            else if (this.gameState == "animate") {
                if (this.car1.getXPosition() <= this.car1.getDistance()) {
                    this.car1.addXPosition(4);
                    this.car1.draw;
                }
                ;
                if (this.car2.getXPosition() <= this.car2.getDistance()) {
                    this.car2.addXPosition(4);
                    this.car2.draw;
                }
                ;
                if (this.ending == false) {
                    setTimeout(this.endState, 2000);
                    this.ending = true;
                }
            }
            else if (this.gameState == "end") {
                if (this.car1.getDistance() > this.car2.getDistance()) {
                    this.winner = this.car1.getName();
                }
                else if (this.car1.getDistance() < this.car2.getDistance()) {
                    this.winner = this.car2.getName();
                }
                else {
                    this.winner = "undecided";
                }
                ;
                if (this.keyboardListener.isKeyDown(84)) {
                    this.gameState = "begin";
                    this.restart();
                }
            }
            this.draw();
            requestAnimationFrame(this.loop);
        };
        this.endState = () => {
            this.gameState = "end";
            this.ending = true;
        };
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.road = new Rectangle(0, this.canvas.height / 2 - this.canvas.height / 4, this.canvas.width, this.canvas.height / 2);
        this.road.fillStyle = "black";
        this.road.drawRectangle(this.ctx);
        this.roadSide1 = new Rectangle(0, this.canvas.height / 2 - this.canvas.height / 4 - this.canvas.height / 16, this.canvas.width, this.canvas.height / 16);
        this.roadSide2 = new Rectangle(0, this.canvas.height / 2 + this.canvas.height / 4, this.canvas.width, this.canvas.height / 16);
        this.roadSide1.fillStyle = this.trackSide;
        this.roadSide2.fillStyle = this.trackSide;
        this.roadSide1.drawRectangle(this.ctx);
        this.roadSide2.drawRectangle(this.ctx);
        this.stripe1 = new Rectangle(canvas.width / 8, canvas.height / 2 - 15, 100, 30);
        this.stripe2 = new Rectangle(canvas.width / 8 * 3, canvas.height / 2 - 15, 100, 30);
        this.stripe3 = new Rectangle(canvas.width / 8 * 5, canvas.height / 2 - 15, 100, 30);
        this.stripe4 = new Rectangle(canvas.width / 8 * 7, canvas.height / 2 - 15, 100, 30);
        this.stripe1.fillStyle = "rgba(230, 230, 230, 0.8)";
        this.stripe2.fillStyle = "rgba(230, 230, 230, 0.8)";
        this.stripe3.fillStyle = "rgba(230, 230, 230, 0.8)";
        this.stripe4.fillStyle = "rgba(230, 230, 230, 0.8)";
        this.stripe1.drawRectangle(this.ctx);
        this.stripe2.drawRectangle(this.ctx);
        this.stripe3.drawRectangle(this.ctx);
        this.stripe4.drawRectangle(this.ctx);
        this.keyboardListener = new KeyboardListener();
        this.car1 = new Car("Kaasvreter", "red", 100, this.canvas.height / 2 - 100 - this.canvas.height / 8);
        this.car2 = new Car("Worstvreter", "green", 100, this.canvas.height / 2 - 100 + this.canvas.height / 8);
        this.gameState = "begin";
        this.ending = false;
        this.loop();
    }
    rollDice() {
        return this.randomNumber(1, 6);
    }
    restart() {
        this.car1 = new Car("Kaasvreter", "red", 100, this.canvas.height / 2 - 100 - this.canvas.height / 10);
        this.car2 = new Car("Worstvreter", "green", 100, this.canvas.height / 2 - 100 + this.canvas.height / 10);
        this.car1.resetX;
        this.car2.resetX;
        this.gameState = "begin";
        this.ending = false;
        this.draw();
        this.loop();
    }
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.road.fillStyle = "rgb(40, 40, 40)";
        this.road.drawRectangle(this.ctx);
        this.roadSide1.fillStyle = "black";
        this.roadSide1.drawRectangle(this.ctx);
        this.roadSide2.fillStyle = "black";
        this.roadSide2.drawRectangle(this.ctx);
        this.stripe1.fillStyle = "rgba(230, 230, 230, 0.8)";
        this.stripe2.fillStyle = "rgba(230, 230, 230, 0.8)";
        this.stripe3.fillStyle = "rgba(230, 230, 230, 0.8)";
        this.stripe4.fillStyle = "rgba(230, 230, 230, 0.8)";
        this.stripe1.drawRectangle(this.ctx);
        this.stripe2.drawRectangle(this.ctx);
        this.stripe3.drawRectangle(this.ctx);
        this.stripe4.drawRectangle(this.ctx);
        this.car1.draw(this.ctx);
        this.car2.draw(this.ctx);
        if (this.gameState === "begin") {
            this.writeTextToCanvas("Press R to Roll the dice", 30, this.canvas.width / 2, this.canvas.height - 100);
            this.writeTextToCanvas("Press N to choose your names", 30, this.canvas.width / 2, this.canvas.height - 50);
            this.writeTextToCanvas("Phase: begin", 40, this.canvas.width / 2, this.canvas.height / 10, "center", "red");
        }
        else if (this.gameState === "nameChosen") {
            this.writeTextToCanvas("Press R to Roll the dice", 30, this.canvas.width / 2, this.canvas.height - 100);
            this.writeTextToCanvas(`You have chosen the names ${this.car1.getName()} and ${this.car2.getName()}`, 30, this.canvas.width / 2, this.canvas.height - 50);
            this.writeTextToCanvas("Phase: begin", 40, this.canvas.width / 2, this.canvas.height / 10, "center", "red");
        }
        if (this.gameState === "dice" || this.gameState === "animate") {
            this.writeTextToCanvas(`${this.car1.getName()}`, 40, this.canvas.width / 10 * 9, this.canvas.height / 2 - 80, "center", "red");
            this.writeTextToCanvas(`${this.car2.getName()}`, 40, this.canvas.width / 10 * 9, this.canvas.height / 2 - 80 + this.canvas.height / 5, "center", "red");
        }
        if (this.gameState === "end") {
            this.writeTextToCanvas(`${this.car1.getName()}: ${this.car1.getDistance()}`, 40, this.canvas.width / 10 * 9, this.canvas.height / 2 - 80, "center", "red");
            this.writeTextToCanvas(`${this.car2.getName()}: ${this.car2.getDistance()}`, 40, this.canvas.width / 10 * 9, this.canvas.height / 2 - 80 + this.canvas.height / 5, "center", "red");
            this.writeTextToCanvas(`Winner is ${this.winner}`, 60, this.canvas.width / 2, this.canvas.height / 64 * 58, "center", "red");
            this.writeTextToCanvas("Press t to restart the game", 40, this.canvas.width / 2, this.canvas.height / 64 * 61, "center", "red");
        }
    }
    writeTextToCanvas(text, fontSize = 20, xCoordinate, yCoordinate, alignment = "center", color = "red") {
        this.ctx.font = `${fontSize}px Minecraft`;
        this.ctx.fillStyle = color;
        this.ctx.textAlign = alignment;
        this.ctx.fillText(text, xCoordinate, yCoordinate);
    }
    randomNumber(min, max) {
        return Math.round(Math.random() * (max - min) + min);
    }
}
let init = () => new Game(document.getElementById("canvas"));
window.addEventListener("load", init);
//# sourceMappingURL=app.js.map