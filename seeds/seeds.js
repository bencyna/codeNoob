const sequelize = require("../config/connection");
const { User, Post, Comment } = require("../models");
const userData = require("./userData.json");
const postData = require("./postData.json");
const commentData = require("./commentData.json");
const seedDatabase = async () => {
  await sequelize.sync({ force: true });
  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });
  let posts = [];
  let i = 0;
  for (const post of postData) {
    posts[i] = await Post.create(
      {
        ...post,
        user_id: users[Math.floor(Math.random() * users.length)].id,
      },
      {
        returning: true,
      }
    );
    i++;
  }
  // const posts = await Post.bulkCreate(postData, {
  //     returning: true
  // });
  for (const comment of commentData) {
    await Comment.create({
      ...comment,
      user_id: users[Math.floor(Math.random() * users.length)].id,
      post_id: posts[Math.floor(Math.random() * posts.length)].id,
    });
  }
  process.exit(0);
};
seedDatabase();
