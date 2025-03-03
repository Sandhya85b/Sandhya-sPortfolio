

const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware to parse JSON and form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Nodemailer Transporter - Using Gmail (You can use other email services as well)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'sandhya85.b@gmail.com',  // Replace with your email
    pass: 'SgZ4k02Y1UC2mUIGbSrMZ2FUC6E',   // Replace with your email password or app password (if using Gmail)
  },
});

// Post route to handle form submission
app.post('/send-email', (req, res) => {
  const { user_name, user_email, message } = req.body;

  // Email options
  const mailOptions = {
    from: user_email,
    to: 'sandhya85.b@gmail.com', // Replace with your email where you want to receive messages
    subject: `Message from ${user_name}`,
    text: `Message: ${message}\nFrom: ${user_name}\nEmail: ${user_email}`,
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      return res.status(500).send('Error sending message. Please try again later.');
    }
    res.status(200).send('Message sent successfully!');
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
