// IMPORTING THE NECESSARY PACKAGES

const authorizedroute = require('./authorizedroute');

module.exports = function (app) {
    console.log('hERE');
    app.use('/api', authorizedroute(app));
}