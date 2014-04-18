(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
},{}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyIvdXNyL2xvY2FsL2xpYi9ub2RlX21vZHVsZXMvd2F0Y2hpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsIi9Vc2Vycy9rYXJpbmF3aGl0ZS9jb2RlL0ZVVFVSRVMvRlVUVVJFU19ERU1PXzNfMzEvc2hhcmVkL2VyYXNlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3Rocm93IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIil9dmFyIGY9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGYuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sZixmLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImVyYXNlciA9IGZ1bmN0aW9uKCBjb250ZXh0IClcbntcblx0dGhpcy5pbml0KCBjb250ZXh0ICk7XG59XG5cbmVyYXNlci5wcm90b3R5cGUgPVxue1xuXHRuYW1lOiBcIkVyYXNlclwiLFxuXHRcblx0Y29udGV4dDogbnVsbCxcblxuXHRcblxuXHRwcmV2TW91c2VYOiBudWxsLCBwcmV2TW91c2VZOiBudWxsLFxuXG5cdGluaXQ6IGZ1bmN0aW9uKCBjb250ZXh0LCBtYXJrZXJDb250ZXh0IClcblx0e1xuXHRcdHRoaXMuY29udGV4dCA9IGNvbnRleHQ7XG5cdFxuXHRcdC8vdGhpcy5jb250ZXh0Lmdsb2JhbENvbXBvc2l0ZU9wZXJhdGlvbiA9ICdzb3VyY2Utb3Zlcic7XG5cdFx0Ly90aGlzLmJydXNoID0gbmV3IEltYWdlKCk7XG5cdFx0Ly90aGlzLmJydXNoLnNyYyA9ICdhc3NldHMvYnJ1c2gyLnBuZyc7XG5cdFx0dGhpcy5jb250ZXh0Lmdsb2JhbENvbXBvc2l0ZU9wZXJhdGlvbiA9ICdkZXN0aW5hdGlvbi1vdXQnIDtcblx0fSxcblxuXHRkZXN0cm95OiBmdW5jdGlvbigpXG5cdHtcblx0fSxcblxuXHRzdHJva2VTdGFydDogZnVuY3Rpb24oIG1vdXNlWCwgbW91c2VZIClcblx0e1xuXHRcdHRoaXMucHJldk1vdXNlWCA9IG1vdXNlWDtcblx0XHR0aGlzLnByZXZNb3VzZVkgPSBtb3VzZVk7XG5cdH0sXG5cblx0c3Ryb2tlOiBmdW5jdGlvbiggbW91c2VYLCBtb3VzZVkgKVxuXHR7XG5cdFx0dGhpcy5jb250ZXh0LnNhdmUoKTtcbiAgICAgIC8vIHRoaXMuY29udGV4dC5nbG9iYWxDb21wb3NpdGVPcGVyYXRpb24gPSAnZGVzdGluYXRpb24tb3V0JyA7XG4gICAgICBcdHZhciBFWFRFTlQgPSAxMDsgLy9DSEFOR0VEXG5cdFx0dmFyIGNpcmNSYWQgPSBFWFRFTlQqNjtcblx0XHR2YXIgc3RhcnQgPSB7eDogdGhpcy5wcmV2TW91c2VYLCB5OiB0aGlzLnByZXZNb3VzZVl9XG5cdFx0dmFyIGVuZCA9IHt4OiBtb3VzZVgsIHk6IG1vdXNlWX1cblx0XHR2YXIgZGlzdGFuY2UgPSBwYXJzZUludCggVHJpZy5kaXN0YW5jZUJldHdlZW4yUG9pbnRzKCBzdGFydCwgZW5kICkgKTtcblx0XHR2YXIgYW5nbGUgPSBUcmlnLmFuZ2xlQmV0d2VlbjJQb2ludHMoIHN0YXJ0LCBlbmQgKTtcblx0XHQvL3RoaXMuY29udGV4dC5saW5lV2lkdGggPSBCUlVTSF9TSVpFO1x0XG5cdFx0Ly90aGlzLmNvbnRleHQuc3Ryb2tlU3R5bGUgPSBcInJnYmEoXCIgKyBDT0xPUlswXSArIFwiLCBcIiArIENPTE9SWzFdICsgXCIsIFwiICsgQ09MT1JbMl0gKyBcIiwgXCIgKyAwLjUgKiBCUlVTSF9QUkVTU1VSRSArIFwiKVwiO1xuXHRcdC8vdGhpcy5jb250ZXh0LmZpbGxTdHlsZSA9IFwicmdiYShcIiArIEJBQ0tHUk9VTkRfQ09MT1JbMF0gKyBcIiwgXCIgKyBCQUNLR1JPVU5EX0NPTE9SWzFdICsgXCIsIFwiICsgQkFDS0dST1VORF9DT0xPUlsyXSArIFwiLCBcIiArIDAuNyAqIEJSVVNIX1BSRVNTVVJFICsgXCIpXCI7XG5cdFx0Ly90aGlzLmNvbnRleHQubGluZVdpZHRoID0gQlJVU0hfU0laRTtcdFxuXHRcdHRoaXMuY29udGV4dC5maWxsU3R5bGUgPSBcInJnYmEoMjU1LCAyNTUsIDEwMCwgMjU1KVwiO1xuXHRcdHZhciB4LHk7XG5cdFx0Zm9yICggdmFyIHo9MDsgKHo8PWRpc3RhbmNlIHx8IHo9PTApOyB6KysgKSB7XG5cdFx0eCA9IHN0YXJ0LnggKyAoTWF0aC5zaW4oYW5nbGUpICogeikgLSBjaXJjUmFkLzI7XG4gICAgXHR5ID0gc3RhcnQueSArIChNYXRoLmNvcyhhbmdsZSkgKiB6KSAtIGNpcmNSYWQvMjtcblx0XHRcblx0XHRcblx0XHR0aGlzLmNvbnRleHQuYmVnaW5QYXRoKCk7XG5cdFx0dGhpcy5jb250ZXh0LmFyYyh4LCB5LCBjaXJjUmFkLCAwLCBNYXRoLlBJKjIsIHRydWUpO1xuXHRcdHRoaXMuY29udGV4dC5jbG9zZVBhdGgoKTtcblx0XHR0aGlzLmNvbnRleHQuZmlsbCgpO1xuXG5cdFx0XG5cdFx0fVxuXHRcdC8vdGhpcy5jb250ZXh0LnN0cm9rZSgpO1xuXHRcdC8qdGhpcy5jb250ZXh0Lm1vdmVUbyh0aGlzLnByZXZNb3VzZVgsIHRoaXMucHJldk1vdXNlWSk7XG5cdFx0dGhpcy5jb250ZXh0LmxpbmVUbyhtb3VzZVgsIG1vdXNlWSk7XG5cdFx0dGhpcy5jb250ZXh0LnN0cm9rZSgpOyovXG5cdC8vfVxuXHQgICB0aGlzLmNvbnRleHQucmVzdG9yZSgpO1xuXHQgIFxuXHRcdHRoaXMucHJldk1vdXNlWCA9IG1vdXNlWDtcblx0XHR0aGlzLnByZXZNb3VzZVkgPSBtb3VzZVk7XG5cdH0sXG5cblx0c3Ryb2tlRW5kOiBmdW5jdGlvbigpXG5cdHtcblx0XHRcblx0fVxufVxuXG5leHBvcnRzLkVyYXNlciA9IGVyYXNlcjtcblxuXG52YXIgVHJpZyA9IHtcbiAgICBkaXN0YW5jZUJldHdlZW4yUG9pbnRzOiBmdW5jdGlvbiAoIHBvaW50MSwgcG9pbnQyICkge1xuIFxuICAgICAgICB2YXIgZHggPSBwb2ludDIueCAtIHBvaW50MS54O1xuICAgICAgICB2YXIgZHkgPSBwb2ludDIueSAtIHBvaW50MS55O1xuICAgICAgICByZXR1cm4gTWF0aC5zcXJ0KCBNYXRoLnBvdyggZHgsIDIgKSArIE1hdGgucG93KCBkeSwgMiApICk7XG4gICAgfSxcbiBcbiAgICBhbmdsZUJldHdlZW4yUG9pbnRzOiBmdW5jdGlvbiAoIHBvaW50MSwgcG9pbnQyICkge1xuIFxuICAgICAgICB2YXIgZHggPSBwb2ludDIueCAtIHBvaW50MS54O1xuICAgICAgICB2YXIgZHkgPSBwb2ludDIueSAtIHBvaW50MS55O1xuICAgICAgICByZXR1cm4gTWF0aC5hdGFuMiggZHgsIGR5ICk7XG4gICAgfVxufSJdfQ==
