const router = require("express").Router();
const { User, Post, Comment } = require("../../models");
const withAuth = require("../../utils/auth");
router.post("/dashboard", async (req, res) => {
  try {
    const postData = await Post.create({
      post: req.body.content,
      title: req.body.title,
      topic_id: req.body.checked,
      user_id: req.session.user_id,
      logged_in_user_id: req.session.user_id,
    });
    res.status(200).json(postData);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.put("/dashboard/:id", async (req, res) => {
  try {
    const updatePostData = await Post.update(
      {
        title: req.body.title,
        post: req.body.content,
      },
      {
        where: {
          id: req.body.id,
        },
      }
    );
    res.status(200).json(updatePostData);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete("/:id", withAuth, async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: "No Post found with this id" });
      return;
    }

    res.status(204).json();
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
