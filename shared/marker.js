
/*function marker( context )
{
	this.init( context );
}*/

marker = function(context){
	this.init( context );
}

marker.prototype =
{
	name: "Marker",
	
	context: null,

	pastThickness: 10,

	thickness: 400,

	prevMouseX: null, prevMouseY: null,

	init: function( context )
	{
		this.context = context;
		this.context.globalCompositeOperation = 'source-over';
		//this.brush = new Image();
		//this.brush.src = 'assets/brush2.png';

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
		/*this.context.globalCompositeOperation = 'lighten';*/

		//var circRad = 2;
		var start = {x: this.prevMouseX, y: this.prevMouseY}
		var end = {x: mouseX, y: mouseY}
		
	//	var distance = parseInt( Trig.distanceBetween2Points( start, end ) );
		var distance = parseInt( Trig.distanceBetween2Points( start, end ) );
		var angle = Trig.angleBetween2Points( start, end );
		//this.context.lineWidth = BRUSH_SIZE;	
		//this.context.strokeStyle = "rgba(" + COLOR[0] + ", " + COLOR[1] + ", " + COLOR[2] + ", " +  BRUSH_PRESSURE + ")";
		//this.context.fillStyle = "rgba(" + COLOR[0] + ", " + COLOR[1] + ", " + COLOR[2] + ", " +  0.1 + ")";
		//this.context.fillStyle = "rgba(100, 200, 0, 0.1)";
		//var circRad = this.thickness;

		var x,y;
		var z = 0;
		/*while(z < distance){
		//for ( var z=0; (z<=distance || z==0); z++ ) {
		var circRad = this.pastThickness + (this.thickness - this.pastThickness)*z/distance;
		x = start.x + (Math.sin(angle) * z) - circRad/2;
    	y = start.y + (Math.cos(angle) * z) - circRad/2;
		console.log(circRad);
		this.context.beginPath();
		this.context.arc(x, y, circRad, 0, Math.PI*2, true);
		this.context.closePath();
		this.context.fill();
		//this.context.stroke();
		/*this.context.moveTo(this.prevMouseX, this.prevMouseY);
		this.context.lineTo(mouseX, mouseY);
		this.context.stroke();*/
	/*		z+=circRad;
		}*/
	 // this.thickness = 1+Math.pow(distance/50, 2);// good for pen
	  //this.thickness = 1+Math.pow(distance/80, 4);
	this.thickness = 6/2*(10+distance/10);
	//this.thickness = 1/2*(10+distance);
	var bRad = 6;
for (var i = 0; i < distance; i+=bRad/5) {
    		x = start.x + (Math.sin(angle) * i);
    		y = start.y + (Math.cos(angle) * i);
    
    	//	var radgrad = this.context.createRadialGradient(x,y,10*BRUSH_SIZE,x,y,20*BRUSH_SIZE);
    
 //
 	bRad = this.pastThickness + i *(this.thickness - this.pastThickness)/distance;
 	//bRad = 6;
  //  console.log(bRad);
    
   /* radgrad.addColorStop(0,  "rgba(" + COLOR[0] + ", " + COLOR[1] + ", " + COLOR[2] + ", " +  0.1 + ")");
    radgrad.addColorStop(0.5,  "rgba(" + COLOR[0] + ", " + COLOR[1] + ", " + COLOR[2] + ", " +  0.05 + ")");
    radgrad.addColorStop(1,  "rgba(" + COLOR[0] + ", " + COLOR[1] + ", " + COLOR[2] + ", " +  0 + ")");
    this.context.fillStyle = radgrad;
    this.context.fillRect(x-bRad, y-bRad, bRad, bRad);
    //this.context.fillRect(x-40, y-40, 80, 80);*/

    this.context.beginPath();
      this.context.arc(x, y, bRad, 0, 2 * Math.PI, false);
      //	this.context.fillStyle = "rgba(" + COLOR[0] + ", " + COLOR[1] + ", " + COLOR[2] + ", " +  0.05* BRUSH_PRESSURE + ")";
    //  context.fillStyle = 'green';
      this.context.fill();
  }
  this.pastThickness = this.thickness;
		
	/*CODE FOR SPRAY*/
	/*	for (var i = 0; i < distance; i+=5) {
    		x = start.x + (Math.sin(angle) * i);
    		y = start.y + (Math.cos(angle) * i);
    
    		var radgrad = this.context.createRadialGradient(x,y,10*BRUSH_SIZE,x,y,20*BRUSH_SIZE);
    
 //
    
    
    radgrad.addColorStop(0,  "rgba(" + COLOR[0] + ", " + COLOR[1] + ", " + COLOR[2] + ", " +  0.1 + ")");
    radgrad.addColorStop(0.5,  "rgba(" + COLOR[0] + ", " + COLOR[1] + ", " + COLOR[2] + ", " +  0.05 + ")");
    radgrad.addColorStop(1,  "rgba(" + COLOR[0] + ", " + COLOR[1] + ", " + COLOR[2] + ", " +  0 + ")");
    this.context.fillStyle = radgrad;
    this.context.fillRect(x-20*BRUSH_SIZE, y-20*BRUSH_SIZE, 40*BRUSH_SIZE, 40*BRUSH_SIZE);
    //this.context.fillRect(x-40, y-40, 80, 80);
  }*/

		this.prevMouseX = mouseX;
		this.prevMouseY = mouseY;
	},

	strokeEnd: function()
	{
		
	}
}

exports.Marker = marker;

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
