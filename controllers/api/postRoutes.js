const router = require("express").Router();
const { User, Post, Comment } = require("../../models");
const withAuth = require("../../utils/auth");
router.post("/dashboard", async (req, res) => {
  try {
    const postData = await Post.create({
      post: req.body.content,
      title: req.body.title,
      user_id: req.session.user_id,
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

// router.get("/:id", (req, res) => {
//   Post.findOne({
//     where: {
//       id: req.params.id,
//     },
//     attribute: ["title", "post"],
//     include: [
//       {
//         model: Comment,
//         attributes: ["comments"],
//         order: [["createdAt", "DESC"]],
//         include: {
//           model: User,
//           attributes: ["first_name", "email"],
//         },
//       },
//       {
//         model: User,
//         attributes: ["first_name", "last_name", "email"],
//       },
//     ],
//   })
//     .then((dbPostData) => {
//       if (!dbPostData) {
//         res.status(404).json({ message: "No post found with this id" });
//         return;
//       }
//       const post = dbPostData.get({ plain: true });
//       console.log(post.Comments[1].user);
//       res.render("singlepost", { post, loggedIn: req.session.loggedIn });
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json(err);
//     });
// });

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
