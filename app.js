const express = require('express');
const app = express();

//Template Engine
app.set('view engine', 'ejs');

//Middlewares
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.status(200).render('index', {
    page_name: 'index'
  });
});

app.get('/about', (req, res) => {
  res.status(200).render('about', {
    page_name: "about"
  });
});

app.get('/course-single', (req, res) => {
  res.status(200).render('course-single');
});

app.get('/courses', (req, res) => {
  res.status(200).render('courses', {
    page_name: "courses"
  });
});

app.get('/dashboard', (req, res) => {
  res.status(200).render('dashboard', {
    page_name: "dashboard"
  });
});

app.get('/contact', (req, res) => {
  res.status(200).render('contact', {
    page_name: 'contact'
  })
})

app.get('/login', (req, res) => {
  res.status(200).render('login');
});

app.get('/register', (req, res) => {
  res.status(200).render('register');
});

app.listen(3000, () => {
  console.log('Port çalıştı!');
});
