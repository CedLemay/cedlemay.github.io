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
    
    //drawSections();
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

function drawSections()
{
    for (var i = 0; i < _lines*4; i++) {
        ctx.beginPath();
        ctx.lineTo(0, _radius / 2 * i +xyMargin);
        let test =  _radius / 2 * i+xyMargin;
        ctx.lineTo(800, _radius / 2 * i+xyMargin);
        ctx.closePath();
        ctx.stroke();
    }

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

    //approximate Y
    let ySubSection = Math.floor((posY - xyMargin) / (_radius / 2));

    let mustCheckIfInHexagonTips = ySubSection % 3 == 0;

    let yIndex = -1;

    if(mustCheckIfInHexagonTips)
    {
        let upperApproxY = ySubSection / 3;
        let lowerApproxY = upperApproxY - 1;

        let m = sqrt3;
        let upperB = 3/2 * upperApproxY * _radius;
        let lowerB = 3/2 * lowerApproxY * _radius;

        

    }
    else
    {
        yIndex = Math.floor(ySubSection / 3);
    }





    alert("even X : " + evenXIndex + "   odd X : " + oddXIndex+ "   Y : " + yIndex);

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