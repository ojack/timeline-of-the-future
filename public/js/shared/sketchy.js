(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
sketchy = function( context )
{
	this.init( context );
}

sketchy.prototype =
{
	name: "Sketchy",
	
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

		this.points.push( [ mouseX, mouseY ] );

		//this.context.lineWidth = 1+EXTENT/10;
		this.context.lineWidth = 1;
		//this.context.strokeStyle = "rgba(" + COLOR[0] + ", " + COLOR[1] + ", " + COLOR[2] + ", " + 0.8  + ")";
		
		this.context.beginPath();
		this.context.moveTo(this.prevMouseX, this.prevMouseY);
		this.context.lineTo(mouseX, mouseY);
		this.context.stroke();

		for (i = 0; i < this.points.length; i++)
		{
			dx = this.points[i][0] - this.points[this.count][0];
			dy = this.points[i][1] - this.points[this.count][1];
			d = dx * dx + dy * dy;
			//d = (dx * dx + dy * dy)/(EXTENT/2);

			if (d < 2000 && Math.random() > (d / 2000))
			//if (d < 4000 && Math.random() > (d / 2000))
	//	if (d < 2500 && Math.random() > 0.9)
			{
				this.context.beginPath();
				this.context.moveTo( this.points[this.count][0] + (dx * 0.3), this.points[this.count][1] + (dy * 0.3));
				this.context.lineTo( this.points[i][0] - (dx * 0.3), this.points[i][1] - (dy * 0.3));
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

exports.Sketchy = sketchy;

},{}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyIvdXNyL2xvY2FsL2xpYi9ub2RlX21vZHVsZXMvd2F0Y2hpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsIi9Vc2Vycy9rYXJpbmF3aGl0ZS9jb2RlL0ZVVFVSRVMvRlVUVVJFU19ERU1PXzNfMzEvc2hhcmVkL3NrZXRjaHkuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3Rocm93IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIil9dmFyIGY9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGYuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sZixmLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsInNrZXRjaHkgPSBmdW5jdGlvbiggY29udGV4dCApXG57XG5cdHRoaXMuaW5pdCggY29udGV4dCApO1xufVxuXG5za2V0Y2h5LnByb3RvdHlwZSA9XG57XG5cdG5hbWU6IFwiU2tldGNoeVwiLFxuXHRcblx0Y29udGV4dDogbnVsbCxcblxuXHRwcmV2TW91c2VYOiBudWxsLCBwcmV2TW91c2VZOiBudWxsLFxuXG5cdHBvaW50czogbnVsbCwgY291bnQ6IG51bGwsXG5cblx0aW5pdDogZnVuY3Rpb24oIGNvbnRleHQgKVxuXHR7XG5cdFx0dGhpcy5jb250ZXh0ID0gY29udGV4dDtcblx0XHR0aGlzLmNvbnRleHQuZ2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uID0gJ3NvdXJjZS1vdmVyJztcblxuXHRcdHRoaXMucG9pbnRzID0gbmV3IEFycmF5KCk7XG5cdFx0dGhpcy5jb3VudCA9IDA7XG5cdH0sXG5cblx0ZGVzdHJveTogZnVuY3Rpb24oKVxuXHR7XG5cdH0sXG5cblx0c3Ryb2tlU3RhcnQ6IGZ1bmN0aW9uKCBtb3VzZVgsIG1vdXNlWSApXG5cdHtcblx0XHR0aGlzLnByZXZNb3VzZVggPSBtb3VzZVg7XG5cdFx0dGhpcy5wcmV2TW91c2VZID0gbW91c2VZO1xuXHR9LFxuXG5cdHN0cm9rZTogZnVuY3Rpb24oIG1vdXNlWCwgbW91c2VZIClcblx0e1xuXHRcdHZhciBpLCBkeCwgZHksIGQ7XG5cblx0XHR0aGlzLnBvaW50cy5wdXNoKCBbIG1vdXNlWCwgbW91c2VZIF0gKTtcblxuXHRcdC8vdGhpcy5jb250ZXh0LmxpbmVXaWR0aCA9IDErRVhURU5ULzEwO1xuXHRcdHRoaXMuY29udGV4dC5saW5lV2lkdGggPSAxO1xuXHRcdC8vdGhpcy5jb250ZXh0LnN0cm9rZVN0eWxlID0gXCJyZ2JhKFwiICsgQ09MT1JbMF0gKyBcIiwgXCIgKyBDT0xPUlsxXSArIFwiLCBcIiArIENPTE9SWzJdICsgXCIsIFwiICsgMC4wOCAqIEJSVVNIX1BSRVNTVVJFICsgXCIpXCI7XG5cdFx0XG5cdFx0dGhpcy5jb250ZXh0LmJlZ2luUGF0aCgpO1xuXHRcdHRoaXMuY29udGV4dC5tb3ZlVG8odGhpcy5wcmV2TW91c2VYLCB0aGlzLnByZXZNb3VzZVkpO1xuXHRcdHRoaXMuY29udGV4dC5saW5lVG8obW91c2VYLCBtb3VzZVkpO1xuXHRcdHRoaXMuY29udGV4dC5zdHJva2UoKTtcblxuXHRcdGZvciAoaSA9IDA7IGkgPCB0aGlzLnBvaW50cy5sZW5ndGg7IGkrKylcblx0XHR7XG5cdFx0XHRkeCA9IHRoaXMucG9pbnRzW2ldWzBdIC0gdGhpcy5wb2ludHNbdGhpcy5jb3VudF1bMF07XG5cdFx0XHRkeSA9IHRoaXMucG9pbnRzW2ldWzFdIC0gdGhpcy5wb2ludHNbdGhpcy5jb3VudF1bMV07XG5cdFx0XHRkID0gZHggKiBkeCArIGR5ICogZHk7XG5cdFx0XHQvL2QgPSAoZHggKiBkeCArIGR5ICogZHkpLyhFWFRFTlQvMik7XG5cblx0XHRcdC8vaWYgKGQgPCAyMDAwICYmIE1hdGgucmFuZG9tKCkgPiAoZCAvIDIwMDApKVxuXHRcdFx0Ly9pZiAoZCA8IDQwMDAgJiYgTWF0aC5yYW5kb20oKSA+IChkIC8gMjAwMCkpXG5cdFx0aWYgKGQgPCAyNTAwICYmIE1hdGgucmFuZG9tKCkgPiAwLjkpXG5cdFx0XHR7XG5cdFx0XHRcdHRoaXMuY29udGV4dC5iZWdpblBhdGgoKTtcblx0XHRcdFx0dGhpcy5jb250ZXh0Lm1vdmVUbyggdGhpcy5wb2ludHNbdGhpcy5jb3VudF1bMF0gKyAoZHggKiAwLjMpLCB0aGlzLnBvaW50c1t0aGlzLmNvdW50XVsxXSArIChkeSAqIDAuMykpO1xuXHRcdFx0XHR0aGlzLmNvbnRleHQubGluZVRvKCB0aGlzLnBvaW50c1tpXVswXSAtIChkeCAqIDAuMyksIHRoaXMucG9pbnRzW2ldWzFdIC0gKGR5ICogMC4zKSk7XG5cdFx0XHRcdHRoaXMuY29udGV4dC5zdHJva2UoKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHR0aGlzLnByZXZNb3VzZVggPSBtb3VzZVg7XG5cdFx0dGhpcy5wcmV2TW91c2VZID0gbW91c2VZO1xuXG5cdFx0dGhpcy5jb3VudCArKztcblx0fSxcblxuXHRzdHJva2VFbmQ6IGZ1bmN0aW9uKClcblx0e1xuXHRcdFxuXHR9XG59XG5cbmV4cG9ydHMuU2tldGNoeSA9IHNrZXRjaHk7XG4iXX0=
