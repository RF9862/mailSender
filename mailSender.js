const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Configure Nodemailer
const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'norwood.stokes@ethereal.email',
        pass: 'eaxjvTj8edAdu2sq6W'
    }
});

// API Endpoint for email verification
app.post('/verify-email', (req, res) => {
    const { email } = req.body;
    return res.json({message: email})

    // // Generate a verification link (you can customize this)
    // const verificationLink = `http://yourdomain.com/verify?email=${encodeURIComponent(email)}`;

    // // Email options
    // const mailOptions = {
    //     from: 'norwood.stokes@ethereal.email',
    //     to: email,
    //     subject: 'Email Verification',
    //     text: `Please verify your email by clicking on the following link: ${verificationLink}`
    // };

    // // Send email
    // transporter.sendMail(mailOptions, (error, info) => {
    //     if (error) {
    //         return res.status(500).json({ success: false, message: 'Error sending email' });
    //     }
    //     return res.json({ success: true, message: 'Verification email sent' });
    // });
});

app.get('/', (req, res) => {
    res.send('Hello world');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
