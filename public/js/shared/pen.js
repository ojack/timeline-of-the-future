(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
pen =  function( context )
{
	this.init( context );
}

pen.prototype =
{
	name: "Pen",
	
	context: null,

	pastThickness: 1,

	thickness: 1,

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
		var BRUSH_SIZE = 10;//CHANGED
		var start = {x: this.prevMouseX, y: this.prevMouseY}
		var end = {x: mouseX, y: mouseY}
		
	//	var distance = parseInt( Trig.distanceBetween2Points( start, end ) );
		var distance = parseInt( Trig.distanceBetween2Points( start, end ) );
		var angle = Trig.angleBetween2Points( start, end );
		this.context.lineWidth = BRUSH_SIZE;	
		//this.context.strokeStyle = "rgba(" + COLOR[0] + ", " + COLOR[1] + ", " + COLOR[2] + ", " +  BRUSH_PRESSURE + ")";
		//this.context.fillStyle = "rgba(" + COLOR[0] + ", " + COLOR[1] + ", " + COLOR[2] + ", " +  0.2 + ")";
		
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
	  this.thickness = 4+Math.pow(distance/50, 2);// good for pen
	  //this.thickness = 1+Math.pow(distance/80, 4);
	//this.thickness = EXTENT/2*(10+distance/10);
	//this.thickness = 1/2*(10+distance);
	var bRad = 10;
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

exports.Pen = pen;
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
},{}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyIvdXNyL2xvY2FsL2xpYi9ub2RlX21vZHVsZXMvd2F0Y2hpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsIi9Vc2Vycy9rYXJpbmF3aGl0ZS9jb2RlL0ZVVFVSRVMvRlVUVVJFU19ERU1PXzNfMzEvc2hhcmVkL3Blbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKX12YXIgZj1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwoZi5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxmLGYuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwicGVuID0gIGZ1bmN0aW9uKCBjb250ZXh0IClcbntcblx0dGhpcy5pbml0KCBjb250ZXh0ICk7XG59XG5cbnBlbi5wcm90b3R5cGUgPVxue1xuXHRuYW1lOiBcIlBlblwiLFxuXHRcblx0Y29udGV4dDogbnVsbCxcblxuXHRwYXN0VGhpY2tuZXNzOiAxLFxuXG5cdHRoaWNrbmVzczogMSxcblxuXHRwcmV2TW91c2VYOiBudWxsLCBwcmV2TW91c2VZOiBudWxsLFxuXG5cdGluaXQ6IGZ1bmN0aW9uKCBjb250ZXh0IClcblx0e1xuXHRcdHRoaXMuY29udGV4dCA9IGNvbnRleHQ7XG5cdFx0dGhpcy5jb250ZXh0Lmdsb2JhbENvbXBvc2l0ZU9wZXJhdGlvbiA9ICdzb3VyY2Utb3Zlcic7XG5cdFx0Ly90aGlzLmJydXNoID0gbmV3IEltYWdlKCk7XG5cdFx0Ly90aGlzLmJydXNoLnNyYyA9ICdhc3NldHMvYnJ1c2gyLnBuZyc7XG5cblx0fSxcblxuXHRkZXN0cm95OiBmdW5jdGlvbigpXG5cdHtcblx0fSxcblxuXHRzdHJva2VTdGFydDogZnVuY3Rpb24oIG1vdXNlWCwgbW91c2VZIClcblx0e1xuXHRcdHRoaXMucHJldk1vdXNlWCA9IG1vdXNlWDtcblx0XHR0aGlzLnByZXZNb3VzZVkgPSBtb3VzZVk7XG5cdH0sXG5cblx0c3Ryb2tlOiBmdW5jdGlvbiggbW91c2VYLCBtb3VzZVkgKVxuXHR7XG5cdFx0Lyp0aGlzLmNvbnRleHQuZ2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uID0gJ2xpZ2h0ZW4nOyovXG5cblx0XHQvL3ZhciBjaXJjUmFkID0gMjtcblx0XHR2YXIgQlJVU0hfU0laRSA9IDU7Ly9DSEFOR0VEXG5cdFx0dmFyIHN0YXJ0ID0ge3g6IHRoaXMucHJldk1vdXNlWCwgeTogdGhpcy5wcmV2TW91c2VZfVxuXHRcdHZhciBlbmQgPSB7eDogbW91c2VYLCB5OiBtb3VzZVl9XG5cdFx0XG5cdC8vXHR2YXIgZGlzdGFuY2UgPSBwYXJzZUludCggVHJpZy5kaXN0YW5jZUJldHdlZW4yUG9pbnRzKCBzdGFydCwgZW5kICkgKTtcblx0XHR2YXIgZGlzdGFuY2UgPSBwYXJzZUludCggVHJpZy5kaXN0YW5jZUJldHdlZW4yUG9pbnRzKCBzdGFydCwgZW5kICkgKTtcblx0XHR2YXIgYW5nbGUgPSBUcmlnLmFuZ2xlQmV0d2VlbjJQb2ludHMoIHN0YXJ0LCBlbmQgKTtcblx0XHR0aGlzLmNvbnRleHQubGluZVdpZHRoID0gQlJVU0hfU0laRTtcdFxuXHRcdC8vdGhpcy5jb250ZXh0LnN0cm9rZVN0eWxlID0gXCJyZ2JhKFwiICsgQ09MT1JbMF0gKyBcIiwgXCIgKyBDT0xPUlsxXSArIFwiLCBcIiArIENPTE9SWzJdICsgXCIsIFwiICsgIEJSVVNIX1BSRVNTVVJFICsgXCIpXCI7XG5cdFx0Ly90aGlzLmNvbnRleHQuZmlsbFN0eWxlID0gXCJyZ2JhKFwiICsgQ09MT1JbMF0gKyBcIiwgXCIgKyBDT0xPUlsxXSArIFwiLCBcIiArIENPTE9SWzJdICsgXCIsIFwiICsgIDAuMiArIFwiKVwiO1xuXHRcdFxuXHRcdC8vdmFyIGNpcmNSYWQgPSB0aGlzLnRoaWNrbmVzcztcblxuXHRcdHZhciB4LHk7XG5cdFx0dmFyIHogPSAwO1xuXHRcdC8qd2hpbGUoeiA8IGRpc3RhbmNlKXtcblx0XHQvL2ZvciAoIHZhciB6PTA7ICh6PD1kaXN0YW5jZSB8fCB6PT0wKTsgeisrICkge1xuXHRcdHZhciBjaXJjUmFkID0gdGhpcy5wYXN0VGhpY2tuZXNzICsgKHRoaXMudGhpY2tuZXNzIC0gdGhpcy5wYXN0VGhpY2tuZXNzKSp6L2Rpc3RhbmNlO1xuXHRcdHggPSBzdGFydC54ICsgKE1hdGguc2luKGFuZ2xlKSAqIHopIC0gY2lyY1JhZC8yO1xuICAgIFx0eSA9IHN0YXJ0LnkgKyAoTWF0aC5jb3MoYW5nbGUpICogeikgLSBjaXJjUmFkLzI7XG5cdFx0Y29uc29sZS5sb2coY2lyY1JhZCk7XG5cdFx0dGhpcy5jb250ZXh0LmJlZ2luUGF0aCgpO1xuXHRcdHRoaXMuY29udGV4dC5hcmMoeCwgeSwgY2lyY1JhZCwgMCwgTWF0aC5QSSoyLCB0cnVlKTtcblx0XHR0aGlzLmNvbnRleHQuY2xvc2VQYXRoKCk7XG5cdFx0dGhpcy5jb250ZXh0LmZpbGwoKTtcblx0XHQvL3RoaXMuY29udGV4dC5zdHJva2UoKTtcblx0XHQvKnRoaXMuY29udGV4dC5tb3ZlVG8odGhpcy5wcmV2TW91c2VYLCB0aGlzLnByZXZNb3VzZVkpO1xuXHRcdHRoaXMuY29udGV4dC5saW5lVG8obW91c2VYLCBtb3VzZVkpO1xuXHRcdHRoaXMuY29udGV4dC5zdHJva2UoKTsqL1xuXHQvKlx0XHR6Kz1jaXJjUmFkO1xuXHRcdH0qL1xuXHQgIHRoaXMudGhpY2tuZXNzID0gMStNYXRoLnBvdyhkaXN0YW5jZS81MCwgMik7Ly8gZ29vZCBmb3IgcGVuXG5cdCAgLy90aGlzLnRoaWNrbmVzcyA9IDErTWF0aC5wb3coZGlzdGFuY2UvODAsIDQpO1xuXHQvL3RoaXMudGhpY2tuZXNzID0gRVhURU5ULzIqKDEwK2Rpc3RhbmNlLzEwKTtcblx0Ly90aGlzLnRoaWNrbmVzcyA9IDEvMiooMTArZGlzdGFuY2UpO1xuXHR2YXIgYlJhZCA9IDY7XG5mb3IgKHZhciBpID0gMDsgaSA8IGRpc3RhbmNlOyBpKz1iUmFkLzUpIHtcbiAgICBcdFx0eCA9IHN0YXJ0LnggKyAoTWF0aC5zaW4oYW5nbGUpICogaSk7XG4gICAgXHRcdHkgPSBzdGFydC55ICsgKE1hdGguY29zKGFuZ2xlKSAqIGkpO1xuICAgIFxuICAgIFx0Ly9cdHZhciByYWRncmFkID0gdGhpcy5jb250ZXh0LmNyZWF0ZVJhZGlhbEdyYWRpZW50KHgseSwxMCpCUlVTSF9TSVpFLHgseSwyMCpCUlVTSF9TSVpFKTtcbiAgICBcbiAvL1xuIFx0YlJhZCA9IHRoaXMucGFzdFRoaWNrbmVzcyArIGkgKih0aGlzLnRoaWNrbmVzcyAtIHRoaXMucGFzdFRoaWNrbmVzcykvZGlzdGFuY2U7XG4gXHQvL2JSYWQgPSA2O1xuICAvLyAgY29uc29sZS5sb2coYlJhZCk7XG4gICAgXG4gICAvKiByYWRncmFkLmFkZENvbG9yU3RvcCgwLCAgXCJyZ2JhKFwiICsgQ09MT1JbMF0gKyBcIiwgXCIgKyBDT0xPUlsxXSArIFwiLCBcIiArIENPTE9SWzJdICsgXCIsIFwiICsgIDAuMSArIFwiKVwiKTtcbiAgICByYWRncmFkLmFkZENvbG9yU3RvcCgwLjUsICBcInJnYmEoXCIgKyBDT0xPUlswXSArIFwiLCBcIiArIENPTE9SWzFdICsgXCIsIFwiICsgQ09MT1JbMl0gKyBcIiwgXCIgKyAgMC4wNSArIFwiKVwiKTtcbiAgICByYWRncmFkLmFkZENvbG9yU3RvcCgxLCAgXCJyZ2JhKFwiICsgQ09MT1JbMF0gKyBcIiwgXCIgKyBDT0xPUlsxXSArIFwiLCBcIiArIENPTE9SWzJdICsgXCIsIFwiICsgIDAgKyBcIilcIik7XG4gICAgdGhpcy5jb250ZXh0LmZpbGxTdHlsZSA9IHJhZGdyYWQ7XG4gICAgdGhpcy5jb250ZXh0LmZpbGxSZWN0KHgtYlJhZCwgeS1iUmFkLCBiUmFkLCBiUmFkKTtcbiAgICAvL3RoaXMuY29udGV4dC5maWxsUmVjdCh4LTQwLCB5LTQwLCA4MCwgODApOyovXG5cbiAgICB0aGlzLmNvbnRleHQuYmVnaW5QYXRoKCk7XG4gICAgICB0aGlzLmNvbnRleHQuYXJjKHgsIHksIGJSYWQsIDAsIDIgKiBNYXRoLlBJLCBmYWxzZSk7XG4gICAgICAvL1x0dGhpcy5jb250ZXh0LmZpbGxTdHlsZSA9IFwicmdiYShcIiArIENPTE9SWzBdICsgXCIsIFwiICsgQ09MT1JbMV0gKyBcIiwgXCIgKyBDT0xPUlsyXSArIFwiLCBcIiArICAwLjA1KiBCUlVTSF9QUkVTU1VSRSArIFwiKVwiO1xuICAgIC8vICBjb250ZXh0LmZpbGxTdHlsZSA9ICdncmVlbic7XG4gICAgICB0aGlzLmNvbnRleHQuZmlsbCgpO1xuICB9XG4gIHRoaXMucGFzdFRoaWNrbmVzcyA9IHRoaXMudGhpY2tuZXNzO1xuXHRcdFxuXHQvKkNPREUgRk9SIFNQUkFZKi9cblx0LypcdGZvciAodmFyIGkgPSAwOyBpIDwgZGlzdGFuY2U7IGkrPTUpIHtcbiAgICBcdFx0eCA9IHN0YXJ0LnggKyAoTWF0aC5zaW4oYW5nbGUpICogaSk7XG4gICAgXHRcdHkgPSBzdGFydC55ICsgKE1hdGguY29zKGFuZ2xlKSAqIGkpO1xuICAgIFxuICAgIFx0XHR2YXIgcmFkZ3JhZCA9IHRoaXMuY29udGV4dC5jcmVhdGVSYWRpYWxHcmFkaWVudCh4LHksMTAqQlJVU0hfU0laRSx4LHksMjAqQlJVU0hfU0laRSk7XG4gICAgXG4gLy9cbiAgICBcbiAgICBcbiAgICByYWRncmFkLmFkZENvbG9yU3RvcCgwLCAgXCJyZ2JhKFwiICsgQ09MT1JbMF0gKyBcIiwgXCIgKyBDT0xPUlsxXSArIFwiLCBcIiArIENPTE9SWzJdICsgXCIsIFwiICsgIDAuMSArIFwiKVwiKTtcbiAgICByYWRncmFkLmFkZENvbG9yU3RvcCgwLjUsICBcInJnYmEoXCIgKyBDT0xPUlswXSArIFwiLCBcIiArIENPTE9SWzFdICsgXCIsIFwiICsgQ09MT1JbMl0gKyBcIiwgXCIgKyAgMC4wNSArIFwiKVwiKTtcbiAgICByYWRncmFkLmFkZENvbG9yU3RvcCgxLCAgXCJyZ2JhKFwiICsgQ09MT1JbMF0gKyBcIiwgXCIgKyBDT0xPUlsxXSArIFwiLCBcIiArIENPTE9SWzJdICsgXCIsIFwiICsgIDAgKyBcIilcIik7XG4gICAgdGhpcy5jb250ZXh0LmZpbGxTdHlsZSA9IHJhZGdyYWQ7XG4gICAgdGhpcy5jb250ZXh0LmZpbGxSZWN0KHgtMjAqQlJVU0hfU0laRSwgeS0yMCpCUlVTSF9TSVpFLCA0MCpCUlVTSF9TSVpFLCA0MCpCUlVTSF9TSVpFKTtcbiAgICAvL3RoaXMuY29udGV4dC5maWxsUmVjdCh4LTQwLCB5LTQwLCA4MCwgODApO1xuICB9Ki9cblxuXHRcdHRoaXMucHJldk1vdXNlWCA9IG1vdXNlWDtcblx0XHR0aGlzLnByZXZNb3VzZVkgPSBtb3VzZVk7XG5cdH0sXG5cblx0c3Ryb2tlRW5kOiBmdW5jdGlvbigpXG5cdHtcblx0XHRcblx0fVxufVxuXG5leHBvcnRzLlBlbiA9IHBlbjtcbnZhciBUcmlnID0ge1xuICAgIGRpc3RhbmNlQmV0d2VlbjJQb2ludHM6IGZ1bmN0aW9uICggcG9pbnQxLCBwb2ludDIgKSB7XG4gXG4gICAgICAgIHZhciBkeCA9IHBvaW50Mi54IC0gcG9pbnQxLng7XG4gICAgICAgIHZhciBkeSA9IHBvaW50Mi55IC0gcG9pbnQxLnk7XG4gICAgICAgIHJldHVybiBNYXRoLnNxcnQoIE1hdGgucG93KCBkeCwgMiApICsgTWF0aC5wb3coIGR5LCAyICkgKTtcbiAgICB9LFxuIFxuICAgIGFuZ2xlQmV0d2VlbjJQb2ludHM6IGZ1bmN0aW9uICggcG9pbnQxLCBwb2ludDIgKSB7XG4gXG4gICAgICAgIHZhciBkeCA9IHBvaW50Mi54IC0gcG9pbnQxLng7XG4gICAgICAgIHZhciBkeSA9IHBvaW50Mi55IC0gcG9pbnQxLnk7XG4gICAgICAgIHJldHVybiBNYXRoLmF0YW4yKCBkeCwgZHkgKTtcbiAgICB9XG59Il19
