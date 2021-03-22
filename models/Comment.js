const sequelize = require("../config/connection");
const { Model, DataTypes } = require("sequelize");
class Comment extends Model {}

Comment.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    comments: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "User",
        key: "id",
      },
    },
    post_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "Post",
        key: "id",
      },
    },
    comment_id: {
      type: DataTypes.UUID,
      references: {
        model: "Comment",
        key: "id",
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "Comment",
  }
);

module.exports = Comment;
