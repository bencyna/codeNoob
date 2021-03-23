const router = require("express").Router();
const { User, Post } = require("../../models");
const withAuth = require('../../utils/auth');
router.post('/dashboard', async (req, res)=>{
    try {
        const postData = await Post.create({
            post: req.body.content,
            title: req.body.title,
            user_id: req.session.user_id
        }); 
        res.status(200).json(postData);
    } catch (error) {
        res.status(400).json(error);
    }
});

router.get('/dashboard', async (req, res)=>{
    const posts = await Post.findAll( {
        where: {
            user_id: req.session.user_id,
          },
          include:[
            {
              model: User,
              attributes: ["first_name", "last_name"],
            },
          ]
    });
    try {
        res.render('dashboard', posts);
    } catch (error) {
        res.status(400).json(error);
    }
});

router.put('/dashboard/:id',async (req,res)=>{
try {
    const updatePostData = await Post.update({
        title: req.body.title,
        post: req.body.content
    },{
     where: {
         id: req.body.id,
       }
    });
    res.status(200).json(updatePostData);            
} catch (error) {
    res.status(500).json(error);    
}});


module.exports = router;