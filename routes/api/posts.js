const express = require('express');     
const router = express.Router();
const Posts = require('../../models/Posts');


router.post('/', async (req,res) => {
    // req.body.content
    const {email, content} = req.body;
    try{
        const post = new Posts({
            email,
            content
        });
        await post.save();
        res.send('post saved');
    }catch(err){
        console.log(err.message);
        res.status(500).send('server error');
    }
});

module.exports = router;
