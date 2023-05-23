const session = require('express-session');

exports.getIndex = (req, res) => {
  res.status(200).render('index', {
    page_name: 'index',
  });
};

exports.getAbout = (req, res) => {
  res.status(200).render('about', {
    page_name: 'about',
  });
};

exports.getDashboard = (req, res) => {
  res.status(200).render('dashboard', {
    page_name: 'dashboard',
  });
};

exports.getContact = (req, res) => {
  res.status(200).render('contact', {
    page_name: 'contact',
  });
};

exports.getLogin = (req, res) => {
  res.status(200).render('login', {
    page_name: 'login',
  });
};

exports.getRegister = (req, res) => {
  res.status(200).render('register', {
    page_name: 'register',
  });
};
