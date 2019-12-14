// IMPORTING NECESSARY PACKAGES
const router = require('express').Router();
const Token = require('../services/generatetoken');

module.exports = function (app) {

// MIDDLEWARE TO AUTHENTICATE TOKEN
router.use((req, res, next) => {
    const token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (!token)
        return (res.status(403).send());
    Token.verifyToken(app, token)
        .then(token => (req.decoded = token, next()))
        .catch(err => res.status(403).send());
})

router.get('/hello', (req, res) => {
    res.status(200).send('Hello');
});

return router;

};