var socketLoc, socket;
var SLIDER_WIDTH = 700;
var vote;
var visionData = {};



$(function() {
	visionData = jQuery.parseJSON($('#visionData').val());
	
	connectToSocket();
	//var visonData = "hey";
	console.log(visionData);

	$('#skip').click(function(e){
		socket.emit('newRandom', "");
    resetSlider();
	});

  $('#never').click(function(e){
    highlightNever();
  });

    $('#submit').click(function(e){
      // globalParams = {'_id':id, 'vision': vision, 'year': year, 'tags': tags, 'imgPath':imgPath, 'inspiration': inspiration, 'notes' : notes, 'newVision':isNew};
   
      var params = {'_id':visionData._id, 'vote':vote};
      console.log(JSON.stringify(params));
    socket.emit('addVote', params);
     resetSlider();
  });


	setLogLabels();
	//$('#text-container').textfill({ maxFontPixels: 360, innerTag: 'h3'
  createSlider();
  showVision(visionData);
       
});

function highlightNever(){
  $('#never').css('color', '#00A79D');
  $('#never').css('font-weight', '900');
    vote = "never";
   $('#slider-val').html("");
}

function unhighlightNever(){
  $('#never').css('color', '#FFFFFF');
  $('#never').css('font-weight', '400');
}

function resetSlider(){
  vote = "";
  
   $('#slider').simpleSlider("setValue", 0);
    $('#slider-val').html("");
}

function createSlider(){
    $('#slider').simpleSlider();
      $("#slider").bind("slider:changed", function (event, data) {
  // The currently selected value of the slider
  unhighlightNever();
  console.log(data.value);
  var logYear = logslider(data.value);
  var year = new Date().getFullYear();
  console.log("year is" + year);
  var sliderVal = Math.round(logYear);
  if(sliderVal < 10) sliderVal = (sliderVal-5)*2
  vote = sliderVal + year
  $('#slider-val').html("&nbsp;"+ vote);
   var pos = data.value*SLIDER_WIDTH+20+'px';
  $('#slider-val').css('left', pos);
  // The value as a ratio of the slider (between 0 and 1)
  console.log(event);
});
}
function connectToSocket(){
	var str = "" + window.location;
  var extra = str.lastIndexOf("/");
  socketLoc = str.substring(0, extra);
 
  //var socket = io.connect('http://10.10.16.43');
  socket = io.connect(socketLoc);
  socket.on('newVision', function (data) {
   visionData = jQuery.parseJSON(data);
    showVision(visionData);
    //socket.emit('my other event', { my: 'data' });
  });
}

function showVision(data){
	 console.log(data.vision);
   $('#vision-text').html("");
	$('#image').css('background-image', 'url(' + data.imgPath + ')');
	$('#vision-text').html(data.vision);
	$('#text-container').textfill({ maxFontPixels: 60, innerTag: 'h3'
        
        });
}

function logslider(position) {
  // position will be between 0 and 100
  var minp = 0;
  var maxp = 1;

  // The result should be between 100 an 10000000
  var minv = Math.log(5);
  var maxv = Math.log(150);

  // calculate adjustment factor
  var scale = (maxv-minv) / (maxp-minp);

  return Math.exp(minv + scale*(position-minp));
}

function logposition(value) {

	var minp = 0;
  var maxp = 1;

  // The result should be between 100 an 10000000
  var minv = Math.log(5);
  var maxv = Math.log(150);

  // calculate adjustment factor
  var scale = (maxv-minv) / (maxp-minp);
   // set minv, ... like above
   // ...
   return (Math.log(value)-minv) / scale + minp;
}

function setLogLabels(){
	/*addLabel(1);*/
	addLabel(5, "Today");
	addLabel(10, "10 Years");
	addLabel(20, "20 Years");
	addLabel(50, "50 Years");
	addLabel(100, "100 Years");
	
}

function addLabel(number, text){
	var newDiv = jQuery('<div/>', {
    'class': 'log-label',
    width: '100px',
    height: '20px',
    });
    newDiv.text(text);
    var pos = logposition(number)*SLIDER_WIDTH;
    newDiv.css({
        position: "absolute",
        left: pos + "px",
        bottom: "-8px"
        }).appendTo("#slider-wrapper");
}