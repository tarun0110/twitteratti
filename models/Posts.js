const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    email:{
        type:String,
    },
    content:{
        type: String,
        require: true
    },
    date:{
        type: Date,
        default: Date.now,
    }
});

module.exports = Posts = mongoose.model('post', UserSchema);