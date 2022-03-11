const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


function hashPassword(password) {
    return bcrypt.hash(password, 10);
}

function comparePassword(password, hash) {
    return bcrypt.compare(password, hash);
}

function verifyToken(token) {
    return jwt.verify(token, process.env.JWT_SECRET);
}


function generateToken(user) {
    return jwt.sign({
        id: user._id,
        email: user.email
    }, process.env.JWT_SECRET, {
        expiresIn: '1h'
    });
}

module.exports = {
    hashPassword,
    comparePassword,
    verifyToken,
    generateToken
};