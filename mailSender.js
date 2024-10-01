const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Configure Nodemailer
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
        user: 'nado.gemini62@gmail.com',
        pass: 'dqabqknhecjyzgtr'
    }
});

// API Endpoint for email verification
app.post('/verify-email', async(req, res) => {
    const { email } = req.body;
    

    // Generate a verification link (you can customize this)
    const verificationLink = `http://yourdomain.com/verify?email=${encodeURIComponent(email)}`;

    // Email options
    const mailOptions = {
        from: 'nado.gemini62@gmail.com',
        to: email,
        subject: 'Email Verification',
        text: `Please verify your email by clicking on the following link: ${verificationLink}`
    };

    // Send email
    try {
        await transporter.sendMail(mailOptions);
        console.log("======>");
        res.status(200).json({ statusCode: 200, message: 'User registered successfully. Verification email sent.' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ statusCode: 500, message: 'Error sending verification email.' });
    }
});

app.get('/', (req, res) => {
    res.send('~~~ New Hello world ~~~');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
