const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const _sides = 6;
const _angle = 2 * Math.PI / _sides;
const _radius = 50;

function init() {
    drawShape(_radius,_radius);
    drawShape(_radius + _radius*Math.sqrt(3),_radius);
    drawShape(_radius + 2*_radius*Math.sqrt(3),_radius);

    drawShape(_radius + _radius*Math.sqrt(3)/2,2.5*_radius);
    drawShape(_radius + 1.5*_radius*Math.sqrt(3),2.5*_radius);
    drawShape(_radius + 2.5*_radius*Math.sqrt(3),2.5*_radius);


    
}
init();

function drawShape(x,y)
{
    ctx.beginPath();
    for (var i = 0; i < _sides; i++) {
        ctx.lineTo(x + _radius * Math.cos(_angle * (i+0.5)), y + _radius * Math.sin(_angle * (i+0.5)));
      }

      ctx.closePath();
    
    ctx.stroke();
}