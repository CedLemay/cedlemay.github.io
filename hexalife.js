

// #region Constants
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

// #endregion 

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

        ctx.lineTo(x + _radius * Math.cos(_angle * (i + 0.5)), y + _radius * Math.sin(_angle * (i + 0.5)));
    }

    ctx.closePath();
    
    if(s == 0)
        ctx.stroke();
    else
       ctx.fill();
    
}

function setState(e)
{    

    let rect = canvas.getBoundingClientRect();

    let posX = e.clientX - rect.left;
    let posY = e.clientY - rect.top;


    //approximate X

    let evenXIndex = (posX-xyMargin) / (sqrt3 * _radius);
    let oddXIndex = (posX - (_radius * sqrt3 / 2) - xyMargin) / (sqrt3 * _radius);

    evenXIndex = Math.floor(evenXIndex);
    oddXIndex = Math.floor(oddXIndex );

    //Get Y and X
    let ySubSection = Math.floor((posY - xyMargin) / (_radius / 2));

    let mustCheckIfInHexagonTips = ySubSection % 3 == 0;

    let xIndex = -1;
    let yIndex = -1;

    yIndex = Math.floor(ySubSection / 3);

    xIndex = oddXIndex;
    if (yIndex % 2 == 0)
        xIndex = evenXIndex;

    if(mustCheckIfInHexagonTips)
    {
        if(!isInsideHexagon(posX , posY , xIndex, yIndex))
        {
            yIndex = yIndex - 1;
            xIndex = oddXIndex;

            if (yIndex % 2 == 0)
                xIndex = evenXIndex;

            if(!isInsideHexagon(posX , posY , xIndex, yIndex))
            {
                xIndex = -1;
                yIndex = -1;
            }
        }
    }
    else
    {
        if (yIndex % 2 == 0)
            xIndex = evenXIndex;
            
    }

    if(xIndex >= _columns || yIndex >= _lines)
    {
        xIndex = -1;
        yIndex = -1;
    }

    if(xIndex != -1 && yIndex != -1)
        _state[_columns * yIndex + xIndex] = !_state[_columns * yIndex + xIndex]

   
    drawGrid()
}

function isInsideHexagon(posX , posY , xIndex, yIndex)
{
    // y = mx + b

    //TODO: add more explanation

    let mx = sqrt3 / 3 * posX;
    let _rad2 = _radius / 2;

    let _3i = 3* yIndex;
    let _iMod2 = yIndex % 2;
    let _2j = 2*xIndex;

    let upLeft      = (-1 * mx) + ( 1 + _3i + _iMod2 + _2j) * _rad2 + xyMargin;
    let upRight     = ( 1 * mx) + (-1 + _3i - _iMod2 - _2j) * _rad2 + xyMargin;
    let downLeft    = ( 1 * mx) + ( 3 + _3i - _iMod2 - _2j) * _rad2 + xyMargin;
    let downRight   = (-1 * mx) + ( 5 + _3i + _iMod2 + _2j) * _rad2 + xyMargin;

    let result = posY > upLeft
        &&      posY > upRight
        &&      posY < downLeft
        &&      posY < downRight;

    return  result;             

    
}

function stepToNextGeneration() 
{ 

    let nextGen  = new Array(_lines*_columns).fill(0);

    //We must check the 6 neighbour cells and add up their
    // state to know how much are alive




}

// #region Temporary function

//TEMP
function addTextInShape(i,j,x,y)
{
    ctx.fillText(i+"-"+j,x-7,y+3);

}

//TEMP
// #endregion