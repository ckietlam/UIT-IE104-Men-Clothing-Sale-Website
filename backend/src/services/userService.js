import db from '../models/index';
import bcrypt from 'bcryptjs';
import otpService from "../services/otpService"

const salt = bcrypt.genSaltSync(10);


const hashPassword = (password) => {
    return bcrypt.hashSync(password, salt);
}

const createNewUser = async (userData) => {
    try {
        const hashedPassword = hashPassword(userData.password);
        const newotp = otpService.generateOtp();
        const newUser = await db.User.create({
            email: userData.email,
            password: hashedPassword,
            name: userData.name,
            phone: userData.phone,
            role: "Customer",
            otp: newotp
        });
        return newUser;
    } catch (error) {
        throw error;
    }
}

const checkUserEmail = async (userEmail) => {
    try {
        const user = await db.User.findOne({ where: { email: userEmail }});
        if (user) {
            return true;
        }
        return false;
    } catch (error) {
        throw error;
    }
}

const handleUserLogin = async (email, password) => {
    try {
        const user = await db.User.findOne({ where: { email: email }});
        if (user) {
            const isValidPassword = bcrypt.compareSync(password, user.password);
            if (isValidPassword) {
                return user;
            }
        }
        return null;
    } catch (error) {
        throw error;
    }
}




const sendOtpEmail = async (email, otp) => {
    const mailOptions = {
        from: 'process.env.EMAIL_USER',
        to: email,
        subject: 'Your OTP Code',
        text: `Your OTP code is ${otp}`
    };

    await transporter.sendMail(mailOptions);
}

const forgotPassword = async (email) => {
    try {
        const user = await db.User.findOne({ where: { email: email }});
        if (user) {
            const otp = generateOtp();
            user.otp = otp;
            await user.save();
            await sendOtpEmail(email, otp);
            return true;
        }
        return false;
    } catch (error) {
        throw error;
    }
}

const resetPassword = async (email, otp, newPassword) => {
    try {
        // Await the findOne method
        const user = await db.User.findOne({ where: { email: email, otp: otp } });
        console.log("User found:", user);
        // Check if the user was found
        if (user) {
        const newotp = otpService.generateOtp();
        user.password = hashPassword(newPassword);
        user.otp = newotp; 

        // Save the user object
        await user.save();
        return true;
        }
        else 
        {
            return false;
        }

        
    } catch (error) {
        throw error;  
    }
}
const checkUserEmailWhenChangePassword = async (userEmail, currentUserEmail) => {
    try {
        const user = await db.User.findOne({
            where: {
                email: userEmail,
                [Op.not]: [{ email: currentUserEmail }]
            }
        });
        return !!user; 
    } catch (error) {
        throw error; 
    }
}
const updateProfile = async (new_email, name, phone, current_email) => {
    try {
        const user = await db.User.findOne({ where: { email: current_email }});
        if (user) {
            user.name = name;
            user.phone = phone;
            user.email = new_email;
            await user.save();
            return true;
        }
        
    } catch (error) {
        throw error;
    }
}
module.exports = {
    createNewUser,
    checkUserEmail,
    handleUserLogin,
    forgotPassword,
    resetPassword,
    updateProfile
}