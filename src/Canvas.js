import { CANVAS_HEIGHT, CANVAS_WIDTH, X_AXIS_START_POSITION, X_AXIS_VALUE_OF_POINTS, Y_AXIS_VALUE_OF_POINTS } from './consts/canvas-consts'

export default class Canvas {
    constructor() {
        this._h = CANVAS_HEIGHT;
        this._w = CANVAS_WIDTH;
        this._canvas = document.createElement('canvas');
        this._canvas.setAttribute('width', this._w);
        this._canvas.setAttribute('height', this._h);
        this._ctx = this._canvas.getContext('2d');

        this._xAxisStartPosition = X_AXIS_START_POSITION;
    }

    draw = (waves) => {
        this.clearCanvas()
        this.viewElements();

        waves.forEach(wave => {
            const lastPhasorPoint = wave[wave.length - 1];
            const firstPoint = wave[0];

            wave.forEach(waveYet => {
                this.drawLine(waveYet)
            });

            this.drawPhasorRound(lastPhasorPoint)

            this.schales({
                shift: firstPoint.t,
                f: 1
            })
        });

       
    }

    drawLine = xyrc => {
        const {x, y, prevX, prevY, r, phasorX, color} = xyrc;
        //console.log(xyrc);
        this._ctx.beginPath(); 
        this._ctx.strokeStyle = color; 
        this._ctx.moveTo(prevX, prevY); 
        this._ctx.lineTo(x, y); 
        
        this._ctx.stroke(); 
        this._ctx.lineWidth = r;
        this._ctx.closePath()
    }

    drawPhasorRound = xyrc => {
        const {phasorX, x, prevY, y, maxAmplitude, r, color} = xyrc;
        
        const arcX = this._xAxisStartPosition/2
        const arcY = this._h/2;
        const arcRadius = maxAmplitude;
        
        const vectorFromX = this._xAxisStartPosition/2 
        const vectorFromY = this._h/2

        const vectorToX = phasorX + this._xAxisStartPosition/2
        const vectorToY = y

        this._ctx.beginPath(); 

        this._ctx.arc(arcX, arcY, arcRadius, 0, 2 * Math.PI);
        this._ctx.strokeStyle = color 
        
        this._ctx.moveTo(vectorFromX, vectorFromY); 
        this._ctx.lineTo(vectorToX, vectorToY);

        this._ctx.stroke();

        this._ctx.moveTo(vectorToX, prevY);
        this._ctx.lineWidth = 0.3;  

        this._ctx.lineTo(x, y); 
        this._ctx.strokeStyle = color; 
        
        this._ctx.stroke(); 
        
        this._ctx.closePath()
    }

    viewElements = () => {
        this.axis()
        this.grid()
    }

    schales = (opts) => {
        this._ctx.lineWidth = 1; 
        this.xScale(opts);
        this.yScale(opts);
    }

    xScale = (opts) => {
        const { shift } = opts
        const xWidth = this._w -  this._xAxisStartPosition
        const period = 64/opts.f;
        const height = this._h/2 ;
        const value = xWidth/period
        const shiftNumb = shift / period | 0

        const startX = -(shift % period)

        for (let i = 1; i <= value; i++) {
            let xPosition = xWidth*i/value + startX + this._xAxisStartPosition;
            
            if (!(i % 1)) this._ctx.fillText((i+ shiftNumb)/5, xPosition - 7 , height + 20);
            this._ctx.strokeRect(xPosition, height - 5, 0, 10); 
            
        }
    }
    
    yScale = () => {
        const value = Y_AXIS_VALUE_OF_POINTS;

        for (let i = 1; i <= value; i++) {
            this._ctx.fillText(-Math.round(((i/5) - value/10)*10)/10, this._xAxisStartPosition + 10 ,this._h*i/value);
            this._ctx.strokeRect(this._xAxisStartPosition - 5, this._h*i/value, 10, 0);     
        }    
    }

    grid = () => {
        const yPeriod = 36;
        const xPeriod = 64;
        const yValue = this._h/yPeriod
        const xValue = this._w/xPeriod
        const thickness = 1;
        //this._ctx.beginPath()

        this._ctx.strokeStyle = 'lightgrey'
        this._ctx.lineWidth = thickness; 
        for (let i = 0; i < yValue; i++) {
            if (i*yPeriod !== this._h/2) this._ctx.strokeRect(0, i*yPeriod, this._w, 0.1);
        }
        for (let i = 0; i < xValue; i++) {
            if (i*xPeriod !== this._xAxisStartPosition) this._ctx.strokeRect(i*xPeriod, 0, 0.1, this._w);
        }
        
        //this._ctx.stroke()
        //this._ctx.closePath()
    }

    axis = () => {
        const thickness = 1;
        const color = "blue";

        this._ctx.beginPath();
        this._ctx.lineWidth = thickness; 
        this._ctx.moveTo(0, this._h/2);
        this._ctx.lineTo(this._w, this._h/2);
        this._ctx.strokeStyle = color;
        this._ctx.moveTo(this._xAxisStartPosition, 0);
        this._ctx.lineTo(this._xAxisStartPosition, this._h);

        this._ctx.stroke();      
    }

    clearCanvas = () => {
        this._ctx.clearRect(0, 0, this._w, this._h);
    }

}