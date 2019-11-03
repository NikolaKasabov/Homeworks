const jwt = require('jsonwebtoken');
const CourseModel = require('../models/Course');
const UserModel = require('../models/User');
const showNotification = require('../utils/showNotification');
const redirectIfNotLogged = require('../middlewares/redirectIfNotLogged');

const { jwtSecret } = require('../config/config');

module.exports = {
  homeGet: (req, res) => {
    CourseModel.find()
      .sort({ 'createdAt': -1 })
      .then((courses) => {
        res.render('home/user-home', {
          username: req.userData.username,
          courses
        });
      })
      .catch((err) => console.log(err));
  },

  homePost: (req, res) => {
    const { search } = req.body;

    CourseModel.find({
      title: { $regex: new RegExp(search, 'i') }
    })
      .then((courses) => {
        res.render('home/user-home', { courses })
      })
      .catch((err) => console.log(err));
  },

  createCourseGet: (req, res) => {
    res.render('course/create-course', {
      username: req.userData.username,
    });
  },

  createCoursePost: (req, res) => {
    let { title, description, imageUrl, isPublic } = req.body;

    isPublic = isPublic === 'on';
    // validations
    if (title.length < 4) {
      showNotification(req, res,
        'course/create-course',
        'The title should be at least 4 characters.',
        {
          title,
          description,
          imageUrl,
          isPublic
        }
      );
      return;
    } else if (description.length < 20) {
      showNotification(req, res,
        'course/create-course',
        'The description should be at least 20 characters long.',
        {
          title,
          description,
          imageUrl,
          isPublic
        }
      );
      return;
    } else if (!imageUrl.startsWith('http') && !imageUrl.startsWith('https')) {
      showNotification(req, res,
        'course/create-course',
        'The imageUrl should be starts with http or https.',
        {
          title,
          description,
          imageUrl,
          isPublic
        }
      );
      return;
    }

    CourseModel.create({
      title,
      description,
      imageUrl,
      isPublic,
      creatorId: req.userData.userId,
    })
      .then(() => res.redirect('/'))
      .catch((err) => console.log(err));
  },

  courseDetailsGet: (req, res) => {
    const { courseId } = req.params;

    CourseModel.findById(courseId)
      .then((course) => {
        const isCreator = course.creatorId.toString() === req.userData.userId.toString();
        const isEnrolled = course.usersEnrolled.includes(req.userData.userId);

        res.render('course/course-details', {
          username: req.userData.username,
          course,
          isCreator,
          isEnrolled,
        });
      })
      .catch((err) => console.log(err));
  },

  courseEnrollGet: (req, res) => {
    const { courseId } = req.params;

    CourseModel.findByIdAndUpdate(courseId, {
      $push: { 'usersEnrolled': req.userData.userId }
    })
      .then(() => res.redirect('/'))
      .catch((err) => console.log(err));
  },

  courseEditGet: (req, res) => {
    const { courseId } = req.params;

    CourseModel.findById(courseId)
      .then((course) => {
        res.render('course/edit-course', {
          username: req.userData.username,
          course,
        })
      })
      .catch((err) => console.log(err));
  },

  courseEditPost: (req, res) => {
    const { courseId } = req.params;
    let { title, description, imageUrl, isPublic } = req.body;
    isPublic = isPublic === 'on';

    CourseModel.findByIdAndUpdate(courseId, {
      title,
      description,
      imageUrl,
      isPublic
    })
      .then(() => res.redirect('/'))
      .catch((err) => console.log(err));
  },

  courseDeleteGet: (req, res) => {
    const { courseId } = req.params;

    CourseModel.findByIdAndDelete(courseId)
      .then(() => res.redirect('/'))
      .catch((err) => console.log(err));
  },

  logoutGet: (req, res) => {
    res.clearCookie('jwt');
    res.redirect('/');
  },
}