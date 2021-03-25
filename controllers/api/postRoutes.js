const router = require("express").Router();
const { User, Post, Comment } = require("../../models");
const withAuth = require('../../utils/auth'); // need to make plan for this how we can use the auth in the post

router.post('/dashboard',withAuth, async (req, res)=>{
    try {
        const postData = await Post.create(
           req.body
        ); 
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

router.get('/dashboard/:id', async (req, res)=>{
    const posts = await Post.findOne({
        where: {
            // user_id: "4c877132-1e9c-4e41-ad04-1568e1ee6ce6",
            id: req.params.id 
          },
          include:[
            {
              model: User,
              attributes: ["first_name", "last_name"],
            },
            {
                model:Comment,
                attributes:['comments']
            }
          ]
    });
    try {
        res.json( posts);
    } catch (error) {
        res.status(400).json(error);
    }
});

// need to think
router.put('/dashboard/:id',withAuth, async (req,res)=>{
try {
    const updatePostData = await Post.update({
        title: req.body.title,
        post: req.body.post
    },{
     where: {
         id: req.params.id,
       }
    });
    res.status(200).json(updatePostData);            
} catch (error) {
    res.status(400).json(error);    
}});

router.delete('/dashboard/:id',withAuth, (req, res) => {
    Post.destroy({
        where: {
            id: req.params.id
        }
    }).then(dbPostData => {
        if (!dbPostData) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
        }
        res.json(dbPostData);
    }).catch(err => {
        res.status(500).json(err);
    });
});

module.exports = router;