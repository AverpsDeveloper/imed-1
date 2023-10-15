import crypto from "crypto"

export const generateOtp = async () => {
    const otp = crypto.randomInt(1000, 9999);
    return otp;
}

export const hashOtp = (data: string) => {
    return crypto
        .createHmac('sha256', "123456787")
        .update(data)
        .digest('hex');
}

export const sendBySms = async (phone:string, otp: string) => {
    // return await twilio.messages.create({
    //     to: phone,
    //     from: process.env.SMS_FROM_NUMBER,
    //     body: `Your codershouse OTP is ${otp}`,
    // });
}

export const verifyOtp = (hashedOtp: string, data: string): boolean => {
    let computedHash = crypto
        .createHmac('sha256', "123456787")
        .update(data)
        .digest('hex');
    return computedHash === hashedOtp;
}