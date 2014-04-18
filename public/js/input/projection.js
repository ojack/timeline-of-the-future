//timeline.js
/*
*
*
*
Main scripts for the timeline go here
*
*
*/

var socket, socketLoc, container, containerWidth, detailView, drawingView;
var VERT_SPACING = 360;
var HOR_SPACING = 540;
var ITEM_WIDTH = 1000;
var ITEM_HEIGHT = 200;
/*var BG_WIDTH = 461;
var BG_HEIGHT = 270;*/
var BG_WIDTH = 614;
var BG_HEIGHT = 360;

var timeline_date;
var numVisions;
var NUM_ANIMATED = 1;
var ANIMATION_INTERVAL = 300;
var visionArray = [];
var backgroundArray = [];
var animation;
var this_container;
var background_container;
var visionData;
var visionContainer;
var timeline = [];
var maxScroll = 1000;
var SCROLL_STEP = 1;
var currScroll = 0;
var START_OFFSET = 1920;

//TO DO : create object that stores data and all objects
//var xOffset = [0, 0, 0];
var offset = 0;

$(window).load(function() {
  this_container = document.getElementById("container");
  background_container = document.getElementById("background-texture");
  timeline_date = document.getElementById("projection-date");
	connectToSocket();
	loadVisions();

	
});


window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                              window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;


var start = null;


function step(timestamp) {
 // var progress;
 // if (start === null) start = timestamp;
 // progress = timestamp - start;
 if(currScroll >= maxScroll){
  myScroll.scrollTo(0, 0);
  requestAnimationFrame(step);
  currScroll = 0;
 }else { myScroll.scrollBy(-SCROLL_STEP, 0);
  currScroll+=SCROLL_STEP;
//console.log(currScroll);
  //d.style.left = Math.min(progress/10, 200) + "px";
  //if (progress < 2000) {
    getYear();
    requestAnimationFrame(step);
  }
 // }
}


/* establish connection with socket server*/
function connectToSocket(){
	var str = "" + window.location;
	var extra = str.lastIndexOf("/");
	socketLoc = str.substring(0, extra);
	currId = "";
	socket = io.connect(socketLoc);
	
 
	socket.on('addToTimeline', addToTimeline);
  socket.on('restart projection', reloadPage);
}

function reloadPage(){
  location.reload(true);
}

/*Load all visions from the server*/
function loadVisions(){
	visionData = jQuery.parseJSON($('#visionData').val());

  var galleryData = jQuery.parseJSON($('#imageData').val());
 
  numVisions = visionData.length;
	container = $('#container');
  //console.log("VISIONS ARE "+ JSON.stringify(visionData));
  //addVision(visionData[0], 0, '#container', 1);
/* for(var i = 0; i < 2; i++){*/
	for(var i = 0; i < visionData.length; i++){
    var newObj = initTimelineObj(visionData[i], i);
     timeline[i] = newObj;
	/*	var newVis = addVision(visionData[i], i, '#container', 1);
    visionArray.push(newVis);

    var newDiv = addBackgroundVision(visionData[i], i, '#background-texture', 0.7);
     backgroundArray.push(newDiv);*/

	}
  setPositions();
   
	containerWidth = START_OFFSET+ (timeline.length+1)/2*(ITEM_WIDTH+30);
maxScroll = containerWidth+800;
container.css('width', containerWidth+"px");
//$('#container').css('width', "10000px");
  setTimeout(slabTextHeadlines, 1000);
	/*for(var i = 0; i < visionData.length; i++){
		if(Math.random() > 0.6) toggleImage(i);
	}*/
	 $( ".item" ).on('tap', function() {
              var  _id = $(this).data('id');
               // currId =  "?id="+ _id;
               // $(this).addClass('show');
            // $('.item').addClass('zoomOut');

              if(_id){
                showElement(_id);
              
             }
               //NEED: user feedback to show that is loading
               // document.getElementById('form').src = _id;
             //  console.log(visionData[_id]);
      });

}

function showElement(_id){
  getYear();
 
    if(_id){
                socket.emit('findById', _id);
               console.log(" data of clicked " + JSON.stringify($(this).data('id')));
               clearAnimation();
             }
}


function setAnimation(){
 //animation = setInterval(function(){toggleRandom();}, ANIMATION_INTERVAL);    
}

function clearAnimation(){
  console.log("clearing animation");
  clearInterval(animation);
}


function addNewVision(){
  /* TO DO 
   update layout
   update number of elements
   update width
   apply text layout
   */
}

function updatePositions(){
  for(var i = 0; i < visionArray.length; i++){
     // visionArray[i].
  }

}

/* when something new is added to the timeline*/
  function addToTimeline(data){
        console.log("adding to timeline "+data);
        var visionObj = jQuery.parseJSON(data);
        console.log("adding to Timeline "+ data);
        var index = 0;
        var thisVision = timeline[index];
       // console.log(timeline.length+ " index "+ index + " this vision "+ JSON.stringify(thisVision));
        while(true){
          thisVision = timeline[index];
         // console.log("index "+ index );
          if(visionObj.year <= timeline[index].year) break;
          index++;
          if(index >= timeline.length) break;
        }

         var newObj = initTimelineObj(visionObj, index);

         
         console.log("just added this "+ newObj.vision);
         // timeline[index] = newObj;
     timeline.splice(index, 0, newObj);
     console.log("index is "+ index + " new timeline length is "+ timeline.length);
     setPositions();
     containerWidth = START_OFFSET+ (timeline.length+1)/2*(ITEM_WIDTH+30);
     maxScroll = containerWidth;
     container.css('width', containerWidth+"px");
     setTimeout(function () {
        myScroll.refresh();
    }, 10);
    
}

function initTimelineObj(data, index){
    var thisObj = data;
    console.log("initializing this "+ data);
    var thisIMG  =  document.createElement('img');
    thisIMG.src =data.mediumPath;
    thisIMG.class = "item-image show";// newDiv.prepend('<img class="item-image show" src="'+ data.mediumPath + '" />');
    var item = document.createElement('div');
    item.className = 'item';
   // background_container.appendChild(item);
    this_container.appendChild(item);

    item.setAttribute('data-id', data._id);
     var textDiv = document.createElement('h1');
    if(data.vision){
     
      textDiv.innerHTML = data.vision;
      
      if(data.museum){
        textDiv.className = 'item-text omca show';
      } else {
         textDiv.className = 'item-text show';
      }
       
      item.appendChild(textDiv);
    } else {
       var thatIMG  =  document.createElement('img');
      thatIMG.src =data.mediumPath;
      thatIMG.class = "front";
      item.appendChild(thatIMG);
    }
    background_container.appendChild(thisIMG);
    thisObj.imgDiv=thisIMG;
    thisObj.textDiv=textDiv;
     thisObj.div=item;
    return thisObj;
   
    //console.log(JSON.stringify(thisObj));
   /* if(data.museum){
      newDiv.html('<h1 class="item-text omca show" >'+data.vision+'</h1>');
    console.log("showing text "+ data.vision);
    } else {
    newDiv.html('<h1 class="item-text show" >'+data.vision+'</h1>');
    console.log("showing text "+ data.vision);
  }*/
}

function getYear(){
 
  var index = Math.floor((myScroll.x)*(-2/ITEM_WIDTH));
   
  if(index < timeline.length){
    if(index > 0){
  // console.log(myScroll.x + " index is " + index + " year "+ timeline[index].year);
   timeline_date.innerHTML = Math.round(timeline[index].year);
   //timeline_jquery.HTML(timeline[index].year);
 }
 }
}


function setPositions(){
  var bgHeight = 1080/4-3;
  var bgWidth = bgHeight *1400/820;
    for(var i = 0; i < timeline.length; i++){
       var row = i%2;
  var left = START_OFFSET + 600+ (i/2)*ITEM_WIDTH;
   //var left = (width+30)* index;
 // console.log(timeline[i].vision + " x " + left);
    var top = 1080/4 + row *400;
     timeline[i].div.style.position = 'absolute';
  timeline[i].div.style.top = top+'px';
   timeline[i].div.style.left = left+'px';


   var imgRow = i%4;
   var imgLeft = START_OFFSET/2+ (i/4)*bgWidth;
   var imgTop = imgRow *bgHeight;
    timeline[i].imgDiv.style.position = 'absolute';
  timeline[i].imgDiv.style.top = imgTop+'px';
   timeline[i].imgDiv.style.left = imgLeft+'px';
    
    }
}


function toggleImage(index){
	 // var thisItem = container.children().get(index);
   /* visionArray[index].find( ".item-text").toggleClass('show');
    visionArray[index].find( ".item-image").toggleClass('show');*/

    //backgroundArray[index].toggleClass('show');
	 // $(thisItem).find( ".item-text").toggleClass('show');
	 // $(thisItem).find( ".item-image").toggleClass('show');
   //scroll timeline[i].find

}

function toggleRandom(){
  /*for(var i = 0; i < NUM_ANIMATED; i++){
    var randIndex = Math.floor((Math.random()*numVisions));
   // console.log("toggling "+ randIndex);
    toggleImage(randIndex);
  }*/
}
 // Function to slabtext the H1 headings
    function slabTextHeadlines() {
        $(".item-text").slabText({
            // Don't slabtext the headers if the viewport is under 380px
            "fontRatio": 0.5,
            "viewportBreakpoint":380
        });
        myScroll = new IScroll('#scroll-wrapper', { 
            scrollX: true, scrollY: false, momentum: false, indicators: [{
      el: document.getElementById('background'),
      resize: false,
      ignoreBoundaries: true,
      speedRatioX: 0.22
    }]
    });
        requestAnimationFrame(step);
   }