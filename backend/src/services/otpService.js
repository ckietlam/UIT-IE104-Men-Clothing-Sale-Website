import otpGenerator from 'otp-generator';
import db from '../models/index';

const generateOtp = () => {
    return otpGenerator.generate(4, { upperCase: false, specialChars: false, alphabets: false, digits: true });
}
// Save OTP to user
const saveOtp = async (email, otp) => {
    try {
        const user = await db.User.findOne({ where: { email: email } });
        if (user) {
            user.otp = otp;
            await user.save();
        }
    } catch (error) {
        throw error;
    }
}

// Verify OTP
const verifyOtp = async (email, otp) => {
    try {
        const user = await db.User.findOne({ where: { email: email, otp: otp } });
        return user ? true : false;
    } catch (error) {
        throw error;
    }
}

// Delete OTP after use
const deleteOtp = async (email) => {
    try {
        const user = await db.User.findOne({ where: { email: email } });
        if (user) {
            user.otp = null;
            await user.save();
        }
    } catch (error) {
        throw error;
    }
}

export default {
    generateOtp,
    saveOtp,
    verifyOtp,
    deleteOtp
};