const sequelize = require("../config/connection.js");
const { Post, User, Comment, Topic } = require("../models");
const withAuth = require("../utils/auth.js");
const router = require("express").Router();
const Sequelize = require('sequelize');
const Op = Sequelize.Op;


router.get("/", async(req, res) => {
    res.render("homepage");
});

// search function
router.get("/dashboard", async(req, res) => {
    try {
        let postData
        if (req.query.q) {
            postData = await Post.findAll({
                order: [
                    ["createdAt", "DESC"]
                ],
                include: [{
                    model: User,
                    attributes: ["first_name", "last_name"],
                }, ],
                where: {
                    title: {
                        [Op.like]: `%${req.query.q}%`
                    }
                }
            });
        } else {
            postData = await Post.findAll({
                order: [
                    ["createdAt", "DESC"]
                ],
                include: [{
                    model: User,
                    attributes: ["first_name", "last_name"],
                }, ],
            });
        }

        console.log(postData)

        let users;
        if (req.session.user_id) {
            const userData = await User.findOne({
                where: {
                    id: req.session.user_id,
                },
            });
            users = userData.get({ plain: true });
        }

        const topicData = await Topic.findAll({
            include: [{
                model: User,
                attributes: ["first_name", "last_name"],
            }, ],
        });

        const posts = postData.map((project) => project.get({ plain: true }));
        const topics = topicData.map((topic) => topic.get({ plain: true }));
        console.log(topics);

        res.render("dashboard", {
            posts,
            topics,
            users,
            logged_in: req.session.logged_in,
        });
    } catch (error) {
        console.log(error);
        // res.status(500).json(error);
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

router.get("/user", withAuth, async(req, res) => {
    try {
        const postData = await Post.findAll({
            where: {
                user_id: req.session.user_id,
            },
            include: [{
                model: User,
                attributes: ["first_name", "last_name"],
            }, ],
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

router.get("/post/:id", (req, res) => {
    Post.findOne({
            where: {
                id: req.params.id,
            },
            attribute: ["title", "post"],
            include: [{
                    model: Comment,
                    attributes: ["comments", "id", "user_id"],
                    order: [
                        ["createdAt", "DESC"]
                    ],
                    include: {
                        model: User,
                        attributes: ["first_name", "email", "id"],
                    },
                },
                {
                    model: User,
                    attributes: ["first_name", "last_name", "email", "id"],
                },
            ],
        })
        .then((dbPostData) => {
            if (!dbPostData) {
                res.status(404).json({ message: "No post found with this id" });
                return;
            }
            const post = dbPostData.get({ plain: true });

            res.render("singlepost", {
                post,
                logged_in: req.session.logged_in,
                user_id: req.session.user_id,
            });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get("/topics/:id", withAuth, async(req, res) => {
    try {
        const topicData = await Topic.findByPk(req.params.id, {
            include: [{
                model: Post,
                include: {
                    model: User,
                    attributes: ["first_name", "email", "id"],
                },
            }, ],
        });

        const topics = topicData.get({ plain: true });
        console.log(topics);

        res.render("topics", {
            topics,
            logged_in: req.session.logged_in,
        });
    } catch (error) {
        res.status(500).json(error);
    }
});

router.get("/recources", (req, res) => {
    res.render("recources", {
        logged_in: req.session.logged_in,
    });
});

module.exports = router;