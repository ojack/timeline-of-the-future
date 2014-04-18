(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
web = function( context )
{
	this.init( context );
}

web.prototype =
{
	name: "Web",
	
	context: null,

	prevMouseX: null, prevMouseY: null,

	points: null, count: null,

	init: function( context )
	{
		this.context = context;
		this.context.globalCompositeOperation = 'source-over';

		this.points = new Array();
		this.count = 0;
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
		var i, dx, dy, d;
		var EXTENT = 6;
		this.points.push( [ mouseX, mouseY ] );

		this.context.lineWidth = 1+EXTENT/10;
		//this.context.strokeStyle = "rgba(" + COLOR[0] + ", " + COLOR[1] + ", " + COLOR[2] + ", " + 0.5 * BRUSH_PRESSURE + ")";
		this.context.beginPath();
		this.context.moveTo(this.prevMouseX, this.prevMouseY);
		this.context.lineTo(mouseX, mouseY);
		this.context.stroke();

	//	this.context.strokeStyle = "rgba(" + COLOR[0] + ", " + COLOR[1] + ", " + COLOR[2] + ", " + 0.1 * BRUSH_PRESSURE + ")";

		for (i = 0; i < this.points.length; i++)
		{
			dx = this.points[i][0] - this.points[this.count][0];
			dy = this.points[i][1] - this.points[this.count][1];
		//	d = (dx * dx + dy * dy)/(EXTENT);
			d = (dx * dx + dy * dy);
			if (d < 2500 && Math.random() > 0.9+0.003*EXTENT)
			{
				this.context.beginPath();
				this.context.moveTo( this.points[this.count][0], this.points[this.count][1]);
				this.context.lineTo( this.points[i][0], this.points[i][1]);
				this.context.stroke();
			}
		}

		this.prevMouseX = mouseX;
		this.prevMouseY = mouseY;

		this.count ++;
	},

	strokeEnd: function()
	{
		
	}
}

exports.Web = web;

},{}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyIvdXNyL2xvY2FsL2xpYi9ub2RlX21vZHVsZXMvd2F0Y2hpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsIi9Vc2Vycy9rYXJpbmF3aGl0ZS9jb2RlL0ZVVFVSRVMvRlVUVVJFU19ERU1PXzNfMzEvc2hhcmVkL3dlYi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKX12YXIgZj1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwoZi5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxmLGYuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwid2ViID0gZnVuY3Rpb24oIGNvbnRleHQgKVxue1xuXHR0aGlzLmluaXQoIGNvbnRleHQgKTtcbn1cblxud2ViLnByb3RvdHlwZSA9XG57XG5cdG5hbWU6IFwiV2ViXCIsXG5cdFxuXHRjb250ZXh0OiBudWxsLFxuXG5cdHByZXZNb3VzZVg6IG51bGwsIHByZXZNb3VzZVk6IG51bGwsXG5cblx0cG9pbnRzOiBudWxsLCBjb3VudDogbnVsbCxcblxuXHRpbml0OiBmdW5jdGlvbiggY29udGV4dCApXG5cdHtcblx0XHR0aGlzLmNvbnRleHQgPSBjb250ZXh0O1xuXHRcdHRoaXMuY29udGV4dC5nbG9iYWxDb21wb3NpdGVPcGVyYXRpb24gPSAnc291cmNlLW92ZXInO1xuXG5cdFx0dGhpcy5wb2ludHMgPSBuZXcgQXJyYXkoKTtcblx0XHR0aGlzLmNvdW50ID0gMDtcblx0fSxcblxuXHRkZXN0cm95OiBmdW5jdGlvbigpXG5cdHtcblx0fSxcblxuXHRzdHJva2VTdGFydDogZnVuY3Rpb24oIG1vdXNlWCwgbW91c2VZIClcblx0e1xuXHRcdHRoaXMucHJldk1vdXNlWCA9IG1vdXNlWDtcblx0XHR0aGlzLnByZXZNb3VzZVkgPSBtb3VzZVk7XG5cdH0sXG5cblx0c3Ryb2tlOiBmdW5jdGlvbiggbW91c2VYLCBtb3VzZVkgKVxuXHR7XG5cdFx0dmFyIGksIGR4LCBkeSwgZDtcblx0XHR2YXIgRVhURU5UID0gNjtcblx0XHR0aGlzLnBvaW50cy5wdXNoKCBbIG1vdXNlWCwgbW91c2VZIF0gKTtcblxuXHRcdHRoaXMuY29udGV4dC5saW5lV2lkdGggPSAxK0VYVEVOVC8xMDtcblx0XHQvL3RoaXMuY29udGV4dC5zdHJva2VTdHlsZSA9IFwicmdiYShcIiArIENPTE9SWzBdICsgXCIsIFwiICsgQ09MT1JbMV0gKyBcIiwgXCIgKyBDT0xPUlsyXSArIFwiLCBcIiArIDAuNSAqIEJSVVNIX1BSRVNTVVJFICsgXCIpXCI7XG5cdFx0dGhpcy5jb250ZXh0LmJlZ2luUGF0aCgpO1xuXHRcdHRoaXMuY29udGV4dC5tb3ZlVG8odGhpcy5wcmV2TW91c2VYLCB0aGlzLnByZXZNb3VzZVkpO1xuXHRcdHRoaXMuY29udGV4dC5saW5lVG8obW91c2VYLCBtb3VzZVkpO1xuXHRcdHRoaXMuY29udGV4dC5zdHJva2UoKTtcblxuXHQvL1x0dGhpcy5jb250ZXh0LnN0cm9rZVN0eWxlID0gXCJyZ2JhKFwiICsgQ09MT1JbMF0gKyBcIiwgXCIgKyBDT0xPUlsxXSArIFwiLCBcIiArIENPTE9SWzJdICsgXCIsIFwiICsgMC4xICogQlJVU0hfUFJFU1NVUkUgKyBcIilcIjtcblxuXHRcdGZvciAoaSA9IDA7IGkgPCB0aGlzLnBvaW50cy5sZW5ndGg7IGkrKylcblx0XHR7XG5cdFx0XHRkeCA9IHRoaXMucG9pbnRzW2ldWzBdIC0gdGhpcy5wb2ludHNbdGhpcy5jb3VudF1bMF07XG5cdFx0XHRkeSA9IHRoaXMucG9pbnRzW2ldWzFdIC0gdGhpcy5wb2ludHNbdGhpcy5jb3VudF1bMV07XG5cdFx0Ly9cdGQgPSAoZHggKiBkeCArIGR5ICogZHkpLyhFWFRFTlQpO1xuXHRcdFx0ZCA9IChkeCAqIGR4ICsgZHkgKiBkeSk7XG5cdFx0XHRpZiAoZCA8IDI1MDAgJiYgTWF0aC5yYW5kb20oKSA+IDAuOSswLjAwMypFWFRFTlQpXG5cdFx0XHR7XG5cdFx0XHRcdHRoaXMuY29udGV4dC5iZWdpblBhdGgoKTtcblx0XHRcdFx0dGhpcy5jb250ZXh0Lm1vdmVUbyggdGhpcy5wb2ludHNbdGhpcy5jb3VudF1bMF0sIHRoaXMucG9pbnRzW3RoaXMuY291bnRdWzFdKTtcblx0XHRcdFx0dGhpcy5jb250ZXh0LmxpbmVUbyggdGhpcy5wb2ludHNbaV1bMF0sIHRoaXMucG9pbnRzW2ldWzFdKTtcblx0XHRcdFx0dGhpcy5jb250ZXh0LnN0cm9rZSgpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHRoaXMucHJldk1vdXNlWCA9IG1vdXNlWDtcblx0XHR0aGlzLnByZXZNb3VzZVkgPSBtb3VzZVk7XG5cblx0XHR0aGlzLmNvdW50ICsrO1xuXHR9LFxuXG5cdHN0cm9rZUVuZDogZnVuY3Rpb24oKVxuXHR7XG5cdFx0XG5cdH1cbn1cblxuZXhwb3J0cy5XZWIgPSB3ZWI7XG4iXX0=
