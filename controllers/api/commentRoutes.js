const router = require("express").Router();
const { User, Post, Comment } = require("../../models");
const withAuth = require('../../utils/auth');

router.post('/dashboard', withAuth, async (req, res)=>{
    const comment = await Comment.create({
        comments: req.body.comment,
        user_id:req.session.user_id,
        post_id:req.body.post_id
    });
});

module.exports = router;