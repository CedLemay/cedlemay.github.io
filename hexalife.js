const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const _sides = 6;
const _angle = 2 * Math.PI / _sides;
const _radius = 50;

const _lines = 6;
const _columns = 8;



const sqrt3 = Math.sqrt(3);

const _state = new Array(_lines*_columns).fill(0);

const xyMargin = 5;
const x0 = (_radius * sqrt3 / 2) + xyMargin;
const y0 = _radius + xyMargin;


function init() {

    drawGrid();
    canvas.addEventListener('click', setState);

}

init();

/**
 * 
 *  X dist between  = r*sqrt(3)
 * 
 *  Y dist between  = 3/2*r
 * 
 *  x offset by r*sqrt(3)/2 each 2 line
 * 
 */
function drawGrid()
{    
    clearGrid();

    let xOffset = 0;
    let yOffset = 0;
    


    for(let i = 0; i < _lines; i++)
    {
        yOffset = i * _radius * 1.5;
        for(let j = 0; j < _columns; j++)
        {
            xOffset = _radius * sqrt3 * (j + (i%2)/2);            
            drawShape(x0 + xOffset, y0 + yOffset, _state[i*_columns + j]);

            //TEMP            
            addTextInShape(i,j,_radius + xOffset,_radius + yOffset);
            //TEMP            

        }   
    }
}

function clearGrid()
{
    ctx.clearRect(0,0,canvas.width,canvas.height);
}

function drawShape(x,y,s)
{
    ctx.beginPath();
    for (var i = 0; i < 6; i++) {

        let _t = x + _radius * Math.cos(_angle * (i + 0.5));

        ctx.lineTo(x + _radius * Math.cos(_angle * (i + 0.5)), y + _radius * Math.sin(_angle * (i + 0.5)));
    }

    ctx.closePath();
    
    if(s == 0)
        ctx.stroke();
    else
       ctx.fill()
    
}

function setState(e)
{
    

    let posX = e.clientX;
    let posY = e.clientY;


    //approximate X

    let evenXIndex = (posX-xyMargin) / (sqrt3 * _radius);
    let oddXIndex = (posX - (_radius * sqrt3 / 2) - xyMargin) / (sqrt3 * _radius);

    evenXIndex = Math.floor(evenXIndex);
    oddXIndex = Math.floor(oddXIndex );

    alert("even X : " + evenXIndex + "   odd X : " + oddXIndex);

    return;

    drawGrid()
}

//TEMP
//TEMP
//TEMP
function addTextInShape(i,j,x,y)
{
    ctx.fillText(i+"-"+j,x-7,y+3);

}

//TEMP