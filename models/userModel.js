const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    fullname: {
        type: String,
        require: true,
        unique: true,
    },
    email: {
        type: String,
        require: true,
        unique: true,
    },
    dob: {
        type: String,
        require: true,
    },
    role: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
    cpassword: {
        type: String,
        require: true,
    }
});

const User = mongoose.model('users', UserSchema);

module.exports = User;