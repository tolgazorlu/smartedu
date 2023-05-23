const User = require('../models/User');
const Course = require('../models/Course')
const Category = require('../models/Category')
const bcrypt = require('bcrypt');
const session = require('express-session');

exports.createUser = async (req, res) => {
  try {
    await User.create(req.body)
    res.status(201).redirect('/login');
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user) {
        bcrypt.compare(password, user.password, (err, same) => {
          req.session.userID = user._id;
          res.redirect('/');
        } 
      );
    } else {
      res.json({
        status: 'user not found',
      });
    }
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};

exports.logoutUser = (req ,res) => {
  req.session.destroy(()=> {
    res.redirect('/')
  });
}

exports.getDashboardPage = async (req, res) => {
  const user = await User.findById(req.session.userID).populate('courses');
  const categories = await Category.find({})
  const courses = await Course.find({user: req.session.userID})
  res.status(200).render('dashboard', {
    page_name: 'dashboard',
    user,
    categories,
    courses
  })
} 