


var fakeElement = {};





fakeElement.newNode = function(nodeInfo){
 // console.log("text is "+ JSON.stringify(nodeInfo));
 var widthClass = 'small';
 var rand = Math.random()*10;
 if(rand > 4){
    heightClass = 'height2';
 } else {
     heightClass = 'height5';
 } 
  category = "";
 symbol = nodeInfo.year;
 if(symbol=="Tomorrow") symbol = 2013;
 name = nodeInfo.vision;
 var _id = nodeInfo._id;
 weight = 20;

 imgPath = "http://i.telegraph.co.uk/multimedia/archive/01456/los-angeles_1456289i.jpg";
 if(nodeInfo.inputType == 'Museum'){
  if(Math.random()*10 > 8) imgPath = "http://www.worldofstock.com/slides/PEN1450.jpg";
} 

   // if((nodeInfo.inputType == 'Prediction')){
    if(nodeInfo.mediumPath){
      imgPath = nodeInfo.mediumPath;
       //widthClass = 'medium';
     } 
   // }
      // className = 'element fake metal ' + category + ' ' + widthClass + ' ' + heightClass;
      className = 'vision ' + heightClass;
      return '<div  class="' + className + '" width="100px" data-id="' + _id + 
      '" data-category="' + category + '"><img src='+imgPath+ '  /><h2 class="year">'+symbol+'</h2><div class="name"><h3>' + name + 
      '<h3></div></div>';

    }

    fakeElement.newNodeGroup = function(nodeGroupInfo){
      var nodeEls = "";
      for (var i = 0; i < nodeGroupInfo.length; i++){
        nodeEls+= fakeElement.newNode(nodeGroupInfo[i]);
      }
      return nodeEls;
    }

    $(function(){
     // $('#popup').hide();
      // $( "#popup" ).dialog();
      var $container = $('#container');
      var visionData = jQuery.parseJSON($('#visionData').val());
     // alert(JSON.stringinodeData);
     
     $('#showAll').click(function(){
      /*var selector = $(this).attr('data-filter');
      $container.isotope({ filter: selector });*/

      $('#container').isotope({ sortBy : 'year' });

      return false;
    });


     $('#shuffle').click(function(){
      $container.isotope('shuffle');
      $sortBy.find('.selected').removeClass('selected');
      $sortBy.find('[data-option-value="random"]').addClass('selected');
      return false;
    });

     $('#addNew').click(function(){
       $('#backdrop').show();
         document.getElementById('form').src = "form";
       $('#popup').show();
     });

     $container.isotope({
      itemSelector : '.vision',
      filter: '*',
       //,
       /* getSortData : {
          symbol : function( $elem ) {
            return $elem.attr('data-symbol');
          }
        },
        sortBy : 'symbol'*/
      });

     // var $newNode = $( fakeElement.newNode(nodeData[0]) );
     var $newGroup = $( fakeElement.newNodeGroup(visionData) );
       //var $newEls = $( fakeElement.getGroup() );


       $('#container').isotope({
        getSortData : {
          year : function ( $elem ) {
            return parseInt( $elem.find('.year').text());
          }
        }
      });
       $('#container').isotope({ sortBy : 'year'});

       $container.isotope( 'insert', $newGroup);
       $('#container').isotope({
        layoutMode: 'masonryHorizontal',
        masonryHorizontal: {
          columnWidth : 270
        }
      });
       $("#popup").hide();
       $('#backdrop').hide();
       $( ".vision" ).mouseover(function() {
          showVision(this);
   
});
        $( ".vision" ).mouseout(function() {
          hideVision(this);
   
});
       $( ".vision" ).click(function() {
        var _id = $(this).data('id');
        console.log(" data of clicked " + JSON.stringify($(this).data('id')));
        document.getElementById('form').src = _id;
       
        $('#popup').show();
        $('#backdrop').show();
  // window.location.href = _id;
});

       $( "#closeButton" ).click(function() {
        $("#popup").hide();
        $('#backdrop').hide();
      });
       $('.name').textfill({ maxFontPixels: 360, innerTag: 'h3'
        
        });
     //  $(".name").css( "visibility", "hidden" );
       $(".year").css( "visibility", "hidden" );
     });

function showVision(caption){
 $(caption).children(".name").css( "visibility", "visible" );
 $(caption).children(".year").css( "visibility", "visible" );
 /*$(caption).addClass( "height3");
   $('#container').isotope( 'reLayout', function(){

 } );
  $(caption).children(".name").textfill({ maxFontPixels: 360, innerTag: 'h3'
        
        });*/
}

function hideVision(caption){
/* $(caption).children(".name").css( "visibility", "hidden" );*/
  $(caption).children(".year").css( "visibility", "hidden" );
/*  $(caption).removeClass( "height3");
   $('#container').isotope( 'reLayout', function(){

 } );
    $(caption).children(".name").textfill({ maxFontPixels: 360, innerTag: 'h3'
        
        });*/

}
