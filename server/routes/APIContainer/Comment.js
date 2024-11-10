const Comment = require("./../../models/commentModel");
const { broadcast, handleEvent } = require("./../../config/websocket");

async function getCommentsData(productID) {
  const comments = await Comment.find({ productID }).populate(
    "userID",
    "email userName avatar"
  );
  
  const count = comments.length;
  const totalRating = comments.reduce((sum, comment) => sum + comment.rating, 0);
  const averageRating = count > 0 ? totalRating / count : 0;

  return { comments, count, averageRating };
}

exports.getCommentsByProductID = async (req, res) => {
  const { productID } = req.params;
  try {
    const commentsData = await getCommentsData(productID);
    res.status(200).json(commentsData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addComment = async (req, res) => {
  const { productID, userID, text, images, rating } = req.body;
  try {
    const newComment = new Comment({ productID, userID, text, images, rating });
    await newComment.save();
    const commentsData = await getCommentsData(productID);
    handleEvent("comment", commentsData);
    res.status(201).json(commentsData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.getCommentById = async (req, res) => {
  const { id } = req.params;
  try {
    const comment = await Comment.findById(id);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
