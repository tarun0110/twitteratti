const express = require('express');     
const router = express.Router();
const auth =require('../../middleware/auth');
const bcrypt = require('bcryptjs');
const {check, validationResult} = require('express-validator');
const User = require('../../models/User');
const config= require('config');
const jwt = require('jsonwebtoken');

router.get('/', auth, async (req,res) => {
    try{
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    }catch(err){
        console.log(err.message);
        res.status(500).send('server error');
    }
});

router.post('/', [
    // check('name','Name is req').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Min length should be 6').exists()
],
async (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    const {email, password} = req.body;
     
    try{
        let user = await User.findOne({email});
        if(!user){
            res.status(400).json({errors: [{msg: 'Invalid credentials'}]});
        }
        else{
            

            // const isMatch = await bcrypt.compare(password,user.password);
            if(user.password!=password){
                res.status(400).json({errors: [{msg: 'Invalid credentials'}]});
            }
            

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

module.exports = router;

