const express = require('express');     
const router = express.Router();
const Posts = require('../../models/Posts');
const auth = require('../../middleware/auth');
const Profile = require('../../models/Profile');
const { findOneAndDelete, findById } = require('../../models/Profile');

router.post('/', auth, async (req,res) => {
    // req.body.content
    const content = req.body.content;
    const user = await User.findById(req.user.id).select('-password');
    try{
        const post = new Posts({
            user: req.user.id,
            content: content,
            avatar: user.avatar
        });
        const newPost= await post.save();
        res.json(newPost);
        // res.send('post saved');
    }catch(err){
        console.log(err.message);
        res.status(500).send('server error');
    }
});

router.get('/', async (req,res) =>{
    try{
        const posts = await Posts.find().sort({date: -1});
        res.json(posts);
    }catch(err){
        console.log(err.message);
        res.status(500).send('server error');
    }
});

//find a post by ID
router.get('/:id', auth, async (req,res)=>{
    try{
        const posts = await Posts.findById(req.params.id);
        res.json(posts);
    }catch(err){
        console.log(err.message);
        if(err.kind=='ObjectId')
            return res.status(400).json({msg: 'Posts not found'});
        res.status(500).send('server error');
    }
});

//find posts of user by ID
router.get('/user/:id2', auth, async (req,res)=>{
    try{
        const posts = await Posts.find({user: req.params.id2});
        res.json(posts);
    }catch(err){
        console.log(err.message);
        if(err.kind=='ObjectId')
            return res.status(400).json({msg: 'Posts not found'});
        res.status(500).send('server error');
    }
});

//post delete
router.delete('/:id',auth, async (req,res) =>{
    try{
        const post = await Posts.findById(req.params.id);
        if(!post)
            return res.status(400).json({msg: 'Posts not found'});
        if(post.user.toString()!==req.user.id){
            return res.status(401).send('user not authorized');
        }
        await post.remove();
        res.json({msg: 'post removed'});
    }catch(err){
        console.log(err.message);
        if(err.kind=='ObjectId')
            return res.status(400).json({msg: 'Posts not found'});
        res.status(500).send('server error');
    }
});

//to like a post
router.put('/like/:id',auth, async (req,res) =>{
    try {
        const post = await Posts.findById(req.params.id);
        // for(let i =0;i<post.likes.length;i++){
        //     if(post.likes[i].toString()===req.user.id){
        //         return res.status(400).send('post already liked');
        //     }
        // }
        if(post.likes.filter(like=>like.user.toString()===req.user.id).length > 0){
            return res.status(400).json({msg: 'Post already Liked'});
        }
        post.likes.unshift({user: req.user.id});
        await post.save();
        res.json(post.likes);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('server error');
    }
});

//to unlike a post
router.put('/unlike/:id',auth, async (req,res) =>{
    try {
        const post = await Posts.findById(req.params.id);
        if(post.likes.filter(like=>like.user.toString()===req.user.id).length === 0){
            return res.status(400).json({msg: 'Post is not liked yet'});
        }
        
        const removeIndex = post.likes.map(like=>like.user.toString()).indexOf(req.user.id);
        post.likes.splice(removeIndex,1);
        await post.save();
        res.json(post.likes);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('server error');
    }
});

//comment on a post
router.post('/comment/:id',auth, async (req,res) =>{
    try {
        const post = await Posts.findById(req.params.id);
        const user = await User.findById(req.user.id).select('-password');

        const newComment = {};
        newComment.user = req.user.id;
        newComment.text = req.body.text;
        newComment.avatar = user.avatar;
        
        post.comments.unshift(newComment);
        await post.save();
        res.json(post.comments) ;
    } catch (err) {
        console.log(err.message);
        res.status(500).send('server error');
    }
});

//delete a comment on a post
router.delete('/comment/:id/:comment_id',auth, async (req,res) =>{
    try {
        const post = await Posts.findById(req.params.id);
        const user = await User.findById(req.user.id).select('-password');

        const comment = post.comments.find(comment => comment.id===req.params.comment_id);

        if(!comment){
            return res.status(404).json({msg: 'comment does not exist'});
        }

        if(comment.user.toString()!==req.user.id){
            return res.status(401).json({msg: 'user not authorized'});
        }

        const removeIndex = post.comments.map(comment => comment.user.toString()).indexOf(req.user.id);
        post.comments.splice(removeIndex,1);        
        await post.save();
        res.json(post.comments);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('server error');
    }
});


module.exports = router;
