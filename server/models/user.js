'use strict'

const mongoose = require("mongoose")
const Schema = mongoose.Schema
const bcrypt = require("bcrypt-nodejs")

const UserSchema = new Schema({
    name : String,
    displayName : String,
    email: { type : String, unique : true, lowercase : true, index: { unique: true }},
    phone : Number,
    password : String,
    company: {type: mongoose.Schema.Types.ObjectId, ref: 'Company'},
    role:  {type: mongoose.Schema.Types.ObjectId, ref: 'Roles'},
    signupDate : { type : Date, default : Date.now() },
    lastLogin : Date
})

UserSchema.pre('save', function (next) {
    let user = this
    if (!this.isModified('password')) return next()
    bcrypt.genSalt(10, (err, salt) => {
        if (err) return next()
        bcrypt.hash(user.password, salt, null, (err, hash) => {
            if (err) return next(err)
            user.password = hash
            next()
        })
    })
})

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        return cb(null, isMatch);
    });
};

module.exports = mongoose.model('User', UserSchema)