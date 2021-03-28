const User = require("./User");
const Post = require("./Post");
const Comment = require("./Comment");
const Topic = require("./Topic");

Post.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

User.hasMany(Post, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

Comment.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

User.hasMany(Comment, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

Comment.belongsTo(Post, {
  foreignKey: "post_id",
  onDelete: "CASCADE",
});

Post.hasMany(Comment, {
  foreignKey: "post_id",
  onDelete: "CASCADE",
});

Comment.hasMany(Comment, {
  foreignKey: "comment_id",
  onDelete: "CASCADE",
});

Topic.hasMany(Post, {
  foreignKey: "topic_id",
});

Post.belongsTo(Topic, {
  foreignKey: "topic_id",
});

User.hasMany(Topic, {
  foreignKey: "user_id",
});

Topic.belongsTo(User, {
  foreignKey: "user_id",
});

module.exports = { User, Comment, Post, Topic };
