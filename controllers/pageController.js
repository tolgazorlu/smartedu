const session = require('express-session');
const nodemailer = require('nodemailer');

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

exports.sendEmail = async (req, res) => {
  try {
    const outputMessage = `
    <h1>Mail Details</h1>
    <ul>
      <li>Name: ${req.body.name}</li>
      <li>Email:  ${req.body.email}</li>
    </ul>
    <h1>Message Details</h1>
    <p>${req.body.message}</p>
    `;

    let transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: 'biasxloue@gmail.com', // gmail user
        pass: 'eghxzfhpuqkvgcls', // gmail password
      },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"Smart Edu Contact Form" <biasxloue@gmail.com>', // sender address
      to: 'yenoba8517@cutefier.com', // list of receivers
      subject: 'Smart Edu Contact Form New Message', // Subject line
      html: outputMessage, // html body
    });

    console.log('Message sent: %s', info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

    req.flash('success', 'We Received your message succesfully');
    res.status(200).redirect('contact');
  } catch (error) {
    req.flash('error', `Something happened!`);
    res.status(400).redirect('contact');
  }
};
