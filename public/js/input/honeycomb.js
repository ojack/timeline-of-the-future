
var numPerRow = 40;
var numElements = 600;

var hex_width = 100;
var numRows = 1080/(hex_width)-1;

$(window).load(function() {
    loadVisions();

  
});


function loadVisions(){
   var hexContainer = document.getElementById("hex-container");
  visionData = jQuery.parseJSON($('#visionData').val());
  /*for(var j = 0; j < numRows; j++){
    var row = document.createElement('div');
    var offset =0;
    if(j%2==0) {
      row.className = 'row even';
      console.log("adding even row "+ j);
      offset = hex_width/2;
    } else {
      row.className = 'row';
    }
     for(var i = 0; i < numPerRow; i++){
      var randIndex = Math.floor(Math.random()*visionData.length);
    var newObj = initTimelineObj(visionData[randIndex], randIndex, i, j, offset, row);

  }*/

  for(var i = 0; i < visionData.length; i++){
    var newObj = orderedHoneycomb(visionData[i], i, hexContainer);
    // timeline[i] = newObj;
  /*  var newVis = addVision(visionData[i], i, '#container', 1);
    visionArray.push(newVis);

    var newDiv = addBackgroundVision(visionData[i], i, '#background-texture', 0.7);
     backgroundArray.push(newDiv);*/

  }

 
  //hexContainer.appendChild(row);
}

var currRow = 0;
var currCol = 0;
function orderedHoneycomb(data, index, hexContainer){
  currRow++;
      if(currRow > numRows){
        currRow = 0;
        currCol++;
      }
  while(true){
     var rowProb = 0.75 - (Math.abs((currRow - numRows/2)/(numRows/2)))*0.75;
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
  console.log("showing "+ index + " at row " + currRow + " and col " + currCol);
  var offset = 0;
  if(currRow%2==0)offset = hex_width/2;
    var left = offset + hex_width* currCol;
  var top= currRow*(hex_width*0.88)-hex_width/2;
  var hex = document.createElement('div');
    hex.className = 'hexagon';
  hex.style.top = top+'px';
  hex.style.left = left+'px';
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
    hexContainer.appendChild(hex);
}


function initTimelineObj(data, index, i, j, offset, row){
  console.log("adding " + JSON.stringify(data));
  var rowProb = 0.95 - (Math.abs((j - numRows/2)/(numRows/2)))*0.92;
  console.log("row "+ j + " row prob "+ rowProb);
  /*  var row = i%2;
  var left = 600+ (i/2)*ITEM_WIDTH;
   //var left = (width+30)* index;
 // console.log(timeline[i].vision + " x " + left);
    var top =400 + row *400;*/
  var left = offset + hex_width* i;
  var top= j*(hex_width*0.88)-hex_width/2;
  var hex = document.createElement('div');
    hex.className = 'hexagon';
  hex.style.top = top+'px';
  hex.style.left = left+'px';
hex.style.width = hex_width+'px';
  hex.style.height = hex_width*2+'px';
    var hex1 = document.createElement('div');
    hex1.className = 'hexagon-in1';
      var hex2 = document.createElement('div');
    hex2.className = 'hexagon-in2';
    var randIndex = Math.random();
   if (randIndex > rowProb){
       hex2.style.backgroundImage="";
       var text = document.createElement('div');
       text.className = "innerTest";
      // text.innerHTML = "heyyyy blah blah heyyyy blah blah heyyyy blah blah heyyyy blah blah heyyyy blah blah heyyyy blah blah heyyyy blah blah heyyyy blah blah ";
        hex2.appendChild(text);
    } else {
    hex2.style.backgroundImage="url('"+data.smallPath+"')";
  }
   // background_container.appendChild(item);
   hex.appendChild(hex1);
  hex1.appendChild(hex2);
    row.appendChild(hex);
}