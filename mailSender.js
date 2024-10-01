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
    const { email, name, domain } = req.body;
    

    // Generate a verification link (you can customize this)
    const verificationLink = `${domain}/verify?email=${encodeURIComponent(email)}`;

    // Email options
    const mailOptions = {
        from: '"FMS 👻" nado.gemini62@gmail.com',
        to: email,
        subject: 'Email Verification',
        text: `Hi ${name}!
        Thank you for signing up! To complete your registration, we’ve sent a verification link to your email address. Please check your inbox (and your spam folder, just in case) for an email from us.
        Simply click the link in the email to verify your address and activate your account. This step helps us ensure that your account is secure and that we can communicate important updates with you.
        If you don’t see the email within a few minutes, feel free to request another verification link.
        Thank you for being a part of our community!

        \n\nPlease verify your email by clicking the link: ${verificationLink}\n

        Best regards,
        FMS Company
        Feel free to customize the text to better fit your brand's voice or specific requirements!`,
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
    res.send('~~~ update ~~~');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
