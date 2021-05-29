const express = require('express');     
const router = express.Router();
const Profile = require('../../models/Profile');
const User = require('../../models/User');
const Posts = require('../../models/Posts');
const auth = require('../../middleware/auth');
const {check, validationResult} = require('express-validator');

// to see the profile of the user
router.get('/me', auth, 
    async (req,res) => {
        // const {age, gender, phone_number, bio}  = req.body;

        try{
            const profile = await Profile.findOne({user: req.user.id}).populate('user',['name','avatar']);
            if(!profile){
                return res.status(400).json({msg: 'No profile for this user'});
            }
            else res.json(profile);
        }catch(err){
            console.log(err.message);
            res.status(500).send('server error')
        }

});

router.post('/', auth, async (req,res)=>{
    const {age, gender, phone_number, bio}  = req.body;
    const profileFields = {};
    profileFields.user = req.user.id;
    if(age) profileFields.age = age;
    if(gender) profileFields.gender = gender;
    if(phone_number) profileFields.phone_number = phone_number;
    if(bio) profileFields.bio = bio;
    try{
        let profile = await Profile.findOne({user: req.user.id});
        console.log(profile);
        if(profile){
            //update
            profile = await Profile.findOneAndUpdate({user: req.user.id}, { $set: profileFields}, {new: true});
            return res.json(profile);
        }
        else{
            //create
            profile= new Profile(profileFields);

            await profile.save();   
            // console.log(profile);
            // res.send('profile created');
            res.json(profile);
        }
    }catch(err){
        console.log(err.message);
        res.status(500).send('server error')
    }
});


// to get all the profiles
router.get('/', async (req,res) =>{
    try{
        const profiles = await Profile.find().populate('user', ['name', 'avatar']);
        res.json(profiles);
    }catch(err){
        console.log(err.message);
        res.status(500).send('server error');
    }
});

// to get profile of one user
router.get('/user/:user_id', async (req,res) =>{
    try{
        const profile = await Profile.findOne({user: req.params.user_id}).populate('user', ['name', 'avatar']);
        if(!profile){
            res.status(400).json({msg: 'Profile not found'});
        }
        else    
        res.json(profile);
    }catch(err){
        console.log(err.message);
        if(err.kind=='ObjectId') return res.status(400).json({msg: 'Profile not found'});
        res.status(500).send('server error');
    }
});

//to delete the whole user
router.delete('/', auth, async (req, res) => {
    try{    // first delete posts
        await Posts.deleteMany({user: req.user.id});
        //delete profile

        await Profile.findOneAndDelete({user: req.user.id });
        //delete user
        await User.findOneAndDelete({_id: req.user.id});
        res.json({msg: 'User Deleted'});
    }catch(err){
        console.log(err.message);
        res.status(500).send('server error');
    }
})


module.exports = router;
