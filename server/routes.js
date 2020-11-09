module.exports = function(router) {
    let Courses = require('./courses/courses');
    let Topic = require('./topics/topics');

    //Courses


    //create
    router.post('/course/addnewcourse',Courses.addNewCourse);
    //read
    router.get('/course/getcoursedetail/:courseuid',Courses.getCourseDetail);
    //update
    router.put('/course/modifycourse/:courseuid',Courses.modifyCourse);
    //delete
    router.post('/course/deletecourse',Courses.deleteCourse);

    router.post('/course/getallcourses',Courses.getAllCourses)
    //Topics

    //create
    router.post('/topic/addnewtopic',Topic.addNewTopic);
    //read
    router.get('/topic/gettopicdetail/:courseuid',Topic.getTopicDetail);
    //update
    router.put('/topic/modifytopic/:topicuid',Topic.modifyTopic);
    //delete
    router.post('/topic/deletetopic',Topic.deleteTopic);

}