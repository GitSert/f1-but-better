class Car {
    private image: HTMLImageElement;
    private _name: string;
    private _distance: number;
    private _xPosition: number;
    private _yPosition: number;

    constructor(name:string, colour:string, xPos:number, yPos:number) {
        this._xPosition = xPos;
        this._yPosition = yPos;
        this._name = name;
        this.image = this.loadNewImage(`./assets/img/${colour}-racing-car.png`);
        //console.log(this.image);
    }

    public giveName = (name : string) => {
        this._name = name;
    }

    public setDistance = (distanceRaced : number) => {
        this._distance = distanceRaced * 200;
    }

    public addXPosition = (xPos: number) => {
        this._xPosition += xPos;
    }

    public resetX = () => {
        this._xPosition = 0;
    }
    
    public getDistance = () : number => {
        return this._distance;
    }

    public getXPosition = () : number => {
        return this._xPosition;
    }

    public getYPostition = () : number => {
        return this._yPosition;
    }

    public getName = () : string => {
        return this._name;
    }
    
    /**
    * Draw all the necessary items to the screen
    */
    public draw(ctx:CanvasRenderingContext2D) {
        // draw player
        //console.log(ctx);
        ctx.drawImage(this.image, this._xPosition, this._yPosition);
    }
    
    /**
    * Method to load an image
    * @param {HTMLImageElement} source
    * @return HTMLImageElement - returns an image
    */
    private loadNewImage(source: string): HTMLImageElement {
        const img = new Image();
        img.src = source;
        return img;
    }
}