(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

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

},{}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyIvdXNyL2xvY2FsL2xpYi9ub2RlX21vZHVsZXMvd2F0Y2hpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsIi9Vc2Vycy9rYXJpbmF3aGl0ZS9jb2RlL0ZVVFVSRVMvRlVUVVJFU19ERU1PXzNfMzEvc2hhcmVkL21hcmtlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKX12YXIgZj1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwoZi5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxmLGYuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiXG4vKmZ1bmN0aW9uIG1hcmtlciggY29udGV4dCApXG57XG5cdHRoaXMuaW5pdCggY29udGV4dCApO1xufSovXG5cbm1hcmtlciA9IGZ1bmN0aW9uKGNvbnRleHQpe1xuXHR0aGlzLmluaXQoIGNvbnRleHQgKTtcbn1cblxubWFya2VyLnByb3RvdHlwZSA9XG57XG5cdG5hbWU6IFwiTWFya2VyXCIsXG5cdFxuXHRjb250ZXh0OiBudWxsLFxuXG5cdHBhc3RUaGlja25lc3M6IDEwLFxuXG5cdHRoaWNrbmVzczogNDAwLFxuXG5cdHByZXZNb3VzZVg6IG51bGwsIHByZXZNb3VzZVk6IG51bGwsXG5cblx0aW5pdDogZnVuY3Rpb24oIGNvbnRleHQgKVxuXHR7XG5cdFx0dGhpcy5jb250ZXh0ID0gY29udGV4dDtcblx0XHR0aGlzLmNvbnRleHQuZ2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uID0gJ3NvdXJjZS1vdmVyJztcblx0XHQvL3RoaXMuYnJ1c2ggPSBuZXcgSW1hZ2UoKTtcblx0XHQvL3RoaXMuYnJ1c2guc3JjID0gJ2Fzc2V0cy9icnVzaDIucG5nJztcblxuXHR9LFxuXG5cdGRlc3Ryb3k6IGZ1bmN0aW9uKClcblx0e1xuXHR9LFxuXG5cdHN0cm9rZVN0YXJ0OiBmdW5jdGlvbiggbW91c2VYLCBtb3VzZVkgKVxuXHR7XG5cdFx0dGhpcy5wcmV2TW91c2VYID0gbW91c2VYO1xuXHRcdHRoaXMucHJldk1vdXNlWSA9IG1vdXNlWTtcblx0fSxcblxuXHRzdHJva2U6IGZ1bmN0aW9uKCBtb3VzZVgsIG1vdXNlWSApXG5cdHtcblx0XHQvKnRoaXMuY29udGV4dC5nbG9iYWxDb21wb3NpdGVPcGVyYXRpb24gPSAnbGlnaHRlbic7Ki9cblxuXHRcdC8vdmFyIGNpcmNSYWQgPSAyO1xuXHRcdHZhciBzdGFydCA9IHt4OiB0aGlzLnByZXZNb3VzZVgsIHk6IHRoaXMucHJldk1vdXNlWX1cblx0XHR2YXIgZW5kID0ge3g6IG1vdXNlWCwgeTogbW91c2VZfVxuXHRcdFxuXHQvL1x0dmFyIGRpc3RhbmNlID0gcGFyc2VJbnQoIFRyaWcuZGlzdGFuY2VCZXR3ZWVuMlBvaW50cyggc3RhcnQsIGVuZCApICk7XG5cdFx0dmFyIGRpc3RhbmNlID0gcGFyc2VJbnQoIFRyaWcuZGlzdGFuY2VCZXR3ZWVuMlBvaW50cyggc3RhcnQsIGVuZCApICk7XG5cdFx0dmFyIGFuZ2xlID0gVHJpZy5hbmdsZUJldHdlZW4yUG9pbnRzKCBzdGFydCwgZW5kICk7XG5cdFx0Ly90aGlzLmNvbnRleHQubGluZVdpZHRoID0gQlJVU0hfU0laRTtcdFxuXHRcdC8vdGhpcy5jb250ZXh0LnN0cm9rZVN0eWxlID0gXCJyZ2JhKFwiICsgQ09MT1JbMF0gKyBcIiwgXCIgKyBDT0xPUlsxXSArIFwiLCBcIiArIENPTE9SWzJdICsgXCIsIFwiICsgIEJSVVNIX1BSRVNTVVJFICsgXCIpXCI7XG5cdFx0Ly90aGlzLmNvbnRleHQuZmlsbFN0eWxlID0gXCJyZ2JhKFwiICsgQ09MT1JbMF0gKyBcIiwgXCIgKyBDT0xPUlsxXSArIFwiLCBcIiArIENPTE9SWzJdICsgXCIsIFwiICsgIDAuMSArIFwiKVwiO1xuXHRcdC8vdGhpcy5jb250ZXh0LmZpbGxTdHlsZSA9IFwicmdiYSgxMDAsIDIwMCwgMCwgMC4xKVwiO1xuXHRcdC8vdmFyIGNpcmNSYWQgPSB0aGlzLnRoaWNrbmVzcztcblxuXHRcdHZhciB4LHk7XG5cdFx0dmFyIHogPSAwO1xuXHRcdC8qd2hpbGUoeiA8IGRpc3RhbmNlKXtcblx0XHQvL2ZvciAoIHZhciB6PTA7ICh6PD1kaXN0YW5jZSB8fCB6PT0wKTsgeisrICkge1xuXHRcdHZhciBjaXJjUmFkID0gdGhpcy5wYXN0VGhpY2tuZXNzICsgKHRoaXMudGhpY2tuZXNzIC0gdGhpcy5wYXN0VGhpY2tuZXNzKSp6L2Rpc3RhbmNlO1xuXHRcdHggPSBzdGFydC54ICsgKE1hdGguc2luKGFuZ2xlKSAqIHopIC0gY2lyY1JhZC8yO1xuICAgIFx0eSA9IHN0YXJ0LnkgKyAoTWF0aC5jb3MoYW5nbGUpICogeikgLSBjaXJjUmFkLzI7XG5cdFx0Y29uc29sZS5sb2coY2lyY1JhZCk7XG5cdFx0dGhpcy5jb250ZXh0LmJlZ2luUGF0aCgpO1xuXHRcdHRoaXMuY29udGV4dC5hcmMoeCwgeSwgY2lyY1JhZCwgMCwgTWF0aC5QSSoyLCB0cnVlKTtcblx0XHR0aGlzLmNvbnRleHQuY2xvc2VQYXRoKCk7XG5cdFx0dGhpcy5jb250ZXh0LmZpbGwoKTtcblx0XHQvL3RoaXMuY29udGV4dC5zdHJva2UoKTtcblx0XHQvKnRoaXMuY29udGV4dC5tb3ZlVG8odGhpcy5wcmV2TW91c2VYLCB0aGlzLnByZXZNb3VzZVkpO1xuXHRcdHRoaXMuY29udGV4dC5saW5lVG8obW91c2VYLCBtb3VzZVkpO1xuXHRcdHRoaXMuY29udGV4dC5zdHJva2UoKTsqL1xuXHQvKlx0XHR6Kz1jaXJjUmFkO1xuXHRcdH0qL1xuXHQgLy8gdGhpcy50aGlja25lc3MgPSAxK01hdGgucG93KGRpc3RhbmNlLzUwLCAyKTsvLyBnb29kIGZvciBwZW5cblx0ICAvL3RoaXMudGhpY2tuZXNzID0gMStNYXRoLnBvdyhkaXN0YW5jZS84MCwgNCk7XG5cdHRoaXMudGhpY2tuZXNzID0gNi8yKigxMCtkaXN0YW5jZS8xMCk7XG5cdC8vdGhpcy50aGlja25lc3MgPSAxLzIqKDEwK2Rpc3RhbmNlKTtcblx0dmFyIGJSYWQgPSA2O1xuZm9yICh2YXIgaSA9IDA7IGkgPCBkaXN0YW5jZTsgaSs9YlJhZC81KSB7XG4gICAgXHRcdHggPSBzdGFydC54ICsgKE1hdGguc2luKGFuZ2xlKSAqIGkpO1xuICAgIFx0XHR5ID0gc3RhcnQueSArIChNYXRoLmNvcyhhbmdsZSkgKiBpKTtcbiAgICBcbiAgICBcdC8vXHR2YXIgcmFkZ3JhZCA9IHRoaXMuY29udGV4dC5jcmVhdGVSYWRpYWxHcmFkaWVudCh4LHksMTAqQlJVU0hfU0laRSx4LHksMjAqQlJVU0hfU0laRSk7XG4gICAgXG4gLy9cbiBcdGJSYWQgPSB0aGlzLnBhc3RUaGlja25lc3MgKyBpICoodGhpcy50aGlja25lc3MgLSB0aGlzLnBhc3RUaGlja25lc3MpL2Rpc3RhbmNlO1xuIFx0Ly9iUmFkID0gNjtcbiAgLy8gIGNvbnNvbGUubG9nKGJSYWQpO1xuICAgIFxuICAgLyogcmFkZ3JhZC5hZGRDb2xvclN0b3AoMCwgIFwicmdiYShcIiArIENPTE9SWzBdICsgXCIsIFwiICsgQ09MT1JbMV0gKyBcIiwgXCIgKyBDT0xPUlsyXSArIFwiLCBcIiArICAwLjEgKyBcIilcIik7XG4gICAgcmFkZ3JhZC5hZGRDb2xvclN0b3AoMC41LCAgXCJyZ2JhKFwiICsgQ09MT1JbMF0gKyBcIiwgXCIgKyBDT0xPUlsxXSArIFwiLCBcIiArIENPTE9SWzJdICsgXCIsIFwiICsgIDAuMDUgKyBcIilcIik7XG4gICAgcmFkZ3JhZC5hZGRDb2xvclN0b3AoMSwgIFwicmdiYShcIiArIENPTE9SWzBdICsgXCIsIFwiICsgQ09MT1JbMV0gKyBcIiwgXCIgKyBDT0xPUlsyXSArIFwiLCBcIiArICAwICsgXCIpXCIpO1xuICAgIHRoaXMuY29udGV4dC5maWxsU3R5bGUgPSByYWRncmFkO1xuICAgIHRoaXMuY29udGV4dC5maWxsUmVjdCh4LWJSYWQsIHktYlJhZCwgYlJhZCwgYlJhZCk7XG4gICAgLy90aGlzLmNvbnRleHQuZmlsbFJlY3QoeC00MCwgeS00MCwgODAsIDgwKTsqL1xuXG4gICAgdGhpcy5jb250ZXh0LmJlZ2luUGF0aCgpO1xuICAgICAgdGhpcy5jb250ZXh0LmFyYyh4LCB5LCBiUmFkLCAwLCAyICogTWF0aC5QSSwgZmFsc2UpO1xuICAgICAgLy9cdHRoaXMuY29udGV4dC5maWxsU3R5bGUgPSBcInJnYmEoXCIgKyBDT0xPUlswXSArIFwiLCBcIiArIENPTE9SWzFdICsgXCIsIFwiICsgQ09MT1JbMl0gKyBcIiwgXCIgKyAgMC4wNSogQlJVU0hfUFJFU1NVUkUgKyBcIilcIjtcbiAgICAvLyAgY29udGV4dC5maWxsU3R5bGUgPSAnZ3JlZW4nO1xuICAgICAgdGhpcy5jb250ZXh0LmZpbGwoKTtcbiAgfVxuICB0aGlzLnBhc3RUaGlja25lc3MgPSB0aGlzLnRoaWNrbmVzcztcblx0XHRcblx0LypDT0RFIEZPUiBTUFJBWSovXG5cdC8qXHRmb3IgKHZhciBpID0gMDsgaSA8IGRpc3RhbmNlOyBpKz01KSB7XG4gICAgXHRcdHggPSBzdGFydC54ICsgKE1hdGguc2luKGFuZ2xlKSAqIGkpO1xuICAgIFx0XHR5ID0gc3RhcnQueSArIChNYXRoLmNvcyhhbmdsZSkgKiBpKTtcbiAgICBcbiAgICBcdFx0dmFyIHJhZGdyYWQgPSB0aGlzLmNvbnRleHQuY3JlYXRlUmFkaWFsR3JhZGllbnQoeCx5LDEwKkJSVVNIX1NJWkUseCx5LDIwKkJSVVNIX1NJWkUpO1xuICAgIFxuIC8vXG4gICAgXG4gICAgXG4gICAgcmFkZ3JhZC5hZGRDb2xvclN0b3AoMCwgIFwicmdiYShcIiArIENPTE9SWzBdICsgXCIsIFwiICsgQ09MT1JbMV0gKyBcIiwgXCIgKyBDT0xPUlsyXSArIFwiLCBcIiArICAwLjEgKyBcIilcIik7XG4gICAgcmFkZ3JhZC5hZGRDb2xvclN0b3AoMC41LCAgXCJyZ2JhKFwiICsgQ09MT1JbMF0gKyBcIiwgXCIgKyBDT0xPUlsxXSArIFwiLCBcIiArIENPTE9SWzJdICsgXCIsIFwiICsgIDAuMDUgKyBcIilcIik7XG4gICAgcmFkZ3JhZC5hZGRDb2xvclN0b3AoMSwgIFwicmdiYShcIiArIENPTE9SWzBdICsgXCIsIFwiICsgQ09MT1JbMV0gKyBcIiwgXCIgKyBDT0xPUlsyXSArIFwiLCBcIiArICAwICsgXCIpXCIpO1xuICAgIHRoaXMuY29udGV4dC5maWxsU3R5bGUgPSByYWRncmFkO1xuICAgIHRoaXMuY29udGV4dC5maWxsUmVjdCh4LTIwKkJSVVNIX1NJWkUsIHktMjAqQlJVU0hfU0laRSwgNDAqQlJVU0hfU0laRSwgNDAqQlJVU0hfU0laRSk7XG4gICAgLy90aGlzLmNvbnRleHQuZmlsbFJlY3QoeC00MCwgeS00MCwgODAsIDgwKTtcbiAgfSovXG5cblx0XHR0aGlzLnByZXZNb3VzZVggPSBtb3VzZVg7XG5cdFx0dGhpcy5wcmV2TW91c2VZID0gbW91c2VZO1xuXHR9LFxuXG5cdHN0cm9rZUVuZDogZnVuY3Rpb24oKVxuXHR7XG5cdFx0XG5cdH1cbn1cblxuZXhwb3J0cy5NYXJrZXIgPSBtYXJrZXI7XG5cbnZhciBUcmlnID0ge1xuICAgIGRpc3RhbmNlQmV0d2VlbjJQb2ludHM6IGZ1bmN0aW9uICggcG9pbnQxLCBwb2ludDIgKSB7XG4gXG4gICAgICAgIHZhciBkeCA9IHBvaW50Mi54IC0gcG9pbnQxLng7XG4gICAgICAgIHZhciBkeSA9IHBvaW50Mi55IC0gcG9pbnQxLnk7XG4gICAgICAgIHJldHVybiBNYXRoLnNxcnQoIE1hdGgucG93KCBkeCwgMiApICsgTWF0aC5wb3coIGR5LCAyICkgKTtcbiAgICB9LFxuIFxuICAgIGFuZ2xlQmV0d2VlbjJQb2ludHM6IGZ1bmN0aW9uICggcG9pbnQxLCBwb2ludDIgKSB7XG4gXG4gICAgICAgIHZhciBkeCA9IHBvaW50Mi54IC0gcG9pbnQxLng7XG4gICAgICAgIHZhciBkeSA9IHBvaW50Mi55IC0gcG9pbnQxLnk7XG4gICAgICAgIHJldHVybiBNYXRoLmF0YW4yKCBkeCwgZHkgKTtcbiAgICB9XG59XG4iXX0=
