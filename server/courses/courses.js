const mongoose = require('mongoose');

const Course = require('../schemas/course');
let Utils = require('../utils');

exports.addNewCourse = (req,res)=>{
    const newCourse = new Course();


    newCourse.courseid = req.body.courseid || null;
    newCourse.title = req.body.title || null;
    newCourse.description = req.body.description || null;
    newCourse.courseduration = req.body.courseduration || null;

    newCourse.save((err,doc)=>{
        if(err){
            Utils.sendFailureResponse({error : 'Error while adding new Course'},req,res,err);
            return;
        }
        Utils.sendSuccessResponse({ coursedata : doc },res);
        return;
    });
}

exports.getCourseDetail = (req,res)=>{
    let courseUid = req.params.courseuid && mongoose.Types.ObjectId(req.params.courseuid) || null;

    if(!courseUid){
        Utils.sendFailureResponse({error : "Invalid Course ID"},req,res);
        return;
    }


    Course.findById(courseUid).exec((err,coursedoc)=>{
        if(err){
            Utils.sendFailureResponse({error : 'Error while getting course detail'},req,res,err);
            return;
        }
        Utils.sendSuccessResponse({ coursedata : coursedoc },res);
        return;
    });
}


exports.modifyCourse = (req,res)=>{
    let courseUid = req.params.courseuid && mongoose.Types.ObjectId(req.params.courseuid) || null;

    if(!courseUid){
        Utils.sendFailureResponse({error: "Invalid Course Id"},req,res);
        return;
    }

    let updateQuery = {};

    if(req.body.courseid){
        updateQuery.courseid = req.body.courseid;
    }
    if(req.body.title){
        updateQuery.title = req.body.title;
    }
    if(req.body.description){
        updateQuery.description = description;
    }
    if(req.body.courseduration){
        updateQuery.courseduration = courseduration;
    }

    Course.update({
        _id : courseUid
    },{
        $set : updateQuery
    },{
        upsert : false,
        safe : true
    },(err,data)=>{
        if(err){
            Utils.sendFailureResponse({error: "Error while updating Course data"},req,res,err);
            return;
        }
        Utils.sendSuccessResponse({ successMessage : "Course data updated successfully" },res);
        return;
    });
}

exports.deleteCourse = (req,res) => {
    let courseUid = req.body.courseuid && mongoose.Types.ObjectId(req.body.courseuid) || null;

    if(!courseUid){
        Utils.sendFailureResponse({error: "Invalid Course Id"},req,res);
        return;
    }

    Course.remove({
        _id : courseUid
    },(err) => {
        if(err){
            Utils.sendFailureResponse({error: "Error while deleting Course data"},req,res,err);
            return;
        }
        Utils.sendSuccessResponse({ successMessage : "Course data deleted successfully" },res);
        return;
    });
}


exports.getAllCourses = (req,res) => {
    Course.find({}).exec((err,coursesData)=>{
        if(err){
            Utils.sendFailureResponse({error: "Error while get Course data"},req,res,err);
            return;
        }
        Utils.sendSuccessResponse({ coursedata : coursesData },res);
        return;
    })
}

