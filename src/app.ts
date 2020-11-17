/// <reference path="Car.ts" />
/// <reference path="KeyboardListener.ts" />
/// <reference path="Rectangle.ts" />

class Game {
  // Necessary canvas attributes
  private readonly canvas: HTMLCanvasElement;
  private readonly ctx: CanvasRenderingContext2D;

  // road
  private road: Rectangle;
  private roadSide1: Rectangle;
  private roadSide2: Rectangle;
  private trackSide: CanvasPattern;
  private stripe1: Rectangle;
  private stripe2: Rectangle;
  private stripe3: Rectangle;
  private stripe4: Rectangle;
  
  // KeyboardListener so the player can move
  private keyboardListener: KeyboardListener;
  
  // the state of the game: begin, dice, animate and end
  private gameState: string;

  private winner: string;
  
  // is the game ending? T/F   
  private ending: boolean;
  
  // Car instances, one for each player
  private car1: Car;
  private car2: Car;
  
  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    //this.trackSide = this.ctx.createPattern(trackside.png, "repeat-x")
    
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;

    this.road = new Rectangle(0, this.canvas.height / 2 - this.canvas.height / 4, this.canvas.width, this.canvas.height / 2);
    this.road.fillStyle = "black";
    this.road.drawRectangle(this.ctx);

    this.roadSide1 = new Rectangle(0 , this.canvas.height / 2 - this.canvas.height / 4 - this.canvas.height / 16, this.canvas.width, this.canvas.height / 16);
    this.roadSide2 = new Rectangle(0 , this.canvas.height / 2 + this.canvas.height / 4, this.canvas.width, this.canvas.height / 16);
    this.roadSide1.fillStyle = this.trackSide;
    this.roadSide2.fillStyle = this.trackSide; 

    this.roadSide1.drawRectangle(this.ctx);
    this.roadSide2.drawRectangle(this.ctx);

    this.stripe1 = new Rectangle(canvas.width / 8, canvas.height / 2 - 15, 100, 30);
    this.stripe2 = new Rectangle(canvas.width / 8 * 3, canvas.height / 2 - 15, 100, 30);
    this.stripe3 = new Rectangle(canvas.width / 8 * 5, canvas.height / 2 - 15, 100, 30);
    this.stripe4 = new Rectangle(canvas.width / 8 * 7, canvas.height / 2 - 15, 100, 30);
    this.stripe1.fillStyle = "rgba(230, 230, 230, 0.8)"
    this.stripe2.fillStyle = "rgba(230, 230, 230, 0.8)"
    this.stripe3.fillStyle = "rgba(230, 230, 230, 0.8)"
    this.stripe4.fillStyle = "rgba(230, 230, 230, 0.8)"
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
  
  /**
  * Function to give a number between 1 and 6
  * @returns {number} number - number between 1 and 6
  */
  private rollDice(): number {
    return this.randomNumber(1, 6);
  }
  
  /**
  * Method for the Game Loop
  * Based on the game state some actions have to be executed
  */
  private loop = () => {
    this.road.fillStyle = "black";
    this.road.drawRectangle(this.ctx);
    
    this.roadSide1.fillStyle = this.trackSide;
    this.roadSide1.drawRectangle(this.ctx);
    this.roadSide2.fillStyle = this.trackSide;
    this.roadSide2.drawRectangle(this.ctx);
    
    this.stripe1.fillStyle = "rgba(230, 230, 230, 0.8)"
    this.stripe2.fillStyle = "rgba(230, 230, 230, 0.8)"
    this.stripe3.fillStyle = "rgba(230, 230, 230, 0.8)"
    this.stripe4.fillStyle = "rgba(230, 230, 230, 0.8)"
    this.stripe1.drawRectangle(this.ctx)
    this.stripe2.drawRectangle(this.ctx)
    this.stripe3.drawRectangle(this.ctx)
    this.stripe4.drawRectangle(this.ctx)

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
    } else if (this.gameState == "animate") {
      if (this.car1.getXPosition() <= this.car1.getDistance()) {
        this.car1.addXPosition(4);
        this.car1.draw;
      };
      if (this.car2.getXPosition() <= this.car2.getDistance()) {
        this.car2.addXPosition(4)
        this.car2.draw;
      };
      if (this.ending == false) {
        setTimeout(this.endState, 2000); this.ending = true
      }
    } else if (this.gameState == "end") {
        if (this.car1.getDistance() > this.car2.getDistance()) {
          this.winner = this.car1.getName();
        } else if (this.car1.getDistance() < this.car2.getDistance()) {
          this.winner = this.car2.getName();
        } else {
          this.winner = "undecided";
        };
        if (this.keyboardListener.isKeyDown(84)) {
          this.gameState="begin"
          this.restart()
        }
    }
  this.draw()
    requestAnimationFrame(this.loop);
  };
  
  /**
   * sets the game state to end
   */
  private endState = () => {
    this.gameState = "end";
    this.ending = true;
  }

  /**
   * restarts the game
   */
  private restart() {
    this.car1 = new Car("Kaasvreter", "red", 100, this.canvas.height / 2 - 100 - this.canvas.height / 10);
    this.car2 = new Car("Worstvreter", "green", 100, this.canvas.height / 2 - 100 + this.canvas.height / 10);
    this.car1.resetX;
    this.car2.resetX;
    
    this.gameState = "begin";
    this.ending = false;
    this.draw()
    this.loop();
  }

  /**
  * Function to draw all the cars on the canvas
  */
  private draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    this.road.fillStyle = "rgb(40, 40, 40)"
    this.road.drawRectangle(this.ctx)

    this.roadSide1.fillStyle = "black"; //this.trackSide
    this.roadSide1.drawRectangle(this.ctx);
    this.roadSide2.fillStyle = "black"; //this.trackSide
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
    this.writeTextToCanvas("Phase: begin", 40, this.canvas.width / 2, this.canvas.height / 10, "center", "red" );
  } else if (this.gameState === "nameChosen") {
    this.writeTextToCanvas("Press R to Roll the dice", 30, this.canvas.width / 2, this.canvas.height - 100);
    this.writeTextToCanvas(`You have chosen the names ${this.car1.getName()} and ${this.car2.getName()}`, 30, this.canvas.width / 2, this.canvas.height - 50);
    this.writeTextToCanvas("Phase: begin", 40, this.canvas.width / 2, this.canvas.height / 10, "center", "red" );
  }
  
  if (this.gameState === "dice" || this.gameState === "animate") {
    this.writeTextToCanvas(`${this.car1.getName()}`, 40, this.canvas.width / 10 * 9, this.canvas.height / 2 - 80, "center", "red");
    this.writeTextToCanvas(`${this.car2.getName()}`, 40, this.canvas.width / 10 * 9, this.canvas.height / 2 - 80 + this.canvas.height / 5, "center", "red");
  }
  
  if (this.gameState === "end") {
    this.writeTextToCanvas(`${this.car1.getName()}: ${this.car1.getDistance()}`, 40, this.canvas.width / 10 * 9, this.canvas.height / 2 - 80, "center", "red")
    this.writeTextToCanvas(`${this.car2.getName()}: ${this.car2.getDistance()}`, 40, this.canvas.width / 10 * 9, this.canvas.height / 2 - 80 + this.canvas.height / 5, "center", "red");
    this.writeTextToCanvas(`Winner is ${this.winner}`, 60, this.canvas.width / 2, this.canvas.height / 64 * 58, "center", "red");
    this.writeTextToCanvas("Press t to restart the game", 40, this.canvas.width / 2, this.canvas.height / 64 * 61, "center", "red");
  }
  }
  
  /**
  * Writes text to the canvas
  * @param {string} text - Text to write
  * @param {number} fontSize - Font size in pixels
  * @param {number} xCoordinate - Horizontal coordinate in pixels
  * @param {number} yCoordinate - Vertical coordinate in pixels
  * @param {string} alignment - Where to align the text
  * @param {string} color - The color of the text
  */
  public writeTextToCanvas(
    text: string,
    fontSize: number = 20,
    xCoordinate: number,
    yCoordinate: number,
    alignment: CanvasTextAlign = "center",
    color: string = "red"
  ) {
    this.ctx.font = `${fontSize}px Minecraft`;
    this.ctx.fillStyle = color;
    this.ctx.textAlign = alignment;
    this.ctx.fillText(text, xCoordinate, yCoordinate);
  }
  /**
  * Renders a random number between min and max
  * @param {number} min - minimal time
  * @param {number} max - maximal time
  */
  public randomNumber(min: number, max: number): number {
      return Math.round(Math.random() * (max - min) + min);
    }
  }
  
  /**
  * Start the game whenever the entire DOM is loaded
  */
  let init = () => new Game(document.getElementById("canvas") as HTMLCanvasElement);
  
  // Add EventListener to load the game whenever the browser is ready
  window.addEventListener("load", init);