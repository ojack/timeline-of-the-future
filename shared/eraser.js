eraser = function( context )
{
	this.init( context );
}

eraser.prototype =
{
	name: "Eraser",
	
	context: null,

	

	prevMouseX: null, prevMouseY: null,

	init: function( context, markerContext )
	{
		this.context = context;
	
		//this.context.globalCompositeOperation = 'source-over';
		//this.brush = new Image();
		//this.brush.src = 'assets/brush2.png';
		this.context.globalCompositeOperation = 'destination-out' ;
	},

	destroy: function()
	{
	},

	strokeStart: function( mouseX, mouseY )
	{
		this.prevMouseX = mouseX;
		this.prevMouseY = mouseY;
	},

	stroke: function( mouseX, mouseY )
	{
		this.context.save();
      // this.context.globalCompositeOperation = 'destination-out' ;
      	var EXTENT = 10; //CHANGED
		var circRad = EXTENT*6;
		var start = {x: this.prevMouseX, y: this.prevMouseY}
		var end = {x: mouseX, y: mouseY}
		var distance = parseInt( Trig.distanceBetween2Points( start, end ) );
		var angle = Trig.angleBetween2Points( start, end );
		//this.context.lineWidth = BRUSH_SIZE;	
		//this.context.strokeStyle = "rgba(" + COLOR[0] + ", " + COLOR[1] + ", " + COLOR[2] + ", " + 0.5 * BRUSH_PRESSURE + ")";
		//this.context.fillStyle = "rgba(" + BACKGROUND_COLOR[0] + ", " + BACKGROUND_COLOR[1] + ", " + BACKGROUND_COLOR[2] + ", " + 0.7 * BRUSH_PRESSURE + ")";
		//this.context.lineWidth = BRUSH_SIZE;	
		this.context.fillStyle = "rgba(255, 255, 100, 255)";
		var x,y;
		for ( var z=0; (z<=distance || z==0); z++ ) {
		x = start.x + (Math.sin(angle) * z) - circRad/2;
    	y = start.y + (Math.cos(angle) * z) - circRad/2;
		
		
		this.context.beginPath();
		this.context.arc(x, y, circRad, 0, Math.PI*2, true);
		this.context.closePath();
		this.context.fill();

		
		}
		//this.context.stroke();
		/*this.context.moveTo(this.prevMouseX, this.prevMouseY);
		this.context.lineTo(mouseX, mouseY);
		this.context.stroke();*/
	//}
	   this.context.restore();
	  
		this.prevMouseX = mouseX;
		this.prevMouseY = mouseY;
	},

	strokeEnd: function()
	{
		
	}
}

exports.Eraser = eraser;


var Trig = {
    distanceBetween2Points: function ( point1, point2 ) {
 
        var dx = point2.x - point1.x;
        var dy = point2.y - point1.y;
        return Math.sqrt( Math.pow( dx, 2 ) + Math.pow( dy, 2 ) );
    },
 
    angleBetween2Points: function ( point1, point2 ) {
 
        var dx = point2.x - point1.x;
        var dy = point2.y - point1.y;
        return Math.atan2( dx, dy );
    }
}