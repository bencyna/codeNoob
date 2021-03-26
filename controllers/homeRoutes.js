const sequelize = require("../config/connection.js");
const { Post, User, Comment } = require("../models");
const withAuth = require("../utils/auth.js");
const router = require("express").Router();

router.get("/", async (req, res) => {
  res.render("homepage");
});

router.get("/dashboard", async (req, res) => {
  try {
    const postData = await Post.findAll({
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: User,
          attributes: ["first_name", "last_name"],
        },
      ],
    });

    const userData = await User.findOne({
      where: {
        id: req.session.user_id,
      },
    });

    const users = userData.get({ plain: true });
    console.log(users);
    const posts = postData.map((project) => project.get({ plain: true }));

    res.render("dashboard", { posts, users, logged_in: req.session.logged_in });
  } catch (error) {
    res.status(500).json(error);
  }
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

// placeholder for post/:id
router.get("/forum", (req, res) => {
  res.render("forum");
});

router.get("/user", withAuth, async (req, res) => {
  try {
    const postData = await Post.findAll({
      where: {
        user_id: req.session.user_id,
      },
      include: [
        {
          model: User,
          attributes: ["first_name", "last_name"],
        },
      ],
    });

    const posts = postData.map((project) => project.get({ plain: true }));
    console.log(posts);

    res.render("user", {
      posts,
      logged_in: req.session.logged_in,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
