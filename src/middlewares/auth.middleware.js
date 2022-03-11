const utils = require('../core/utils');

function validateToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;

        utils.verifyToken(req.token).then(decoded => {

            if (!decoded) {
                res.sendStatus(401);
            }

            next();
        });

    } else {
        res.sendStatus(403);
    }
}

module.exports = validateToken;