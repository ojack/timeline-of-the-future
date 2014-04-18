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
		//this.context.strokeStyle = "rgba(" + COLOR[0] + ", " + COLOR[1] + ", " + COLOR[2] + ", " + 0.08 * BRUSH_PRESSURE + ")";
		
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

			//if (d < 2000 && Math.random() > (d / 2000))
			//if (d < 4000 && Math.random() > (d / 2000))
		if (d < 2500 && Math.random() > 0.9)
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
