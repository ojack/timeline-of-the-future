var Db = require('mongodb').Db;
var Connection = require('mongodb').Connection;
var Server = require('mongodb').Server;
var BSON = require('mongodb').pure().BSON;
var ObjectId = require('mongodb').ObjectID;

var vision_fields = { imgPath: 1, vision: 1, year:1};//fields returned for general display of visions
var vision_query = {};
var timeline_query = {_id: { $ne: "gallery" }, show_timeline: true, mediumPath: { $exists: true } };
var query_params = { _id: { $ne: "gallery" } };
var detailed_fields = { imgPath: 1, vision: 1, year:1, smallPath:1, inspiration:1, tags: 1, date:1, name: 1, parent:1, children: 1};
var thumb_fields = { smallPath: 1, vision:1};
var gallery_fields = { smallPath: 1, imgPath: 1};
var gallery_admin_fields = { smallPath: 1, date:1, vision: 1, show_timeline: true};
var admin_fields = { imgPath: 1, vision: 1, year:1, inspiration:1, tags: 1, date:1, name: 1, adminTags: 1, children: 1, parent: 1, show_rating:1, show_timeline:1, museum:1, show_projection:1};
var timeline_fields = { imgPath: 1, mediumPath: 1, smallPath: 1, vision: 1, year:1, museum: 1};


VisionProvider = function (host, port) {
    this.db = new Db('futures', new Server(host, port, { safe:true, auto_reconnect: true }, {}));
    this.db.open(function () { });
};


VisionProvider.prototype.getCollectionSafe = function (callback) {
    this.db.collection('visions', { safe: true }, function (error, vision_collection) {
        if (error) callback(error);
        else callback(null, vision_collection);
    });
};

VisionProvider.prototype.getCollection = function (callback) {
    this.db.collection('visions', function (error, vision_collection) {
        if (error) callback(error);
        else callback(null, vision_collection);
    });
};

VisionProvider.prototype.findAllAdmin = function (callback) {
    this.getCollection(function (error, vision_collection) {
        if (error) callback(error)
            else {
                vision_collection.find({}, timeline_fields).toArray(function (error, results) {
                    if (error) callback(error)
                        else callback(null, results)
                    });
            }
        });
};

VisionProvider.prototype.findAllGallery = function (callback) {
    this.getCollection(function (error, vision_collection) {
        if (error) callback(error)
            else {
                vision_collection.find(query_params, gallery_fields).toArray(function (error, results) {
                    if (error) callback(error)
                        else callback(null, results)
                    });
            }
        });
};

VisionProvider.prototype.findAllGalleryAdmin = function (callback) {
    this.getCollection(function (error, vision_collection) {
        if (error) callback(error)
            else {
                vision_collection.find(query_params, gallery_admin_fields).sort({date: -1}).toArray(function (error, results) {
                    if (error) callback(error)
                        else callback(null, results)
                    });
            }
        });
};

VisionProvider.prototype.findAll = function (callback) {
    this.getCollection(function (error, vision_collection) {
        if (error) callback(error)
            else {
                vision_collection.find(query_params, vision_fields).toArray(function (error, results) {
                    if (error) callback(error)
                        else callback(null, results)
                    });
            }
        });
};
VisionProvider.prototype.findTimeline = function (callback) {
    this.getCollection(function (error, vision_collection) {
        if (error) callback(error)
            else {
                vision_collection.find(timeline_query, timeline_fields).sort({year: 1}).toArray(function (error, results) {
                    if (error) callback(error)
                        else callback(null, results)
                    });
            }
        });
};

VisionProvider.prototype.findGallery = function (callback) {
    this.getCollection(function (error, vision_collection) {
        if (error) callback(error)
            else {
                vision_collection.findOne({_id:"gallery"}, function (error, result) {
                    if (error){ callback(error, null)
                    }else {
                       var idArray = [];
                      if(result!=null){
                      console.log("result is "+ JSON.stringify(result.images));
                     
                      for(var i = 0; i < result.images.length; i++){
                           var id = vision_collection.db.bson_serializer.ObjectID.createFromHexString(result.images[i]);
                           idArray.push(id);
                      }
                    }
                    
                    vision_collection.find({ "_id": { $in: idArray}}, gallery_fields).toArray(function (error, results) {
                        console.log(" found gallery : " + JSON.stringify(results));
                        if (error) callback(error)
                            else callback(null, results)
                        });
                  }
            });
        }
      });
};


VisionProvider.prototype.getDrawings = function (callback) {
    this.getCollection(function (error, vision_collection) {
    if (error) callback(error)
        else {
            vision_collection.find( {drawingPath: { $exists: true }},  { drawingPath: 1}).toArray(function (error, results) {
                if (error) callback(error, null)
                    else callback(null, results)
                });
        }
    });
};


VisionProvider.prototype.findByTag = function(tag, callback){
   this.getCollection(function (error, vision_collection) {
    if (error) callback(error)
        else {
            vision_collection.find( { $or: [{tags: tag}, {adminTags: tag} ]}, vision_fields).toArray(function (error, results) {
                if (error) callback(error)
                    else callback(null, results)
                });
        }
    });
}

///NOT YET IMPLEMENTED: GET DRAWINGS FOR DRAWING APP
/*VisionProvider.prototype.getDrawings = function(callback){
  this.getCollection(function(error, vision_collection){
    if(error) callback(null, error);
     vision_collection.find( { "drawingPath" : { "$exists" : true } }).toArray(function (error, results) {
                if (error) callback(error)
                    else callback(null, results)
                });

  }
}*/

/*Each vote is added to an array for each document ("vote_results.vote", containing all votes and the date that the vote was made. Eventually these could be used to
show voting trends for a particular idea over time. Because a user can either choose a year in the future, or choose "never", the votes are aggregated into two separate results.
1) year value: The "year" is calculated by adding all of the numerical votes together ("year_sum"), and dividing by the number of numerical votes ("year_count").
2) the likelihood is the % of people who say that something is never going to happen, equivalent to never_count/total count*/
VisionProvider.prototype.addVote = function(id, vote, callback){
  this.getCollection(function(error, vision_collection){
      if(error) callback(error);
     var vision_id = id = vision_collection.db.bson_serializer.ObjectID.createFromHexString(id.toString());
      var voteDate = {};
      voteDate[new Date()]=vote;
      var neverCount = 0;
      var yearCount = 0;
      var yearAdd = 0;
      if(vote=="never"){
        neverCount = 1;
      } else {
        yearAdd = parseInt(vote);
        yearCount = 1;
      }
       console.log("updating:" + id + " year add "+yearAdd + ' year_count '+yearCount);
      var query = {_id: vision_id};
      var roundedNewYear;
      vision_collection.findOne(query,
                function (error, result) {
                    if (error){ callback(error, null)
                    } else {
                     
                      var voteResults = {};
                      var unlikelihood = 0;

                      var newYear = parseInt(result.year);
                      
                      if(result.vote_results){
                         var totalYears = parseInt(result.vote_results.year_count) + yearCount;
                      var yearSum = parseInt(result.vote_results.year_sum)+yearAdd;
                      newYear = yearSum/totalYears;
                      unlikelihood = (result.vote_results.never_count+neverCount)/(result.vote_results.total_count+1);
                                            voteResults = {
                      'year':newYear,
                      'unlikelihood': unlikelihood
                    };
                  } else {
                      if(yearCount==1) {
                        newYear = (vote+parseInt(result.year))/2;
                      } else {
                        unlikelihood = 0.5;
                      }
                  }
                      console.log("the new year is "+ newYear + "LIKELIHOOD "+unlikelihood);
                    roundedNewYear = Math.round(newYear).toString();
                      var update = {'$push':{'vote_results.votes':voteDate},
                    '$inc':{
                      'vote_results.year_count': yearCount,
                      'vote_results.never_count': neverCount,
                      'vote_results.total_count': 1,
                      'vote_results.year_sum': yearAdd
                    },
                    '$set':{
                      'year':roundedNewYear,
                      'unlikelihood': unlikelihood
                    }};
                      console.log("updating with "+JSON.stringify(update));
      vision_collection.update(query, update, { multi: true }, function(err){
        if(err) callback(err);
        callback(null, voteResults);
      });
           }          
       });
      
  });
}

VisionProvider.prototype.addRandom = function(callback){
    //var random = Math.random();
    this.getCollection(function (error, vision_collection) {
         if (error) callback(error);
      vision_collection.find().each(function(err,vision){
            if (err) {callback(err)
            } else {
                if(vision==null) {
                    callback(null);
                }else {
                    vision.rand = Math.random();
                   // console.log (vision);
                    vision_collection.save(vision);
                } 
            }
            });
              
           
     });
 }
//* utitlity function for adding children to child array*/
/*VisionProvider.prototype.addAllChildren = function(callback){
   this.getCollection(function (error, vision_collection) {
         if (error) callback(error);
      vision_collection.find( { parent: { $ne: "" }}).each(function(err,vision){
        if (err) callback(err);
        if(vision==null) {
          callback(null);
        } else {
        if(vision.parent){
          addThisChild(vision.parent, vision._id, vision_collection, function(error){
            if(error)console.log(error); 
          });
        }
      }
      });
    });
};*/


 VisionProvider.prototype.getRandom = function (callback) {
   var random = Math.random();
   //this.addRandom(callback);
   //console.log("random # is "+ random);
   this.getCollection(function (error, vision_collection) {
        if (error) callback(error, null)
            else {
               // vision_collection.findOne({rand : { $near : [Math.random(), 0] },
             //  vision_collection.findOne({_id: { $ne: "gallery" }, show_rating:1, rand : { $gte : random }}, 
            vision_collection.findOne({_id: { $ne: "gallery" },   show_rating:true, rand : { $gte : random }}, 
                    function (error, result) {

                    if (error) callback(error, null);
                    if(result==null){
                         vision_collection.findOne({_id: { $ne: "gallery" }, show_rating:1, rand : { $lte : random }}, function (error, result){
                            if (error){
                              callback(error, null);
                            } else {
                              if(result==null){
                                console.log("COULD NOT FIND RAND");
                                callback(null, null);
                              } else {
                                      result.rand = Math.random();
                                     // console.log("db result is" + result);
                                    vision_collection.save(result);
                                              callback(null, result);
                                  }
                              
                            }
                         });

                    } else {
                        result.rand = Math.random();
                           console.log("db result is" + JSON.stringify(result));
                            vision_collection.save(result);
                                    callback(null, result);
                               
                    }
                });
            }
        });
}


     /*  vision_collection.update(
         {},
            {$set: {
            rand: Math.random()
            }},
            { multi: true },
              function (error) {
                    if (error) callback(error)
                        else callback(null)
                    });
  
       
    });*/
//}

/*function setRandom() { 
    db.topics.find().forEach(function (obj) {obj.random = Math.random();
        db.topics.save(obj);
    }); 
} */
VisionProvider.prototype.findForTimeline = function (visionId, callback) {
   var id = visionId;
   if(id.length != 24) callback(" not valid ID "+ id, null);
   this.getCollection(function (error, vision_collection) {
    if (error) callback(error)
        console.log("ID type is " + typeof id)
        console.log("id is " + id)
   /* if(typeof id == 'string') {
        console.log("getting object");
        id = vision_collection.db.bson_serializer.ObjectID.createFromHexString(id.toString());
    }*/
    id = vision_collection.db.bson_serializer.ObjectID.createFromHexString(id.toString());
   // id = ObjectId(id.toString());
   var objectId = new ObjectId(id.toString());
     console.log("ID type is " + typeof objectId)
        //else {
           console.log("looking for " + id);
           vision_collection.findOne(
                //{ _id: id }, 
                {_id: objectId},  timeline_fields,
                function (error, result) {
                    if (error) callback(error, null);
                     
                        callback(null, result);
                    });
        //}
    });
};


VisionProvider.prototype.findById = function (visionId, callback) {
   var id = visionId;
   if(id.length != 24) callback(" not valid ID "+ id, null);
   this.getCollection(function (error, vision_collection) {
    if (error) callback(error)
        console.log("ID type is " + typeof id)
        console.log("id is " + id)
   /* if(typeof id == 'string') {
        console.log("getting object");
        id = vision_collection.db.bson_serializer.ObjectID.createFromHexString(id.toString());
    }*/
    id = vision_collection.db.bson_serializer.ObjectID.createFromHexString(id.toString());
   // id = ObjectId(id.toString());
   var objectId = new ObjectId(id.toString());
     console.log("ID type is " + typeof objectId)
        //else {
           console.log("looking for " + id);
           vision_collection.findOne(
                //{ _id: id }, 
                {_id: objectId},  detailed_fields,
                function (error, result) {
                    if (error) callback(error, null);
                     
                        callback(null, result);
                    });
        //}
    });
};

VisionProvider.prototype.findAdmin = function (visionId, callback) {
   var id = visionId;
   
   this.getCollection(function (error, vision_collection) {
    if (error) callback(error)
        console.log("ID type is " + typeof id)
        console.log("id is " + id)
   /* if(typeof id == 'string') {
        console.log("getting object");
        id = vision_collection.db.bson_serializer.ObjectID.createFromHexString(id.toString());
    }*/
    id = vision_collection.db.bson_serializer.ObjectID.createFromHexString(id.toString());
   // id = ObjectId(id.toString());
   var objectId = new ObjectId(id.toString());
     console.log("ID type is " + typeof objectId)
        //else {
           console.log("looking for " + id);
           vision_collection.findOne(
                //{ _id: id }, 
                {_id: objectId},  admin_fields,
                function (error, result) {
                    if (error) callback(error, null);
                     
                        callback(null, result);
                    });
        //}
    });
};

VisionProvider.prototype.findChildren = function (childArray, callback) {
   //var id = visionId;
   
   this.getCollection(function (error, vision_collection) {
    if (error) callback(error)
       vision_collection.find({ _id: { $in: childArray }, show_timeline: true  }, thumb_fields).toArray( function(error, result){
        if(error)callback(error, null);
        console.log("children are "+ JSON.stringify(result));
        callback(null, result);

        });
   });
  };

VisionProvider.prototype.findParent = function (parentID, callback) {
   //var id = visionId;
   if(parentID.length != 24) {
    callback(" not valid ID "+ parentID, null);
  } else {
   this.getCollection(function (error, vision_collection) {
    id = vision_collection.db.bson_serializer.ObjectID.createFromHexString(parentID.toString());
    if (error) callback(error)
       vision_collection.findOne({ _id: id, show_timeline: true }, thumb_fields, function(error, result){
        if(error)callback(error, null);
        console.log("parent is  "+ JSON.stringify(result));
        callback(null, result);

        });
   });
 }
  };

        /*
        console.log("getting object");
        id = vision_collection.db.bson_serializer.ObjectID.createFromHexString(id.toString());
    }
    id = vision_collection.db.bson_serializer.ObjectID.createFromHexString(id.toString());
   // id = ObjectId(id.toString());
   var objectId = new ObjectId(id.toString());
     console.log("ID type is " + typeof objectId)
        //else {
           console.log("looking for " + id);
           vision_collection.findOne(
                //{ _id: id }, 
                {_id: objectId},  detailed_fields,
                function (error, result) {
                    if (error) callback(error, null);
                      if(result.parent!=""){
                          vision_collection.findOne(_id: result.parent, function(error, parentDetails){
                            if(error) callback (error, null);
                            if()
                          };
                      }
                        callback(null, result);
                    });
        //}
    });
};*/
VisionProvider.prototype.updateImagePath = function (visionId, imagePath, callback) {
    //var id = visionId;
    
    this.getCollection(function (error, vision_collection) {
        var id = new ObjectId(visionId.toString());
        if (error) callback(error);
        //if(typeof id == "string") id = vision_collection.db.bson_serializer.ObjectID.createFromHexString(visionId.toString());
        else {
            vision_collection.update(
               // {_id: vision_collection.db.bson_serializer.ObjectID.createFromHexString(visionId)},
               {_id: id},
               {"$set": {'imgPath': imagePath}},
               function(error, vision){
                if( error ) callback(error, null);
                console.log("updated :" + JSON.stringify(vision));
                callback(null, vision)
            });
        }
    });
};

VisionProvider.prototype.updateThumbPaths = function (visionId, data, callback) {
    //var id = visionId;
    
    this.getCollection(function (error, vision_collection) {
        var id = new ObjectId(visionId.toString());
        if (error) callback(error);
        //if(typeof id == "string") id = vision_collection.db.bson_serializer.ObjectID.createFromHexString(visionId.toString());
        else {
            vision_collection.update(
               // {_id: vision_collection.db.bson_serializer.ObjectID.createFromHexString(visionId)},
               {_id: id},
               {"$set": data},
               function(error, vision){
                if( error ) callback(error, null);
                console.log("updated :" + JSON.stringify(vision));
                callback(null, vision)
            });
        }
    });
};

VisionProvider.prototype.updateDrawingPath = function (visionId, imagePath, callback) {
    //var id = visionId;
    
    this.getCollection(function (error, vision_collection) {
        var id = new ObjectId(visionId.toString());
        if (error) callback(error);
        //if(typeof id == "string") id = vision_collection.db.bson_serializer.ObjectID.createFromHexString(visionId.toString());
        else {
            vision_collection.update(
               // {_id: vision_collection.db.bson_serializer.ObjectID.createFromHexString(visionId)},
               {_id: id},
               {"$set": {'drawingPath': imagePath}},
               function(error, vision){
                if( error ) callback(error, null);
                console.log("updated :" + JSON.stringify(vision));
                callback(null, vision)
            });
        }
    });
};

VisionProvider.prototype.addChild = function(parentId, childId, callback){
  this.getCollection(function(error, vision_collection){
      if(error) callback(error);
     var vision_id = vision_collection.db.bson_serializer.ObjectID.createFromHexString(parentId.toString());
      var query = {_id: vision_id};
    var update = {'$push':{'children':childId}};
                   
      vision_collection.update(query, update, function(err){
        if(err) callback(err);
        callback(null);
      });
                  
       });
};

VisionProvider.prototype.updateVision = function (id, vision, callback) {
    console.log("UPDATE IS " + JSON.stringify(vision) + " id is "+ id);
    delete vision["_id"];
    this.getCollection(function (error, vision_collection) {
        if (error) callback(error);
        else {
            vision_collection.update(
             {_id: vision_collection.db.bson_serializer.ObjectID.createFromHexString(id.toString())},
               // {_id: id},
               { $set:
               vision},
               function(error, returnVal){
                if( error ) callback(error);
                //console.log("updated this: " +JSON.stringify(returnVal));
                callback(null);
            });
        }
    });
};

VisionProvider.prototype.removeVision = function (id) {
    console.log("removing id" + id);
    this.getCollection(function (error, vision_collection) {
        if (error) callback(error);
        else {
            id = vision_collection.db.bson_serializer.ObjectID.createFromHexString(id.toString());
          var objectId = new ObjectId(id.toString());
           vision_collection.findOne(
                //{ _id: id }, 
                {_id: objectId},  detailed_fields,
                function (error, result) {
                    if (error) {
                      console.log("error on delete: "+error);
                    } else {
                       /* if(result.parent && result.parent.length == 24) {
                          console.log("removing from parent");
                          removeFromParent(result.parent, objectId, result.children, vision_collection);
                        } else if(result.children.length >= 0){
                           console.log("removing from children");
                          removeFromChildren(objectId, vision_collection);
                        } else {*/
                          console.log("straight remove");
                           vision_collection.remove(
                                 {_id: objectId}
                                 );
       
                        }
                        
                   // }
          });
         }
        //}
    });
           
};


VisionProvider.prototype.save = function (visions, callback) {
    //console.log(JSON.stringify(visions));
    this.getCollection(function (error, vision_collection) {
        if (error) callback(error)
            else {
                if (typeof (visions.length) == "undefined")
                    visions = [visions];

                var _id = vision_collection.insert(visions, function (err, insertedvisions) {
                    console.log("inserting "+ JSON.stringify(visions));
                    if (err) return;
                    callback(null, visions);
                });

            }
        });
};

VisionProvider.prototype.saveVision = function (visions, callback) {
    //console.log(JSON.stringify(visions));
    this.getCollection(function (error, vision_collection) {
        if (error) callback(error, null)
            else {
              /*  if (typeof (visions.length) == "undefined")
                visions = [visions];*/

               var _id = vision_collection.save(visions, function (err, insertedvisions) {
                    console.log("saving "+ JSON.stringify(visions));
                    if (err) callback(err, null);
                    callback(null, visions);
                });

            }
        });
};


VisionProvider.prototype.saveGallery = function (gallery, callback) {
    //console.log(JSON.stringify(visions));
    this.getCollection(function (error, vision_collection) {
        if (error) callback(error, null)
            else {
               

               vision_collection.save(gallery, function (err, insertedvisions) {
                    console.log("saving "+ JSON.stringify(gallery));
                    if (err) return;
                    callback(null, gallery);
                });

            }
        });
};


function addThisChild(parentId, childId, vision_collection, callback){
    var vision_id = vision_collection.db.bson_serializer.ObjectID.createFromHexString(parentId.toString());
      var query = {_id: vision_id};
     var update = {'$push':{'children':childId}};
                   
      vision_collection.update(query, update, function(err){
        if(err) callback(err);
        callback(null);
      });
}

function removeFromParent(parent, id, children, vision_collection){
      var parent_id = vision_collection.db.bson_serializer.ObjectID.createFromHexString(parent.toString());
      var this_id = vision_collection.db.bson_serializer.ObjectID.createFromHexString(id.toString());
      var query = {children: this_id};
      var update = {$pull: { children: this_id }};
      console.log("children is "+ JSON.stringify(children));
      if(children.length > 0){
          console.log("pusing children");
        update = { $push: { children: children}, $pull: { children: this_id }};
      }
                   
      vision_collection.update(query, update, function(err){
        if(err) {
          console.log("error removing from parent "+ err);
        } else {
        }
    });
      var child_query = {parent: this_id};
      var child_update = { $set: {parent: parent_id}};
      vision_collection.update(child_query, child_update, function(err){
        if(err) {
          console.log("error updating children "+ err);
        } else {
        }
    });
       vision_collection.remove(
                                 {_id: this_id}
                                 );
};

function removeFromChildren(objectId, vision_collection){
     var child_query = {parent: objectId};
      var child_update = { $set: {parent: null}};//TO DO check how parent is stored
      vision_collection.update(child_query, child_update, function(err){
        if(err) {
          console.log("error updating children "+ err);
        } else {
        }
    });

}

exports.VisionProvider = VisionProvider;