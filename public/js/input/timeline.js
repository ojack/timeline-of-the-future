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

//var ITEM_SPACING = 540;
var ITEM_SPACING = 490;
var hex_border = 0.08;
var ITEM_WIDTH = ITEM_SPACING*(1-hex_border);
var small_hex_spacing = ITEM_SPACING/4;
var hex_width = small_hex_spacing*(1-hex_border);
var num_hexes = 300;

/*var BG_WIDTH = 461;
var BG_HEIGHT = 270;*/

var background_hexes = [];
var filters = ['people', 'animals', 'plants', 'land use', 'climate', 'food', 'water', 'energy', 'tech', 'extinction', 'bay area'];

var numVisions;
var NUM_ANIMATED = 1;
var ANIMATION_INTERVAL = 200;
var visionArray = [];
var backgroundArray = [];
var animation;
var this_container;
var background_container;
var visionData;
var visionContainer;
var timeline = [];
var background_images = [];
//TO DO : create object that stores data and all objects
//var xOffset = [0, 0, 0];

/* honeycomb variables*/

var numRows = 1080/(small_hex_spacing);

var offset = 0;

$(window).load(function() {
  this_container = document.getElementById("container");
  background_container = document.getElementById("background-texture");
  
	connectToSocket();
	initVisions();
  initFilters();

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
       shuffle(background_hexes);
//console.log(JSON.stringify(background_hexes[10]));
       positionHexes();
       loadVisions();

}

function initVisions(){
    visionData = jQuery.parseJSON($('#visionData').val());

  var galleryData = jQuery.parseJSON($('#imageData').val());
  drawingView = new DrawingView(galleryData);
  numVisions = visionData.length;
  container = $('#container');
  loadBackground();
  loadVisions();
  setAnimation();
  initIScroll();
}

function loadBackground(){
  for(var i = 0; i < visionData.length; i++){
    background_images[i] = new Image(); 
    background_images[i].src = visionData[i].smallPath;
  }

  for(var i = 0; i < num_hexes; i++){
    var hex_index = Math.floor(Math.random()*visionData.length);
    addNewHex(i,  background_images[hex_index].src);
  }
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
  positionHexes();
    
//	containerWidth = ((timeline.length)/3+1)*(ITEM_SPACING*1.74);
containerWidth = (timeline.length+1)*ITEM_SPACING*0.87;
  //containerWidth = 20000;
container.css('width', containerWidth+"px");

//$('#container').css('width', "10000px");
  setTimeout(slabTextHeadlines, 0);
  setTimeout(function () {
        myScroll.refresh();
    }, 0);
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
 // getYear();
 
    if(_id){
                socket.emit('findById', _id);
               console.log(" data of clicked " + JSON.stringify($(this).data('id')));
              clearAnimation();

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
    // console.log("index is "+ index + " new timeline length is "+ timeline.length);
     setPositions();
    containerWidth = (timeline.length+1)*ITEM_SPACING*0.87;
     container.css('width', containerWidth+"px");
     setTimeout(function () {
        myScroll.refresh();
    }, 10);
    
}

function initTimelineObj(data, index){
   
    var thisObj = data;
    console.log("initializing this "+ data);
    
    var item = document.createElement('div');
    item.className = 'item';
   // background_container.appendChild(item);
    this_container.appendChild(item);

    item.setAttribute('data-id', data._id);
    var outerTextDiv = document.createElement('div');
     var textDiv = document.createElement('h1');
      var that_hex = document.createElement('div');

  if(data.vision){
       if(data.museum){
     //  textDiv.className = 'item-text omca show';
     textDiv.className = 'item-text show';
        outerTextDiv.className = 'item-text-hex omca';
      } else {
        textDiv.className = 'item-text show';
      outerTextDiv.className = 'item-text-hex';
    //  textDiv.className = 'hexagon-in2-small-hex ';
      }
      textDiv.innerHTML = '<p id="timeline-year">'+data.year+'</p><div class="inner-text">' + data.vision+'</div>';
      } else {
      //  textDiv.className = 'item-text-hidden show';
      }
       that_hex.className = 'hexagon';
    if(Math.random()> 0.5){
     // $(that_hex).addClass('hide');
      $(outerTextDiv).addClass('show');

    }
    textDiv.style.width = 0.9*ITEM_WIDTH+'px';
    //  textDiv.style.width = 5*ITEM_WIDTH+'px';
   //   textDiv.style.height = 5*ITEM_WIDTH+'px';

         // that_hex.className = 'hexagon';
   
 outerTextDiv.appendChild(textDiv);
that_hex.style.width = ITEM_WIDTH*2+'px';
  that_hex.style.height =ITEM_WIDTH+'px';
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
    //that_hex2.appendChild(textDiv);
    that_hex2.appendChild(outerTextDiv);
    //  item.appendChild(thatIMG);
   // }
   // item.appendChild(textDiv);
   // orderedHoneycomb(data, index, background_container);
 
    
    //thisObj.imgDiv=hex;
    thisObj.textDiv=outerTextDiv;
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

function addNewHex(position, path){
   var hex = document.createElement('div');
    hex.className = 'hexagon-small';
 //if(Math.random()> 0.4){
hex.style.width = hex_width*2+'px';
  hex.style.height = hex_width+'px';
    var hex1 = document.createElement('div');
    hex1.className = 'hexagon-in1';
      var hex2 = document.createElement('div');
    hex2.className = 'hexagon-in2-small';
   
  
    hex2.style.backgroundImage="url('"+path+"')";

   // background_container.appendChild(item);
   hex.appendChild(hex1);
  hex1.appendChild(hex2);//}
   background_container.appendChild(hex);
   background_hexes[position] = hex;
}



function setPositions(){
  currRow = 0;
  currCol= 0;
 
    for(var i = 0; i < timeline.length; i++){
        var col = i;
        var left = (ITEM_SPACING*0.87)*(col+1);
        var top;
        if(i%2==0){
         // left = ;
          top = ITEM_SPACING;
        } else {
          top = (1+ Math.round(Math.random()))*(ITEM_SPACING)-ITEM_SPACING/2;
        }
    /*  var row = i%3;
  //     var col = Math.floor(i/3);
  var col = Math.floor(i/3);
       var left = 0;
       var top = 0; 
        var offset = 0;
  if(i%3==0){
      left = ITEM_SPACING*1.87 + (ITEM_SPACING*1.74)*col;
    top = ITEM_SPACING;
  } else {
    //  left =ITEM_WIDTH + (ITEM_WIDTH*1.74)*col;
    left = ITEM_SPACING + ITEM_SPACING* 1.74* col;
  //  var left =  ITEM_WIDTH+ (ITEM_WIDTH*0.87)* col;
     top= row*(ITEM_SPACING)-ITEM_SPACING/2;*/
  //  }
   /*    var row = i%2;
       var col = Math.floor(i/2);
        var offset = ITEM_WIDTH;
  if(col%2==0)offset = offset+ ITEM_WIDTH/2;
    var left =  ITEM_WIDTH+ (ITEM_WIDTH*0.87)* col;
  var top= offset + row*(ITEM_WIDTH)-ITEM_WIDTH/2;*/


  //console.log("row is "+ row + " offset is "+ offset + " top is " + top);
     /*  var row = i%2;
  var left = 600+ (i/2)*ITEM_WIDTH;
   //var left = (width+30)* index;
 // console.log(timeline[i].vision + " x " + left);
    var top =200+ row *450;*/
     timeline[i].div.style.position = 'absolute';
  timeline[i].div.style.top = top+'px';
   timeline[i].div.style.left = left+'px';


  
 /*   timeline[i].imgDiv.style.position = 'absolute';
  timeline[i].imgDiv.style.top = imgTop+'px';
   timeline[i].imgDiv.style.left = imgLeft+'px';*/
  // orderedHoneycomb(i, timeline[i].imgDiv);
    
    }
    positionHexes();
}

var currRow = 0;
var currCol = 0;

function positionHexes(){
  currRow = 0;
currCol = 0;
  for(var i = 0; i < num_hexes; i++){
      //set_hex_position(background_hexes[i], i);
      orderedHoneycomb(i, background_hexes[i]);
    }

}


function orderedHoneycomb(index, hex_object){
  currRow++;
      if(currRow > numRows){
        currRow = 0;
        currCol++;
      }
  while(true){
  //   var rowProb = 0.75 - (Math.abs((currRow - numRows/2)/(numRows/2)))*0.75; //densest in the middle
    var rowProb = 0.95*((currRow-numRows/2)/(numRows/2));
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
  if(currCol%2==0)offset = 30+ small_hex_spacing/2;
    var left =  (small_hex_spacing*0.88)* currCol;
  var top= offset + currRow*(small_hex_spacing)-small_hex_spacing/2;
  hex_object.style.top = top+'px';
  hex_object.style.left = left+'px';

}

function shuffle(array) {
  var currentIndex = array.length
    , temporaryValue
    , randomIndex
    ;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function toggleImage(i){
  $(timeline[i].textDiv).toggleClass('show');
 // $(timeline[i].itemAlternate).toggleClass('hide');
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
   var randIndex = Math.floor((Math.random()*100));
   // console.log("toggling "+ randIndex);
   if(randIndex < timeline.length){
    toggleImage(randIndex);
  }
  }
}
 // Function to slabtext the H1 headings
    function slabTextHeadlines() {
       // $(".item-text").slabText({
      $(".inner-text").slabText({
            // Don't slabtext the headers if the viewport is under 380px
            "fontRatio": 0.4,
            //"viewportBreakpoint":380,
          // "maxFontSize":80
        });
       
       
   }

   function initIScroll(){
     myScroll = new IScroll('#scroll-wrapper', { 
            scrollX: true, scrollY: false, /*momentum: false,*/ tap:true, indicators: [{
      el: document.getElementById('background'),
      resize: false,
      ignoreBoundaries: true,
      speedRatioX: 0.25
    }]
    });
     // $(background_container).css('width', 4000+"px");

   }