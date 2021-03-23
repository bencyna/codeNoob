const sequelize = require("../config/connection.js");
const { Post, User, Comment } = require("../models");
const router = require("express").Router();

router.get("/", (req, res) => {
  res.render("homepage");
});

router.get("/homepage", (req, res) => {
  Post.findAll({
    include: [
      {
        model: Comment,
        attribute: ["title","post"],
        include: {
          model: User,
          attributes: ["first_name", "email"],
        },
      },
      {
        model: User,
        attributes: ["first_name", "email"],
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

router.get("/post/:id", (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id,
    },
    attribute: ["title","post"],
    include: [
      {
        model: Comment,
        attributes: ["comments"],
        include: {
          model: User,
          attributes: ["first_name", "email"],
        },
      },
      {
        model: User,
        attributes: ["first_name", "email"],
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

module.exports = router;
