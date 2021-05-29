const express = require('express');     
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const {check, validationResult} = require('express-validator');
const User = require('../../models/User');
const config= require('config');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');

router.post('/', [
    check('name','Name is req').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Min length should be 6').isLength({
        min:6
    })
],
async (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    const {name, email, password} = req.body;
     
    try{
        let user = await User.findOne({email});
        if(user){
            res.status(400).json({errors: [{msg: 'User already Exists'}]});
        }
        else{
            const avatar = gravatar.url(email,{
                s: '200',
                r: 'pg',
                d: 'mm'
            });

            user = new User({
                name,
                email,
                password,
                avatar
            });
            
            // const salt = await bcrypt.genSalt(10);
            // user.password = await bcrypt.hash(password,salt);
            await user.save();
            const payload = {
                user:{
                    id: user.id
                }
            }

            jwt.sign(payload, config.get('jwtSecret'),{
                expiresIn:360000
            },
            (err, token)=>{
                if(err) throw err;
                res.json({token}); 
            })

            // res.send('users registered');
        }
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }

});

// to follow someone by their user id
router.put('/follow/:id', auth, async(req,res)=>{
    try{
        //user1 is the one following user2
        const user2 = await User.findById(req.params.id);
        const user1 = await User.findById(req.user.id);
        if(user1.following.filter(following=>following.user.toString()===req.params.id).length > 0){
            return res.status(400).json({msg: 'You already follow'});
        }
        user1.following.unshift({user: req.params.id});
        user2.followers.unshift({user: req.user.id});
        await user2.save();
        await user1.save();
        res.json({msg: 'followed'});
    }catch(err){
        console.log(err.message);
        res.status(500).send('server error');
    }
});

//to unfollow some user by its user id
router.put('/unfollow/:id', auth, async(req,res)=>{
    try{
        //user1 is the one unfollowing user2
        const user2 = await User.findById(req.params.id);
        const user1 = await User.findById(req.user.id);
        if(user1.following.filter(following=>following.user.toString()===req.params.id).length === 0){
            return res.status(400).json({msg: 'You do not follow'});
        }
        let removeIndex = user2.followers.map(follower=>follower.user.toString()).indexOf(req.user.id);
        user2.followers.splice(removeIndex,1);
        removeIndex = user1.following.map(following=>following.user.toString()).indexOf(req.params.id);
        user1.following.splice(removeIndex,1);
        await user2.save();
        await user1.save();
        res.json({msg: "unfollowed"});
    }catch(err){
        console.log(err.message);
        res.status(500).send('server error');
    }
});


module.exports = router;
