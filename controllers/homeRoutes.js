const sequelize = require("../config/connection.js");
const { Post, User, Comment } = require("../models");
const router = require("express").Router();

router.get("/", (req, res) => {
  res.render("homepage");
});

router.get("/homepage", (req, res) => {
  Post.findAll({
    attribute: ["first_name", "last_name", "id", "email", "password"],
    include: [
      {
        model: Comment,
        attribute: ["first_name", "last_name", "id", "email", "password"],
        include: {
          model: User,
          attributes: ["username", "email", "password"],
        },
      },
      {
        model: User,
        attributes: ["username", "email", "password"],
      },
    ],
  })
    .then((dbPostData) => {
      const posts = dbPostData.map((post) => post.get({ plain: true }));
      res.render("homepage", { posts, loggedIn: req.session.loggedIn });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});
router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("login");
});
router.get("/signup", (req, res) => {
  res.render("signup");
});
router.get("/post/id", (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id,
    },
    attribute: ["first_name", "last_name", "id", "email", "password"],
    include: [
      {
        model: Comment,
        attributes: ["id", "comment_id", "post_id", "user_id", "comments"],
        include: {
          model: User,
          attributes: ["username", "email", "password"],
        },
      },
      {
        model: User,
        attributes: ["username", "email", "password"],
      },
    ],
  })
    .then((dbPostData) => {
      if (!dbPostData) {
        res.status(404).json({ message: "No post found with this id" });
        return;
      }
      const post = dbPostData.get({ plain: true });
      console.log(post);
      res.render("single-post", { post, loggedIn: req.session.loggedIn });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/signup", async (req, res) => {
  res.render("signup");
});

module.exports = router;
