const router = require("express").Router();
const { Comment } = require("../../models");
const withAuth = require("../../utils/auth");

router.post("/dashboard", withAuth, async (req, res) => {
  try {
    const addComment = await Comment.create({
      comments: req.body.content,
      user_id: req.session.user_id,
      post_id: req.body.postId,
    });

    console.log(addComment);

    const commentAdd = addComment.get({ plain: true });
    console.log(commentAdd);
    res.status(200).json(commentAdd);
  } catch (error) {
    console.log(error);
    // res.status(400).json(error);
  }
});

router.put("/dashboard/:id", withAuth, async () => {
  try {
    const updateComment = await Comment.update(
      {
        comments: req.body.comment,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).json(updateComment);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});

// Need to think
// router.get('/dashboard', async(req, res)=>{
//     try {
//         const allComment = await Comment.findAll( {
//             include: [
//             {
//               model: Post,
//             },{
//               model: User
//             }
//           ]});
//         res.status(200).json(allComment); // sending at post page for now we can modified as we need.
//     } catch (error) {
//         res.status(400).json(error);
//     }
// })

router.delete("/dashboard/:id", withAuth, async (req, res) => {
  try {
    const deleteComment = await Comment.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });
    if (deleteComment === 0) {
      throw "Cannot delete comment";
    }
    res.status(200).json(deleteComment);
  } catch (error) {
    res.status(400).json(error);
  }
});
module.exports = router;
