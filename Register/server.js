const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// إعداد الميدلوير
app.use(bodyParser.json());
app.use(express.static('public')); // To work on html files 

app.post('/send-code', async (req, res) => {
    const email = req.body.email;
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString(); // Random OTP 

    // إعداد النقل عبر nodemailer
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'your-email@gmail.com',  // email
            pass: 'your-password'           // password
        }
    });

    // send message
    const mailOptions = {
        from: 'your-email@gmail.com', // company email
        to: email,
        subject: 'Verification Code',
        text: `Your verification code is: ${verificationCode}`
    };

    try {
        await transporter.sendMail(mailOptions);
        res.json({ success: true, code: verificationCode }); // إرسال الكود للتأكد لاحقًا
    } catch (error) {
        console.error(error);
        res.json({ success: false });
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
