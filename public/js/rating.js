var socketLoc, socket;
var SLIDER_WIDTH = 600;
var SLIDER_MULTIPLE = 700/SLIDER_WIDTH;
var vote = ""+2014;
var visionData = {};
var like = false;


$(function() {
	visionData = jQuery.parseJSON($('#visionData').val());
	
	connectToSocket();
	//var visonData = "hey";
	console.log(visionData);

  $('#like').click(function(e){
    toggleLike();
  });

	$('#skip').click(function(e){
		socket.emit('newRandom',  {'_id':visionData._id, 'like': like});
    resetSlider();
	});

  

    $('#submit').click(function(e){
      // globalParams = {'_id':id, 'vision': vision, 'year': year, 'tags': tags, 'imgPath':imgPath, 'inspiration': inspiration, 'notes' : notes, 'newVision':isNew};
    var params = {'_id':visionData._id, 'like': like, 'vote':vote};
      console.log(vote);
     showResults(params);
    
     resetSlider();
  });


	setLogLabels();
	//$('#text-container').textfill({ maxFontPixels: 360, innerTag: 'h3'
  createSlider();
  showVision(visionData);
       
});



function resetSlider(){
  vote = ""+2014;
  
   $('#slider').simpleSlider("setValue", 0);
    $('#slider-val').html("");
}

function createSlider(){
    $('#slider').simpleSlider();
      $("#slider").bind("slider:changed", function (event, data) {
  // The currently selected value of the slider
 
  console.log(data.value);
  var logYear = logslider(data.value*SLIDER_MULTIPLE);
  var year = new Date().getFullYear();
  console.log("year is" + year);
  var sliderVal = Math.round(logYear);
  if(sliderVal < 10) sliderVal = (sliderVal-5)*2
  vote = sliderVal + year;
  if(vote > year+170) vote = "NEVER";
  $('#slider-val').html("&nbsp;"+ vote);
   var pos = data.value*SLIDER_WIDTH*SLIDER_MULTIPLE+20+'px';
  $('#slider-val').css('left', pos);
  // The value as a ratio of the slider (between 0 and 1)
 // console.log(event);
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
/*socket.on('showResults', function (data) {
   visionData = jQuery.parseJSON(data);
    showResults(visionData);
    //socket.emit('my other event', { my: 'data' });
  });*/
}

function showVision(data){
  resetLike();
	 console.log(JSON.stringify(data));
   $('#vision-text').html("");
	$('#image').css('background-image', 'url(' + data.imgPath + ')');
	$('#vision-text').html(data.vision);
	$('#text-container').textfill({ maxFontPixels: 60, innerTag: 'h3'
        
        });
}

function showResults(params){
    console.log(JSON.stringify(params));
    var likes = 0;
    var never_count = 0;
    var vote_count = 0;
    var new_year = 2014;
    var year_avg = new Date().getFullYear();
    if(visionData.vote_results){

      never_count = visionData.vote_results.never_count;
      vote_count = visionData.vote_results.total_count;
      year_count = visionData.vote_results.year_count;
      if(visionData.year != null) {
        year_avg == visionData.year;
      } else {
          if(params.vote != "NEVER") {
            year_avg = params.vote;
          }
      } 
    }
      var new_year = year_avg;
      if(params.vote == "NEVER"){
        never_count++;
      } else {
        new_year = Math.round((year_avg*year_count + params.vote)/(year_count+1));
        year_count++;
      }
       vote_count++;
       var likelihood = Math.round(never_count/vote_count*100);
       if(visionData.likes) likes = visionData.likes;
       if(like) likes++;
      alert("previous info : "+ JSON.stringify(visionData.vote_results) +"previous average year "+ year_avg +  "Your answer " + params.vote + " Average : "+ new_year + "   "+ likelihood+"% said NEVER! " + likes + "likes");

   }

   params.never_count = never_count;
   params.vote_count = vote_count;
   {'_id':visionData._id, 'like': like, 'vote':vote};

   // var never_percent = visionData.vote_results
 //  alert("")
 // console.log(JSON.stringify(data));


  // socket.emit('addVote', params);


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
  addLabel(200, "NEVER");
	
}

function toggleLike(){
  $('.like').toggleClass('show');
  if(like==true){
    like = false;
  } else {
    like = true;
  }
}

function resetLike(){
   $('#heart').addClass('show');
   like = false;
  $('#heart-down').removeClass('show');
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
        bottom: "-24px"
        }).appendTo("#slider-wrapper");
}