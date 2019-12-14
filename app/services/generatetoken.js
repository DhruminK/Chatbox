// IMPORT THE NECESSARY PACKAGES
const jwt = require('jsonwebtoken');
const util = require('util');

function generateToken(app, doc)
{
    const data = {email : doc.email, first_name : doc.first_name, last_name : doc.last_name, id : doc._id};
    doc.token = (jwt.sign( { data }, app.get('secret'), {expiresIn: '1h'}));
    return (doc);
}

async function verifyToken(app, token)
{
    const verifyPromise = util.promisify(jwt.verify);
    return (verifyPromise(token, app.get('secret')));
}

module.exports = {
    generateToken : generateToken,
    verifyToken : verifyToken
};