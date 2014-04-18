/*Functions for managing file system and folder creation as well as image storage*/


//var Canvas = require('./canvas').Canvas;
var fs = require('fs'),
  path = require('path');
//var tmpStorage = "./uploads"; // file path to location where http POST requests are received
//var permStorage = "./public/uploads"; 
//var permStorage = "../TEST_STORAGE" //file path to where uploaded images are stored. If no folder exists, creates folder
var THUMB_WIDTHS = [{name: 'medium', size: 461}, {name: 'small', size: 230}];
/*
'date'] = new Date();
      params['newVision']= "true";
       params['imgPath'] = iFrameCanvas.toDataURL('image/png');
       params['drawingPath'] = iFrameDrawing.toDataURL('image/png');
    params["show_rating"] = true;
    params["show_timeline"] = true;
    params["show_projection"] = true;
    params["parent"]= this.parent_id;
    params["museum"] = false;
    params["eventArray"
*/
var drawing_fields =  ['vision', 'year', 'inspiration', 'date', 'name', 'tags', 'parent', 'show_rating', 'show_timeline', 'show_projection', 'museum'];//fields to save to database from new drawing submission

var im = require('imagemagick');

FileSystem = function (tmpStorage, permStorage) {
    this.tmpStorage = "" + tmpStorage;
    this.permStorage = "" + permStorage;

    console.log(" remp storage is "+ this.tmpStorage + " perm is "+ this.permStorage);
    fs.exists(this.tmpStorage, function (exists) {
        if(exists){
            console.log("temp folder exists");
        } else {
            fs.mkdirSync(tmpStorage);
            console.log("made temp folder storage");
        }

        
    });
    fs.exists(this.permStorage, function (exists) {
            if(exists){
                console.log("permanent storage exists at " + permStorage);
             } else {
                fs.mkdirSync(permStorage);
                console.log("made folder " + permStorage);
            }
        });
    
};

FileSystem.prototype.addFrame = function(data, frameNo, callback){
    console.log("adding + "+ frameNo);
    addFrame("testframe", data, frameNo, this.permStorage, function(err){
      callback(err);
    });
};

FileSystem.prototype.addNewDrawing = function(data, visionProvider, callback){
  var permStorage = this.permStorage;
  var newVision = {};//object containing fields to add to database
  for(var i = 0; i < drawing_fields.length; i++){
    if(data[drawing_fields[i]]){
      newVision[drawing_fields[i]] = data[drawing_fields[i]];
    }
  }
  //console.log(JSON.stringify(data.eventArray));
  console.log(JSON.stringify(newVision));
  var tagArray = data.tags.split(',');
  var img = data.imgPath;
   //var drawing = data.drawingPath;
   var backgroundPath = data.backgroundPath;
  newVision["tags"] = tagArray;
  newVision["imgPath"] ="";
  newVision["drawingPath"] ="";
 newVision["rand"] = Math.random(); //random index enables getRand function for showing a random vision in rting system
    //init vote count with year as first vote
   visionProvider.saveVision(newVision, function (error, visions) {
  var _id = visions._id;
   if(data.eventArray!= undefined){
   console.log("sending data to canvas.  event array is "+ backgroundPath);

    //var canvas = new Canvas(_id, data.eventArray, data.backgroundPath);
    
  } else {
    console.log("EVENT ARRAY IS UNDEFINED");
  }
      console.log("error is "+ error + "visions are "+ JSON.stringify(visions));
  
 
 /*   var voteDate = {};
    voteDate[new Date()]=data.year;
    var voteResults = {'year_count': 1, 'total_count': 1, 'never_count':0, 'votes':[voteDate], 'year_sum':data.year};
    visionProvider.save({
   imgPath: "hellloooooooooooooooooooooo",
   vision: data.vision,
   inspiration: data.inspiration,
   year: data.year,
   rand: Math.random(),
   parent: data.parent,
   adminTags: adminArray,
  // vote_results: voteResults,
   tags: tagArray,
   date: new Date(),
   name: data.name,
   notes: data.notes,
   weight: 0
 }, function (error, visions) {
  var _id = visions[0]._id;*/
  //console.log(data.drawingPath);
     addPNG(_id, img, visionProvider, permStorage, function(err, path){
    if(err) callback(err, null);
   /* addPNG(_id, drawing, visionProvider, "-draw", permStorage, function(err, path){
   if(err) callback(err, null);*/
    console.log("PARENT IS " + data.parent + " this element "+ _id);

   if(data.parent && data.parent.length == 24){
      console.log("PARENT IS " + data.parent + " this element "+ _id);
      visionProvider.addChild(data.parent, _id, function(error){
        if(error) {
          callback(err, null);
        } else {
          callback(null, _id);
        }
      });
    } else {
      callback(null, _id);
    }
  });
  });
    //}  
  //});
};

FileSystem.prototype.addToGallery = function(data, file,  imageProvider){
  //var tagArray = data.tags.split(',');
 var permStorage = this.permStorage;
  imageProvider.save(data
 , function (error, visions) {
  var _id = visions[0]._id;
  if (file.type.indexOf("image") > -1) {
   uploadToGallery(_id, file.type, file.path, file.name, imageProvider, permStorage, function(err, path){
    if(err) console.log(err);
  });

 } else {
   console.log("NOT AN IMAGE")
 }
});

};
/*

FileSystem.prototype.addNewVision = function (data, file, visionProvider){
  var tagArray = data.tags.split(',');
  //var fileType = req.files.type;
  var permStorage = this.permStorage;
  visionProvider.save({
   imgPath: "hellloooooooooooooooooooooo",
   vision: data.vision,
   inspiration: data.inspiration,
   year: data.year,
   tags: tagArray,
    date: new Date(),
   notes: data.notes,
   weight: 0
 }, function (error, visions) {
    if(file){
  var _id = visions[0]._id;
 
  console.log("added vision" + file.type);
  console.log("added vision" + file.type.indexOf("image"));
  if (file.type.indexOf("image") > -1) {
   uploadImage(_id, file.type, file.path, visionProvider, permStorage, function(err, path){
    if(err) console.log(err);
  });
 } else {
   console.log("NOT AN IMAGE")
 }
}
});

};*/
/*
FileSystem.prototype.addNewImage = function(req, visionProvider){
  var name = req.files.file.name;
  var data = JSON.parse(req.body.filesize);
  var tagArray = data.tags.split(',');
  var fileType = req.files.type;
  visionProvider.save({
   imgPath: "hellloooooooooooooooooooooo",
   tags: tagArray,
   gallery: true,
   weight: 0
 }, function (error, visions) {
  var _id = visions[0]._id;
  if (req.files.file.type.indexOf("image") > -1) {
   fileSystem.uploadGalleryImage(_id, req.files.file.type, req.files.file.path, name, visionProvider, function(err, path){
    if(err) console.log(err);
  });

 } else {
   console.log("NOT AN IMAGE")
 }
});

};*/

/*Function to save a new vision in the database*/

FileSystem.prototype.saveVision = function (data, file, visionProvider){
  var newVision = data;
  var tagArray = data.tags.split(',');
  var adminArray = data.adminTags.split(',');
  newVision["tags"] = tagArray;
  newVision["adminTags"]= adminArray;
  //var fileType = req.files.type;
  var permStorage = this.permStorage;
  visionProvider.saveVision(newVision, function (error, visions) {
    if(file){
      console.log("error is "+ error + "visions are "+ JSON.stringify(visions));
  var _id = visions._id;
 
  console.log("added vision" + file.type + " id is "+_id);
  console.log("added vision" + file.type.indexOf("image"));
  if (file.type.indexOf("image") > -1) {
   uploadImage(_id, file.type, file.path, visionProvider, permStorage, function(err, path){
    if(err) console.log(err);
  });
 } else {
   console.log("NOT AN IMAGE")
 }
}
});

};

/*updates an existing vision based on user input to the admin panel*/
FileSystem.prototype.updateVision = function(data, file, visionProvider){
  var permStorage = this.permStorage;
var newVision = data;
      var tagArray = data.tags.split(',');
     var adminArray = data.adminTags.split(',');
     var newVision = data;
  newVision["tags"] = tagArray;
  newVision["adminTags"]= adminArray;
  //delete newVision['_id'];
      console.log("updating "+ data._id);
      visionProvider.updateVision(data._id, newVision, function (err) {
        if(err) console.log(err);
        else{
             if(file){
          if (file.type.indexOf("image") > -1) {
             uploadImage(data._id, file.type, file.path, visionProvider, permStorage, function(err, path){
                if(err) console.log(err);
            });
         } else {
             console.log("NOT AN IMAGE")
         }
     }
     }   
 });
  

};
exports.FileSystem = FileSystem;



function uploadImage(id, type, tmpPath, visionProvider, permStorage, callback){
    createFolders("", id, permStorage, function(err, filepath){
        var fileExt = ".jpg";
        if(type.indexOf("png")> -1) fileExt = ".png";
        var newPath = filepath+fileExt;
        fs.rename(tmpPath, newPath, function(err){
            if(err) callback(err, null);
            console.log("file uploaded to "+ newPath);
            var publicPath = "./"+ newPath;
             addThumbs(id, newPath, filepath, fileExt, visionProvider, callback);
            //var publicPath = newPath.replace("./public", "");
            /* visionProvider.updateImagePath(id, publicPath, function(err, vision){
                    if(err) callback(err, null);
                    callback(null, publicPath);
                });*/
            
        });
    });
}

/*creates folder structure for easily accessing image files. 
Files are stored in subdirectories according to the last two digits of their id:
file "5009dddd.png" would be stored in [permStorage]/3/d/5009dd3d.png*/

function uploadToGallery(id, type, tmpPath, name, visionProvider, permStorage, callback){
    createFolders("/gallery", id, permStorage, function(err, filepath){
        if(err) console.log(err);
        var fileExt = ".jpg";
        if(type.indexOf("png")> -1) fileExt = ".png";
        var newName = id + fileExt;
        var newPath = filepath + fileExt;
       // var newPath = "./public/uploads/gallery/"+id; 
        fs.rename(tmpPath, newPath, function(err){
            if(err) callback(err, null);
            console.log("file uploaded to "+ newPath);
           // var publicPath = newPath.replace("./public", "");
            var publicPath = "./"+ newPath;
            var thumbPath = filepath + "-small" + fileExt;
            console.log(" thumb path is " + thumbPath + " new path is " + newPath);
            /*im.resize({
                srcPath: newPath,
                dstPath: thumbPath,
                width:   THUMB_WIDTH
            }, function(err, stdout, stderr){
             if (err){
              callback(err, null);
           } else {
            console.log('resized kittens.jpg to fit within 256x256px' + stdout);
            //var publicThumb = thumbPath.replace("./public", "");*/
      addThumbs(id, newPath, filepath, fileExt, visionProvider, callback);
           /*  var publicPath = "./"+ publicPath;
             var publicThumb = "placeholder";
            visionProvider.updateImagePath(id, publicPath, function(err, vision){
                    if(err) callback(err, null);
                    callback(null, publicPath);
                });
           //}
        });
        //});*/
    });
  });

}


function createFolders(path, id, permStorage, callback){
    var len = id.toString.length;
    var first = id.toString().substr(len-2, 1);
    var second = id.toString().substr(len-1, 1);
    var filepath = permStorage + path + "/" + first;// + "/" + second + "/" + id;
    //callback("replace me with a real callback", filepath);
    fs.exists(filepath, function (exists) {
        if(exists){
            console.log(filepath +" exists");
            filepath = filepath + "/" + second;
            createSubfolder(filepath, id,function(err){
                    if(err) callback(err, null);
                    filepath = filepath + "/" + id;
                    callback(null, filepath);
            });
        } else {
            fs.mkdir(filepath, function(err) {
                if(err) callback(err, null);
                console.log("made " + filepath);
                filepath = filepath + "/" + second;
                createSubfolder(filepath, id, function(err){
                    if(err) callback(err, null);
                    filepath = filepath + "/" + id;
                    callback(null, filepath);
                });
            });
        }
    });
}

function createSubfolder(path, id, callback){
    fs.exists(path, function (exists) {
        if(exists){
            callback(null);
            console.log("path exists " + path);
        } else {
            fs.mkdir(path, function(err) {
                if(err) callback(err);
                callback(null);
            });
        }
    });
}

function addThumbs(id, newPath, filepath, extension, visionProvider, callback){
    var publicPath = "./"+ newPath;
                console.log('image added to '+ publicPath)
                var numResized = 0;//when all have been resized, write to database
                var paths = {};
                paths['imgPath']= publicPath;
                for(var i = 0; i < THUMB_WIDTHS.length;  i++){
                    var thumb_path = filepath + "-"+ THUMB_WIDTHS[i].name+ ".png";
                    var public_thumb_path ="./"+ thumb_path;
                    var index = THUMB_WIDTHS[i].name + 'Path';
                    paths[index] = public_thumb_path ="./"+ thumb_path;
                    im.resize({
                        srcPath: newPath,
                        dstPath: thumb_path,
                        width:   THUMB_WIDTHS[i].size
                          }, function(err, stdout, stderr){
                            if (err){
                              console.log(err);
                           } else {
                            numResized++;
                            
                            console.log('successfully resized!' + thumb_path + "oo: " + stdout);
                            if(numResized >= THUMB_WIDTHS.length){
                              console.log(" adding thumb paths to database "+ JSON.stringify(paths));
                              visionProvider.updateThumbPaths(id, paths, function(err, vision){
                                    if(err) callback(err, null);
                                    callback(null, publicPath);
                                });
                            }
                          }
                        });
                  }

}

function addPNG(id, imgData, visionProvider, permStorage, callback) {
   /* this.db.collection('nodes', { safe: true }, function (error, node_collection) {
        if (error) callback(error);
        else callback(null, node_collection);
    });*/
     var base64Data  =   imgData.replace(/^data:image\/png;base64,/, "");
    base64Data  +=  base64Data.replace('+', ' ');
    var binaryData  =   new Buffer(base64Data, 'base64').toString('binary');

    createFolders("", id, permStorage, function(err, filepath){
       // console.log("filepath:"+ filepath);
       if(err) console.log("error creating folders" + err);
        var newPath = filepath+".png";
        fs.writeFile(newPath, binaryData, "binary", function(err) {
            if(err) {
                console.log(err);
            } else {
              var extension = ".png";
              addThumbs(id, newPath, filepath, extension, visionProvider, callback);
                //console.log("The file was saved!" + newPath);
               // var publicPath = newPath.replace("./public", "");
             
                  //var publicThumb = thumbPath.replace("./public", "");*/
/*if(id){
                  console.log("ID IS "+ id);
                if(suffix=="-draw"){
                    nodeProvider.updateDrawingPath(id, publicPath, function(err, vision){
                    if(err) callback(err, null);
                    callback(null, publicPath);
                });
                } else {
              
                nodeProvider.updateImagePath(id, publicPath, function(err, vision){
                    if(err) callback(err, null);
                    callback(null, publicPath);
                });
            }
            }
            }*/
          }

        });
    });
}

function addFrame(id, imgData, frameNo, permStorage, callback) {
   /* this.db.collection('nodes', { safe: true }, function (error, node_collection) {
        if (error) callback(error);
        else callback(null, node_collection);
    });*/
     var base64Data  =   imgData.replace(/^data:image\/png;base64,/, "");
    base64Data  +=  base64Data.replace('+', ' ');
    var binaryData  =   new Buffer(base64Data, 'base64').toString('binary');

    createFolders("", id, permStorage, function(err, filepath){
       // console.log("filepath:"+ filepath);
       if(err) console.log("error creating folders" + err);
        var newPath = filepath+"-"+frameNo+".png";
        fs.writeFile(newPath, binaryData, "binary", function(err) {
            if(err) {
                callback(err);
            } else {
                //console.log("The file was saved!" + newPath);
                callback(null);
            }
 
        });
    });
}


