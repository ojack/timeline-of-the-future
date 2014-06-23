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
var ITEM_WIDTH = 540;
var ITEM_HEIGHT = 200;
/*var BG_WIDTH = 461;
var BG_HEIGHT = 270;*/
var BG_WIDTH = 614;
var BG_HEIGHT = 360;

var filters = ['people', 'animals', 'land use', 'climate', 'food', 'water', 'energy', 'tech', 'extinction', 'bay area'];
var timeline_date;
var numVisions;
var NUM_ANIMATED = 1;
var ANIMATION_INTERVAL = 800;
var visionArray = [];
var backgroundArray = [];
var animation;
var this_container;
var background_container;
var visionData;
var visionContainer;
var timeline = [];
//TO DO : create object that stores data and all objects
//var xOffset = [0, 0, 0];

/* honeycomb variables*/
var hex_width = 108;
var numRows = 1080/(hex_width);

var offset = 0;

$(window).load(function() {
  this_container = document.getElementById("container");
  background_container = document.getElementById("background-texture");
  timeline_date = document.getElementById("timeline-date");
	connectToSocket();
	initVisions();
  initFilters();
  $("#timeline-date").addClass("show");
 $("#filter").click(function(){
       $('#bottom-bar-main').removeClass('show');
 });
$("#add-new").click(function(){

  drawingView.addToTimeline();
});
	
});

/* establish connection with socket server*/
function connectToSocket(){
	var str = "" + window.location;
	var extra = str.lastIndexOf("/");
	socketLoc = str.substring(0, extra);
	currId = "";
	socket = io.connect(socketLoc);
	detailView = new DetailView(socket);
 
	socket.on('showPopupData', detailView.showPopupData);
	socket.on('addToTimeline', addToTimeline);
  socket.on('newVisionCollection', newVisionCollection);
  socket.on('restart drawing', reloadPage);
}

function initFilters(){
  for(var i = 0; i < filters.length; i++){
    var thisClass = 'filter-button';
    if(i==0) {
      thisClass = 'filter-button left';
  } else if( i==(filters.length-1)){
       thisClass = 'filter-button right';
  }
    var newDiv = jQuery('<div/>', {
         'class': thisClass
      });

  /// if(i==0)
   $('#bottom-bar-back').click(function(){
      $(".filter-button").removeClass('active');
      socket.emit('filterShowAll', '');
       $('#bottom-bar-main').addClass('show');
   });
    newDiv.text(filters[i]).attr("id", filters[i]).appendTo("#bottom-bar-filter");
    $(newDiv).click(function(){
      $(".filter-button").removeClass('active');
   $(this).addClass('active'); 
    socket.emit('filterCollection', event.target.id);
});
  }
}

function reloadPage(){
  location.reload(true);
}

 function newVisionCollection(data){
        //console.log("adding to timeline "+data);
       visionData = jQuery.parseJSON(data);
       loadVisions();
}

function initVisions(){
    visionData = jQuery.parseJSON($('#visionData').val());

  var galleryData = jQuery.parseJSON($('#imageData').val());
  drawingView = new DrawingView(galleryData);
  numVisions = visionData.length;
  container = $('#container');
  loadVisions();
}

/*Load all visions from the server*/
function loadVisions(){
timeline = [];
while (this_container.firstChild) {
    this_container.removeChild(this_container.firstChild);
}
/*while (background_container.firstChild) {
    background_container.removeChild(background_container.firstChild);
}*/
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
    setAnimation();
	containerWidth = (timeline.length+1)/2*(ITEM_WIDTH+30);
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
              $("timeline-date").hide();
             }
}


function setAnimation(){
 animation = setInterval(function(){toggleRandom();}, ANIMATION_INTERVAL);    
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

         newObj.div.addEventListener("tap",function(){
            var  _id = $(this).data('id');
               // currId =  "?id="+ _id;
               // $(this).addClass('show');
            // $('.item').addClass('zoomOut');

              if(_id){
                showElement(_id);
              
             }

        //  alert()
        },false);
         console.log("just added this "+ newObj.vision);
         // timeline[index] = newObj;
     timeline.splice(index, 0, newObj);
     console.log("index is "+ index + " new timeline length is "+ timeline.length);
     setPositions();
     containerWidth = (timeline.length+1)/2*(ITEM_WIDTH+30);
     container.css('width', containerWidth+"px");
     setTimeout(function () {
        myScroll.refresh();
    }, 10);
    
}

function initTimelineObj(data, index){
    var bgHeight = 1080/4-3;
  var bgWidth = bgHeight *1400/820;
    var thisObj = data;
    console.log("initializing this "+ data);
    
    var item = document.createElement('div');
    item.className = 'item';
   // background_container.appendChild(item);
    this_container.appendChild(item);

    item.setAttribute('data-id', data._id);
     var textDiv = document.createElement('h1');
  if(data.vision){
       if(data.museum){
        textDiv.className = 'item-text show';
      } else {
         textDiv.className = 'item-text omca show';
      }
      textDiv.innerHTML = data.vision;
      } else {
        textDiv.className = 'item-text-hidden show';
      }
       var that_hex = document.createElement('div');
    that_hex.className = 'hexagon hide';
 
that_hex.style.width = ITEM_WIDTH+'px';
  that_hex.style.height =ITEM_WIDTH*2+'px';
    var that_hex1 = document.createElement('div');
    that_hex1.className = 'hexagon-in1';
      var that_hex2 = document.createElement('div');
    that_hex2.className = 'hexagon-in2';
   
  
    that_hex2.style.backgroundImage="url('"+data.mediumPath+"')";

   // background_container.appendChild(item);
   that_hex.appendChild(that_hex1);
  that_hex1.appendChild(that_hex2);
       
      
   // } else {
    /*  var thatIMG  =  document.createElement('img');
      thatIMG.src =data.mediumPath;
      thatIMG.className = "item-alternate";*/
       item.appendChild(that_hex);
    //  item.appendChild(thatIMG);
   // }
    item.appendChild(textDiv);
   // orderedHoneycomb(data, index, background_container);
 
     var hex = document.createElement('div');
    hex.className = 'hexagon';
 
hex.style.width = hex_width+'px';
  hex.style.height = hex_width*2+'px';
    var hex1 = document.createElement('div');
    hex1.className = 'hexagon-in1';
      var hex2 = document.createElement('div');
    hex2.className = 'hexagon-in2';
   
  
    hex2.style.backgroundImage="url('"+data.smallPath+"')";

   // background_container.appendChild(item);
   hex.appendChild(hex1);
  hex1.appendChild(hex2);
   background_container.appendChild(hex);
    thisObj.imgDiv=hex;
    thisObj.textDiv=textDiv;
    //thisObj.itemAlternate = thatIMG;
    thisObj.itemAlternate = that_hex;
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
   console.log(myScroll.x + " index is " + index + " year "+ timeline[index].year);
   timeline_date.innerHTML = Math.round(timeline[index].year);
 }
 }
}


function setPositions(){
  currRow = 0;
  currCol= 0;
  var bgHeight = 1080/4-3;
  var bgWidth = bgHeight *1400/820;
    for(var i = 0; i < timeline.length; i++){
       var row = i%2;
       var col = Math.floor(i/2);
        var offset = ITEM_WIDTH;
  if(col%2==0)offset = offset+ ITEM_WIDTH/2;
    var left =  ITEM_WIDTH+ (ITEM_WIDTH*0.88)* col;
  var top= offset + row*(ITEM_WIDTH)-ITEM_WIDTH/2;
     /*  var row = i%2;
  var left = 600+ (i/2)*ITEM_WIDTH;
   //var left = (width+30)* index;
 // console.log(timeline[i].vision + " x " + left);
    var top =200+ row *450;*/
     timeline[i].div.style.position = 'absolute';
  timeline[i].div.style.top = top+'px';
   timeline[i].div.style.left = left+'px';


   var imgRow = i%4;
   var imgLeft = (i/4)*bgWidth;
   var imgTop = imgRow *bgHeight;
 /*   timeline[i].imgDiv.style.position = 'absolute';
  timeline[i].imgDiv.style.top = imgTop+'px';
   timeline[i].imgDiv.style.left = imgLeft+'px';*/
   orderedHoneycomb(i, timeline[i].imgDiv);
    
    }
}

var currRow = 0;
var currCol = 0;

function orderedHoneycomb(index, hex_object){
  currRow++;
      if(currRow > numRows){
        currRow = 0;
        currCol++;
      }
  while(true){
  //   var rowProb = 0.75 - (Math.abs((currRow - numRows/2)/(numRows/2)))*0.75; //densest in the middle
    var rowProb = 0.95*(currRow/numRows);
     var randIndex = Math.random();
     if(randIndex > rowProb){
      currRow++;
      if(currRow > numRows){
        currRow = 0;
        currCol++;
      }
     } else {
      break;
     }
  }
 // console.log("showing "+ index + " at row " + currRow + " and col " + currCol);
 /* var offset = 30;
  if(currRow%2==0)offset = 30+ hex_width/2;
    var left = offset + hex_width* currCol;
  var top= currRow*(hex_width*0.88)-hex_width/2;*/
 var offset = 30;
  if(currCol%2==0)offset = 30+ hex_width/2;
    var left =  (hex_width*0.88)* currCol;
  var top= offset + currRow*(hex_width)-hex_width/2;
  hex_object.style.top = top+'px';
  hex_object.style.left = left+'px';

}



function toggleImage(i){
  $(timeline[i].textDiv).toggleClass('show');
 $(timeline[i].itemAlternate).toggleClass('hide');
	 // var thisItem = container.children().get(index);
   /* visionArray[index].find( ".item-text").toggleClass('show');
    visionArray[index].find( ".item-image").toggleClass('show');*/

    //backgroundArray[index].toggleClass('show');
	 // $(thisItem).find( ".item-text").toggleClass('show');
	 // $(thisItem).find( ".item-image").toggleClass('show');
   //scroll timeline[i].find

}

function toggleRandom(){
 for(var i = 0; i < 1; i++){
   // var randIndex = Math.floor((Math.random()*timeline.length));
   var randIndex = Math.floor((Math.random()*200));
   // console.log("toggling "+ randIndex);
   if(randIndex < timeline.length){
    toggleImage(randIndex);
  }
  }
}
 // Function to slabtext the H1 headings
    function slabTextHeadlines() {
        $(".item-text").slabText({
            // Don't slabtext the headers if the viewport is under 380px
            "fontRatio": 0.3,
            //"viewportBreakpoint":380,
           "maxFontSize":80
        });
        myScroll = new IScroll('#scroll-wrapper', { 
            scrollX: true, scrollY: false, /*momentum: false,*/ tap:true, indicators: [{
      el: document.getElementById('background'),
      resize: false,
      ignoreBoundaries: true,
      speedRatioX: 0.03
    }]
    });
   }