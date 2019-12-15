// IMPORTING THE NECESSARY PACKAGES
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

// DEFINE THE USER SCHEMA
const UserSchema = new Schema({
    first_name : String,
    last_name : String,
    username : String,
    password : {type: 'String', required : true, select : false},
    email : {type: 'String', required: true, unique: true},
    date_created : Date,
    date_modified : Date
});

// METHODS
// GENRATING HASH OF THE PASSWORD
UserSchema.methods.generateHash = password => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
}

UserSchema.methods.validatePassword = function(password) {
    
    return bcrypt.compareSync(password, this.password);
}


// HOOKS
UserSchema.pre('save', function() {
    this.date_modified = new Date();
    if (!this.isNew)
        return (1);
    if (!this.email || !this.password)
        return new Promise((res, rej) => rej(new Error("ValidationError")));
        this.password = this.generateHash(this.password)
    this.date_created = new Date();
    return (1);
})



// Expose the user schema to the rest of the project
module.exports = mongoose.model('User', UserSchema);