// IMPORTING NECESSARY PACKAGES
const mongoose = require('mongoose');
const db = process.env.DB_URI || "mongodb://localhost:27017/chatbox";
const secret = "abhiiskobhidoondnekoniklegatohmereko15dinjayega"

module.exports = function(app)
{
    mongoose.connect(db, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    });
    app.set('secret', secret);
}
