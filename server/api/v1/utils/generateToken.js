import jwt from "jsonwebtoken";

const secretKey = process.env.JWT_SECRET;

const generateToken = (userId) => {
    const payload = { userId };
    return jwt.sign(payload, secretKey, { expiresIn: "1d", });
};

export default generateToken;