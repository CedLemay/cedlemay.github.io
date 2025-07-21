const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const _sides = 6;
const _angle = 2 * Math.PI / _sides;
const _radius = 20;

const _lines = 6;
const _columns = 8;

/**
 * 
 *  X dist between  = r*sqrt(3)
 * 
 *  Y dist between  = 3/2*r
 * 
 *  x offset by r*sqrt(3)/2 each 2 line
 * 
 */

function init() {


    let xOffset = 0;
    let yOffset = 0;

    for(let i = 0; i < _lines; i++)
    {
        yOffset = i * _radius * 1.5;
        for(let j = 0; j < _columns; j++)
        {
            xOffset = _radius * Math.sqrt(3) * (j + (i%2)/2);            
            drawShape(_radius + xOffset,_radius + yOffset,(i+j)%2);
        }   
    }

    // drawShape(_radius,_radius);
    // drawShape(_radius + _radius*Math.sqrt(3),_radius);
    // drawShape(_radius + 2*_radius*Math.sqrt(3),_radius);

    // drawShape(_radius + _radius*Math.sqrt(3)/2,2.5*_radius);
    // drawShape(_radius + 1.5*_radius*Math.sqrt(3),2.5*_radius);
    // drawShape(_radius + 2.5*_radius*Math.sqrt(3),2.5*_radius);


    
}
init();

function drawShape(x,y,f)
{
    ctx.beginPath();
    for (var i = 0; i < _sides; i++) {
        ctx.lineTo(x + _radius * Math.cos(_angle * (i+0.5)), y + _radius * Math.sin(_angle * (i+0.5)));
      }

      ctx.closePath();
    
    if(f == 0)
        ctx.stroke();
    else
        ctx.fill()
}