const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    age:{
        type: Number,
        require: true
    },
    gender: {
        type: String,
        enum: ["male", "female", "other"]
    },
    phone_number: String,
    bio:{
        type:String
    }
});

module.exports = Profile = mongoose.model('profile', UserSchema);