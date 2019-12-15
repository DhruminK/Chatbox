// IMPORTING THE NECESSARY PACKAGES

const authorizedroute = require('./authorizedroute');

module.exports = function (app) {
    app.use('/api', authorizedroute(app));
}