const mongoose = require('mongoose');

const Topics = require('../schemas/topic');
let Utils = require('../utils');

exports.addNewTopic = (req,res)=>{
    const newTopic = new Topics();


    newTopic.topicid = req.body.topicid || null;
    newTopic.title = req.body.title || null;
    newTopic.description = req.body.description || null;
    newTopic.courseuid = req.body.courseuid && mongoose.Types.ObjectId(req.body.courseuid) || null;

    newTopic.save((err,doc)=>{
        if(err){
            Utils.sendFailureResponse({error : 'Error while adding new Topic'},req,res,err);
            return;
        }
        Utils.sendSuccessResponse({ topicData : doc },res);
        return;
    });
}

exports.getTopicDetail = (req,res)=>{
    let topicUid = req.params.topicuid && mongoose.Types.ObjectId(req.params.topicuid) || null;

    if(!topicUid){
        Utils.sendFailureResponse({error : "Invalid Topic ID"},req,res);
        return;
    }


    Topics.findById(topicUid).exec((err,topicData)=>{
        if(err){
            Utils.sendFailureResponse({error : 'Error while getting topic detail'},req,res,err);
            return;
        }
        Utils.sendSuccessResponse({ topicdata : topicData },res);
        return;
    });
}


exports.modifyTopic = (req,res)=>{
    let topicUid = req.params.topicuid && mongoose.Types.ObjectId(req.params.topicuid) || null;

    if(!topicUid){
        Utils.sendFailureResponse({error: "Invalid Topic Id"},req,res);
        return;
    }

    let updateQuery = {};

    if(req.body.topicid){
        updateQuery.topicid = req.body.topicid;
    }
    if(req.body.title){
        updateQuery.title = req.body.title;
    }
    if(req.body.description){
        updateQuery.description = req.body.description;
    }
    if(req.body.courseuid){
        updateQuery.courseuid = req.body.courseuid && mongoose.Types.ObjectId(req.body.courseuid) || null;
    }

    Topics.update({
        _id : topicUid
    },{
        $set : updateQuery
    },{
        upsert : false,
        safe : true
    },(err,data)=>{
        if(err){
            Utils.sendFailureResponse({error: "Error while updating topic data"},req,res,err);
            return;
        }
        Utils.sendSuccessResponse({ successMessage : "topic data updated successfully" },res);
        return;
    });
}

exports.deleteTopic = (req,res) => {
    let topicUid = req.params.topicuid && mongoose.Types.ObjectId(req.params.topicuid) || null;

    if(!topicUid){
        Utils.sendFailureResponse({error: "Invalid topic Id"},req,res);
        return;
    }

    Topics.remove({
        _id : topicUid
    },(err) => {
        if(err){
            Utils.sendFailureResponse({error: "Error while deleting topic data"},req,res,err);
            return;
        }
        Utils.sendSuccessResponse({ successMessage : "topic data deleted successfully" },res);
        return;
    });
}

