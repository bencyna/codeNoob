const { User } = require("../../models");
const router = require("../homeRoutes");

router.post("/login", async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(401)
        .json({ message: "Incorrect email or password, please try again :)" });
      return;
    }
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.json({ user: userData, message: "You are now logged in" });
    });
  } catch (error) {
    // res.status(400).json(error);
    console.log(error);
    res.json(error);
  }
});

router.post("/signup", async (req, res) => {
  try {
    const userData = await User.create({
      first_name: req.body.firstName,
      last_name: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
    });

    res.status(200).json(userData);
  } catch (error) {
    console.log(error);
    // res.status(400).json(error);
  }
});

module.exports = router;
