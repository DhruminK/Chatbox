// IMPORTING THE NECESSARY PACKAGES
const User = require('./model/User');
const Token = require('./services/generatetoken');
const Controller = require('./controller');
const types = require('mongoose').Types;

// EXPOSING THE FUNCTION TO REST OF THE PROJECT
module.exports = function(app) {

    // MAIN ROUTE
    app.get('/', (req, res) => {
        res.set('Content-Type', 'text/plain');
        res.send("Hello");
    });

    // SIGNUP ROUTE
    app.post('/signup', (req, res) => {
        User.create(req.body)
            .then(user => {
                let usr = user.toObject();
                delete usr.password;
                return (res.status(200).send(Token.generateToken(app, usr)));
            })
            .catch(err => res.status(err.name === "ValidationError" || err.code === 11000 ? 412 : (500)).send());
    });

    // LOGIN ROUTE
    app.post('/login', (req, res) => {
        User.findOne({'email' : req.body.email}).select('+password').exec((err, doc) => {
            if (err)
                return (res.status(500).send());
            doc.validatePassword(req.body.password);
            if (!doc || !doc.validatePassword(req.body.password))
                return (res.status(401).send());
            doc = doc.toObject();
            delete doc.password;
            res.status(200).send(Token.generateToken(app, doc));
        });
    });

    // LOGGED IN ROUTE
    Controller(app);
};