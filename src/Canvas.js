import { CANVAS_HEIGHT, CANVAS_WIDTH, X_AXIS_START_POSITION, X_AXIS_VALUE_OF_POINTS, Y_AXIS_VALUE_OF_POINTS } from './consts/canvas-consts'

export default class Canvas {
    constructor() {
        this._h = CANVAS_HEIGHT;
        this._w = CANVAS_WIDTH;
        this._canvas = document.createElement('canvas');
        this._canvas.setAttribute('width', this._w);
        this._canvas.setAttribute('height', this._h);
        this._ctx = this._canvas.getContext('2d');

    }

    draw = (waves) => {
        this._ctx.clearRect(0, 0, this._w, this._h);

        this.axis();
        //this.grid()
        waves.forEach(wave => {
            const lastPhasorPoint = wave[wave.length - 1];
            const firstPoint = wave[0];

            wave.forEach(waveYet => {
                this.drawLine(waveYet)
            });

            this.drawPhasorRound(lastPhasorPoint)

            this.xScale({
                value: X_AXIS_VALUE_OF_POINTS,
                startX: 0,
                shift: firstPoint.t,
                f: 1
            });

            this.yScale()
        });

       
    }

    drawLine = xyrc => {
        const {x, y, prevX, prevY, r, phasorX} = xyrc;
        //console.log(xyrc);
        this._ctx.beginPath(); 
        this._ctx.strokeStyle = "green"; 
        this._ctx.moveTo(prevX, prevY); 
        this._ctx.lineTo(x, y); 
        
        this._ctx.stroke(); 
        this._ctx.lineWidth = r;
        this._ctx.closePath()
    }

    drawPhasorRound = xyrc => {
        const {phasorX, x, prevY, y, maxAmplitude, r, color} = xyrc;
        
        this._ctx.beginPath(); 
       
        this._ctx.arc(X_AXIS_START_POSITION/2 + 11, this._h/2, maxAmplitude, 0, 2 * Math.PI);
        this._ctx.strokeStyle = "green"; 
        this._ctx.moveTo(X_AXIS_START_POSITION/2 + 11, this._h/2); 
        this._ctx.lineTo(phasorX, y);

        this._ctx.moveTo(phasorX, prevY); 
        this._ctx.lineTo(x, y); 
        this._ctx.stroke(); 
        this._ctx.lineWidth = r;
        this._ctx.closePath()
    }

    viewElements = () => {
        this._ctx.beginPath(); 
        this._ctx.font = "20px Georgia";
        
        this._ctx.fillText('ωt', this._w - 25, this._h/2 + 20);
        
        this._ctx.closePath() 
    }

    xScale = (opts) => {
        const { shift } = opts
        const xWidth = this._w -  X_AXIS_START_POSITION
        const period = 64/opts.f;
        const height = this._h/2 ;
        const value = xWidth/period
        const shiftNumb = shift / period | 0

        const startX = -(shift % period)

        for (let i = 1; i <= value; i++) {
            let xPosition = xWidth*i/value + startX + X_AXIS_START_POSITION;
            
            if (!(i % 1)) this._ctx.fillText((i+ shiftNumb)/5, xPosition - 7 , height + 20);
            this._ctx.strokeRect(xPosition, height - 5, 0, 10); 
            
        }
    }
    
    yScale = (opts) => {
        const xWidth = this._w -  X_AXIS_START_POSITION
    
        const value = Y_AXIS_VALUE_OF_POINTS;
        const height = this._h/2 ;
    
        for (let i = 1; i <= value; i++) {
            //let yPosition = this._h*i/value + X_AXIS_START_POSITION;
            
             this._ctx.fillText(-Math.round(((i/5) - value/10)*10)/10, X_AXIS_START_POSITION + 10 ,this._h*i/value);
            this._ctx.strokeRect(X_AXIS_START_POSITION - 5, this._h*i/value, 10, 0);     
        }    
    }

    grid = () => {
        let s = 28
        let nX = Math.floor(this._w / s) - 2
        let nY = Math.floor(this._h / s) - 2
        let pX = this._w - nX * s
        let pY = this._h - nY * s
        let pL = pX / 2
        let pR = pX / 2
        let pT = pY / 2
        let pB = pY / 2
        
        this._ctx.strokeStyle = 'lightgrey'
        this._ctx.beginPath()
        for (var x = pL; x <= this._w - pR; x += s) {
           this._ctx.moveTo(x, pT)
           this._ctx.lineTo(x, this._h - pB)
        }
        for (var y = pT; y <= this._h - pB; y += s) {
           this._ctx.moveTo(pL, y)
           this._ctx.lineTo(this._w - pR, y)
        }
        this._ctx.stroke()
    }

    axis = () => {
        this._ctx.beginPath();
        this._ctx.moveTo(X_AXIS_START_POSITION, this._h/2);
        this._ctx.lineTo(this._w, this._h/2);
        this._ctx.strokeStyle = "blue"
        this._ctx.moveTo(X_AXIS_START_POSITION, 0);
        this._ctx.lineTo(X_AXIS_START_POSITION, this._h);
        this._ctx.stroke();      
    }

    replaceWaveView = (x, y) => {
        this._ctx.translate(x,y)
    }

    clearCanvas = () => {
        this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
    }

}