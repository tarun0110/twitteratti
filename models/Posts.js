const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    content:{
        type: String,
        required: true
    },
    avatar: String,
    likes:[{
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'user'
        }
    }
    ],
    comments:[{
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'user'
        },
        text:{
            type:String,
        },
        avatar: String,
        date:{
            type:Date,
            default: Date.now
        }
    }
    ],
    date:{
        type: Date,
        default: Date.now,
    }
});

module.exports = Posts = mongoose.model('post', UserSchema);