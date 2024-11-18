import userService from "../services/userService"
import otpService from "../services/otpService"
import nodemailer from 'nodemailer';
import cookieParser from "cookie-parser";
const handleRegister = async (req, res) => {
    try {
        const { email, password, name, phone,role } = req.body;
        
        if (!email || !password || !name || !phone || !role) {
            return res.status(400).json({
                message: 'Missing required parameters'
            });
        }

        const isExist = await userService.checkUserEmail(email);

        if (isExist) {     
            return res.render('pages/register', { 
                message: 'Email already exists' 
            });
        };
        

        const newUser = await userService.createNewUser(req.body);
        return res.status(201).render("pages/login",{
            message: 'User created successfully',
            user: newUser,
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error from server',
            error: error.message
        });
    }
}

const handleLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        if (!email || !password) {
            return res.status(400).render('pages/login', {
                message: 'Missing email or password'
            });
        }

        const user = await userService.handleUserLogin(email, password);
        if (!user) {
            return res.status(401).render('pages/login', {
                message: 'Invalid email or password'
            });
        }

        res.cookie('authenticated', 'true', { maxAge: exceptTime });
        res.cookie('id', result[0].user_id, { maxAge: exceptTime });
        res.cookie('name', result[0].name, { maxAge: exceptTime });
        res.status(200).json({
            statusCode: 200,
            msg: 'Login success',
          });
    } catch (error) {
        return res.status(500).json({
            message: 'Error from server',
            error: error.message
        });
    }
}
const handleForgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                message: 'Missing email'
            });
        }

        const user = await userService.checkUserEmail(email);
        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            });
        }

        const otp = otpService.generateOtp();
        await otpService.saveOtp(email, otp);

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            port: 465,
            secure: true,
            logger: true,
            debug: true,
            secureConnection: false,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            },
            tls:{
                rejectUnauthorized: true
            }
        });

        const mailOptions = {
            from: 'process.env.EMAIL_USER',
            to: email,
            subject: 'Password Reset OTP',
            text: `Your OTP for password reset is ${otp}`
        };

        await transporter.sendMail(mailOptions);

        return res.status(200).json({
            message: 'OTP sent to email'
        });

    } catch (error) {
        return res.status(500).json({
            message: 'Error from server',
            error: error.message
        });
    }
}

const handleChangePassword = async (req, res) => {
    try {
        const { email, otp, newPassword } = req.body;
        await userService.resetPassword(email, otp, newPassword);
        
        return res.status(200).json({
            message: 'Password changed successfully'
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error from server',
            error: error.message
        });
    }
}

const getRegister = async (req, res) => {
    return res.render('pages/register', {
        message: null
    });
}

const getLogin = async (req, res) => {
    return res.render('pages/login', { 
        message: null
    });
}
module.exports = {
    handleRegister,
    handleLogin,
    handleForgotPassword,
    handleChangePassword,
    getRegister,
    getLogin
}